import { bookingWhatsAppUrl } from "./booking-whatsapp.js";
let pdfTools;
const loadPdfTools=()=>import('./booking-pdf.js').then(module=>(pdfTools=module));
const loadBookingFont=()=>loadPdfTools().then(module=>module.loadBookingFont());
const bookingPdfFile=booking=>loadPdfTools().then(module=>module.bookingPdfFile(booking));
const downloadBookingPdf=file=>pdfTools?.downloadBookingPdf(file);
import { visitQuote, OWN_FABRIC_RATE } from "./visit-pricing.js";
import { initKineticGrid } from "./kinetic-grid.js";
import { initStudio } from "./jubba.js";

let WA_NUMBER = "966573798213";
const STORAGE_KEY = "qasr-bookings-v2";
const STATE_KEY = "qasr-config";

const FABRIC_BRANDS = [
  { id: "jp", nameEn: "Japanese", nameAr: "ياباني", flag: "🇯🇵", millEn: "Toyobo & Shikibo", millAr: "تويوبو وشيكيبو" },
  { id: "kr", nameEn: "Korean", nameAr: "كوري", flag: "🇰🇷", millEn: "Royal Silk-Crepe", millAr: "حرير كريب ملكي" },
  { id: "cn", nameEn: "Chinese", nameAr: "صيني", flag: "🇨🇳", millEn: "Fine Poly-Cotton", millAr: "بولي-قطن سبان" },
  { id: "th", nameEn: "Thai", nameAr: "تايلاندي", flag: "🇹🇭", millEn: "Summer Linen", millAr: "كتان صيفي منعش" },
];

const CLOTHS = [
  // 🇯🇵 Japanese (Toyobo & Shikibo)
  {
    id: "jp-ivory",
    brand: "jp",
    nameEn: "Toyobo Imperial Ivory",
    nameAr: "تويوبو عاجي ملكي",
    price: 1290,
    discount: 15,
    discountTagEn: "15% OFF",
    discountTagAr: "خصم ١٥٪",
    isPromo: true,
    days: [6, 8],
    weight: "140g/m²",
    weaveEn: "Super 120s Cotton",
    weaveAr: "قطن سوبر ١٢٠",
    colorClass: "cloth__swatch--jp-ivory",
    img: "/images/fabrics/jp-ivory.jpg",
  },
  {
    id: "jp-pearl",
    brand: "jp",
    nameEn: "Shikibo Pearl White",
    nameAr: "شيكيبو أبيض لؤلؤي",
    price: 1350,
    discount: 15,
    discountTagEn: "15% OFF",
    discountTagAr: "خصم ١٥٪",
    isPromo: true,
    days: [6, 8],
    weight: "155g/m²",
    weaveEn: "Silk Sheen Weave",
    weaveAr: "بريق حريري فاخر",
    colorClass: "cloth__swatch--jp-pearl",
    img: "/images/fabrics/jp-pearl.jpg",
  },
  // 🇰🇷 Korean (Royal Crepe)
  {
    id: "kr-sand",
    brand: "kr",
    nameEn: "Seoul Royal Sand",
    nameAr: "رمل سيول الملكي",
    price: 960,
    days: [7, 10],
    weight: "150g/m²",
    weaveEn: "Royal Silk-Crepe",
    weaveAr: "حرير كريب ملكي",
    colorClass: "cloth__swatch--kr-sand",
    img: "/images/fabrics/kr-sand.jpg",
  },
  {
    id: "kr-opal",
    brand: "kr",
    nameEn: "Hanjin Pure Opal",
    nameAr: "أوبال هانجين نقي",
    price: 1080,
    discount: 20,
    discountTagEn: "20% OFF",
    discountTagAr: "خصم ٢٠٪",
    isPromo: true,
    days: [7, 10],
    weight: "145g/m²",
    weaveEn: "Liquid Drape Crepe",
    weaveAr: "انسيابية باردة",
    colorClass: "cloth__swatch--kr-opal",
    img: "/images/fabrics/kr-opal.jpg",
  },
  // 🇨🇳 Chinese (Dynasty Spun)
  {
    id: "cn-white",
    brand: "cn",
    nameEn: "Dynasty Classic White",
    nameAr: "دايناستي أبيض ناصع",
    price: 790,
    discount: 10,
    discountTagEn: "10% OFF",
    discountTagAr: "خصم ١٠٪",
    isPromo: true,
    days: [8, 11],
    weight: "160g/m²",
    weaveEn: "Spun Poly-Cotton",
    weaveAr: "سبان بولي قطن متين",
    colorClass: "cloth__swatch--cn-white",
    img: "/images/fabrics/cn-white.jpg",
  },
  {
    id: "cn-cream",
    brand: "cn",
    nameEn: "Lotus Soft Cream",
    nameAr: "كريم اللوتس الناعم",
    price: 880,
    days: [8, 11],
    weight: "155g/m²",
    weaveEn: "Smooth Twill Finish",
    weaveAr: "توييل ناعم يومي",
    colorClass: "cloth__swatch--cn-cream",
    img: "/images/fabrics/cn-cream.jpg",
  },
  // 🇹🇭 Thai (Summer Linen-Cotton)
  {
    id: "th-breeze",
    brand: "th",
    nameEn: "Siam Summer Breeze",
    nameAr: "نسيم سيام الصيفي",
    price: 850,
    days: [8, 12],
    weight: "135g/m²",
    weaveEn: "Tropical Linen-Cotton",
    weaveAr: "كتان قطن استوائي",
    colorClass: "cloth__swatch--th-breeze",
    img: "/images/fabrics/th-breeze.jpg",
  },
  {
    id: "th-olive",
    brand: "th",
    nameEn: "Bangkok Matte Olive",
    nameAr: "زيتوني بانكوك المطفي",
    price: 950,
    days: [8, 12],
    weight: "165g/m²",
    weaveEn: "Matte Executive Twill",
    weaveAr: "توييل تنفيذي مطفي",
    colorClass: "cloth__swatch--th-olive",
    img: "/images/fabrics/th-olive.jpg",
  },
];

const CITIES = [
  { id: "Riyadh", visit: 0, delivery: 0, zone: "core" },
  { id: "Jeddah", visit: 0, delivery: 0, zone: "core" },
  { id: "Dammam", visit: 0, delivery: 0, zone: "core" },
  { id: "Khobar", visit: 0, delivery: 40, zone: "east" },
  { id: "Makkah", visit: 0, delivery: 0, zone: "core" },
  { id: "Madinah", visit: 0, delivery: 0, zone: "core" },
  { id: "Taif", visit: 60, delivery: 70, zone: "west" },
  { id: "Abha", visit: 90, delivery: 110, zone: "south" },
  { id: "Tabuk", visit: 90, delivery: 120, zone: "north" },
  { id: "Qassim", visit: 70, delivery: 80, zone: "central" },
  { id: "Jubail", visit: 50, delivery: 60, zone: "east" },
  { id: "Yanbu", visit: 80, delivery: 90, zone: "west" },
];

const CITY_COORDS = {
  Riyadh: [24.7136, 46.6753],
  Jeddah: [21.4858, 39.1925],
  Dammam: [26.4207, 50.0888],
  Khobar: [26.2172, 50.1971],
  Makkah: [21.3891, 39.8579],
  Madinah: [24.5247, 39.5692],
  Taif: [21.2703, 40.4158],
  Abha: [18.2164, 42.5053],
  Tabuk: [28.3838, 36.555],
  Qassim: [26.3592, 43.9818],
  Jubail: [27.0046, 49.6225],
  Yanbu: [24.0896, 38.0618],
};

const i18n = {
  en: {
    "nav.services": "Cuts",
    "nav.process": "Offers",
    "cuts.aria": "House cuts on offer",
    "cuts.eyebrow": "House cuts on offer",
    "cuts.h2": "Pair a cut with a cloth.",
    "pair.s1": "Choose your cut",
    "pair.s2": "Choose your cloth",
    "pair.s3": "Your jubba",
    "pair.each": "/ jubba",
    "pair.total": "Total",
    "pair.wa": "Order on WhatsApp",
    "pair.msg": "As-salamu alaykum, I would like to order: {cut} cut in {cloth} × {qty}. Total: {total}.",
    "cuts.badge15": "15% OFF",
    "cuts.badge20": "20% OFF",
    "cuts.badge10": "10% OFF",
    "cuts.saudi": "Saudi",
    "cuts.kowaity": "Kowaity",
    "cuts.qutari": "Qutari",
    "cuts.emaraty": "Emaraty",
    "cuts.noom": "Noom",
    "cuts.saideria": "Saideria",
    "cuts.dagla": "Dagla",
    "cuts.code": "Code",
    "nav.gallery": "Lookbook",
    "nav.atelier": "Atelier",
    "nav.book": "Book",
    "nav.appoint": "Book Visit",
    "nav.wa": "WhatsApp",
    "nav.theme": "Toggle theme",
    "saas.live": "Live quote",
    "saas.book": "Lock order",
    "saas.deliveryBadge": "Free Delivery",
    "saas.deliveryText": "Complimentary VIP Doorstep Delivery Across Saudi Arabia",
    "saas.bundleBadge": "Bundle Offer",
    "saas.bundleText": "Order 2+ jubbas together · save up to 20%",
    "bundle.eyebrow": "Bundle Offer",
    "bundle.h2": "Order together, save more",
    "bundle.off": "OFF",
    "bundle.b2": "2 jubbas · any cut mix",
    "bundle.b3": "3 jubbas + free home measurement",
    "bundle.b5": "5+ jubbas · family & Eid",
    "bundle.t2.name": "Duo Bundle (2 jubbas · 10% off)",
    "bundle.t3.name": "Trio Bundle (3 jubbas · 15% off + free home measurement)",
    "bundle.t5.name": "Family & Eid Bundle (5+ jubbas · 20% off, free delivery + free collar-style upgrade)",
    "bundle.line": "Bundle discount −{p}%",
    "bundle.hintStart": "Add 1 more jubba to unlock 10% off",
    "bundle.hintNext": "Add {n} more to unlock {p}% off",
    "bundle.hintMax": "Top bundle unlocked — 20% off, free delivery & collar upgrade",
    "bundle.wa": "As-salamu alaykum, I would like to claim the {o} offer from Namaa Al Qimmah.",
    "bundle.msg": "Bundle",
    "ad.aria": "Namaa Al Qimmah animated offer",
    "ad.s1a": "Order online",
    "ad.s1b": "Your mu'allim arrives at your home within minutes",
    "ad.s1c": "Measurement at your door",
    "ad.s2a": "Your jubba ready in",
    "ad.s2b": "ONE DAY",
    "ad.s3a": "Bundle & save",
    "ad.s3b": "Up to 20% off",
    "ad.s4a": "Order now",
    "ad.s4b": "Your master tailor comes to you",
    "ad.ctaWa": "Order on WhatsApp",
    "ad.ctaBook": "Book home visit",
    "ad.wa": "As-salamu alaykum, I would like to order a jubba with a home measurement visit.",
    "nav.home": "Home",
    "nav.offers": "Offers",
    "qk.eyebrow": "Quick booking",
    "qk.origin": "1. Fabric Origin / Mill",
    "qk.cloth": "2. Choose Fabric Swatch",
    "qk.details": "Details",
    "qk.pickup": "Pickup & press",
    "qk.yourprice": "Your price",
    "qk.cta": "Book via WhatsApp",
    "qk.fine": "No card required — pay when it arrives.",
    "qk.sumAria": "Price summary",
    "qk.flex": "Flexible window",
    "cfg.cloth": "Cloth",
    "cfg.city": "City",
    "cfg.qty": "Quantity",
    "cfg.visit": "Home visit",
    "cfg.del": "Delivery",
    "cfg.due": "Due on delivery",
    "cfg.free": "Included",
    "card.measure.k": "Home Measure",
    "card.measure.p": "Cutter at your door",
    "card.del.k": "Lead time",
    "card.del.p": "Pressed & boxed home",
    "card.pay.k": "COD total",
    "card.pay.p": "Pay when it arrives",
    "banner.ribbon1": "NAMAA AL QIMMAH CONCIERGE • 100% FREE HOME MEASUREMENT & DOORSTEP DELIVERY ACROSS KSA",
    "banner.ribbon.cta1": "BOOK NOW",
    "banner.b1.badge": "COMPLIMENTARY VIP SERVICE",
    "banner.b1.title": "Free Doorstep Delivery & Home Measurement",
    "banner.b1.sub": "No minimum order • Senior cutter visits your home with luxury fabric rolls.",
    "banner.b1.tag": "0 SAR Delivery Fee • 100% Cash on Delivery",
    "banner.b1.cta": "Book Cutter Visit",
    "banner.b1.feat1": "Fast 48h Cutter Dispatch",
    "banner.ribbon2": "EXCLUSIVE ATELIER PRIVILEGE • 15% OFF ON 2+ BESPOKE JUBBAS • LIMITED SLOTS TODAY",
    "banner.ribbon.cta2": "CLAIM NOW",
    "banner.b2.badge": "PRIVILEGE PRIVÉ",
    "banner.b2.title": "15% Royal Privilege On Bespoke Orders",
    "banner.b2.sub": "Toyobo Japanese Cotton & Italian Silk Wool Blends • Code: ROYAL15",
    "banner.b2.copy": "Copy Code",
    "banner.b2.cta": "Claim Privilege Code",
    "banner.b2.feat1": "Bespoke House Perks",
    "banner.copied": "Privilege code ROYAL15 copied! Applied to order.",
    "banner.ribbon3": "HAUTE COUTURE JUBBA COLLECTION • TAILORED FOR MAJLIS, WEDDINGS & ROYAL OCCASIONS",
    "banner.ribbon.cta3": "EXPLORE",
    "banner.b3.badge": "ROYAL OCCASIONS",
    "banner.b3.title": "Dress for the Royal Occasion",
    "banner.b3.sub": "Impeccable House Cut Silhouette • Handcrafted Gold Thread Details",
    "banner.b3.tag": "Try on first, pay courier only if it sits as promised",
    "banner.b3.cta": "Explore House Cuts",
    "banner.b3.feat1": "Signature Fabrics",
    "svc.eyebrow": "The Namaa Al Qimmah Ritual",
    "svc.h2": "Everything comes to you.",
    "svc.m.t": "Home Measurement",
    "svc.m.p": "A senior cutter visits your home or office. Fifteen points, one sitting, zero shop queues.",
    "svc.c.t": "Atelier Cut",
    "svc.c.p": "Japanese and Italian cottons, hand-finished plackets, discreet gold thread at the collar.",
    "svc.d.t": "Home Delivery",
    "svc.d.p": "Steamed, boxed, and handed to you. Core cities included. Regional cities priced live.",
    "svc.p.t": "Cash on Delivery",
    "svc.p.p": "Pay in cash when the jubba arrives. Or settle on WhatsApp before we dispatch.",
    "pr.eyebrow": "Four quiet steps",
    "pr.h2": "From WhatsApp to wardrobe.",
    "pr.1.t": "Configure",
    "pr.1.p": "Pick cloth, city and quantity. Watch the quote rewrite itself.",
    "pr.2.t": "We visit",
    "pr.2.p": "Tailor arrives with fabric swatches. You choose drape, collar, and cuff.",
    "pr.3.t": "We cut",
    "pr.3.p": "Seven to thirteen days in the atelier, depending on cloth.",
    "pr.4.t": "We deliver",
    "pr.4.p": "Home delivery. Try on. Pay cash on delivery if it sits as promised.",
    "gallery.eyebrow": "Exclusive Privilege Editions",
    "gallery.h2": "Crafted with Imperial Fabrics",
    "gallery.lede": "Explore exclusive atelier privileges across certified Japanese Toyobo, Korean Silk-Crepe, Chinese Dynasty Spun, and Thai Summer Linen.",
    "gallery.c1.tag": "🇯🇵 15% OFF • Japanese Toyobo",
    "gallery.c1.t": "Japanese Toyobo Super 120s",
    "gallery.c1.d": "Impeccable certified Japanese cotton weave with 15% bespoke discount.",
    "gallery.c2.tag": "🇰🇷 20% OFF • Korean Royal Crepe",
    "gallery.c2.t": "Korean Royal Silk-Crepe",
    "gallery.c2.d": "Liquid drape luxury crepe with 20% privilege atelier discount.",
    "gallery.c3.tag": "🇨🇳 10% OFF • Dynasty Spun Cotton",
    "gallery.c3.t": "Dynasty Spun Poly-Cotton",
    "gallery.c3.d": "Crisp executive twill finish with 10% exclusive collection discount.",
    "gallery.c4.tag": "🇹🇭 Special Offer • Siam Summer Linen",
    "gallery.c4.t": "Siam Summer Linen Edition",
    "gallery.c4.d": "Ultra-breathable tropical linen-cotton tailored for Saudi climate comfort.",
    "at.eyebrow": "Cloth & silhouette",
    "at.h2": "Choose the house cut.",
    "at.lede":
      "Four house cuts, one silhouette. Pick a cloth and the live quote updates instantly.",
    "at.tab.all": "All Fabrics",
    "at.tab.jp": "Japanese",
    "at.tab.kr": "Korean",
    "at.tab.cn": "Chinese",
    "at.tab.th": "Thai",
    "at.select": "Select Cloth",
    "at.bookCutter": "Book Free Visit",
    "at.save": "SAVE",
    "at.bespokeCut": "Bespoke Cut",
    "at.list": "Choose another cloth",
    "at.lead": "Lead time",
    "at.price": "Price",
    "at.selected": "Selected",
    "at.ivory.t": "Majlis Ivory",
    "at.ivory.s": "Egyptian cotton · 80s",
    "at.sand.t": "Najd Sand",
    "at.sand.s": "Washe · breathable",
    "at.night.t": "Hijaz Night",
    "at.night.s": "Deep black · evening",
    "at.olive.t": "Diriyah Olive",
    "at.olive.s": "Seasonal wool-mix",
    "bk.eyebrow": "COMPLIMENTARY VIP ATELIER SERVICE",
    "bk.h2": "Send the Master Cutter to Your Majlis.",
    "bk.lede":
      "Choose a city and a window. We confirm on WhatsApp, visit for measurement, then deliver the finished jubba — cash on delivery.",
    "bk.card": "Appointment card",
    "bk.step": "Step",
    "bk.s1t": "Confirm on WhatsApp",
    "bk.s1d": "Send your order — we reply within 2 hours.",
    "bk.s2t": "Free home measurement",
    "bk.s2d": "Our cutter visits your address in your chosen window.",
    "bk.s3t": "Delivered · cash on arrival",
    "bk.s3d": "Try the jubba first — pay the courier only if you love it.",
    "studio.title": "Design your jubba",
    "studio.aria": "Jubba studio",
    "studio.close": "Close",
    "studio.select": "Select style",
    "studio.bp": "Front & Back Blueprint",
    "cat.Colar": "Collar",
    "cat.POCKET": "Pocket",
    "cat.YAT": "Sleeve",
    "cat.ZIPER": "Zipper",
    "st.1": "Your details",
    "st.2": "Visit details",
    "st.3": "Confirm",
    "f.name": "Full name",
    "f.phone": "Mobile (KSA)",
    "f.city": "City",
    "f.date": "Visit date",
    "f.slot": "Window",
    "f.addr": "District / address",
    "f.geo": "Use my location",
    "f.note": "Notes",
    "f.pay": "On delivery",
    "f.cod": "Cash on Delivery",
    "f.wapay": "Confirm on WhatsApp",
    "f.submit": "Confirm on WhatsApp",
    "f.fine": "Opens WhatsApp with your order. No card required.",
    "f.next": "Continue",
    "f.back": "Back",
    "f.when": "Visit window",
    "f.err.req": "This field is required.",
    "f.err.phone": "Enter a valid KSA mobile — 05xxxxxxxx.",
    "geo.ok": "Location pinned. Nearest city selected.",
    "geo.fail": "Location unavailable. Choose city manually.",
    "geo.wait": "Requesting location…",
    "status.pending": "Pending",
    "status.confirmed": "Confirmed",
    "status.measuring": "Measuring",
    "status.delivered": "Delivered",
    "toast.ok": "Order saved. Opening WhatsApp.",
    "toast.need": "Please complete the required fields.",
    "toast.phone": "Enter a valid KSA mobile.",
    "foot.copy": "Home measurement · Home delivery · Cash on delivery · WhatsApp",
    "appt.tag": "NAMAA AL QIMMAH ROYAL ATELIER",
    "appt.secTitle": "Reservation Schedule & Details",
    "appt.title": "Book Private Appointment",
    "appt.subtitle": "Senior cutter arrives at your doorstep with luxury fabric bolts & measurement set.",
    "appt.selectFabric": "1. Select Fabric",
    "appt.serviceLabel": "2. Select Service Type",
    "appt.svc.home.t": "Home Measurement",
    "appt.svc.home.d": "Senior cutter visits your villa or majlis",
    "appt.svc.atelier.t": "Atelier Lounge Visit",
    "appt.svc.atelier.d": "Private fitting in our boutique lounge",
    "appt.svc.consultancy.t": "Style Consultation",
    "appt.svc.consultancy.d": "Exclusive drape, silhouette & cloth advice",
    "appt.distLabel": "3. Travel & Location Radius",
    "appt.free": "0 SAR Free",
    "appt.clothPref": "Fabric Interest",
    "appt.submit": "Confirm & Book Appointment",
    "appt.autoBtn": "Auto-Detect Address",
    "appt.autoDone": "Address auto-detected!",
    "appt.refCode": "Reference Code",
    "appt.success.wa": "Open WhatsApp Concierge",
    "appt.success.done": "Done & Return to Atelier",
    "appt.orderSummary": "Order & Amount Summary",
    "appt.totalDue": "TOTAL AMOUNT (PAY ON ARRIVAL)",
    "appt.codNote": "Cash or Card on Delivery • No Advance",
    "journey.aria": "The Namaa Al Qimmah Bespoke Tailoring Journey",
    "journey.badge": "THE NAMAA AL QIMMAH BESPOKE JOURNEY",
    "journey.pause": "Pause",
    "journey.play": "Play",
    "journey.filmBadge": "ATELIER FILM",
    "journey.filmTitle": "The bespoke journey",
    "journey.offersAria": "Atelier offers",
    "offer.book": "Book this cloth",
    "offer.bookVisit": "Book the visit",
    "offer.copy": "Copy ROYAL15",
    "offer.5.price": "0 SAR",
    "offer.6.price": "On 2+ jubbas",
    "offer.1.badge": "15% OFF",
    "offer.1.title": "Toyobo Imperial Ivory",
    "offer.1.note": "Japanese Super 120s cotton",
    "offer.2.badge": "20% OFF",
    "offer.2.title": "Hanjin Pure Opal",
    "offer.2.note": "Korean liquid-drape crepe",
    "offer.3.badge": "10% OFF",
    "offer.3.title": "Dynasty Classic White",
    "offer.3.note": "Spun poly-cotton twill",
    "offer.4.badge": "ATELIER PICK",
    "offer.4.title": "Siam Summer Breeze",
    "offer.4.note": "Tropical linen-cotton",
    "offer.5.badge": "0 SAR VISIT",
    "offer.5.title": "Free home measure & delivery",
    "offer.5.note": "Cash on delivery across KSA",
    "offer.6.badge": "ROYAL15",
    "offer.6.title": "15% on two jubbas or more",
    "offer.6.note": "Privilege code, copied at booking",
    "journey.tag1": "Instant Online Booking • No Advance Payment",
    "journey.waName": "Namaa Al Qimmah Atelier Concierge",
    "journey.waMsg": "وعليكم السلام، تم تأكيد موعد الخياط برقم #AD-2048",
    "journey.tag4": "Handcrafted by Master Tailors • Super 120s & Italian Wool",
    "journey.sealTitle": "Namaa Al Qimmah Royal Seal",
    "journey.sealSub": "Hand-inspected, steamed & boxed",
    "journey.tag6": "100% Free Doorstep Delivery Across Saudi Arabia",
    "journey.c1.badge": "01 · ONLINE ORDER",
    "journey.c1.title": "Choose Your Fabric Online",
    "journey.c1.desc": "Explore Japanese Toyobo cottons, luxury crepe & bespoke collar styles from the comfort of your majlis.",
    "journey.c1.p1": "0 SAR Advance",
    "journey.c1.p2": "Pay on Delivery",
    "journey.c2.badge": "02 · CONFIRMATION",
    "journey.c2.title": "Concierge WhatsApp Confirmation",
    "journey.c2.desc": "Our master atelier concierge instantly confirms your appointment and prepares fabric sample bolts.",
    "journey.c2.p1": "Within 2 Hours",
    "journey.c2.p2": "Direct Concierge Chat",
    "journey.c3.badge": "03 · HOME MEASUREMENT",
    "journey.c3.title": "Senior Cutter at Your Majlis",
    "journey.c3.desc": "A master tailor arrives at your villa or office with 40+ fabric rolls for a meticulous 15-point fitting.",
    "journey.c3.p1": "100% Free Visit",
    "journey.c3.p2": "Touch Fabrics at Home",
    "journey.c4.badge": "04 · ATELIER CRAFT",
    "journey.c4.title": "Hand-Cut in Our Riyadh Atelier",
    "journey.c4.desc": "Artisan cutters sculpt your jubba using centuries of sartorial tradition, bespoke shears, and gold thread.",
    "journey.c4.p1": "Hand-Cut Patterns",
    "journey.c4.p2": "Single-Needle Stitch",
    "journey.c5.badge": "05 · ROYAL FINISHING",
    "journey.c5.title": "Pressed, Boxed & Royal Sealed",
    "journey.c5.desc": "Steamed to absolute perfection and packaged in our signature obsidian-gold presentation gift box.",
    "journey.c5.p1": "7-10 Days Tailoring",
    "journey.c5.p2": "Authenticity Certificate",
    "journey.c6.badge": "06 · VIP DELIVERY",
    "journey.c6.title": "Free Doorstep Delivery Across KSA",
    "journey.c6.desc": "Delivered directly to your villa gate in our luxury fleet. Try on first, pay courier only when satisfied.",
    "journey.c6.p1": "0 SAR Delivery",
    "journey.c6.p2": "Cash or Card on Arrival",
    "journey.ctaBadge": "COMPLIMENTARY VIP SERVICE",
    "journey.ctaTitle": "Your Royal Jubba, Delivered to Your Door",
    "journey.ctaDesc": "Book a senior master cutter visit to your villa with 40+ luxury fabric rolls, or chat directly with our atelier concierge.",
    "journey.bookBtn": "Book Free Cutter Visit",
    "journey.waBtn": "WhatsApp Concierge",
    "journey.promoHint": "Use Privilege Code:",
    "journey.copied": "Copied!",
    "journey.step1": "Order",
    "journey.step2": "Confirm",
    "journey.step3": "Measure",
    "journey.step4": "Tailor",
    "journey.step5": "Finish",
    "journey.step6": "Delivered",
    city: {
      Riyadh: "Riyadh",
      Jeddah: "Jeddah",
      Dammam: "Dammam",
      Khobar: "Khobar",
      Makkah: "Makkah",
      Madinah: "Madinah",
      Taif: "Taif",
      Abha: "Abha",
      Tabuk: "Tabuk",
      Qassim: "Qassim",
      Jubail: "Jubail",
      Yanbu: "Yanbu",
    },
  },
  ar: {
    "nav.services": "القصّات",
    "nav.process": "العروض",
    "cuts.aria": "قصّات الدار على العرض",
    "cuts.eyebrow": "قصّات الدار على العرض",
    "cuts.h2": "اختَر القصّة مع القماش.",
    "pair.s1": "اختر القصّة",
    "pair.s2": "اختر القماش",
    "pair.s3": "جبتك",
    "pair.each": "/ للجبة",
    "pair.total": "الإجمالي",
    "pair.wa": "اطلب عبر واتساب",
    "pair.msg": "السلام عليكم، أرغب في طلب: قصّة {cut} بقماش {cloth} × {qty}. الإجمالي: {total}.",
    "cuts.badge15": "خصم ١٥٪",
    "cuts.badge20": "خصم ٢٠٪",
    "cuts.badge10": "خصم ١٠٪",
    "cuts.saudi": "سعودي",
    "cuts.kowaity": "كويتي",
    "cuts.qutari": "قطري",
    "cuts.emaraty": "إماراتي",
    "cuts.noom": "نوم",
    "cuts.saideria": "سعيدية",
    "cuts.dagla": "دقلة",
    "cuts.code": "كود",
    "nav.gallery": "المعرض الملكي",
    "nav.atelier": "الأتيليه",
    "nav.book": "الحجز",
    "nav.appoint": "احجز زيارة",
    "nav.wa": "واتساب",
    "nav.theme": "تبديل المظهر",
    "saas.live": "تسعير مباشر",
    "saas.book": "تثبيت الطلب",
    "saas.deliveryBadge": "توصيل مجاني",
    "saas.deliveryText": "توصيل ملكي فاخر مجاني لباب منزلك في كافة مدن المملكة",
    "saas.bundleBadge": "عرض الباقة",
    "saas.bundleText": "اطلب جبتين أو أكثر معاً · وفّر حتى ٢٠٪",
    "bundle.eyebrow": "عرض الباقة",
    "bundle.h2": "اطلب معاً، ووفّر أكثر",
    "bundle.off": "خصم",
    "bundle.b2": "جبتان · أي تفصيلة",
    "bundle.b3": "٣ جبب + مقاس منزلي مجاني",
    "bundle.b5": "٥+ جبب · العائلة والعيد",
    "bundle.t2.name": "باقة الثنائي (جبتان · خصم ١٠٪)",
    "bundle.t3.name": "باقة الثلاثي (٣ جبب · خصم ١٥٪ + مقاس منزلي مجاني)",
    "bundle.t5.name": "باقة العائلة والعيد (٥+ جبب · خصم ٢٠٪ وتوصيل مجاني وترقية ياقة مجانية)",
    "bundle.line": "خصم الباقة −{p}٪",
    "bundle.hintStart": "أضف جبة واحدة لتحصل على خصم ١٠٪",
    "bundle.hintNext": "أضف {n} لتحصل على خصم {p}٪",
    "bundle.hintMax": "حصلت على أعلى باقة — خصم ٢٠٪ وتوصيل مجاني وترقية الياقة",
    "bundle.wa": "السلام عليكم، أرغب في الحصول على {o} من نماء القمة.",
    "bundle.msg": "الباقة",
    "ad.aria": "إعلان عروض نماء القمة",
    "ad.s1a": "اطلب أونلاين",
    "ad.s1b": "المعلّم يصلك إلى البيت خلال دقائق",
    "ad.s1c": "أخذ المقاس عند باب بيتك",
    "ad.s2a": "جبتك جاهزة في",
    "ad.s2b": "يوم واحد",
    "ad.s3a": "اطلب معاً ووفّر",
    "ad.s3b": "خصم حتى ٢٠٪",
    "ad.s4a": "اطلب الآن",
    "ad.s4b": "معلّم الخياطة يأتيك",
    "ad.ctaWa": "اطلب عبر واتساب",
    "ad.ctaBook": "احجز زيارة منزلية",
    "ad.wa": "السلام عليكم، أرغب في طلب جبة مع زيارة منزلية لأخذ المقاس.",
    "nav.home": "الرئيسية",
    "nav.offers": "العروض",
    "qk.eyebrow": "حجز سريع",
    "qk.origin": "١. بلد ومصنع القماش",
    "qk.cloth": "٢. طاقة القماش الفاخرة",
    "qk.details": "التفاصيل",
    "qk.pickup": "الاستلام والكوي",
    "qk.yourprice": "سعرك",
    "qk.cta": "احجز عبر واتساب",
    "qk.fine": "بدون بطاقة — ادفع عند وصولها.",
    "qk.sumAria": "ملخص السعر",
    "qk.flex": "موعد مرن",
    "cfg.cloth": "القماش",
    "cfg.city": "المدينة",
    "cfg.qty": "الكمية",
    "cfg.visit": "الزيارة المنزلية",
    "cfg.del": "التوصيل",
    "cfg.due": "عند الاستلام",
    "cfg.free": "مشمول",
    "card.measure.k": "مقاس منزلي",
    "card.measure.p": "الخياط عند بابك",
    "card.del.k": "مدة التنفيذ",
    "card.del.p": "مكوية ومعلّبة للمنزل",
    "card.pay.k": "إجمالي COD",
    "card.pay.p": "ادفع حين تصل",
    "banner.ribbon1": "كونسيرج نماء القمة • قياس منزلي وتوصيل فاخر مجاني ١٠٠٪ في الرياض وجدة وكافة مدن المملكة",
    "banner.ribbon.cta1": "احجز الآن",
    "banner.b1.badge": "خدمة ملكية مجانية",
    "banner.b1.title": "توصيل منزلي فاخر وقياس مجاني لباب منزلك",
    "banner.b1.sub": "بدون حد أدنى للطلب • يصل الخياط الأول لباب بيتك مع طاقات الأقمشة الفاخرة.",
    "banner.b1.tag": "رسوم توصيل ٠ ريال • دفع نقداً عند الاستلام",
    "banner.b1.cta": "احجز زيارة الخياط",
    "banner.b1.feat1": "إرسال سريع للخياط خلال ٤٨ ساعة",
    "banner.ribbon2": "امتياز الأتيليه الملكي • خصم ١٥٪ عند تفصيل جبتين أو أكثر • مواعيد محدودة اليوم",
    "banner.ribbon.cta2": "استفد الآن",
    "banner.b2.badge": "امتياز الأتيليه الخاص",
    "banner.b2.title": "خصم ملكي ١٥٪ على تفصيل الجبب الفاخرة",
    "banner.b2.sub": "أقطان تويوبو اليابانية وخامات الصوف الإيطالية الفاخرة • الكود: ROYAL15",
    "banner.b2.copy": "نسخ الكود",
    "banner.b2.cta": "استخدم كود الحسم",
    "banner.b2.feat1": "مزايا دار الخياطة",
    "banner.copied": "تم نسخ كود ROYAL15 بنجاح! تم تفعيل الحسم.",
    "banner.ribbon3": "تشكيلة الجبة الملكية الفاخرة • مخصصة للمجالس والأعياد والمناسبات الخاصة",
    "banner.ribbon.cta3": "استكشف",
    "banner.b3.badge": "أناقة المناسبات الملكية",
    "banner.b3.title": "أناقة تليق بالمناسبات والمجالس الملكية",
    "banner.b3.sub": "قصّة الدار الاستثنائية • تطريز يدوي دقيق مع أزرار الياقة الذهبية",
    "banner.b3.tag": "جرّب الجبة أولاً، وادفع فقط إذا أعجبك المقاس تماماً",
    "banner.b3.cta": "استكشف قصّات الدار",
    "banner.b3.feat1": "أقمشة الدار الحصرية",
    "svc.eyebrow": "طقس نماء القمة",
    "svc.h2": "كل شيء يأتي إليك.",
    "svc.m.t": "أخذ المقاس منزلياً",
    "svc.m.p": "يصل خياط أول إلى منزلك أو مكتبك. خمسة عشر نقطة، جلسة واحدة، بلا طوابير.",
    "svc.c.t": "قص الأتيليه",
    "svc.c.p": "أقطان يابانية وإيطالية، قبة يدوية، وخيط ذهبي خفيف عند الياقة.",
    "svc.d.t": "توصيل منزلي",
    "svc.d.p": "مكوية ومعلّبة. المدن الأساسية مشمولة. المدن الأخرى مسعّرة مباشرة.",
    "svc.p.t": "الدفع عند الاستلام",
    "svc.p.p": "ادفع نقداً عند وصول الجبة. أو سوِّ الأمر عبر واتساب قبل الإرسال.",
    "pr.eyebrow": "أربع خطوات هادئة",
    "pr.h2": "من واتساب إلى الخزانة.",
    "pr.1.t": "اضبط",
    "pr.1.p": "اختر القماش والمدينة والكمية. راقب العرض وهو يتحدث.",
    "pr.2.t": "نزورك",
    "pr.2.p": "يصل الخياط بأقمشة. تختار السقوط والياقة والكُم.",
    "pr.3.t": "نقصّ",
    "pr.3.p": "سبعة إلى ثلاثة عشر يوماً في الأتيليه حسب القماش.",
    "pr.4.t": "نوصل",
    "pr.4.p": "توصيل منزلي. جرّب. ادفع عند الاستلام إن جلست كما وعدنا.",
    "gallery.eyebrow": "عروض الأقمشة الحصرية",
    "gallery.h2": "إبداعات الدار لأرقى الأقمشة العالمية",
    "gallery.lede": "استكشف الخصومات الحصرية المعتمدة على القطن الياباني، حرير الكريب الكوري، والكتان الصيفي الفاخر.",
    "gallery.c1.tag": "🇯🇵 خصم ١٥٪ • قطن تويوبو ياباني",
    "gallery.c1.t": "تويوبو سوبر ١٢٠ الياباني",
    "gallery.c1.d": "نسيج قطني ياباني فاخر معتمد بخصم خاص ١٥٪.",
    "gallery.c2.tag": "🇰🇷 خصم ٢٠٪ • حرير كريب كوري",
    "gallery.c2.t": "حرير كريب سيول الملكي",
    "gallery.c2.d": "انسيابية ملكية فاخرة وباردة مع خصم حصري ٢٠٪.",
    "gallery.c3.tag": "🇨🇳 خصم ١٠٪ • بولي قطن دايناستي",
    "gallery.c3.t": "دايناستي سبان بولي-قطن",
    "gallery.c3.d": "مظهر تنفيذي ناصع ومتين مع خصم امتياز ١٠٪.",
    "gallery.c4.tag": "🇹🇭 عرض خاص • كتان سيام صيفي",
    "gallery.c4.t": "كتان سيام الصيفي المنعش",
    "gallery.c4.d": "نسيج خفيف ومريح مصمم خصيصاً لأجواء المملكة الحارة.",
    "at.eyebrow": "القماش والقصّة",
    "at.h2": "اختر قصّة الدار.",
    "at.lede":
      "أربعة أقمشة للبيت وقصّة واحدة. اختر القماش ويتحدث السعر المباشر فوراً.",
    "at.tab.all": "جميع الأقمشة",
    "at.tab.jp": "ياباني",
    "at.tab.kr": "كوري",
    "at.tab.cn": "صيني",
    "at.tab.th": "تايلاندي",
    "at.select": "اختيار القماش",
    "at.bookCutter": "حجز زيارة الخياط",
    "at.save": "وفر",
    "at.bespokeCut": "تفصيل خاص",
    "at.list": "اختر قماشاً آخر",
    "at.lead": "مدة التنفيذ",
    "at.price": "السعر",
    "at.selected": "محدد",
    "at.ivory.t": "عاجي المجلس",
    "at.ivory.s": "قطن مصري · ٨٠",
    "at.sand.t": "رمل نجد",
    "at.sand.s": "واشي · خفيف",
    "at.night.t": "ليل الحجاز",
    "at.night.s": "أسود عميق · مسائي",
    "at.olive.t": "زيتون الدرعية",
    "at.olive.s": "مزيج صوف موسمي",
    "bk.eyebrow": "خدمة الخياطة الملكية في المجلس",
    "bk.h2": "أرسل الخيّاط الملكي الماهر إلى مجلسك.",
    "bk.lede": "القماش والمدينة مثبتان. أضف الاسم والجوال والموقع — نؤكد عبر واتساب.",
    "bk.card": "بطاقة الموعد",
    "bk.step": "الخطوة",
    "bk.s1t": "التأكيد عبر واتساب",
    "bk.s1d": "أرسل طلبك — نرد خلال ساعتين.",
    "bk.s2t": "قياس منزلي مجاني",
    "bk.s2d": "يزورك الخياط في الموعد الذي اخترته.",
    "bk.s3t": "التسليم · الدفع عند الاستلام",
    "bk.s3d": "جرّب الجبة أولاً — وادفع للمندوب فقط إن أعجبتك.",
    "studio.title": "صمّم جلابتك",
    "studio.aria": "استوديو الجلابة",
    "studio.close": "إغلاق",
    "studio.select": "اختر النمط",
    "studio.bp": "مخطط أمامي وخلفي",
    "cat.Colar": "الياقة",
    "cat.POCKET": "الجيب",
    "cat.YAT": "تطريز الكم",
    "cat.ZIPER": "السحاب",
    "st.1": "بياناتك",
    "st.2": "تفاصيل الزيارة",
    "st.3": "التأكيد",
    "f.name": "الاسم الكامل",
    "f.phone": "الجوال (السعودية)",
    "f.city": "المدينة",
    "f.date": "تاريخ الزيارة",
    "f.slot": "النافذة",
    "f.addr": "الحي / العنوان",
    "f.geo": "استخدم موقعي",
    "f.note": "ملاحظات",
    "f.pay": "عند التوصيل",
    "f.cod": "الدفع عند الاستلام",
    "f.wapay": "تأكيد عبر واتساب",
    "f.submit": "أكّد عبر واتساب",
    "f.fine": "يفتح واتساب بتفاصيل طلبك. لا بطاقة مطلوبة.",
    "f.next": "متابعة",
    "f.back": "رجوع",
    "f.when": "موعد الزيارة",
    "f.err.req": "هذا الحقل مطلوب.",
    "f.err.phone": "أدخل رقم جوال سعودي صحيح — 05xxxxxxxx.",
    "geo.ok": "تم تثبيت الموقع. اختيرت أقرب مدينة.",
    "geo.fail": "الموقع غير متاح. اختر المدينة يدوياً.",
    "geo.wait": "جاري طلب الموقع…",
    "status.pending": "قيد الانتظار",
    "status.confirmed": "مؤكد",
    "status.measuring": "أخذ المقاس",
    "status.delivered": "تم التوصيل",
    "toast.ok": "حُفظ الطلب. جاري فتح واتساب.",
    "toast.need": "أكمل الحقول المطلوبة.",
    "toast.phone": "أدخل جوالاً سعودياً صالحاً.",
    "foot.copy": "مقاس منزلي · توصيل منزلي · الدفع عند الاستلام · واتساب",
    "appt.tag": "أتيليه نماء القمة الملكي",
    "appt.secTitle": "تفاصيل وموعد الحجز",
    "appt.title": "حجز موعد خاص",
    "appt.subtitle": "يصل الخياط الأول لباب منزلك مع طاقات الأقمشة الفاخرة وأدوات القياس الدقيقة.",
    "appt.selectFabric": "١. اختيار القماش",
    "appt.serviceLabel": "٢. نوع الخدمة المطلوبة",
    "appt.svc.home.t": "زيارة قياس منزلية",
    "appt.svc.home.d": "زيارة الخياط الأول للفيلا أو المجلس الخاص",
    "appt.svc.atelier.t": "زيارة فرع الأتيليه",
    "appt.svc.atelier.d": "جلسة قياس وتجربة خاصة في صالون الأتيليه",
    "appt.svc.consultancy.t": "استشارة تصميم ومظهر",
    "appt.svc.consultancy.d": "استشارة حصرية لاختيار القصّة والانسدال وتنسيق القماش",
    "appt.distLabel": "٣. نطاق المسافة والموقع",
    "appt.free": "مجاناً ٠ ر.س",
    "appt.clothPref": "القماش المفضل",
    "appt.submit": "تأكيد وحجز الموعد",
    "appt.autoBtn": "تحديد العنوان تلقائياً",
    "appt.autoDone": "تم تحديد العنوان تلقائياً!",
    "appt.refCode": "رقم المرجع",
    "appt.success.wa": "مراسلة كونسيرج الأتيليه عبر واتساب",
    "appt.success.done": "تم والعودة للواجهة الرئيسية",
    "appt.orderSummary": "ملخص الطلب والمبلغ الإجمالي",
    "appt.totalDue": "المبلغ الإجمالي (الدفع عند الاستلام)",
    "appt.codNote": "نقداً أو بالبطاقة عند الاستلام • بدون دفع مسبق",
    "journey.aria": "رحلة تفصيل الجبة الملكية في دار نماء القمة",
    "journey.badge": "رحلة نماء القمة الملكية للتفصيل الفاخر",
    "journey.pause": "إيقاف",
    "journey.play": "تشغيل",
    "journey.filmBadge": "فيلم الأتيليه",
    "journey.filmTitle": "رحلة التفصيل الملكية",
    "journey.offersAria": "عروض الأتيليه",
    "offer.book": "احجز هذا القماش",
    "offer.bookVisit": "احجز الزيارة",
    "offer.copy": "انسخ ROYAL15",
    "offer.5.price": "٠ ر.س",
    "offer.6.price": "على جبتين فأكثر",
    "offer.1.badge": "خصم ١٥٪",
    "offer.1.title": "تويوبو عاجي ملكي",
    "offer.1.note": "قطن ياباني سوبر ١٢٠",
    "offer.2.badge": "خصم ٢٠٪",
    "offer.2.title": "أوبال هانجين نقي",
    "offer.2.note": "حرير كريب ملكي",
    "offer.3.badge": "خصم ١٠٪",
    "offer.3.title": "دايناستي أبيض ناصع",
    "offer.3.note": "سبان بولي قطن",
    "offer.4.badge": "اختيار الأتيليه",
    "offer.4.title": "نسيم سيام الصيفي",
    "offer.4.note": "كتان قطن استوائي",
    "offer.5.badge": "زيارة ٠ ر.س",
    "offer.5.title": "قياس منزلي وتوصيل مجاني",
    "offer.5.note": "الدفع عند الاستلام في كل المملكة",
    "offer.6.badge": "ROYAL15",
    "offer.6.title": "خصم ١٥٪ على جبتين أو أكثر",
    "offer.6.note": "كود الامتياز يُنسخ عند الحجز",
    "journey.tag1": "حجز إلكتروني فوري • بدون دفع مسبق",
    "journey.waName": "كونسيرج أتيليه نماء القمة",
    "journey.waMsg": "وعليكم السلام، تم تأكيد موعد الخياط برقم #AD-2048",
    "journey.tag4": "قص يدوي بأيدي خياطين كبار • قطن ياباني وصوف إيطالي",
    "journey.sealTitle": "ختم نماء القمة الملكي",
    "journey.sealSub": "فحص يدوي، كوي بالبخار وتغليف فاخر",
    "journey.tag6": "توصيل مجاني ١٠٠٪ لباب بيتك بكافة مدن المملكة",
    "journey.c1.badge": "٠١ · الطلب أونلاين",
    "journey.c1.title": "اختر قماشك وتصميمك أونلاين",
    "journey.c1.desc": "استكشف أرقى أقمشة التويوبو اليابانية والحرير الملكي وتفاصيل الياقة من راحة مجلسك.",
    "journey.c1.p1": "٠ ر.س عربون مسبق",
    "journey.c1.p2": "الدفع عند الاستلام",
    "journey.c2.badge": "٠٢ · التأكيد",
    "journey.c2.title": "تأكيد فوري عبر واتساب الأتيليه",
    "journey.c2.desc": "يتواصل معك كونسيرج الدار لتأكيد موعد الزيارة وتجهيز حقيبة عينات الأقمشة المطلوبة.",
    "journey.c2.p1": "خلال ساعتين",
    "journey.c2.p2": "محادثة كونسيرج مباشرة",
    "journey.c3.badge": "٠٣ · أخذ المقاسات",
    "journey.c3.title": "الخياط الأول في مجلسك",
    "journey.c3.desc": "يصلك خياط أول ذو خبرة إلى قصرك أو مكتبك مع أكثر من ٤٠ طاقة قماش لقياس ١٥ نقطة بدقة تامة.",
    "journey.c3.p1": "زيارة مجانية ١٠٠٪",
    "journey.c3.p2": "معاينة ولمس الأقمشة",
    "journey.c4.badge": "٠٤ · القص الحرفي",
    "journey.c4.title": "قص يدوي متقن في أتيليه الرياض",
    "journey.c4.desc": "قص يدوي مفصل وفق أدق معايير الخياطة الراقية لضمان الهيبة والانسيابية الملكية.",
    "journey.c4.p1": "باترون خاص لكل عميل",
    "journey.c4.p2": "خياطة دقيقة بغرز ذهبية",
    "journey.c5.badge": "٠٥ · التجهيز والختم",
    "journey.c5.title": "كوي بالبخار وتغليف في الصندوق الملكي",
    "journey.c5.desc": "كوي احترافي وفحص أدق التفاصيل وتغليف في صندوق نماء القمة الأسود والذهبي مع شهادة الأصالة.",
    "journey.c5.p1": "جاهزة خلال ٧-١٠ أيام",
    "journey.c5.p2": "شهادة أصالة معتمدة",
    "journey.c6.badge": "٠٦ · التوصيل الملكي",
    "journey.c6.title": "توصيل مجاني لباب بيتك بكافة مدن المملكة",
    "journey.c6.desc": "تصلك الجبة لباب فيلتك عبر أسطول سياراتنا الفاخرة. عاين والبس أولاً، وادفع عند تمام الرضا.",
    "journey.c6.p1": "توصيل مجاني ٠ ر.س",
    "journey.c6.p2": "دفع كاش أو شبكة عند الباب",
    "journey.ctaBadge": "خدمة كبار الشخصيات المجانية",
    "journey.ctaTitle": "جبتك الملكية… تصلك لباب بيتك",
    "journey.ctaDesc": "احجز الآن زيارة الخياط الأول لمجلسك مع ٤٠+ طاقة قماش، أو تواصل فوراً عبر واتساب الأتيليه.",
    "journey.bookBtn": "احجز زيارة الخياط مجاناً",
    "journey.waBtn": "واتساب كونسيرج الدار",
    "journey.promoHint": "كود الخصم الحصري:",
    "journey.copied": "تم النسخ!",
    "journey.step1": "الطلب",
    "journey.step2": "التأكيد",
    "journey.step3": "القياس",
    "journey.step4": "التفصيل",
    "journey.step5": "التجهيز",
    "journey.step6": "التوصيل",
    city: {
      Riyadh: "الرياض",
      Jeddah: "جدة",
      Dammam: "الدمام",
      Khobar: "الخبر",
      Makkah: "مكة",
      Madinah: "المدينة",
      Taif: "الطائف",
      Abha: "أبها",
      Tabuk: "تبوك",
      Qassim: "القصيم",
      Jubail: "الجبيل",
      Yanbu: "ينبع",
    },
  },
};

const els = {
  world: document.getElementById("world"),
  langToggle: document.getElementById("langToggle"),
  langLabel: document.getElementById("langLabel"),
  themeToggle: document.getElementById("themeToggle"),
  burger: document.getElementById("burger"),
  drawer: document.getElementById("drawer"),
  form: document.getElementById("bookForm"),
  toast: document.getElementById("toast"),
  dateInput: document.getElementById("date"),
  city: document.getElementById("city"),
  atelierGrid: document.getElementById("atelierGrid"),
  atelierFilterBar: document.getElementById("atelierFilterBar"),
  qtyVal: document.getElementById("qtyVal"),
  qtyMinus: document.getElementById("qtyMinus"),
  qtyPlus: document.getElementById("qtyPlus"),
  brandTabs: document.getElementById("brandTabs"),
  quickTags: document.getElementById("quickTags"),
  quickForm: document.getElementById("quickForm"),
  qkCity: document.getElementById("qkCity"),
  qkQtyVal: document.getElementById("qkQtyVal"),
  qkQtyMinus: document.getElementById("qkQtyMinus"),
  qkQtyPlus: document.getElementById("qkQtyPlus"),
  geoBtn: document.getElementById("geoBtn"),
  geoStatus: document.getElementById("geoStatus"),
  orderChip: document.getElementById("orderChip"),
  navBookVisit: document.getElementById("navBookVisit"),
  drawerBookVisit: document.getElementById("drawerBookVisit"),
  apptModal: document.getElementById("apptModal"),
  apptBackdrop: document.getElementById("apptBackdrop"),
  apptCloseBtn: document.getElementById("apptCloseBtn"),
  apptForm: document.getElementById("apptForm"),
  apptSuccess: document.getElementById("apptSuccess"),
  apptDate: document.getElementById("apptDate"),
  apptCity: document.getElementById("apptCity"),
  apptAddress: document.getElementById("apptAddress"),
  apptAutoAddrBtn: document.getElementById("apptAutoAddrBtn"),
  apptDistrictChips: document.getElementById("apptDistrictChips"),
  apptQtyVal: document.getElementById("apptQtyVal"),
  apptQtyMinus: document.getElementById("apptQtyMinus"),
  apptQtyPlus: document.getElementById("apptQtyPlus"),
  apptSuccessWa: document.getElementById("apptSuccessWa"),
  apptSuccessDone: document.getElementById("apptSuccessDone"),
};

let lang = localStorage.getItem("qasr-lang") || "en";
let theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
let state = loadState();
let apptQty = 1;
let apptDistanceZone = "0-15";
const DISTANCE_FEES = { "0-15": 0, "15-35": 25, "35-70": 50 };
let updateJourneyStoryUI = () => {};

const CITY_DISTRICTS = {
  Riyadh: {
    districts: ["Al-Hada", "Al-Malqa", "Al-Olaya", "Al-Nakheel"],
    districtsAr: ["حي الهدا", "حي الملقا", "حي العليا", "حي النخيل"],
    samples: [
      "Al-Hada District, Royal Palm Villa 14",
      "Al-Malqa District, King Fahd Rd, Villa 22",
      "Al-Olaya District, Prince Sultan St, Villa 8",
      "Al-Nakheel District, Royal Court Way, Villa 17"
    ],
    samplesAr: [
      "حي الهدا، فيلا الواحة الملكية ١٤",
      "حي الملقا، طريق الملك فهد، فيلا ٢٢",
      "حي العليا، شارع الأمير سلطان، فيلا ٨",
      "حي النخيل، طريق الديوان الملكي، فيلا ١٧"
    ]
  },
  Jeddah: {
    districts: ["Al-Shati", "Al-Rawdah", "Al-Hamra", "Al-Andalus"],
    districtsAr: ["حي الشاطئ", "حي الروضة", "حي الحمراء", "حي الأندلس"],
    samples: [
      "Al-Shati District, Corniche Promenade Villa 7",
      "Al-Rawdah District, Prince Saud Al-Faisal, Villa 19",
      "Al-Hamra District, Palestine St, Villa 11",
      "Al-Andalus District, Tahlia St, Villa 5"
    ],
    samplesAr: [
      "حي الشاطئ، كورنيش الواجهة، فيلا ٧",
      "حي الروضة، شارع الأمير سعود الفيصل، فيلا ١٩",
      "حي الحمراء، شارع فلسطين، فيلا ١١",
      "حي الأندلس، طريق التحلية، فيلا ٥"
    ]
  },
  Dammam: {
    districts: ["Al-Faisaliyah", "Al-Mazruiyah", "Al-Shati"],
    districtsAr: ["حي الفيصلية", "حي المزروعية", "حي الشاطئ"],
    samples: [
      "Al-Faisaliyah District, Palm Avenue Villa 12",
      "Al-Mazruiyah District, Corniche Rd, Villa 6",
      "Al-Shati District, Marina Gulf Villa 15"
    ],
    samplesAr: [
      "حي الفيصلية، شارع النخيل، فيلا ١٢",
      "حي المزروعية، طريق الكورنيش، فيلا ٦",
      "حي الشاطئ، الخليج البحري، فيلا ١٥"
    ]
  },
  Khobar: {
    districts: ["Al-Hizam", "Al-Rakah", "Al-Yarmouk"],
    districtsAr: ["حي الحزام الذهبي", "حي الراكة", "حي اليرموك"],
    samples: [
      "Al-Hizam Al-Thahabi, Prince Sultan St, Villa 24",
      "Al-Rakah District, King Faisal Rd, Villa 10"
    ],
    samplesAr: [
      "حي الحزام الذهبي، شارع الأمير سلطان، فيلا ٢٤",
      "حي الراكة، طريق الملك فيصل، فيلا ١٠"
    ]
  },
  Makkah: {
    districts: ["Al-Awali", "Al-Shawqiyyah", "Al-Naseem"],
    districtsAr: ["حي العوالي", "حي الشوقية", "حي النسيم"],
    samples: [
      "Al-Awali District, Ibrahim Al-Khalil St, Villa 5",
      "Al-Shawqiyyah District, Abdullah Khayyat St, Villa 12"
    ],
    samplesAr: [
      "حي العوالي، شارع إبراهيم الخليل، فيلا ٥",
      "حي الشوقية، شارع عبدالله خياط، فيلا ١٢"
    ]
  },
  Madinah: {
    districts: ["Al-Qiblatayn", "Al-Haram", "Al-Azhari"],
    districtsAr: ["حي القبلتين", "حي الحرم", "حي الأزهري"],
    samples: [
      "Al-Qiblatayn District, Sultanah Rd, Villa 9",
      "Al-Azhari District, King Abdullah Rd, Villa 14"
    ],
    samplesAr: [
      "حي القبلتين، طريق سلطانة، فيلا ٩",
      "حي الأزهري، طريق الملك عبدالله، فيلا ١٤"
    ]
  }
};


function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
    const LEGACY_MAP = { ivory: "jp-ivory", sand: "kr-sand", night: "kr-opal", olive: "th-olive" };
    let c = saved.cloth || "jp-ivory";
    if (LEGACY_MAP[c]) c = LEGACY_MAP[c];
    const foundCloth = CLOTHS.find((x) => x.id === c) || CLOTHS[0];
    const b = saved.brand || foundCloth.brand || "jp";
    return {
      brand: b,
      cloth: foundCloth.id,
      city: saved.city || "Riyadh",
      qty: Math.min(12, Math.max(1, Number(saved.qty) || 1)),
    };
  } catch {
    return { brand: "jp", cloth: "jp-ivory", city: "Riyadh", qty: 1 };
  }
}

function persistState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function t(key) {
  return i18n[lang][key] || i18n.en[key] || key;
}

function clothName(id) {
  const found = CLOTHS.find((c) => c.id === id);
  if (found) {
    return lang === "ar" ? found.nameAr : found.nameEn;
  }
  return t(`at.${id}.t`);
}

function cityName(id) {
  return i18n[lang].city[id] || id;
}

function money(n) {
  const locale = lang === "ar" ? "ar-SA" : "en-SA";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(n);
}

function getDiscountedPrice(cloth) {
  if (!cloth) return 0;
  if (cloth.discount) {
    return Math.round(cloth.price * (1 - cloth.discount / 100));
  }
  return cloth.price;
}

// Bundle tiers: discount applied on the fabric-discounted subtotal (sequential, not additive)
const BUNDLE_TIERS = [
  { min: 5, pct: 20 },
  { min: 3, pct: 15 },
  { min: 2, pct: 10 },
];

function bundlePctFor(qty) {
  const tier = BUNDLE_TIERS.find((b) => qty >= b.min);
  return tier ? tier.pct : 0;
}

function bundleHint(qty) {
  if (qty < 2) return t("bundle.hintStart");
  const next = [...BUNDLE_TIERS].reverse().find((b) => b.min > qty);
  if (!next) return t("bundle.hintMax");
  return t("bundle.hintNext").replace("{n}", String(next.min - qty)).replace("{p}", String(next.pct));
}

function quoteOf(s = state) {
  const cloth = CLOTHS.find((c) => c.id === s.cloth) || CLOTHS[0];
  const city = CITIES.find((c) => c.id === s.city) || CITIES[0];
  const unitPrice = getDiscountedPrice(cloth);
  const originalTotal = cloth.price * s.qty;
  const clothTotal = unitPrice * s.qty;
  const savings = originalTotal - clothTotal;
  const bundlePct = bundlePctFor(s.qty);
  const bundleSavings = Math.round((clothTotal * bundlePct) / 100);
  const visit = 0; // 100% Free Doorstep Visit
  const delivery = 0; // 100% Free Doorstep Delivery Across KSA
  return {
    cloth,
    city,
    unitPrice,
    originalTotal,
    clothTotal,
    savings,
    bundlePct,
    bundleSavings,
    visit: 0,
    delivery: 0,
    total: clothTotal - bundleSavings,
    days: `${cloth.days[0]}–${cloth.days[1]}`,
  };
}

function waLink(text) {
  const msg = encodeURIComponent(
    text || "As-salamu alaykum, I would like to book a home measurement for a Jubba."
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

function showToast(key) {
  els.toast.textContent = t(key);
  els.toast.classList.add("is-on");
  window.setTimeout(() => els.toast.classList.remove("is-on"), 2800);
}

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  els.themeToggle.setAttribute("aria-pressed", String(theme === "light"));
  localStorage.setItem("qasr-theme", theme);
}

i18n.en["visit.banner"] = "Private tailoring. At your doorstep.";
i18n.ar["visit.banner"] = "خياطة خاصة. على باب منزلك.";
i18n.en["visit.offer"] = "Selected fabrics · Up to 20% off";
i18n.ar["visit.offer"] = "أقمشة مختارة · خصم حتى ٢٠٪";
i18n.en["visit.title"] = "Your fabric. Your fitting.";
i18n.ar["visit.title"] = "قماشك. على مقاسك.";
i18n.en["visit.gallery"] = "Fabric gallery";
i18n.ar["visit.gallery"] = "مجموعة الأقمشة";
i18n.en["visit.ownership"] = "Fabric ownership";
i18n.ar["visit.ownership"] = "اختيار القماش";
i18n.en["visit.atelier"] = "Atelier fabric";
i18n.ar["visit.atelier"] = "قماش الأتيليه";
i18n.en["visit.own"] = "I have my own fabric";
i18n.ar["visit.own"] = "لديّ قماشي الخاص";
i18n.en["visit.reason"] = "Visit reason";
i18n.ar["visit.reason"] = "سبب الزيارة";
i18n.en["visit.alterations"] = "Alterations";
i18n.ar["visit.alterations"] = "تعديلات";
i18n.en["visit.other"] = "Other request";
i18n.ar["visit.other"] = "طلب آخر";
i18n.en["visit.request"] = "Tell us what you need";
i18n.ar["visit.request"] = "أخبرنا بما تحتاجه";
i18n.en["visit.district"] = "District";
i18n.ar["visit.district"] = "الحي";
i18n.en["visit.selected"] = "Selected fabric";
i18n.ar["visit.selected"] = "القماش المختار";
i18n.en["visit.quote"] = "Service price confirmed after assessment.";
i18n.ar["visit.quote"] = "يُحدد سعر الخدمة بعد المعاينة.";
i18n.en["visit.appointment"] = "Your appointment";
i18n.ar["visit.appointment"] = "موعدك";
i18n.en["visit.time"] = "Time";
i18n.ar["visit.time"] = "الوقت";
i18n.en["visit.street"] = "Street / Building";
i18n.ar["visit.street"] = "الشارع / المبنى";
i18n.en["visit.newGarment"] = "New garment";
i18n.ar["visit.newGarment"] = "تفصيل جديد";
i18n.en["visit.locationTitle"] = "Visit address";
i18n.ar["visit.locationTitle"] = "عنوان الزيارة";
i18n.en["visit.locate"] = "Use my location";
i18n.ar["visit.locate"] = "استخدم موقعي";
i18n.en["visit.locationHint"] = "Use your location or enter the address below.";
i18n.ar["visit.locationHint"] = "استخدم موقعك أو أدخل العنوان أدناه.";
i18n.en["visit.travel"] = "Visit / delivery charge";
i18n.ar["visit.travel"] = "رسوم الزيارة / التوصيل";
i18n.en["visit.title"] = "Choose your tailoring";
i18n.ar["visit.title"] = "اختر خدمة الخياطة";
i18n.en["visit.appointment"] = "Plan your visit";
i18n.ar["visit.appointment"] = "حدد موعد الزيارة";
i18n.en["visit.reason"] = "What do you need?";
i18n.ar["visit.reason"] = "ما الخدمة المطلوبة؟";
i18n.en["visit.ownership"] = "Your fabric";
i18n.ar["visit.ownership"] = "القماش";
i18n.en["visit.own"] = "My own fabric";
i18n.ar["visit.own"] = "قماشي الخاص";
i18n.en["visit.selected"] = "Your selection";
i18n.ar["visit.selected"] = "اختيارك";
i18n.en['appt.success.badge'] = 'REQUEST SAVED';
i18n.en['appt.success.title'] = 'Your booking PDF is ready';
i18n.en['appt.success.desc'] = 'Attach your PDF in WhatsApp and press Send. The atelier will confirm your visit and any pending charge.';
i18n.en['appt.success.wa'] = 'Send request on WhatsApp';
i18n.ar['appt.success.badge'] = 'تم حفظ الطلب';
i18n.ar['appt.success.title'] = 'طلب موعدك جاهز';
i18n.ar['appt.success.desc'] = 'أرسل التفاصيل عبر واتساب. سيؤكد فريقنا الزيارة وأي رسوم متبقية.';
i18n.ar['appt.success.wa'] = 'إرسال الطلب عبر واتساب';
i18n.en["visit.detect"] = "Find my address";
i18n.ar["visit.detect"] = "تحديد عنواني";
i18n.en["visit.detectHint"] = "Locate me and calculate travel distance";
i18n.ar["visit.detectHint"] = "تحديد موقعي وحساب مسافة الزيارة";
i18n.en["visit.manual"] = "Enter manually";
i18n.ar["visit.manual"] = "إدخال يدوي";
i18n.en["visit.notes"] = "Additional notes";
i18n.ar["visit.notes"] = "ملاحظات إضافية";
i18n.en["visit.optional"] = "Optional";
i18n.ar["visit.optional"] = "اختياري";
i18n.en["visit.locationHint"] = "Uses your location with Photon & OSRM. Review the result.";
i18n.ar["visit.locationHint"] = "يستخدم موقعك مع Photon وOSRM. راجع العنوان الناتج.";
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  els.langLabel.textContent = lang === "ar" ? "EN" : "AR";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = i18n[lang][key];
    if (value) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    const value = i18n[lang][key];
    if (value) el.setAttribute("aria-label", value);
  });
  fillCities();
  renderCloths();
  renderQuote();
  renderApptPromoFabrics();
  paintRoyalAd();
  updateApptSummary();
  renderApptDistrictChips();
  if (typeof updateJourneyStoryUI === "function") updateJourneyStoryUI();
}

function fillCities() {
  const html = CITIES.map(c => `<option value="${c.id}">${cityName(c.id)}</option>`).join('');
  els.city.innerHTML = html; els.qkCity.innerHTML = html;
  els.city.value = state.city; els.qkCity.value = state.city;
  if (els.apptCity) {
    const previous = els.apptCity.value;
    els.apptCity.innerHTML = `<option value="">${lang === 'ar' ? 'اختر المدينة' : 'Select city'}</option>` + html;
    if (previous && ![...els.apptCity.options].some(o=>o.value===previous)) els.apptCity.add(new Option(previous,previous));
    els.apptCity.value = previous || '';
  }
}

function renderCloths() {
  if (els.brandTabs) {
    els.brandTabs.innerHTML = FABRIC_BRANDS.map((b) => {
      const on = b.id === state.brand ? " is-on" : "";
      const name = lang === "ar" ? b.nameAr : b.nameEn;
      return `<button type="button" class="brand-tab${on}" data-brand="${b.id}" aria-pressed="${b.id === state.brand}">
        <span class="brand-tab__name">${name}</span>
      </button>`;
    }).join("");
  }

  if (els.quickTags) {
    els.quickTags.innerHTML = CLOTHS.map((c) => {
      const on = c.id === state.cloth ? " is-on" : "";
      const isBrand = c.brand === state.brand ? " is-brand" : "";
      const name = clothName(c.id);
      const weave = lang === "ar" ? c.weaveAr : c.weaveEn;
      return `<button type="button" class="swatch-tag${on}${isBrand}" data-cloth="${c.id}" data-brand="${c.brand}" aria-pressed="${c.id === state.cloth}">
        <span class="swatch-tag__plate ${c.colorClass}">
          <img class="swatch-tag__img" src="${c.img}" alt="${name}" loading="lazy" />
        </span>
        <span class="swatch-tag__meta">
          <strong title="${name}">${name}</strong>
          <small>${weave} • ${c.weight}</small>
          <em>${money(c.price)}</em>
        </span>
        <span class="swatch-tag__check" aria-hidden="true">✓</span>
      </button>`;
    }).join("");
  }

  if (els.atelierGrid) {
    const filteredCloths = atelierFilter === "all"
      ? CLOTHS
      : CLOTHS.filter((c) => c.brand === atelierFilter);

    const cardsHtml = filteredCloths.map((c) => {
      const on = c.id === state.cloth;
      const unitPrice = getDiscountedPrice(c);
      const hasDiscount = Boolean(c.discount);

      return `
        <article class="atelier-card${on ? " is-selected" : ""}" data-cloth="${c.id}" data-brand="${c.brand}">
          <!-- Product Image Media -->
          <div class="atelier-card__media ${c.colorClass}">
            <img class="atelier-card__img" src="${c.img}" alt="${clothName(c.id)}" loading="lazy" />
            <div class="atelier-card__sheen" aria-hidden="true"></div>
            ${hasDiscount ? `
              <span class="atelier-card__discount-pill">
                ${c.discount}% OFF
              </span>
            ` : ""}
            ${on ? `
              <span class="atelier-card__selected-pill" title="${t("at.selected")}">
                <i class="fa-solid fa-check" aria-hidden="true"></i>
              </span>
            ` : ""}
          </div>

          <!-- Product Minimal Footer (Name, Price & Single + Button) -->
          <div class="atelier-card__footer">
            <div class="atelier-card__info">
              <h3 class="atelier-card__title">${clothName(c.id)}</h3>
              <div class="atelier-card__price">
                <strong class="atelier-card__price-curr">${money(unitPrice)}</strong>
                ${hasDiscount ? `<del class="atelier-card__price-old">${money(c.price)}</del>` : ""}
              </div>
            </div>
            <button type="button" class="atelier-card__add-btn${on ? " is-active" : ""}" data-action="select" data-cloth="${c.id}" aria-label="Select ${clothName(c.id)}" title="${on ? (lang === "ar" ? "تم الاختيار" : "Selected") : (lang === "ar" ? "اختيار القماش" : "Select Cloth")}">
              <span class="plus-icon">${on ? "✓" : "+"}</span>
            </button>
          </div>
        </article>
      `;
    }).join("");

    els.atelierGrid.innerHTML = cardsHtml;
  }
}

let atelierFilter = "all";

function setBrand(id) {
  state.brand = id;
  const brandCloths = CLOTHS.filter((c) => c.brand === id);
  if (!brandCloths.some((c) => c.id === state.cloth) && brandCloths.length > 0) {
    state.cloth = brandCloths[0].id;
  }
  persistState();
  renderCloths();
  renderQuote();
}

function setCloth(id) {
  const found = CLOTHS.find((c) => c.id === id);
  if (found) {
    state.cloth = id;
    if (found.brand) state.brand = found.brand;
  }
  persistState();
  renderCloths();
  renderQuote();
}

function setCity(id) {
  state.city = id;
  persistState();
  els.city.value = id;
  els.qkCity.value = id;
  renderQuote();
}

function setQty(n) {
  state.qty = Math.min(12, Math.max(1, Math.trunc(Number(n)) || 1)); // same 1–12 range as the Book Visit modal
  persistState();
  els.qtyVal.textContent = String(state.qty);
  renderQuote();
}

function renderQuote() {
  const q = quoteOf();
  const set = (id, val) => {
    const n = document.getElementById(id);
    if (n) n.textContent = val;
  };
  set("barCloth", clothName(q.cloth.id));
  set("barCity", cityName(q.city.id));
  set("barQty", `×${state.qty}`);
  set("barTotal", money(q.total));
  set("formTotal", money(q.total));
  els.qtyVal.textContent = String(state.qty);
  if (els.orderChip) {
    els.orderChip.innerHTML = `<span>${clothName(q.cloth.id)}</span><span>${cityName(q.city.id)}</span><span>×${state.qty}</span><strong>${money(q.total)}</strong>`;
  }
  renderQuick(q);
  renderBookingSummary();
  paintPair();
}

function renderQuick(q = quoteOf()) {
  const free = t("cfg.free");
  const set = (id, val) => {
    const n = document.getElementById(id);
    if (n) n.textContent = val;
  };
  set("qkClothLine", `${clothName(q.cloth.id)} × ${state.qty}`);
  set("qkClothVal", money(q.clothTotal));
  set("qkVisitVal", q.visit ? money(q.visit) : free);
  set("qkPickupVal", free);
  set("qkDelVal", q.delivery ? money(q.delivery) : free);
  set("qkTotalVal", money(q.total));
  set("qkBannerTotal", money(q.total));
  if (els.qkQtyVal) els.qkQtyVal.textContent = String(state.qty);
  const line = document.getElementById("qkBundleLine");
  if (line) {
    line.hidden = !q.bundlePct;
    set("qkBundleLabel", t("bundle.line").replace("{p}", String(q.bundlePct)));
    set("qkBundleVal", `−${money(q.bundleSavings)}`);
  }
  set("qkBundleHint", bundleHint(state.qty));
  set("mbarTotal", money(q.total));
  set("mbarMeta", `${clothName(q.cloth.id)} × ${state.qty}${q.bundlePct ? ` · −${q.bundlePct}%` : ""}`);
}

function renderBookingSummary() {
  const q = quoteOf();
  const free = t("cfg.free");
  const set = (id, val) => {
    const n = document.getElementById(id);
    if (n) n.textContent = val;
  };
  set("sCloth", clothName(q.cloth.id));
  set("sCity", cityName(q.city.id));
  set("sQty", `× ${state.qty}`);
  set("sVisit", q.visit ? money(q.visit) : free);
  set("sDel", q.delivery ? money(q.delivery) : free);
  const slot = document.getElementById("slot");
  const when = [els.dateInput.value, slot ? slot.value : ""].filter(Boolean).join(" · ");
  set("sWhen", when || "—");
}

function loadBookings() {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveBookings(list) {
  // Browsers may disable storage. This must not prevent the PDF/WhatsApp handoff.
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
}

function refCode(id) {
  return `QSR-${String(id).slice(-6).toUpperCase()}`;
}


function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validPhone(v) {
  const n = String(v).replace(/\s+/g, "");
  return /^(05\d{8}|\+9665\d{8}|9665\d{8})$/.test(n);
}

function orderMessage(b) {
  const q = `${clothName(b.cloth)} × ${b.qty}${b.bundlePct ? ` · ${t("bundle.msg")} −${b.bundlePct}%` : ""}`;
  if (lang === "ar") {
    return `السلام عليكم، طلب جبة من نماء القمة.\nالمرجع: ${refCode(b.id)}\nالاسم: ${b.name}\nالجوال: ${b.phone}\nالقماش: ${q}\nالمدينة: ${cityName(b.city)}\nالعنوان: ${b.address}\nالتاريخ: ${b.date} ${b.slot}\nالدفع: ${b.pay}\nالإجمالي عند الاستلام: ${escapeHtml(b.priceSummary || (b.total === null ? (lang === "ar" ? "يحدد بعد المعاينة" : "Price after assessment") : money(b.total)))}\nملاحظات: ${b.note || "-"}`;
  }
  return `As-salamu alaykum, Namaa Al Qimmah Jubba order.\nRef: ${refCode(b.id)}\nName: ${b.name}\nMobile: ${b.phone}\nCloth: ${q}\nCity: ${cityName(b.city)}\nAddress: ${b.address}\nVisit: ${b.date} ${b.slot}\nPayment: ${b.pay}\nDue on delivery: ${escapeHtml(b.priceSummary || (b.total === null ? (lang === "ar" ? "يحدد بعد المعاينة" : "Price after assessment") : money(b.total)))}\nNotes: ${b.note || "-"}`;
}

function bindTilt(nodes) {
  nodes.forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 9}deg) translateZ(16px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}

function nearestCity(lat, lng) {
  let best = CITIES[0].id;
  let dist = Infinity;
  Object.entries(CITY_COORDS).forEach(([id, [clat, clng]]) => {
    const d = (lat - clat) ** 2 + (lng - clng) ** 2;
    if (d < dist) {
      dist = d;
      best = id;
    }
  });
  return best;
}

function reveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-in");
      });
    },
    { threshold: 0.16 }
  );
  document.querySelectorAll(".reveal, .svc, .step").forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

document.getElementById("navWa").href = waLink();
document.getElementById("waFab").href = waLink();

const today = new Date();
els.dateInput.min = today.toISOString().slice(0, 10);
els.dateInput.value = today.toISOString().slice(0, 10);

els.langToggle.addEventListener("click", () => {
  lang = lang === "en" ? "ar" : "en";
  localStorage.setItem("qasr-lang", lang);
  applyLang();
});

els.themeToggle.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  applyTheme();
});

els.burger.addEventListener("click", () => els.drawer.classList.toggle("is-on"));
els.drawer.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => els.drawer.classList.remove("is-on"))
);

els.atelierGrid.addEventListener("click", (e) => {
  const bookBtn = e.target.closest('[data-action="book"]');
  const selectBtn = e.target.closest('[data-action="select"]');
  const card = e.target.closest(".atelier-card");

  if (bookBtn) {
    e.stopPropagation();
    const clothId = bookBtn.dataset.cloth;
    if (clothId) setCloth(clothId);
    openApptModal();
    return;
  }

  if (selectBtn) {
    e.stopPropagation();
    const clothId = selectBtn.dataset.cloth;
    if (clothId) setCloth(clothId);
    return;
  }

  if (card && card.dataset.cloth) {
    setCloth(card.dataset.cloth);
  }
});

if (els.atelierFilterBar) {
  els.atelierFilterBar.addEventListener("click", (e) => {
    const tab = e.target.closest(".atelier-tab");
    if (!tab) return;
    atelierFilter = tab.dataset.filter || "all";
    els.atelierFilterBar.querySelectorAll(".atelier-tab").forEach((t) => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderCloths();
  });
}

els.city.addEventListener("change", () => setCity(els.city.value));
els.qtyMinus.addEventListener("click", () => setQty(state.qty - 1));
els.qtyPlus.addEventListener("click", () => setQty(state.qty + 1));

if (els.brandTabs) {
  els.brandTabs.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-brand]");
    if (btn) {
      setBrand(btn.dataset.brand);
      const bCloth = CLOTHS.find((c) => c.brand === btn.dataset.brand);
      if (bCloth && quoteOf().cloth.brand !== btn.dataset.brand) {
        setCloth(bCloth.id);
      }
    }
  });
}

els.quickTags.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-cloth]");
  if (btn) {
    const c = CLOTHS.find((item) => item.id === btn.dataset.cloth);
    if (c && c.brand !== state.brand) {
      state.brand = c.brand;
      renderCloths();
    }
    setCloth(btn.dataset.cloth);
  }
});
els.qkCity.addEventListener("change", () => setCity(els.qkCity.value));
els.qkQtyMinus.addEventListener("click", () => setQty(state.qty - 1));
els.qkQtyPlus.addEventListener("click", () => setQty(state.qty + 1));

els.geoBtn.addEventListener("click", () => {
  els.geoStatus.textContent = t("geo.wait");
  if (!navigator.geolocation) {
    els.geoStatus.textContent = t("geo.fail");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      document.getElementById("lat").value = String(latitude);
      document.getElementById("lng").value = String(longitude);
      setCity(nearestCity(latitude, longitude));
      els.geoStatus.textContent = t("geo.ok");
    },
    () => {
      els.geoStatus.textContent = t("geo.fail");
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
});

let wizardStep = 1;

function wizardPanel(n) {
  return els.form.querySelector(`.wizard__panel[data-step="${n}"]`);
}

function setFieldState(input, message) {
  const field = input.closest(".field");
  if (!field) return;
  const err = field.querySelector(".field__err");
  if (message) {
    field.classList.add("is-error");
    field.classList.remove("is-ok");
    if (err) err.textContent = message;
  } else {
    field.classList.remove("is-error");
    field.classList.toggle("is-ok", Boolean(input.value.trim()));
  }
}

function validateField(input) {
  const value = String(input.value || "").trim();
  if (input.required && !value) {
    setFieldState(input, t("f.err.req"));
    return false;
  }
  if ((input.id === "phone" || input.id === "qkPhone") && value && !validPhone(value)) {
    setFieldState(input, t("f.err.phone"));
    return false;
  }
  if (input.id === "date" && value && els.dateInput.min && value < els.dateInput.min) {
    setFieldState(input, t("f.err.req"));
    return false;
  }
  setFieldState(input, "");
  return true;
}

function validateStep(n) {
  const panel = wizardPanel(n);
  if (!panel) return true;
  let ok = true;
  panel.querySelectorAll("input[required], select[required], textarea[required]").forEach((el) => {
    if (!validateField(el)) ok = false;
  });
  if (!ok) {
    const first = panel.querySelector(
      ".field.is-error input, .field.is-error select, .field.is-error textarea"
    );
    if (first) first.focus();
  }
  return ok;
}

function validateQuick() {
  let ok = true;
  els.quickForm
    .querySelectorAll("input[required], select[required], textarea[required]")
    .forEach((el) => {
      if (!validateField(el)) ok = false;
    });
  if (!ok) {
    const first = els.quickForm.querySelector(
      ".field.is-error input, .field.is-error select, .field.is-error textarea"
    );
    if (first) first.focus();
  }
  return ok;
}

function showWizardStep(n) {
  wizardStep = Math.min(3, Math.max(1, n));
  els.form.querySelectorAll(".wizard__panel").forEach((panel) => {
    const on = Number(panel.dataset.step) === wizardStep;
    panel.hidden = !on;
    panel.classList.toggle("is-on", on);
  });
  document.querySelectorAll("#wizardSteps li").forEach((li, i) => {
    li.classList.toggle("is-on", i + 1 <= wizardStep);
  });
  const bar = document.getElementById("wizardBar");
  if (bar) bar.style.width = `${(wizardStep / 3) * 100}%`;
  const num = document.getElementById("stepNum");
  if (num) num.textContent = String(wizardStep);
}

function resetWizard() {
  els.form.reset();
  const today = new Date();
  els.dateInput.min = today.toISOString().slice(0, 10);
  els.dateInput.value = els.dateInput.min;
  fillCities();
  els.form.querySelectorAll(".field").forEach((f) => f.classList.remove("is-error", "is-ok"));
  showWizardStep(1);
  renderBookingSummary();
}

els.form.querySelectorAll("[data-next]").forEach((btn) =>
  btn.addEventListener("click", () => {
    if (validateStep(wizardStep)) showWizardStep(wizardStep + 1);
  })
);

els.form.querySelectorAll("[data-back]").forEach((btn) =>
  btn.addEventListener("click", () => showWizardStep(wizardStep - 1))
);

els.form.addEventListener("input", (e) => {
  const el = e.target;
  if (!el || !el.closest) return;
  if (el.closest(".field")) validateField(el);
  if (el.id === "date" || el.id === "slot") renderBookingSummary();
});

els.form.addEventListener("change", (e) => {
  const el = e.target;
  if (!el) return;
  if (el.id === "date" || el.id === "slot") {
    validateField(el);
    renderBookingSummary();
  }
});

showWizardStep(1);

els.quickForm.addEventListener("input", (e) => {
  const el = e.target;
  if (!el || !el.closest) return;
  if (el.closest(".field")) validateField(el);
});
els.quickForm.addEventListener("change", (e) => {
  const el = e.target;
  if (el && el.closest && el.closest(".field")) validateField(el);
});

els.quickForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateQuick()) {
    showToast("toast.need");
    return;
  }
  const data = Object.fromEntries(new FormData(els.quickForm).entries());
  if (!validPhone(data.phone)) {
    showToast("toast.phone");
    return;
  }
  const q = quoteOf();
  const booking = {
    ...data,
    cloth: state.cloth,
    qty: state.qty,
    city: state.city,
    total: q.total,
    visit: q.visit,
    delivery: q.delivery,
    clothTotal: q.clothTotal,
    bundlePct: q.bundlePct,
    pay: "COD",
    date: new Date().toISOString().slice(0, 10),
    slot: t("qk.flex"),
    status: "pending",
    id: Date.now(),
  };
  const list = loadBookings();
  list.unshift(booking);
  saveBookings(list.slice(0, 24));
  showToast("toast.ok");
  window.open(waLink(orderMessage(booking)), "_blank", "noopener");
  els.quickForm.reset();
  fillCities();
  els.quickForm
    .querySelectorAll(".field")
    .forEach((f) => f.classList.remove("is-error", "is-ok"));
});

els.form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateStep(1)) {
    showWizardStep(1);
    showToast("toast.need");
    return;
  }
  if (!validateStep(2)) {
    showWizardStep(2);
    showToast("toast.need");
    return;
  }
  const data = Object.fromEntries(new FormData(els.form).entries());
  if (!validPhone(data.phone)) {
    showWizardStep(1);
    showToast("toast.phone");
    return;
  }
  const q = quoteOf();
  const booking = {
    ...data,
    cloth: state.cloth,
    qty: state.qty,
    city: state.city,
    total: q.total,
    visit: q.visit,
    delivery: q.delivery,
    clothTotal: q.clothTotal,
    bundlePct: q.bundlePct,
    status: "pending",
    id: Date.now(),
  };
  const list = loadBookings();
  list.unshift(booking);
  saveBookings(list.slice(0, 24));
  showToast("toast.ok");
  window.open(waLink(orderMessage(booking)), "_blank", "noopener");
  resetWizard();
});

function initGalleryCards() {
  const cards = document.querySelectorAll(".condition-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const svc = card.dataset.service || "home";
      const clothId = card.dataset.cloth;
      if (clothId) {
        state.cloth = clothId;
        persistState();
        renderSwatches();
      }
      openApptModal();
      const radio = document.querySelector(`.appt-card input[value="${svc}"]`);
      if (radio) {
        radio.checked = true;
        updateApptServiceCards();
      }
      updateApptSummary();
    });
  });
}


function renderApptDistrictChips() {
  const select = document.getElementById('apptDistrict');
  if (!select || !els.apptCity) return;
  const previous = select.value;
  const data = CITY_DISTRICTS[els.apptCity.value];
  const names = data ? (lang === 'ar' ? data.districtsAr : data.districts) : [];
  select.innerHTML = `<option value="">${lang === 'ar' ? 'اختر الحي' : 'Select district'}</option>` + names.map((name, i) => `<option value="${data.districts[i]}">${name}</option>`).join('') + `<option value="other">${lang === 'ar' ? 'حي آخر (أضفه إلى العنوان)' : 'Other (include in address)'}</option>`;
  if ([...select.options].some(o => o.value === previous)) select.value = previous;
}

function autoGenerateAddress() {
  if (!els.apptAddress) return;
  const currentCity = (els.apptCity ? els.apptCity.value : state.city) || "Riyadh";
  const cityData = CITY_DISTRICTS[currentCity] || CITY_DISTRICTS.Riyadh;
  const samples = lang === "ar" ? cityData.samplesAr : cityData.samples;
  const randomSample = samples[Math.floor(Math.random() * samples.length)];

  els.apptAddress.value = randomSample;
  const field = els.apptAddress.closest(".appt-field");
  if (field) field.classList.remove("is-error");

  els.apptAddress.classList.remove("appt-addr-flash");
  void els.apptAddress.offsetWidth;
  els.apptAddress.classList.add("appt-addr-flash");

  showToast("appt.autoDone");
}

function updateApptServiceCards() {
  const cards = document.querySelectorAll(".appt-card, .appt-pill");
  cards.forEach((card) => {
    const radio = card.querySelector('input[type="radio"]');
    if (radio && radio.checked) {
      card.classList.add("is-selected");
    } else {
      card.classList.remove("is-selected");
    }
  });
}

function renderApptPromoFabrics() {
  const container = document.getElementById('apptPromoFabrics');
  if (!container) return;
  const ids = ['jp-ivory', 'kr-opal', 'cn-white'];
  const fabrics = ids.map(id => CLOTHS.find(c => c.id === id)).filter(Boolean);
  const selected = CLOTHS.find(c => c.id === state.cloth);
  if (selected && !ids.includes(selected.id)) fabrics.splice(2, 1, selected);
  container.innerHTML = fabrics.map(c => `<button type="button" class="appt-promo-card" data-cloth-id="${c.id}" aria-pressed="${c.id === state.cloth}"><span class="appt-promo-card__thumb"><img src="${c.img}" alt="${clothName(c.id)}"/><span class="appt-promo-card__badge">${lang === 'ar' ? c.discountTagAr || '' : c.discountTagEn || ''}</span><span class="visit-radio"></span></span><span class="appt-promo-card__meta"><span class="appt-promo-card__name">${clothName(c.id)}</span><span class="appt-promo-card__pricing"><del>${c.discount ? money(c.price) : ''}</del><strong>${money(getDiscountedPrice(c))}</strong></span></span></button>`).join('');
  container.querySelectorAll('button').forEach(card => card.addEventListener('click', () => {
    state.cloth = card.dataset.clothId;
    document.querySelector('input[name="apptOwnership"][value="atelier"]').checked = true;
    persistState(); updateApptSummary(); renderCloths(); renderQuote();
  }));
}

let visitConfig = null;
let visitLocation = { coords: null, distanceKm: null, status: 'idle' };
let visitLocationVersion = 0;
const visitCopy = (en, ar) => lang === 'ar' ? ar : en;

function appointmentQuote() {
  const q = visitQuote({
    ownFabric: document.querySelector('input[name="apptOwnership"]:checked')?.value === 'own',
    service: document.querySelector('input[name="apptService"]:checked')?.value || 'home',
    quantity: apptQty || 1,
    fabricPrice: getDiscountedPrice(CLOTHS.find(c => c.id === state.cloth) || CLOTHS[0]),
    distanceKm: visitLocation.distanceKm,
    config: visitConfig,
  });
  // Bundle discount (2 → 10%, 3 → 15%, 5+ → 20%) applied after fabric discount,
  // matching quoteOf() so the modal never shows a higher price than the page.
  const qty = Math.max(1, Math.min(12, Math.trunc(Number(apptQty)) || 1));
  const bundlePct = q.base !== null ? bundlePctFor(qty) : 0;
  const bundleSavings = bundlePct ? Math.round((q.base * bundlePct) / 100) : 0;
  const base = q.base !== null ? q.base - bundleSavings : null;
  return { ...q, base, preBundle: q.base, bundlePct, bundleSavings, total: base !== null && q.travel !== null ? base + q.travel : null };
}

function locationVisual(state, message) {
  document.getElementById('apptLocationArea').dataset.state = state;
  document.getElementById('apptLocationStatus').textContent = message;
  document.getElementById('apptLocateBtn').disabled = state === 'locating' || state === 'resolving';
  document.getElementById('apptLocateTitle').textContent = state === 'locating' ? visitCopy('Finding your location…', 'جارٍ تحديد موقعك…') : state === 'resolving' ? visitCopy('Finding address & route…', 'جارٍ تحديد العنوان والطريق…') : state === 'ready' || state === 'partial' ? visitCopy('Update my location', 'تحديث موقعي') : visitCopy('Find my address', 'تحديد عنواني');
  document.getElementById('apptLocateHint').textContent = state === 'locating' || state === 'resolving' ? visitCopy('Please keep this window open', 'يرجى إبقاء النافذة مفتوحة') : visitCopy('Locate me and calculate travel distance', 'تحديد موقعي وحساب مسافة الزيارة');
  document.getElementById('apptLocationArea').setAttribute('aria-busy', String(state === 'locating' || state === 'resolving'));
}

function clearVisitLocation() {
  visitLocationVersion++;
  visitLocation = { coords:null, distanceKm:null, status:'idle' };
  locationVisual('idle', visitCopy('Uses your location with Photon & OSRM. Review the result.', 'يستخدم موقعك مع Photon وOSRM. راجع العنوان الناتج.'));
  updateApptSummary();
}

function setDetectedOption(select, value) {
  if (!value) { select.value=''; return; }
  const match=[...select.options].find(o=>o.value.toLowerCase()===value.toLowerCase() || o.textContent.toLowerCase()===value.toLowerCase());
  if (!match) select.add(new Option(value,value));
  select.value=match ? match.value : value;
}

async function detectVisitLocation() {
  const version=++visitLocationVersion;
  visitLocation={coords:null,distanceKm:null,status:'locating'};
  els.apptCity.value=''; els.apptAddress.value=''; renderApptDistrictChips();
  document.getElementById('apptAddressDetails').hidden=true;
  document.getElementById('apptLocationResult').hidden=true;
  locationVisual('locating',visitCopy('Allow location access in your browser.', 'اسمح للمتصفح باستخدام موقعك.'));
  updateApptSummary();
  try {
    if (!navigator.geolocation) throw Error('unsupported');
    const position=await new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject,{enableHighAccuracy:true,timeout:15000,maximumAge:0}));
    if(version!==visitLocationVersion)return;
    const {latitude,longitude,accuracy}=position.coords;
    if(!Number.isFinite(accuracy)||accuracy>500)throw Error('accuracy');
    visitLocation.coords={latitude,longitude,accuracy}; visitLocation.status='resolving';
    locationVisual('resolving',visitCopy('Looking up your address and driving distance from our shop.', 'نبحث عن عنوانك ومسافة الطريق من متجرنا.'));
    const endpoint=visitConfig?.locationEndpoint;
    if(!endpoint?.startsWith('/')||endpoint.startsWith('//'))throw Error('config');
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({latitude,longitude,language:lang}),signal:AbortSignal.timeout(16000)});
    if(!response.ok)throw Error('lookup');
    const result=await response.json(); if(version!==visitLocationVersion)return;
    visitLocation.distanceKm=Number.isFinite(result.distanceKm)&&result.distanceKm>=0?result.distanceKm:null;
    setDetectedOption(els.apptCity,result.city);
    renderApptDistrictChips(); setDetectedOption(document.getElementById('apptDistrict'),result.district);
    els.apptAddress.value=result.address || '';
    const hasAddress=Boolean(result.city && result.address);
    document.getElementById('apptAddressDetails').hidden=hasAddress;
    document.getElementById('apptLocationResult').hidden=!hasAddress;
    document.getElementById('apptResolvedCity').textContent=[result.city,result.district].filter(Boolean).join(' · ');
    document.getElementById('apptResolvedAddress').textContent=result.address || '';
    document.getElementById('apptResolvedDistance').textContent=visitLocation.distanceKm!==null ? `${visitLocation.distanceKm.toFixed(1)} km` : '';
    visitLocation.status=result.address && visitLocation.distanceKm!==null ? 'ready':'partial';
    const distance=visitLocation.distanceKm!==null ? visitCopy(`${visitLocation.distanceKm.toFixed(1)} km from our shop by road. `,`${visitLocation.distanceKm.toFixed(1)} كم بالطريق من متجرنا. `):visitCopy('Distance unavailable; charge will be confirmed. ', 'تعذر حساب المسافة؛ تُؤكد الرسوم لاحقاً. ');
    locationVisual(visitLocation.status,distance+(result.address?visitCopy('Review your address. Add building details in notes.', 'راجع عنوانك. أضف تفاصيل المبنى في الملاحظات.'):visitCopy('Enter the address below to complete your request.', 'أدخل عنوانك أدناه لإكمال الطلب.')));
  }catch(error){
    if(version!==visitLocationVersion)return;
    visitLocation.distanceKm=null;visitLocation.status='failed';
    locationVisual('failed',error.code===1?visitCopy('Location access denied. Try again or enter the address manually.', 'لم يُسمح بتحديد الموقع. حاول مجدداً أو أدخل العنوان يدوياً.'):error.message==='accuracy'?visitCopy('Location is too approximate. Try again outdoors or enter manually.', 'الموقع غير دقيق. حاول مجدداً أو أدخل العنوان يدوياً.'):visitCopy('Could not find your location. Try again or enter manually.', 'تعذر تحديد موقعك. حاول مجدداً أو أدخل العنوان يدوياً.'));
  }finally{if(version===visitLocationVersion)updateApptSummary();}
}

function apptUsesFabric() {
  return document.querySelector('input[name="apptOwnership"]:checked')?.value !== 'own' && document.querySelector('input[name="apptService"]:checked')?.value === 'home';
}

function updateApptSummary() {
  const cloth = CLOTHS.find(c => c.id === state.cloth) || CLOTHS[0];
  const usesFabric = apptUsesFabric();
  const quote = appointmentQuote();
  const own = document.querySelector('input[name="apptOwnership"]:checked')?.value === 'own';
  const name = document.getElementById('apptSummaryFabricName');
  if (!name) return;
  name.textContent = usesFabric ? `${clothName(cloth.id)} × ${apptQty || 1}` : own && quote.base !== null
    ? visitCopy(`Your fabric · Tailoring ${money(OWN_FABRIC_RATE)} / garment`, `قماشك · الخياطة ${money(OWN_FABRIC_RATE)} / قطعة`)
    : visitCopy('Tailoring service request', 'طلب خدمة خياطة');
  const rateNote = document.getElementById('apptRateNote');
  rateNote.hidden = !(own && quote.base !== null);
  rateNote.textContent = visitCopy('SAR 120 per garment', '١٢٠ ر.س لكل قطعة');
  document.getElementById('apptSummaryThumb').src = cloth.img;
  document.getElementById('apptSummaryThumb').hidden = !usesFabric;
  document.getElementById('apptSummaryOriginalPrice').textContent = usesFabric && (cloth.discount || quote.bundlePct) ? money(cloth.price * (apptQty || 1)) : '';
  document.getElementById('apptSummaryFabricPrice').textContent = quote.base === null ? '' : money(quote.base);
  document.getElementById('apptServiceQuote').hidden = quote.base !== null;
  const pending = visitCopy('To be confirmed', 'يُؤكد لاحقاً');
  document.getElementById('apptBaseLabel').textContent = (usesFabric ? visitCopy('Fabric + tailoring', 'القماش + الخياطة') : visitCopy('Tailoring', 'الخياطة')) + (quote.bundlePct ? ` · ${t('bundle.line').replace('{p}', String(quote.bundlePct))}` : '');
  document.getElementById('apptBaseAmount').textContent = quote.base === null ? pending : money(quote.base);
  document.getElementById('apptTravelAmount').textContent = quote.travel === null ? pending : money(quote.travel);
  document.getElementById('apptTotalLabel').textContent = quote.total === null ? visitCopy('Known subtotal', 'المجموع المعلوم') : visitCopy('Total', 'الإجمالي');
  document.getElementById('apptTotalAmount').textContent = quote.base === null ? pending : money(quote.total ?? quote.base);
  document.getElementById('apptPriceNote').textContent = quote.travel === null
    ? visitCopy('First 10 km free. Extra travel charge confirmed before your visit.', 'أول ١٠ كم مجاناً. تُؤكد رسوم المسافة الإضافية قبل الزيارة.')
    : visitCopy(`${quote.distanceKm.toFixed(1)} km by road · Pay on delivery`, `${quote.distanceKm.toFixed(1)} كم بالطريق · الدفع عند الاستلام`);
  document.getElementById('apptSubmitBtnText').textContent = visitCopy('Continue on WhatsApp', 'المتابعة عبر واتساب');
  document.getElementById('apptSubmitBtn').disabled = bookingHandoffBusy || ['locating','resolving'].includes(visitLocation.status);
  const other = document.querySelector('input[name="apptService"]:checked')?.value === 'other';
  document.getElementById('apptRequestWrap').hidden = !other;
  document.getElementById('apptRequest').required = other;
  document.querySelectorAll('.appt-promo-card').forEach(card => {
    const selected = document.querySelector('input[name="apptOwnership"]:checked')?.value !== 'own' && card.dataset.clothId === state.cloth;
    card.classList.toggle('is-selected', selected); card.setAttribute('aria-pressed', selected);
  });
}

let apptReturnFocus;
function openApptModal() {
  apptReturnFocus = document.activeElement;
  clearVisitLocation();
  if (!els.apptModal) return;
  els.apptModal.hidden = false;
  requestAnimationFrame(() => {
    els.apptModal.classList.add("is-open");
    els.apptCloseBtn?.focus();
  });
  document.body.style.overflow = "hidden";

  if (els.apptForm) {
    els.apptForm.hidden = false;
    els.apptForm.reset();
  }
  if (els.apptSuccess) {
    els.apptSuccess.hidden = true;
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);
  if (els.apptDate) {
    els.apptDate.min = new Date().toISOString().slice(0, 10);
    els.apptDate.value = minDate;
  }
  if (els.apptCity) {
    els.apptCity.value = "";
  }
  renderApptDistrictChips();
  els.apptAddress.value='';
  document.getElementById('apptAddressDetails').hidden=true;
  document.getElementById('apptLocationResult').hidden=true;
  loadBookingFont().catch(()=>{});
  apptQty = state.qty || 1;
  if (els.apptQtyVal) els.apptQtyVal.textContent = String(apptQty);

  const homeCard = document.querySelector('.appt-card input[value="home"], .appt-pill input[value="home"]');
  if (homeCard) {
    homeCard.checked = true;
  }
  apptDistanceZone = "0-15";
  const defaultDistRadio = document.querySelector('input[name="apptDistance"][value="0-15"]');
  if (defaultDistRadio) defaultDistRadio.checked = true;
  document.querySelectorAll(".appt-dist-pill").forEach((pill) => {
    const r = pill.querySelector('input[type="radio"]');
    pill.classList.toggle("is-selected", r && r.checked);
  });

  updateApptServiceCards();
  renderApptPromoFabrics();
  updateApptSummary();
  if (typeof updateJourneyStoryUI === "function") updateJourneyStoryUI();

  els.apptModal.querySelectorAll(".appt-field").forEach((f) => f.classList.remove("is-error"));
}

function closeApptModal() {
  if (!els.apptModal) return;
  visitLocationVersion++;
  els.apptModal.classList.remove("is-open");
  setTimeout(() => {
    els.apptModal.hidden = true;
    document.body.style.overflow = "";
    apptReturnFocus?.focus();
  }, 280);
}

let lastBookingFile=null;
let lastPreparedBooking=null;
let lastBookingWhatsAppUrl=null;
let bookingHandoffBusy=false;
function configuredBookingRecipient(){
  const digits=String(visitConfig?.whatsappNumber || '').replace(/[^0-9]/g,'');
  return /^\d{8,15}$/.test(digits) && digits!=='966500000000' ? digits : null;
}
async function prepareBookingHandoff(booking,waUrl,whatsappWindow){
  lastBookingFile=null;lastPreparedBooking=booking;
  if(waUrl)lastBookingWhatsAppUrl=waUrl;
  const status=document.getElementById('apptPdfStatus');
  const download=document.getElementById('apptDownloadPdf');
  const share=document.getElementById('apptSharePdf');
  download.disabled=true;share.hidden=true;
  try{
    lastBookingFile=await bookingPdfFile(booking);
    download.disabled=false;
    download.textContent=visitCopy('Download booking PDF','تنزيل ملف الحجز');
    share.textContent=visitCopy('Share PDF','مشاركة الملف');
    let canShareFile=false;
    try {canShareFile=Boolean(navigator.canShare?.({files:[lastBookingFile]}));}catch{}
    share.hidden=!canShareFile;
    downloadBookingPdf(lastBookingFile);
    status.textContent=waUrl ? visitCopy('Your PDF is ready. Attach the downloaded file in WhatsApp and press Send, or use Share PDF on supported devices.', 'ملفك جاهز. أرفق الملف الذي تم تنزيله في واتساب واضغط إرسال، أو استخدم مشاركة الملف.') : visitCopy('PDF ready. The shop WhatsApp number still needs to be configured.', 'الملف جاهز. يجب إعداد رقم واتساب المتجر أولاً.');
  }catch{
    download.disabled=false;download.textContent=visitCopy('Retry booking PDF','إعادة إنشاء ملف الحجز');
    status.textContent=visitCopy('PDF generation failed. Your details are available as WhatsApp text; please retry the PDF.', 'تعذر إنشاء الملف. تفاصيلك متاحة كنص واتساب؛ حاول إنشاء الملف مجدداً.');
  }
  if(waUrl){
    try{if(whatsappWindow && !whatsappWindow.closed)whatsappWindow.location.href=waUrl;else status.textContent+=' '+visitCopy('Tap Open WhatsApp below if the browser blocked the new window.', 'اضغط فتح واتساب أدناه إذا منع المتصفح النافذة.');}catch{}
  }
}

async function handleApptSubmit(e) {
  e.preventDefault();
  if(bookingHandoffBusy)return;
  let valid = true;

  const nameInput = document.getElementById("apptName");
  const phoneInput = document.getElementById("apptPhone");
  const dateInput = document.getElementById("apptDate");
  const addressInput = document.getElementById("apptAddress");
  const citySelect = document.getElementById("apptCity");
  const slotSelect = document.getElementById("apptSlot");
  const clothPrefSelect = document.getElementById("apptClothPref");
  const serviceInput = document.querySelector('input[name="apptService"]:checked');

  const checkField = (input, isPhone = false) => {
    if (!input) return true;
    const parent = input.closest(".appt-field");
    const val = (input.value || "").trim();
    if (!val || (isPhone && !validPhone(val))) {
      if (parent) parent.classList.add("is-error");
      valid = false;
      return false;
    }
    if (parent) parent.classList.remove("is-error");
    return true;
  };

  if (!checkField(nameInput)) valid = false;
  if (!checkField(phoneInput, true)) valid = false;
  if (!checkField(dateInput)) valid = false;
  if (!checkField(citySelect)) valid = false;
  if (!checkField(addressInput)) valid = false;
  if (!checkField(document.getElementById('apptDistrict'))) valid = false;
  const requestInput = document.getElementById('apptRequest');
  if (serviceInput?.value === 'other' && !checkField(requestInput)) valid = false;
  if (dateInput.value < dateInput.min) { dateInput.closest('.appt-field').classList.add('is-error'); valid = false; }

  if (!valid) {
    document.getElementById('apptAddressDetails').hidden=false;
    els.apptForm.querySelector('.is-error input,.is-error select')?.focus();
    showToast("toast.need");
    return;
  }

  const serviceType = serviceInput ? serviceInput.value : "home";
  const serviceTitles = {
    home: lang === "ar" ? "زيارة قياس منزلية" : "Home Measurement Visit",
    atelier: lang === "ar" ? "زيارة فرع الأتيليه" : "Atelier Lounge Visit",
    consultancy: lang === "ar" ? "استشارة تصميم ومظهر" : "Style Consultation",
    lounge: lang === "ar" ? "زيارة فرع الأتيليه" : "Atelier Lounge Visit",
    alterations: lang === "ar" ? "تعديلات" : "Alterations",
    other: lang === "ar" ? "طلب آخر" : "Other request",
    wedding: lang === "ar" ? "استشارة تصميم ومظهر" : "Style Consultation",
  };

  const quote = appointmentQuote();
  const distText = quote.distanceKm === null ? visitCopy('Distance and travel charge to be confirmed', 'تُؤكد المسافة ورسوم الزيارة لاحقاً') : `${quote.distanceKm.toFixed(1)} km · ${quote.travel === null ? visitCopy('Charge to be confirmed', 'تُؤكد الرسوم لاحقاً') : money(quote.travel)}`;
  const usesFabric = apptUsesFabric();
  const own = document.querySelector('input[name="apptOwnership"]:checked').value === 'own';
  const clothSummary = usesFabric ? clothName(state.cloth) : own && serviceType === 'home' ? visitCopy(`Customer fabric · Tailoring ${money(OWN_FABRIC_RATE)} / garment`, `قماش العميل · الخياطة ${money(OWN_FABRIC_RATE)} / قطعة`) : visitCopy('Service price after assessment', 'سعر الخدمة بعد المعاينة');
  const bundleNote = quote.bundlePct ? ` · ${t('bundle.line').replace('{p}', String(quote.bundlePct))} (−${money(quote.bundleSavings)})` : '';
  const distanceFee = quote.travel;
  const bookingTotal = quote.total;
  const priceSummary = quote.base === null ? visitCopy('Price after assessment', 'السعر بعد المعاينة') : quote.total === null ? visitCopy(`${money(quote.base)} + travel charge to be confirmed`, `${money(quote.base)} + رسوم الزيارة تُؤكد لاحقاً`) : money(quote.total);

  const bookingId = Date.now();
  const ref = `ALD-APT-${String(bookingId).slice(-4)}`;

  const booking = {
    id: bookingId,
    ref: ref,
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    city: citySelect.value,
    cityLabel: citySelect.selectedOptions[0].textContent,
    district: document.getElementById('apptDistrict').value === 'other' ? '' : document.getElementById('apptDistrict').selectedOptions[0].textContent,
    customerNote: document.getElementById('apptNote').value.trim(),
    address: addressInput.value.trim(),
    fabricOwnership: document.querySelector('input[name="apptOwnership"]:checked').value,
    request: serviceType === "other" ? requestInput.value.trim() : "",
    date: dateInput.value,
    slot: slotSelect ? slotSelect.value : "14:00 – 18:00",
    service: (serviceTitles[serviceType] || serviceType) + (serviceType === "other" && requestInput.value.trim() ? ` — ${requestInput.value.trim()}` : ""),
    distanceZone: null,
    distanceKm: quote.distanceKm,
    coordinates: visitLocation.coords,
    locationLink: visitLocation.coords ? `https://maps.google.com/?q=${visitLocation.coords.latitude},${visitLocation.coords.longitude}` : '',
    note: `${serviceTitles[serviceType] || serviceType}${serviceType === 'other' ? `: ${requestInput.value.trim()}` : ''}` + (visitLocation.coords ? ` · https://maps.google.com/?q=${visitLocation.coords.latitude},${visitLocation.coords.longitude}` : ''),
    baseAmount: quote.base,
    priceSummary,
    distanceFee: distanceFee,
    cloth: state.cloth,
    clothName: clothSummary + bundleNote,
    clothImage: usesFabric ? (CLOTHS.find(c=>c.id===state.cloth)?.img || "") : "",
    qty: apptQty,
    total: bookingTotal,
    pay: "COD",
    status: "pending",
  };

  const waUrl=bookingWhatsAppUrl(booking,configuredBookingRecipient(),lang);
  // Reserve a window during the customer click; asynchronous PDF work must not trigger popup blocking.
  const whatsappWindow=waUrl ? window.open('about:blank','_blank') : null;
  if(whatsappWindow) whatsappWindow.opener=null;
  booking.note += booking.customerNote ? ` · ${booking.customerNote}` : '';
  bookingHandoffBusy=true;
  document.getElementById('apptSubmitBtn').disabled=true;
  document.getElementById('apptSubmitBtnText').textContent=visitCopy('Preparing your PDF…','جارٍ إعداد ملفك…');
  try {await prepareBookingHandoff(booking,waUrl,whatsappWindow);}finally{bookingHandoffBusy=false;updateApptSummary();}
  const list=loadBookings();list.unshift(booking);saveBookings(list.slice(0,24));


  if (els.apptForm) els.apptForm.hidden = true;
  if (els.apptSuccess) {
    els.apptSuccess.hidden = false;
    const refEl = document.getElementById("apptSuccessRef");
    if (refEl) refEl.textContent = ref;

    const detailsEl = document.getElementById("apptSuccessDetails");
    if (detailsEl) {
      detailsEl.innerHTML = `
        <div class="appt-ticket__item">
          <small>${lang === "ar" ? "العميل" : "Client"}</small>
          <strong>${escapeHtml(booking.name)}</strong>
        </div>
        <div class="appt-ticket__item">
          <small>${lang === "ar" ? "نوع الخدمة والنطاق" : "Service & Radius"}</small>
          <strong>${escapeHtml(booking.service)} • ${distText}</strong>
        </div>
        <div class="appt-ticket__item">
          <small>${lang === "ar" ? "التاريخ والوقت" : "Date & Window"}</small>
          <strong>${escapeHtml(booking.date)} • ${escapeHtml(booking.slot)}</strong>
        </div>
        <div class="appt-ticket__item">
          <small>${lang === "ar" ? "المدينة والعنوان" : "Location"}</small>
          <strong>${escapeHtml(cityName(booking.city))} — ${escapeHtml(booking.address)}</strong>
        </div>
        <div class="appt-ticket__item">
          <small>${lang === "ar" ? "المبلغ والدفع" : "Total & Payment"}</small>
          <strong style="color: var(--gold);">${priceSummary} (${lang === "ar" ? "الدفع عند الاستلام" : "Pay on Delivery"})</strong>
        </div>
      `;
    }

    if (els.apptSuccessWa) {
      els.apptSuccessWa.href = waUrl || '#';
      els.apptSuccessWa.hidden = !waUrl;
    }
  }

  showToast("toast.ok");
}

function initApptModal() {
  fetch('/visit-config.json').then(r=>r.ok?r.json():null).then(config=>{visitConfig=config;const receiver=configuredBookingRecipient();if(receiver){WA_NUMBER=receiver;['navWa','waFab'].forEach(id=>{const link=document.getElementById(id);if(link)link.href=waLink();});}updateApptSummary();}).catch(()=>{});
  document.getElementById('apptLocateBtn')?.addEventListener('click',detectVisitLocation);
  document.getElementById('apptManualBtn')?.addEventListener('click',()=>{
    clearVisitLocation();visitLocation.status='manual';
    locationVisual('manual',visitCopy('Enter your visit address. Travel charge will be confirmed.', 'أدخل عنوان الزيارة. ستُؤكد رسوم الزيارة لاحقاً.'));
    document.getElementById('apptAddressDetails').hidden=false;document.getElementById('apptLocationResult').hidden=true;els.apptCity.focus();
  });
  document.getElementById('apptDownloadPdf')?.addEventListener('click',()=>{if(lastBookingFile)downloadBookingPdf(lastBookingFile);else if(lastPreparedBooking)prepareBookingHandoff(lastPreparedBooking,lastBookingWhatsAppUrl,null);});
  document.getElementById('apptSharePdf')?.addEventListener('click',async()=>{
    if(!lastBookingFile)return;
    try {await navigator.share({files:[lastBookingFile],title:lastBookingFile.name,text:visitCopy('Choose WhatsApp, then the atelier contact.', 'اختر واتساب ثم جهة اتصال الأتيليه.')});}
    catch(error){if(error.name!=='AbortError')document.getElementById('apptPdfStatus').textContent=visitCopy('File sharing unavailable. Download the PDF and attach it in WhatsApp.', 'تعذرت المشاركة. نزّل الملف وأرفقه في واتساب.');}
  });
  document.getElementById('apptDistrict')?.addEventListener('change', () => { if(visitLocation.distanceKm !== null) clearVisitLocation(); });
  document.getElementById('apptAddress')?.addEventListener('input', () => { if (visitLocation.distanceKm !== null) clearVisitLocation(); });
  els.apptModal?.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const nodes = [...els.apptModal.querySelectorAll('button,input,select,a[href]')].filter(n => !n.disabled && n.getClientRects().length);
    const first = nodes[0], last = nodes.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  });
  if (els.navBookVisit) {
    els.navBookVisit.addEventListener("click", (e) => {
      e.preventDefault();
      openApptModal();
    });
  }

  if (els.drawerBookVisit) {
    els.drawerBookVisit.addEventListener("click", (e) => {
      e.preventDefault();
      if (els.drawer) els.drawer.classList.remove("is-on");
      openApptModal();
    });
  }

  document.querySelectorAll('[data-promo-action="cutter"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openApptModal();
    });
  });

  if (els.apptBackdrop) els.apptBackdrop.addEventListener("click", closeApptModal);
  if (els.apptCloseBtn) els.apptCloseBtn.addEventListener("click", closeApptModal);
  if (els.apptSuccessDone) els.apptSuccessDone.addEventListener("click", closeApptModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && els.apptModal && !els.apptModal.hidden) {
      closeApptModal();
    }
  });

  if (els.apptAutoAddrBtn) {
    els.apptAutoAddrBtn.addEventListener("click", (e) => {
      e.preventDefault();
      autoGenerateAddress();
    });
  }

  if (els.apptCity) {
    els.apptCity.addEventListener("change", () => {
      clearVisitLocation();
      renderApptDistrictChips();
      if (typeof updateJourneyStoryUI === "function") updateJourneyStoryUI();
    });
  }

  if (els.apptDistrictChips) {
    els.apptDistrictChips.addEventListener("click", (e) => {
      const chip = e.target.closest(".appt-district-chip");
      if (!chip || !els.apptAddress) return;
      const currentCity = (els.apptCity ? els.apptCity.value : state.city) || "Riyadh";
      const cityData = CITY_DISTRICTS[currentCity] || CITY_DISTRICTS.Riyadh;
      const idx = Number(chip.dataset.idx) || 0;
      const samples = lang === "ar" ? cityData.samplesAr : cityData.samples;
      els.apptAddress.value = samples[idx % samples.length];
      const f = els.apptAddress.closest(".appt-field");
      if (f) f.classList.remove("is-error");
      els.apptAddress.classList.remove("appt-addr-flash");
      void els.apptAddress.offsetWidth;
      els.apptAddress.classList.add("appt-addr-flash");
      showToast("appt.autoDone");
    });
  }

  if (els.apptForm) {
    els.apptForm.addEventListener("submit", handleApptSubmit);
    els.apptForm.addEventListener("input", (e) => {
      const f = e.target.closest(".appt-field");
      if (f) f.classList.remove("is-error");
    });
  }

  document.querySelectorAll('input[name="apptOwnership"]').forEach(radio => radio.addEventListener('change', updateApptSummary));
  document.querySelectorAll('input[name="apptService"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      updateApptServiceCards();
      updateApptSummary();
    });
  });

  document.querySelectorAll('input[name="apptDistance"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      apptDistanceZone = e.target.value;
      document.querySelectorAll(".appt-dist-pill").forEach((pill) => {
        const r = pill.querySelector('input[type="radio"]');
        pill.classList.toggle("is-selected", r && r.checked);
      });
      updateApptSummary();
    });
  });

  if (els.apptQtyMinus) {
    els.apptQtyMinus.addEventListener("click", () => {
      if (apptQty > 1) {
        apptQty--;
        if (els.apptQtyVal) els.apptQtyVal.textContent = String(apptQty);
        updateApptSummary();
      }
    });
  }

  if (els.apptQtyPlus) {
    els.apptQtyPlus.addEventListener("click", () => {
      if (apptQty < 12) {
        apptQty++;
        if (els.apptQtyVal) els.apptQtyVal.textContent = String(apptQty);
        updateApptSummary();
      }
    });
  }

  const clothPrefSelect = document.getElementById("apptClothPref");
  if (clothPrefSelect) {
    clothPrefSelect.addEventListener("change", () => {
      if (clothPrefSelect.value === "all-japanese") {
        state.cloth = "jp-ivory";
      } else if (clothPrefSelect.value === "all-korean") {
        state.cloth = "kr-opal";
      }
      updateApptSummary();
    });
  }
}

function initSaasTicker() {
  const ticker = document.getElementById("saasTicker");
  const bar = document.getElementById("saasBar");
  if (!ticker || !bar) return;

  const slides = Array.from(ticker.querySelectorAll(".saas-slide"));
  if (slides.length <= 1) return;

  let currentIdx = 0;
  let intervalId = null;
  let isPaused = false;

  const showSlide = (nextIdx) => {
    const prevSlide = slides[currentIdx];
    const nextSlide = slides[nextIdx];
    if (!prevSlide || !nextSlide) return;

    prevSlide.classList.remove("is-active");
    prevSlide.classList.add("is-exiting");

    setTimeout(() => {
      prevSlide.classList.remove("is-exiting");
    }, 450);

    nextSlide.classList.add("is-active");
    currentIdx = nextIdx;
  };

  const nextSlide = () => {
    if (isPaused) return;
    const next = (currentIdx + 1) % slides.length;
    showSlide(next);
  };

  const startAutoPlay = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4500);
  };

  bar.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  bar.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  startAutoPlay();

}


// ==========================================================================
// Namaa Al Qimmah Bespoke Journey — video player + animated offer rail
// ==========================================================================

function initJourneyStory() {
  const container = document.getElementById("dorzyJourney");
  const video = document.getElementById("journeyVideo");
  const screen = document.getElementById("journeyScreen");
  if (!container || !video || !screen) return;

  const playPauseBtn = document.getElementById("journeyPlayPause");
  const playPauseIcon = document.getElementById("journeyPlayPauseIcon");
  const playPauseText = document.getElementById("journeyPlayPauseText");
  const centerBtn = document.getElementById("journeyVideoCenter");
  const toggleBtn = document.getElementById("journeyVidToggle");
  const toggleIcon = document.getElementById("journeyVidToggleIcon");
  const muteBtn = document.getElementById("journeyVidMute");
  const muteIcon = document.getElementById("journeyVidMuteIcon");
  const fullBtn = document.getElementById("journeyVidFull");
  const seek = document.getElementById("journeyVidSeek");
  const timeEl = document.getElementById("journeyVidTime");
  const durEl = document.getElementById("journeyVidDur");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let userPaused = reduceMotion;
  let seeking = false;

  const fmt = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const syncTransport = () => {
    const playing = !video.paused && !video.ended;
    const icon = playing ? "fa-solid fa-pause" : "fa-solid fa-play";
    if (playPauseIcon) playPauseIcon.className = icon;
    if (toggleIcon) toggleIcon.className = icon;
    if (playPauseText) {
      playPauseText.textContent = playing ? t("journey.pause") : t("journey.play");
    }
    if (playPauseBtn) {
      playPauseBtn.setAttribute("aria-label", playing ? t("journey.pause") : t("journey.play"));
    }
    if (toggleBtn) toggleBtn.setAttribute("aria-label", playing ? t("journey.pause") : t("journey.play"));
    if (centerBtn) centerBtn.hidden = playing;
    screen.classList.toggle("is-playing", playing);
    const muted = video.muted;
    if (muteIcon) muteIcon.className = muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
    if (muteBtn) muteBtn.setAttribute("aria-label", muted ? "Unmute" : "Mute");
  };

  const playVideo = () => {
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        userPaused = true;
        syncTransport();
      });
    }
  };

  const pauseVideo = (manual) => {
    if (manual) userPaused = true;
    video.pause();
  };

  const toggleVideo = () => {
    if (video.paused) {
      userPaused = false;
      playVideo();
    } else {
      pauseVideo(true);
    }
  };

  updateJourneyStoryUI = () => {
    syncTransport();
  };

  video.addEventListener("play", syncTransport);
  video.addEventListener("pause", syncTransport);
  video.addEventListener("loadedmetadata", () => {
    if (durEl) durEl.textContent = fmt(video.duration);
  });
  video.addEventListener("timeupdate", () => {
    if (timeEl) timeEl.textContent = fmt(video.currentTime);
    if (durEl && Number.isFinite(video.duration)) durEl.textContent = fmt(video.duration);
    if (!seeking && seek && Number.isFinite(video.duration) && video.duration > 0) {
      seek.value = String(Math.round((video.currentTime / video.duration) * 1000));
    }
  });
  video.addEventListener("error", () => {
    screen.classList.add("is-video-missing");
  });

  if (seek) {
    seek.addEventListener("input", () => {
      if (!Number.isFinite(video.duration)) return;
      seeking = true;
      video.currentTime = (Number(seek.value) / 1000) * video.duration;
      if (timeEl) timeEl.textContent = fmt(video.currentTime);
    });
    seek.addEventListener("change", () => { seeking = false; });
  }

  if (playPauseBtn) playPauseBtn.addEventListener("click", toggleVideo);
  if (centerBtn) centerBtn.addEventListener("click", toggleVideo);
  if (toggleBtn) toggleBtn.addEventListener("click", toggleVideo);
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      syncTransport();
    });
  }
  if (fullBtn) {
    fullBtn.addEventListener("click", () => {
      const node = document.fullscreenElement ? document : screen;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (screen.requestFullscreen) {
        screen.requestFullscreen();
      }
      void node;
    });
  }

  screen.addEventListener("click", (event) => {
    if (event.target.closest("button, input, .journey-video-bar, .journey-scene-pill")) return;
    toggleVideo();
  });

  container.addEventListener("keydown", (event) => {
    if (event.target.closest("input, textarea, select")) return;
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      toggleVideo();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) video.pause();
    else if (!userPaused) playVideo();
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!userPaused) playVideo();
      } else if (!video.paused) {
        video.pause();
      }
    });
  }, { threshold: 0.4 });
  io.observe(screen);

  syncTransport();
  if (!reduceMotion) playVideo();
}


// ==========================================================================
// Pair a cut with a cloth — step picker (cut → cloth → preview + price)
// ==========================================================================
const HOUSE_CUTS = [
  { style: "Saideria", img: "/jubba/Image/saideria.png", nameKey: "cuts.saideria", badgeKey: "cuts.badge15" },
  { style: "Dagla", img: "/jubba/Image/dagla.png", nameKey: "cuts.dagla", badgeKey: "cuts.badge20" },
  { style: "Code", img: "/jubba/Image/code.png", nameKey: "cuts.code", badgeKey: "cuts.badge10" },
  { style: "Saudi", img: "/jubba/Image/saudi.png", nameKey: "cuts.saudi" },
  { style: "Kowaity", img: "/jubba/Image/kowaity.png", nameKey: "cuts.kowaity" },
  { style: "Qutari", img: "/jubba/Image/qutari.png", nameKey: "cuts.qutari" },
  { style: "Emaraty", img: "/jubba/Image/emaraty.png", nameKey: "cuts.emaraty" },
  { style: "Noom", img: "/jubba/Image/noom.png", nameKey: "cuts.noom" },
];

let pairCut = "Saideria";

function currentStudioStyle() {
  return document.querySelector("#styleStrip .style-chip.is-on")?.dataset.style || pairCut;
}

function bookHouseCut(styleName, clothId) {
  const chip = document.querySelector(`#styleStrip .style-chip[data-style="${styleName}"]`);
  if (chip && !chip.classList.contains("is-on")) chip.click();
  if (clothId) setCloth(clothId);
  if (typeof openApptModal === "function") openApptModal();
}

function paintPair() {
  const cutsEl = document.getElementById("pairCuts");
  const clothsEl = document.getElementById("pairCloths");
  if (!cutsEl || !clothsEl || !cutsEl.children.length) return;
  const cut = HOUSE_CUTS.find((c) => c.style === pairCut) || HOUSE_CUTS[0];
  const q = quoteOf();
  cutsEl.querySelectorAll("[data-style]").forEach((btn) => {
    const item = HOUSE_CUTS.find((c) => c.style === btn.dataset.style);
    const on = btn.dataset.style === cut.style;
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-checked", String(on));
    btn.querySelector("b").textContent = t(item.nameKey);
    const chip = btn.querySelector(".pair-card__tag");
    if (chip) chip.textContent = t(item.badgeKey);
  });
  clothsEl.querySelectorAll("[data-cloth]").forEach((btn) => {
    const cloth = CLOTHS.find((c) => c.id === btn.dataset.cloth);
    const on = cloth.id === q.cloth.id;
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-checked", String(on));
    btn.querySelector("b").textContent = clothName(cloth.id);
    btn.querySelector("[data-now]").textContent = money(getDiscountedPrice(cloth));
    const tag = btn.querySelector(".pair-card__tag");
    if (tag) tag.textContent = lang === "ar" ? cloth.discountTagAr : cloth.discountTagEn;
  });
  const set = (id, v) => { const n = document.getElementById(id); if (n) n.textContent = v; };
  const img = document.getElementById("pairCutImg");
  if (img && img.getAttribute("src") !== cut.img) {
    img.classList.add("is-swap");
    window.setTimeout(() => { img.src = cut.img; img.classList.remove("is-swap"); }, 160);
  }
  if (img) img.alt = t(cut.nameKey);
  const sw = document.getElementById("pairSwatchImg");
  if (sw) { sw.src = q.cloth.img; sw.alt = clothName(q.cloth.id); }
  const badge = document.getElementById("pairBadge");
  if (badge) {
    badge.hidden = !q.cloth.discount;
    badge.textContent = q.cloth.discount ? (lang === "ar" ? q.cloth.discountTagAr : q.cloth.discountTagEn) : "";
  }
  set("pairName", `${t(cut.nameKey)} · ${clothName(q.cloth.id)}`);
  const was = document.getElementById("pairWas");
  if (was) { was.hidden = !q.cloth.discount; was.textContent = q.cloth.discount ? money(q.cloth.price) : ""; }
  set("pairNow", money(q.unitPrice));
  set("pairQty", String(state.qty));
  set("pairTotal", money(q.total));
  set("pairBundle", q.bundlePct ? `${t("bundle.line").replace("{p}", String(q.bundlePct))} · −${money(q.bundleSavings)}` : bundleHint(state.qty));
  const bundleEl = document.getElementById("pairBundle");
  if (bundleEl) bundleEl.classList.toggle("is-on", Boolean(q.bundlePct));
  const wa = document.getElementById("pairWa");
  if (wa) {
    const msg = t("pair.msg").replace("{cut}", t(cut.nameKey)).replace("{cloth}", clothName(q.cloth.id)).replace("{qty}", String(state.qty)).replace("{total}", money(q.total));
    wa.href = waLink(msg);
  }
}

function watchPairForFab() {
  // Desktop: the floating WhatsApp button would sit on top of the Pair preview's
  // Total row. The preview has its own WhatsApp CTA, so tuck the FAB away while
  // the preview is on screen.
  const preview = document.getElementById("pairPreview");
  if (!preview || !("IntersectionObserver" in window)) return;
  new IntersectionObserver((entries) => {
    entries.forEach((e) => document.body.classList.toggle("pair-in-view", e.isIntersecting));
  }, { threshold: 0.15 }).observe(preview);
}

function initHouseCuts() {
  watchPairForFab();
  const cutsEl = document.getElementById("pairCuts");
  const clothsEl = document.getElementById("pairCloths");
  if (!cutsEl || !clothsEl) return;
  pairCut = HOUSE_CUTS.some((c) => c.style === currentStudioStyle()) ? currentStudioStyle() : "Saideria";
  cutsEl.innerHTML = HOUSE_CUTS.map((c) => `
    <button type="button" class="pair-card pair-card--cut" role="radio" data-style="${c.style}" aria-checked="false">
      <span class="pair-card__media"><img src="${c.img}" alt="" loading="lazy" /></span>
      ${c.badgeKey ? '<span class="pair-card__tag"></span>' : ""}
      <b></b>
      <i class="pair-card__check fa-solid fa-check" aria-hidden="true"></i>
    </button>`).join("");
  clothsEl.innerHTML = CLOTHS.map((cl) => `
    <button type="button" class="pair-card pair-card--cloth" role="radio" data-cloth="${cl.id}" aria-checked="false">
      <span class="pair-card__media"><img src="${cl.img}" alt="" loading="lazy" /></span>
      ${cl.discount ? '<span class="pair-card__tag"></span>' : ""}
      <b></b>
      <small data-now></small>
      <i class="pair-card__check fa-solid fa-check" aria-hidden="true"></i>
    </button>`).join("");
  cutsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-style]");
    if (!btn) return;
    pairCut = btn.dataset.style;
    const chip = document.querySelector(`#styleStrip .style-chip[data-style="${pairCut}"]`);
    if (chip && !chip.classList.contains("is-on")) chip.click();
    paintPair();
  });
  clothsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cloth]");
    if (btn) setCloth(btn.dataset.cloth);
  });
  document.getElementById("pairQtyMinus")?.addEventListener("click", () => setQty(state.qty - 1));
  document.getElementById("pairQtyPlus")?.addEventListener("click", () => setQty(state.qty + 1));
  document.getElementById("pairBook")?.addEventListener("click", () => bookHouseCut(pairCut, state.cloth));
  document.getElementById("styleStrip")?.addEventListener("click", (e) => {
    const chip = e.target.closest(".style-chip");
    if (chip && HOUSE_CUTS.some((c) => c.style === chip.dataset.style)) { pairCut = chip.dataset.style; paintPair(); }
  });
  paintPair();
}


function initBundle() {
  document.querySelectorAll("[data-bundle-cta]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tier = btn.dataset.bundleCta;
      const msg = t("bundle.wa").replace("{o}", t(`bundle.t${tier}.name`));
      window.open(waLink(msg), "_blank", "noopener");
    });
  });
  const rail = document.getElementById("bundleRail");
  const dots = document.querySelectorAll("#bundleDots i");
  if (rail && dots.length) {
    rail.addEventListener(
      "scroll",
      () => {
        const items = Array.from(rail.children);
        const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2;
        let idx = 0;
        let best = Infinity;
        items.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - mid);
          if (d < best) { best = d; idx = i; }
        });
        dots.forEach((d, i) => d.classList.toggle("is-on", i === idx));
      },
      { passive: true }
    );
  }
}

function initMobileShell() {
  const wa = document.getElementById("mnavWa");
  if (wa) wa.href = waLink();
  const book = document.getElementById("mnavBook");
  if (book) {
    book.addEventListener("click", () => {
      if (typeof openApptModal === "function") openApptModal();
      else document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  const items = Array.from(document.querySelectorAll("[data-mnav]"));
  const setOn = (id) => items.forEach((i) => i.classList.toggle("is-on", i.dataset.mnav === id));
  const ids = ["top", "houseCuts", "bundle", "book"];
  const targets = ids.map((id) => (id === "top" ? document.getElementById("hero") : document.getElementById(id))).filter(Boolean);
  if ("IntersectionObserver" in window && targets.length) {
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
        let best = null;
        let bestR = 0;
        seen.forEach((r, el) => {
          if (r > bestR) {
            bestR = r;
            best = el;
          }
        });
        if (best) setOn(best.id === "hero" ? "top" : best.id);
      },
      { threshold: [0, 0.15, 0.35, 0.6] }
    );
    targets.forEach((t) => io.observe(t));
  }

  // Sticky price / checkout bar while the configurator is on screen
  const bar = document.getElementById("mbar");
  const quick = document.getElementById("quick");
  const deck = document.querySelector(".quick__cta-deck");
  if (bar && quick && "IntersectionObserver" in window) {
    let quickOn = false;
    let deckOn = false;
    const sync = () => {
      const show = quickOn && !deckOn;
      bar.classList.toggle("is-on", show);
      document.body.classList.toggle("has-mbar", show);
    };
    new IntersectionObserver((e) => { quickOn = e[0].isIntersecting; sync(); }, { threshold: 0.05 }).observe(quick);
    if (deck) new IntersectionObserver((e) => { deckOn = e[0].isIntersecting; sync(); }, { threshold: 0.6 }).observe(deck);
  }
  const cta = document.getElementById("mbarCta");
  if (cta) {
    cta.addEventListener("click", () => {
      const form = document.getElementById("quickForm");
      if (!form) return;
      const empty = Array.from(form.querySelectorAll("[required]")).find((f) => !String(f.value || "").trim());
      if (empty) {
        empty.scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(() => empty.focus({ preventScroll: true }), 350);
        return;
      }
      if (typeof form.requestSubmit === "function") form.requestSubmit();
      else form.dispatchEvent(new Event("submit", { cancelable: true }));
    });
  }
}

// Royal billboard ad: curtain reveal → 4 scenes → curtain close → loop
function paintRoyalAd() {
  const feat = document.getElementById("adFeatured");
  if (feat) {
    const best = [...CLOTHS].sort((a, b) => (b.discount || 0) - (a.discount || 0))[0];
    if (best) feat.textContent = `${clothName(best.id)} · ${money(getDiscountedPrice(best))}`;
  }
  const wa = document.getElementById("adWa");
  if (wa) wa.href = waLink(t("ad.wa"));
}

function initRoyalAd() {
  const ad = document.getElementById("royalAd");
  if (!ad) return;
  const scenes = Array.from(ad.querySelectorAll(".ad-scene"));
  const dots = Array.from(ad.querySelectorAll(".ad-dots i"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  paintRoyalAd();
  document.getElementById("adBook")?.addEventListener("click", () => {
    if (typeof openApptModal === "function") openApptModal();
    else document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("adWa")?.addEventListener("click", () => paintRoyalAd());

  // [phase, duration ms]; scene phases are 1..4
  const TIMELINE = reduce
    ? [[1, 6000], [2, 5000], [3, 5000], [4, 7000]]
    : [["closed", 1300], ["opening", 1500], [1, 5200], [2, 4200], [3, 4400], [4, 5200], ["closing", 1500]];
  let step = 0;
  let timer = null;
  let visible = false;
  let hover = false;

  const apply = () => {
    const [phase] = TIMELINE[step];
    const scene = typeof phase === "number" ? phase : phase === "opening" ? 1 : phase === "closing" ? 4 : 0;
    ad.classList.toggle("is-closed", phase === "closed" || phase === "closing");
    ad.classList.toggle("is-opening", phase === "opening");
    ad.dataset.phase = String(phase);
    scenes.forEach((s, i) => {
      const on = i + 1 === scene && phase !== "closing";
      s.classList.toggle("is-on", on && phase !== "opening");
      s.classList.toggle("is-peek", on && phase === "opening");
      s.setAttribute("aria-hidden", String(!(on || (phase === "closing" && i === 3))));
    });
    dots.forEach((d, i) => d.classList.toggle("is-on", i + 1 === scene));
  };
  const schedule = () => {
    clearTimeout(timer);
    if (!visible || hover || document.hidden) return;
    timer = setTimeout(() => {
      step = (step + 1) % TIMELINE.length;
      apply();
      schedule();
    }, TIMELINE[step][1]);
  };
  apply();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((e) => {
      const wasVisible = visible;
      visible = e[0].isIntersecting;
      ad.classList.toggle("is-paused", !visible);
      // Restart the ad from the closed curtain each time it scrolls into view
      if (visible && !wasVisible && !reduce) {
        step = 0;
        apply();
      }
      schedule();
    }, { threshold: 0.25 }).observe(ad);
  } else {
    visible = true;
    schedule();
  }
  document.addEventListener("visibilitychange", schedule);
  // Hold the CTA scene while the user is interacting with it
  ad.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && ad.dataset.phase === "4") { hover = true; clearTimeout(timer); } });
  ad.addEventListener("pointerleave", () => { if (hover) { hover = false; schedule(); } });
  ad.addEventListener("focusin", () => { hover = true; clearTimeout(timer); if (TIMELINE[step][0] !== 4) { step = TIMELINE.findIndex((x) => x[0] === 4); apply(); } });
  ad.addEventListener("focusout", () => { hover = false; schedule(); });
}

function initApp() {
  initKineticGrid(document.getElementById("bg"));
  initStudio();
  initSaasTicker();
  initApptModal();
  initGalleryCards();
  applyTheme();
  applyLang();
  bindTilt(document.querySelectorAll("[data-tilt]"));
  reveal();
  initJourneyStory();
  initHouseCuts();
  initBundle();
  initMobileShell();
  initRoyalAd();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}


