# Compact Book Visit QA

final result: passed

Scope: user-requested compact revision of the approved banner design. Intentional changes are smaller banner and modal (max 1220px), two balanced columns, contact/date/address grouped on right, concise copy, SAR 120 customer-fabric tailoring and travel breakdown. Existing fabric product photos remain in place.

Evidence: output/book-visit-compact.jpg; output/book-visit-compact-comparison.jpg (approved reference above, compact implementation below). Reference letterboxed to screenshot dimensions without distortion. Desktop 1280 x 720, DPR 1. Mobile checked at 390 x 844. The modal measures 680px content and 680px client height on desktop, including the validation state; no internal scrolling is necessary. Mobile retains a readable scrollable single column.

Fixed issues: initial 15px desktop overflow; error messages increasing layout height and clipping the banner; low contrast over mobile banner folds; an unrelated selected fabric causing a fourth tile to create an extra row. Final controls remain readable and fully accessible. Existing serif heading, sans-serif controls, ivory/gold colors, image quality and user-requested revised copy reviewed in the combined comparison.

Checks: SAR 120 own fabric x 2 = SAR 240; first 10km inclusive free; distances above 10km remain pending because no rate has been provided; alterations/other requests keep assessment pricing; missing and invalid route input handled; shop coordinates verified from user-provided Google Maps link. Live handler test using a non-customer public coordinate returned 1.3671km, zero travel fee, SAR 240 for two garments. No real customer position or booking was accessed or sent. Browser console has no errors. Final Vite build passed.

Limitations: GPS provides a location pin and road distance, not a guaranteed street/apartment address; customer confirms the address. Browser permission and real-device GPS were not exercised with the user's location. Rate beyond 10km and whether charges cover both visit and delivery remain to be specified. The local dev/preview routing handler needs a production API deployment when publishing; see visit-location-setup.md.


## Latest revision: location discovery, notes and WhatsApp/PDF

final result: passed

The revised product preserves the compact two-column design while replacing preselected address fields with an animated location discovery action. The initial address/city/district values are all empty. Notes and a green WhatsApp action fit in the right panel. Desktop initial modal: 675px content/client at 1280x720. Resolved-result visual fixture: 647px content/client at the same viewport, with a compact result card and change action. Manual-entry state can scroll to preserve access to all fields; mobile uses a readable single column.

Evidence: output/book-visit-location-whatsapp.jpg (actual initial interface); result fixture was visual/CSS verification only, not evidence of a real GPS lookup. Mobile confirmed at 390x844 after selecting the correct preview tab. Reduced-motion CSS disables the pulsing/rotation. Provider disclosures and OSM attribution are visible. No browser console errors observed.

Six deterministic tests passed for independent address/routing failures, city-only address rejection, SAR120 quantity pricing, 10km fee boundary and correct WhatsApp recipient/message fields. The one-page sample PDF was rendered, inspected and text-checked. Initial orphan notes heading/second-page issue was fixed through tighter PDF spacing and keeping heading/content together; final one-page render passed.

Live device GPS permission, native OS file-share selection, actual WhatsApp sending and dependency advisory audit are not asserted as verified. Audit attempt was blocked by automatic approval review account usage limit. The app explicitly requires customer attachment/send and never claims an automatic PDF delivery.


## Production release - 30 October 2026

final result: passed

Live URL: https://dorzy.vercel.app/
Deployment: dpl_13eetQdSJcEgUWdLbVrkkTYjoVY5 (READY; promoted to existing production project).

Story: Book Visit -> blank location UI -> browser GPS -> production /api/visit-location -> independent Photon address and OSRM driving route -> visible estimate; own fabric remains SAR120 per whole garment -> PDF + shop WhatsApp handoff.

Resolved deployment gap: local Vite middleware is now also available through a production Web API function, with its JSON config bundled. HTTP production checks were made without Vercel authentication: public homepage 200, Amiri PDF font 200, same-origin API POST 200. Public test point 24.73,46.675 returned Riyadh/Al Wurud, a street address and 1.3671km driving distance. Actual customer GPS was not used.

Actual local browser submission with clearly labelled test data generated a one-page A4 PDF in Downloads and opened a prefilled chat targeting 966573798213. No Send action or native file-share recipient selection occurred; unsent test tabs were closed. Production browser opened Book Visit, confirmed blank address fields and SAR120 own-fabric subtotal, and reported no console errors. Screenshot: output/dorzy-production-booking.jpg.

All nine automated tests and final build passed. npm audit fix applied compatible Vite 6.4.5/source-map-js patches; audit reports zero vulnerabilities. Earlier audit approval blocker is resolved.

Rates above 10km remain pending because the shop has not supplied them. Browser file attachment/account limitations remain accurately disclosed. Deployment was uploaded from the tested local working copy; no Git commit or push was made.
