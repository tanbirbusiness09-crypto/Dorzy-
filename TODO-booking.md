# Booking location and WhatsApp checklist

- [x] Clear city, district and address whenever Book Visit opens.
- [x] Add animated, accessible location button with real progress and reduced-motion support.
- [x] Reverse-geocode GPS into editable city/district/address; calculate driving distance independently.
- [x] Keep manual entry and recover from denied permission, approximate GPS, address/routing failures.
- [x] Add optional customer notes.
- [x] Retain SAR 120 per garment for customer fabric and first 10 km free; never invent rates above 10 km.
- [x] Generate a polished PDF containing reference, customer, fabric/service, quantity, schedule, address, pin, distance, charges and notes.
- [x] Replace primary action with WhatsApp; open configured shop recipient with full text, offer PDF download and native file sharing where supported.
- [x] Explain browser limitations honestly: logged-in sender account; PDF attachment and sending require the customer.
- [x] Verify desktop/mobile layouts, pricing, location contracts, PDF text/layout, and production build.

Configured recipient: +966 57 379 8213 (966573798213).

Remaining shop decision: rate beyond 10 km and whether this covers both visit and return delivery. Those charges remain pending, never silently free.

Verification limits: real personal GPS permissions and an actual WhatsApp send were not exercised. Browser PDF attachments require the customer to attach the download, or choose WhatsApp/contact from the native Share PDF sheet. The sender is the currently logged-in WhatsApp account, not the contact number typed into the form.

Dependency audit: npm installation reported advisories; the follow-up network audit could not run because automatic approval review failed due to the account usage limit. No approval bypass was attempted.


## Deployment readiness (30 October 2026)
- [x] Added a production Web API handler at api/visit-location.js and Vercel packaging for configuration.
- [x] Patched the compatible Vite/source-map-js advisories; npm audit reports zero vulnerabilities.
- [x] Nine automated tests passed, including production Web API validation.
- [x] Actual local-browser form submission generated a one-page PDF and opened the correct shop WhatsApp chat; no message was sent.
- [x] Staged production build is READY; public test coordinate returned both address and 1.3671km driving distance.
- [x] Deployed HTML contains location, notes, PDF and WhatsApp controls.

The earlier audit approval/usage blocker has been resolved. Existing browser file-sharing/account limitations still apply.
