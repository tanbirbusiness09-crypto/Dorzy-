# Visit location configuration

The shop pin is verified from the user-supplied Google Maps link:
https://maps.app.goo.gl/zotLveg3x15UFKif7
Coordinates: 24.7220887, 46.6722026. Address is recorded in public/visit-config.json.

Confirmed prices: customer-owned fabric SAR 120 per new garment; first 10 km of driving distance free. Rates beyond 10 km have not been supplied. They deliberately remain pending; they are never treated as zero. Alterations and other services remain assessment-based.

The customer's Use my location button requests browser permission. Coordinates go to the same-origin /api/visit-location handler, which uses the configured OSRM-compatible routing service to calculate driving distance from the shop. The address must be checked and street/building entered by the customer; GPS does not guarantee a street or apartment address. No random address generation is used.

The configured public routing endpoint supports local verification. Use a managed or self-hosted OSRM-compatible service for production availability. Change routingBaseUrl in public/visit-config.json without editing the interface. A production server must mount visitLocationHandler from server/visit-location.js at /api/visit-location; Vite's dev and preview servers mount it automatically. A static dist upload alone does not provide this API.

If routing fails, GPS is too approximate, permission is denied, or manual address edits invalidate the route, no guessed distance or fee is charged. The known tailoring subtotal remains visible. To enable additional rates, add confirmed distanceBands ordered by ascending upToKm. The fee is applied once per booking, not once per garment. Whether the fee includes both the visit and return delivery still needs confirmation from the shop.

Technical references:
- https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
- https://project-osrm.org/docs/v5.22.0/api/

Validation: public synthetic test point 24.73,46.675 returned 1.3671 km by road; own fabric, two garments: SAR 240 total with zero travel fee. No actual customer coordinates or real booking were used.


## Location discovery and WhatsApp/PDF revision

Address fields begin blank and hidden. Find my address requests GPS permission, then POSTs coordinates to the same-origin API. Road routing (OSRM-compatible) and reverse geocoding (Photon-compatible) run independently. Photon populates the nearest available street, district and city; city-only results never count as a resolved street address. The customer reviews the returned address and adds building details in optional notes. A partial provider failure retains the other result. Manual edits invalidate a previous route fee.

Provider endpoints remain configurable in public/visit-config.json. Public demo providers are suitable for this local preview, with no availability guarantee; use managed/self-hosted providers when publishing. Location lookup is triggered only by a customer click, with visible provider disclosure and OpenStreetMap attribution. No name, phone, service selection or notes are sent to map providers.

whatsappNumber is 966573798213. src/booking-whatsapp.js builds the shop recipient URL; the customer phone is contact information in the message/PDF only. The browser cannot select a different WhatsApp sender account or preattach a PDF to a wa.me URL. The implemented flow creates/downloads the PDF, opens a prefilled shop chat, then gives the customer Download PDF and native Share PDF where navigator.canShare(files) is supported. The user must choose a share target/contact and send. No WhatsApp Business API or unattended send is claimed.

PDFs are generated locally using jsPDF with the bundled open-source Amiri font for Arabic/Latin data. No PDF upload service or public customer-file link is created. A generated sample is in output/pdf/booking-sample.pdf. Native share is offered as a separate user gesture after PDF creation so transient browser activation is retained.

Checks: node --test tests/booking.test.mjs (six cases), Vite build, desktop blank state, manual fallback, city/district list, notes/quantity, a resolved-result CSS fixture, and 390x844 mobile layout. Sample PDF rendered in Poppler and visually checked; Arabic/English, pricing and one-page layout verified. No real GPS or WhatsApp message was sent.

References:
- https://github.com/komoot/photon (demo service limits and API)
- https://faq.whatsapp.com/5913398998672934
- https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share


## Production deployment

The site is now live at https://dorzy.vercel.app/ with api/visit-location.js using the shared resolver. vercel.json bundles public/visit-config.json and allows 30 seconds for the API function. The public production URL and API were verified without an authentication bypass. Provider endpoints remain configurable; changing rates/provider config requires a redeployment.

The previously noted missing production API is resolved. Nine automated checks pass; audit reports zero vulnerabilities after compatible patches. The working directory remains uncommitted: this release was a direct local-source Vercel upload. A later Git deployment must include these source changes to preserve the release.
