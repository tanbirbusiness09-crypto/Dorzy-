import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveVisitLocation, locationWebResponse } from '../server/visit-location.js';
import deploymentApi from '../api/visit-location.js';
import { visitQuote } from '../src/visit-pricing.js';
import { bookingMessage, bookingWhatsAppUrl } from '../src/booking-whatsapp.js';

const config = { shop:{latitude:24.7220887,longitude:46.6722026}, routingBaseUrl:'https://route.test/driving', reverseGeocodingUrl:'https://geo.test/reverse', ratesConfirmed:true, distanceBands:[{upToKm:10,fee:0}] };
const point = {latitude:24.73,longitude:46.675,language:'en'};
const fakeFetch = async url => ({ok:true,json:async()=>String(url).includes('route.test') ? {code:'Ok',routes:[{distance:1367.1}]} : {features:[{properties:{city:'Riyadh',district:'Al Wurud',street:'Prince Sultan St',housenumber:'6942'}}]}});

test('GPS result contains a road distance and structured address',async()=>{
  const value=await resolveVisitLocation(point,config,fakeFetch);
  assert.equal(value.distanceKm,1.3671);assert.equal(value.city,'Riyadh');assert.match(value.address,/6942 Prince Sultan/);
});
test('Routing failure preserves the address and leaves the charge unknown',async()=>{
  const value=await resolveVisitLocation(point,config,async url=>{if(String(url).includes('route.test'))throw Error('offline');return fakeFetch(url);});
  assert.equal(value.distanceKm,null);assert.equal(value.city,'Riyadh');
});
test('Reverse-geocoding failure preserves a usable route',async()=>{
  const value=await resolveVisitLocation(point,config,async url=>{if(String(url).includes('geo.test'))throw Error('offline');return fakeFetch(url);});
  assert.equal(value.distanceKm,1.3671);assert.equal(value.address,'');
});
test('A city-only result is never presented as a street address',async()=>{
  const value=await resolveVisitLocation(point,config,async url=>String(url).includes('route.test')?fakeFetch(url):({ok:true,json:async()=>({features:[{properties:{city:'Riyadh'}}]})}));
  assert.equal(value.address,'');assert.equal(value.city,'Riyadh');
});
test('Own-fabric rate and confirmed free-distance boundary are respected',()=>{
  const input={ownFabric:true,service:'home',quantity:2,fabricPrice:1097,config};
  assert.equal(visitQuote({...input,distanceKm:10}).total,240);
  assert.equal(visitQuote({...input,distanceKm:10.001}).total,null);
  assert.equal(visitQuote({...input,distanceKm:null}).base,240);
  assert.equal(visitQuote({...input,service:'alterations',distanceKm:1}).base,null);
});
test('WhatsApp targets the shop; customer contact is message data, with all booking details',()=>{
  const booking={ref:'TEST',name:'Test customer',phone:'+966500000001',service:'New garment',clothName:'Customer fabric',qty:2,date:'2026-10-31',slot:'14:00 - 18:00',city:'Riyadh',district:'Al Wurud',address:'Test building',distanceKm:1.37,baseAmount:240,distanceFee:0,priceSummary:'SAR 240',customerNote:'Call first',locationLink:'https://maps.google.com/?q=24.73,46.675'};
  const url=new URL(bookingWhatsAppUrl(booking,'+966 57 379 8213','en'));
  assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/966573798213');
  const message=url.searchParams.get('text');
  for(const text of ['+966500000001','Customer fabric','New garment','Quantity: 2','Test building','Call first','1.37 km','SAR 240','PDF']) assert.ok(message.includes(text),text);
  assert.match(bookingMessage({...booking,distanceFee:null},'en'),/Visit \/ delivery: To be confirmed/);
  assert.equal(bookingWhatsAppUrl(booking,'966500000000','en'),null);
});

test('Production Web API returns the same location contract as local Vite',async()=>{
  const request=new Request('https://dorzy.example/api/visit-location',{method:'POST',headers:{origin:'https://dorzy.example','content-type':'application/json'},body:JSON.stringify(point)});
  const response=await locationWebResponse(request,{config,fetcher:fakeFetch});
  assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');
  const result=await response.json();assert.equal(result.city,'Riyadh');assert.equal(result.distanceKm,1.3671);
});
test('Production endpoint rejects invalid bodies, methods, oversized input and cross-origin calls',async()=>{
  const url='https://dorzy.example/api/visit-location';
  for(const [body,status] of [['null',400],['{}',400],['invalid-json',400],['x'.repeat(1025),413]]) {
    const response=await locationWebResponse(new Request(url,{method:'POST',body}),{config,fetcher:fakeFetch});assert.equal(response.status,status);
  }
  assert.equal((await deploymentApi.fetch(new Request(url))).status,405);
  const cross=new Request(url,{method:'POST',headers:{origin:'https://unrelated.example'},body:JSON.stringify(point)});
  assert.equal((await locationWebResponse(cross,{config,fetcher:fakeFetch})).status,403);
});
test('Invalid fabric amounts stay pending and garment quantities are whole numbers',()=>{
  const input={ownFabric:false,service:'home',quantity:2.9,fabricPrice:100,config,distanceKm:1};
  assert.equal(visitQuote(input).total,200);
  assert.equal(visitQuote({...input,fabricPrice:NaN}).total,null);
});
