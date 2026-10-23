import { initKineticGrid } from "./kinetic-grid.js";
import { initStudio } from "./jubba.js";

const WA_NUMBER = "966500000000";
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
    "brand.sub": "Royal Jubba Atelier",
    "nav.services": "Cuts",
    "nav.process": "Offers",
    "cuts.aria": "House cuts on offer",
    "cuts.eyebrow": "House cuts on offer",
    "cuts.h2": "Pair a cut with a cloth.",
    "cuts.lede": "Saideria, Dagla and Code, matched to the cloth on offer.",
    "cuts.offerAria": "Limited cloth offers",
    "cuts.ends": "Offer ends in",
    "cuts.book": "Book this combo",
    "cuts.badge15": "15% OFF",
    "cuts.badge20": "20% OFF",
    "cuts.badge10": "10% OFF",
    "cuts.pick": "ATELIER PICK",
    "cuts.saudi": "Saudi",
    "cuts.kowaity": "Kowaity",
    "cuts.qutari": "Qutari",
    "cuts.emaraty": "Emaraty",
    "cuts.noom": "Noom",
    "cuts.saideria": "Saideria",
    "cuts.dagla": "Dagla",
    "cuts.code": "Code",
    "cuts.o1.title": "Saideria + Toyobo Ivory",
    "cuts.o1.note": "Japanese Super 120s cotton",
    "cuts.o2.title": "Dagla + Hanjin Pure Opal",
    "cuts.o2.note": "Korean liquid-drape crepe",
    "cuts.o3.title": "Code + Dynasty White",
    "cuts.o3.note": "Spun poly-cotton twill",
    "cuts.o4.title": "Saudi + Siam Breeze",
    "cuts.o4.note": "Tropical linen-cotton",
    "nav.gallery": "Lookbook",
    "nav.atelier": "Atelier",
    "nav.book": "Book",
    "nav.desk": "Desk",
    "nav.appoint": "Book Visit",
    "nav.wa": "WhatsApp",
    "nav.theme": "Toggle theme",
    "saas.live": "Live quote",
    "saas.book": "Lock order",
    "saas.deliveryBadge": "Free Delivery",
    "saas.deliveryText": "Complimentary VIP Doorstep Delivery Across Saudi Arabia",
    "saas.flashBadge": "Flash Privilege",
    "saas.flashText": "Limited Atelier Slots Today • Offer Ends in",
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
    "kpi.fits": "Bespoke fittings",
    "kpi.cities": "Cities covered",
    "kpi.sat": "Satisfaction %",
    "kpi.wa": "WhatsApp reply hrs",
    "banner.ribbon1": "AL-DORZY CONCIERGE • 100% FREE HOME MEASUREMENT & DOORSTEP DELIVERY ACROSS KSA",
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
    "svc.eyebrow": "The AL-DORZY Ritual",
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
    "gallery.timer.pill": "👑 15% OFF • EXCLUSIVE PRIVILEGE",
    "gallery.timer.h3": "Limited Privilege Window",
    "gallery.timer.desc": "Atelier discounts expire promptly across certified luxury fabric bolts.",
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
    "f.fine": "Saves the order on this desk and opens WhatsApp. No card required.",
    "f.next": "Continue",
    "f.back": "Back",
    "f.when": "Visit window",
    "f.err.req": "This field is required.",
    "f.err.phone": "Enter a valid KSA mobile — 05xxxxxxxx.",
    "geo.ok": "Location pinned. Nearest city selected.",
    "geo.fail": "Location unavailable. Choose city manually.",
    "geo.wait": "Requesting location…",
    "desk.eyebrow": "Operations desk",
    "desk.h2": "Orders & visits",
    "desk.empty": "No orders yet. Configure a jubba above.",
    "desk.all": "All",
    "desk.pending": "Pending",
    "desk.confirmed": "Confirmed",
    "desk.measuring": "Measuring",
    "desk.delivered": "Delivered",
    "desk.stat.orders": "Orders",
    "desk.stat.value": "Pipeline",
    "desk.stat.open": "Open visits",
    "status.pending": "Pending",
    "status.confirmed": "Confirmed",
    "status.measuring": "Measuring",
    "status.delivered": "Delivered",
    "toast.ok": "Order saved. Opening WhatsApp.",
    "toast.need": "Please complete the required fields.",
    "toast.phone": "Enter a valid KSA mobile.",
    "foot.tag": "Royal Jubba Atelier · Kingdom of Saudi Arabia",
    "foot.copy": "Home measurement · Home delivery · Cash on delivery · WhatsApp",
    "appt.tag": "AL-DORZY ROYAL ATELIER",
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
    "journey.aria": "The AL-DORZY Bespoke Tailoring Journey",
    "journey.badge": "THE AL-DORZY BESPOKE JOURNEY",
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
    "journey.waName": "AL-DORZY Atelier Concierge",
    "journey.waMsg": "وعليكم السلام، تم تأكيد موعد الخياط برقم #AD-2048",
    "journey.tag4": "Handcrafted by Master Tailors • Super 120s & Italian Wool",
    "journey.sealTitle": "AL-DORZY Royal Seal",
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
    "brand.sub": "الدرزي — أتيليه الجبة الملكية",
    "nav.services": "القصّات",
    "nav.process": "العروض",
    "cuts.aria": "قصّات الدار على العرض",
    "cuts.eyebrow": "قصّات الدار على العرض",
    "cuts.h2": "اختَر القصّة مع القماش.",
    "cuts.lede": "سعيدية ودقلة وكود، مع القماش المخفّض.",
    "cuts.offerAria": "عروض الأقمشة المحدودة",
    "cuts.ends": "ينتهي العرض خلال",
    "cuts.book": "احجز هذا العرض",
    "cuts.badge15": "خصم ١٥٪",
    "cuts.badge20": "خصم ٢٠٪",
    "cuts.badge10": "خصم ١٠٪",
    "cuts.pick": "اختيار الأتيليه",
    "cuts.saudi": "سعودي",
    "cuts.kowaity": "كويتي",
    "cuts.qutari": "قطري",
    "cuts.emaraty": "إماراتي",
    "cuts.noom": "نوم",
    "cuts.saideria": "سعيدية",
    "cuts.dagla": "دقلة",
    "cuts.code": "كود",
    "cuts.o1.title": "سعيدية + تويوبو عاجي",
    "cuts.o1.note": "قطن ياباني سوبر ١٢٠",
    "cuts.o2.title": "دقلة + أوبال هانجين",
    "cuts.o2.note": "حرير كريب ملكي",
    "cuts.o3.title": "كود + دايناستي أبيض",
    "cuts.o3.note": "سبان بولي قطن",
    "cuts.o4.title": "سعودي + نسيم سيام",
    "cuts.o4.note": "كتان قطن استوائي",
    "nav.gallery": "المعرض الملكي",
    "nav.atelier": "الأتيليه",
    "nav.book": "الحجز",
    "nav.desk": "المكتب",
    "nav.appoint": "احجز زيارة",
    "nav.wa": "واتساب",
    "nav.theme": "تبديل المظهر",
    "saas.live": "تسعير مباشر",
    "saas.book": "تثبيت الطلب",
    "saas.deliveryBadge": "توصيل مجاني",
    "saas.deliveryText": "توصيل ملكي فاخر مجاني لباب منزلك في كافة مدن المملكة",
    "saas.flashBadge": "عرض الورشة الملكية",
    "saas.flashText": "مواعيد خياطة محدودة اليوم • ينتهي خلال",
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
    "kpi.fits": "تفصيل خاص",
    "kpi.cities": "مدن مغطاة",
    "kpi.sat": "رضا العملاء ٪",
    "kpi.wa": "رد واتساب بالساعات",
    "banner.ribbon1": "كونسيرج الدرزي • قياس منزلي وتوصيل فاخر مجاني ١٠٠٪ في الرياض وجدة وكافة مدن المملكة",
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
    "svc.eyebrow": "طقس الدرزي",
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
    "gallery.timer.pill": "👑 خصم 15% • ميزة حصرية",
    "gallery.timer.h3": "نافذة الامتياز الملكي",
    "gallery.timer.desc": "ينتهي الخصم الحصري قريباً على لفائف الأقمشة اليابانية والكورية المعتمدة.",
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
    "f.fine": "يحفظ الطلب في هذا المكتب ويفتح واتساب. لا بطاقة مطلوبة.",
    "f.next": "متابعة",
    "f.back": "رجوع",
    "f.when": "موعد الزيارة",
    "f.err.req": "هذا الحقل مطلوب.",
    "f.err.phone": "أدخل رقم جوال سعودي صحيح — 05xxxxxxxx.",
    "geo.ok": "تم تثبيت الموقع. اختيرت أقرب مدينة.",
    "geo.fail": "الموقع غير متاح. اختر المدينة يدوياً.",
    "geo.wait": "جاري طلب الموقع…",
    "desk.eyebrow": "مكتب العمليات",
    "desk.h2": "الطلبات والزيارات",
    "desk.empty": "لا طلبات بعد. اضبط جبة أعلاه.",
    "desk.all": "الكل",
    "desk.pending": "قيد الانتظار",
    "desk.confirmed": "مؤكد",
    "desk.measuring": "أخذ المقاس",
    "desk.delivered": "تم التوصيل",
    "desk.stat.orders": "الطلبات",
    "desk.stat.value": "خط الأنابيب",
    "desk.stat.open": "زيارات مفتوحة",
    "status.pending": "قيد الانتظار",
    "status.confirmed": "مؤكد",
    "status.measuring": "أخذ المقاس",
    "status.delivered": "تم التوصيل",
    "toast.ok": "حُفظ الطلب. جاري فتح واتساب.",
    "toast.need": "أكمل الحقول المطلوبة.",
    "toast.phone": "أدخل جوالاً سعودياً صالحاً.",
    "foot.tag": "الدرزي — أتيليه الجبة الملكية · المملكة العربية السعودية",
    "foot.copy": "مقاس منزلي · توصيل منزلي · الدفع عند الاستلام · واتساب",
    "appt.tag": "أتيليه الدرزي الملكي",
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
    "journey.aria": "رحلة تفصيل الجبة الملكية في دار الدرزي",
    "journey.badge": "رحلة الدرزي الملكية للتفصيل الفاخر",
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
    "journey.waName": "كونسيرج أتيليه الدرزي",
    "journey.waMsg": "وعليكم السلام، تم تأكيد موعد الخياط برقم #AD-2048",
    "journey.tag4": "قص يدوي بأيدي خياطين كبار • قطن ياباني وصوف إيطالي",
    "journey.sealTitle": "ختم الدرزي الملكي",
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
    "journey.c5.desc": "كوي احترافي وفحص أدق التفاصيل وتغليف في صندوق الدرزي الأسود والذهبي مع شهادة الأصالة.",
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
  deskList: document.getElementById("deskList"),
  deskStats: document.getElementById("deskStats"),
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
let deskFilter = "all";
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
      qty: Math.min(6, Math.max(1, Number(saved.qty) || 1)),
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

function quoteOf(s = state) {
  const cloth = CLOTHS.find((c) => c.id === s.cloth) || CLOTHS[0];
  const city = CITIES.find((c) => c.id === s.city) || CITIES[0];
  const unitPrice = getDiscountedPrice(cloth);
  const originalTotal = cloth.price * s.qty;
  const clothTotal = unitPrice * s.qty;
  const savings = originalTotal - clothTotal;
  const visit = 0; // 100% Free Doorstep Visit
  const delivery = 0; // 100% Free Doorstep Delivery Across KSA
  return {
    cloth,
    city,
    unitPrice,
    originalTotal,
    clothTotal,
    savings,
    visit: 0,
    delivery: 0,
    total: clothTotal,
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
  renderDesk();
  renderApptPromoFabrics();
  updateApptSummary();
  renderApptDistrictChips();
  if (typeof updateJourneyStoryUI === "function") updateJourneyStoryUI();
}

function fillCities() {
  const html = CITIES.map(
    (c) => `<option value="${c.id}">${cityName(c.id)}</option>`
  ).join("");
  els.city.innerHTML = html;
  els.qkCity.innerHTML = html;
  if (els.apptCity) els.apptCity.innerHTML = html;
  els.city.value = state.city;
  els.qkCity.value = state.city;
  if (els.apptCity) els.apptCity.value = state.city;
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
  state.qty = Math.min(6, Math.max(1, n));
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
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveBookings(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function refCode(id) {
  return `QSR-${String(id).slice(-6).toUpperCase()}`;
}

function renderDesk() {
  const list = loadBookings();
  const open = list.filter((b) => b.status !== "delivered");
  const pipeline = list.reduce((s, b) => s + (Number(b.total) || 0), 0);
  els.deskStats.innerHTML = `
    <article><small>${t("desk.stat.orders")}</small><b>${list.length}</b></article>
    <article><small>${t("desk.stat.open")}</small><b>${open.length}</b></article>
    <article><small>${t("desk.stat.value")}</small><b>${money(pipeline)}</b></article>`;

  const shown = deskFilter === "all" ? list : list.filter((b) => b.status === deskFilter);
  if (!shown.length) {
    els.deskList.innerHTML = `<div class="empty">${t("desk.empty")}</div>`;
    return;
  }
  els.deskList.innerHTML = shown
    .map((b) => {
      const next = nextStatus(b.status);
      return `<article class="ticket" data-tilt>
        <div class="ticket__top">
          <span class="ticket__tag">${t(`status.${b.status}`)}</span>
          <code>${refCode(b.id)}</code>
        </div>
        <h3>${escapeHtml(b.name)}</h3>
        <p>${clothName(b.cloth)} · ×${b.qty}</p>
        <p>${cityName(b.city)} · ${escapeHtml(b.date)} · ${escapeHtml(b.slot)}</p>
        <p>${escapeHtml(b.address)}</p>
        <p class="ticket__pay">${b.pay} · ${money(b.total)}</p>
        <div class="ticket__acts">
          ${next ? `<button type="button" data-advance="${b.id}">${t(`status.${next}`)}</button>` : ""}
          <a href="${waLink(orderMessage(b))}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </article>`;
    })
    .join("");
  bindTilt(els.deskList.querySelectorAll("[data-tilt]"));
  els.deskList.querySelectorAll("[data-advance]").forEach((btn) => {
    btn.addEventListener("click", () => advanceBooking(Number(btn.dataset.advance)));
  });
}

function nextStatus(status) {
  const flow = ["pending", "confirmed", "measuring", "delivered"];
  const i = flow.indexOf(status);
  return i >= 0 && i < flow.length - 1 ? flow[i + 1] : null;
}

function advanceBooking(id) {
  const list = loadBookings();
  const item = list.find((b) => b.id === id);
  if (!item) return;
  const n = nextStatus(item.status);
  if (n) item.status = n;
  saveBookings(list);
  renderDesk();
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
  const q = `${clothName(b.cloth)} × ${b.qty}`;
  if (lang === "ar") {
    return `السلام عليكم، طلب جبة من الدرزي.\nالمرجع: ${refCode(b.id)}\nالاسم: ${b.name}\nالجوال: ${b.phone}\nالقماش: ${q}\nالمدينة: ${cityName(b.city)}\nالعنوان: ${b.address}\nالتاريخ: ${b.date} ${b.slot}\nالدفع: ${b.pay}\nالإجمالي عند الاستلام: ${money(b.total)}\nملاحظات: ${b.note || "-"}`;
  }
  return `As-salamu alaykum, AL-DORZY Jubba order.\nRef: ${refCode(b.id)}\nName: ${b.name}\nMobile: ${b.phone}\nCloth: ${q}\nCity: ${cityName(b.city)}\nAddress: ${b.address}\nVisit: ${b.date} ${b.slot}\nPayment: ${b.pay}\nDue on delivery: ${money(b.total)}\nNotes: ${b.note || "-"}`;
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

function countUp() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const tEase = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - tEase, 3);
      el.textContent = Math.round(target * eased).toLocaleString(lang === "ar" ? "ar-SA" : "en-US");
      if (tEase < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
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
  document.querySelectorAll(".reveal, .svc, .step, .kpi, .ticket").forEach((el) => {
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

document.getElementById("deskFilters").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  deskFilter = btn.dataset.filter;
  document.querySelectorAll("#deskFilters button").forEach((b) => b.classList.toggle("is-on", b === btn));
  renderDesk();
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
    pay: "COD",
    date: new Date().toISOString().slice(0, 10),
    slot: t("qk.flex"),
    status: "pending",
    id: Date.now(),
  };
  const list = loadBookings();
  list.unshift(booking);
  saveBookings(list.slice(0, 24));
  renderDesk();
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
    status: "pending",
    id: Date.now(),
  };
  const list = loadBookings();
  list.unshift(booking);
  saveBookings(list.slice(0, 24));
  renderDesk();
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
  if (!els.apptDistrictChips || !els.apptCity) return;
  const currentCity = els.apptCity.value || "Riyadh";
  const cityData = CITY_DISTRICTS[currentCity] || CITY_DISTRICTS.Riyadh;
  const names = lang === "ar" ? cityData.districtsAr : cityData.districts;
  
  const label = lang === "ar" ? "الأحياء الشائعة:" : "Popular:";
  const chipsHtml = names.map((name, idx) => `
    <button type="button" class="appt-district-chip" data-district="${name}" data-idx="${idx}"><i class="fa-solid fa-location-dot"></i> <span>${name}</span></button>
  `).join("");
  
  els.apptDistrictChips.innerHTML = `<span class="appt-quick-label">${label}</span>${chipsHtml}`;
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
  const container = document.getElementById("apptPromoFabrics");
  if (!container) return;
  const promoCloths = CLOTHS.filter((c) => c.isPromo);
  container.innerHTML = promoCloths.map((c) => {
    const isSel = c.id === state.cloth ? " is-selected" : "";
    const orig = money(c.price);
    const discPrice = money(getDiscountedPrice(c));
    const tag = lang === "ar" ? c.discountTagAr : c.discountTagEn;
    const name = clothName(c.id);
    const brandObj = FABRIC_BRANDS.find((b) => b.id === c.brand);
    const flag = brandObj ? brandObj.flag : "";
    return `
      <div class="appt-promo-card${isSel}" data-cloth-id="${c.id}" role="button" tabindex="0">
        <span class="appt-promo-card__thumb">
          <img src="${c.img}" alt="${name}" loading="lazy" />
          <span class="appt-promo-card__badge">${tag}</span>
        </span>
        <div class="appt-promo-card__meta">
          <span class="appt-promo-card__name">${flag} ${name}</span>
          <div class="appt-promo-card__pricing">
            <del class="appt-promo-card__orig">${orig}</del>
            <strong class="appt-promo-card__disc">${discPrice}</strong>
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".appt-promo-card").forEach((card) => {
    card.addEventListener("click", () => {
      const cid = card.dataset.clothId;
      if (!cid) return;
      state.cloth = cid;
      persistState();
      container.querySelectorAll(".appt-promo-card").forEach((el) => {
        el.classList.toggle("is-selected", el.dataset.clothId === cid);
      });
      const clothPrefSelect = document.getElementById("apptClothPref");
      if (clothPrefSelect) {
        clothPrefSelect.value = "current";
      }
      updateApptSummary();
      renderSwatches();
    });
  });
}

function updateApptSummary() {
  const cloth = CLOTHS.find((c) => c.id === state.cloth) || CLOTHS[0];
  const qty = apptQty || 1;
  const unitDiscounted = getDiscountedPrice(cloth);
  const fabricSubtotal = unitDiscounted * qty;
  const distanceFee = DISTANCE_FEES[apptDistanceZone] !== undefined ? DISTANCE_FEES[apptDistanceZone] : 0;
  const total = fabricSubtotal + distanceFee;
  const origTotal = cloth.price * qty;
  const name = clothName(cloth.id);

  const nameEl = document.getElementById("apptSummaryFabricName");
  if (nameEl) nameEl.textContent = `${name} × ${qty}`;

  const priceEl = document.getElementById("apptSummaryFabricPrice");
  if (priceEl) priceEl.textContent = money(fabricSubtotal);

  const origEl = document.getElementById("apptSummaryOriginalPrice");
  if (origEl) {
    origEl.textContent = cloth.discount ? money(origTotal) : "";
    origEl.style.display = cloth.discount ? "inline" : "none";
  }

  const serviceInput = document.querySelector('input[name="apptService"]:checked');
  const serviceType = serviceInput ? serviceInput.value : "home";
  const serviceTitles = {
    home: lang === "ar" ? "زيارة قياس منزلية" : "Home Measurement Visit",
    atelier: lang === "ar" ? "زيارة فرع الأتيليه" : "Atelier Lounge Visit",
    consultancy: lang === "ar" ? "استشارة تصميم ومظهر" : "Style Consultation",
    lounge: lang === "ar" ? "زيارة فرع الأتيليه" : "Atelier Lounge Visit",
    wedding: lang === "ar" ? "استشارة تصميم ومظهر" : "Style Consultation",
  };

  const serviceNameEl = document.getElementById("apptSummaryServiceName");
  if (serviceNameEl) {
    serviceNameEl.textContent = serviceTitles[serviceType] || "Home Measurement Visit";
  }

  const distLabelEl = document.getElementById("apptSummaryDistanceLabel");
  if (distLabelEl) {
    const rangeText = apptDistanceZone === "0-15" ? "0 – 15 km" : (apptDistanceZone === "15-35" ? "15 – 35 km" : "35 – 70 km");
    distLabelEl.textContent = lang === "ar" ? `نطاق المسافة (${rangeText})` : `Travel Radius (${rangeText})`;
  }

  const distFeeEl = document.getElementById("apptSummaryDistanceFee");
  if (distFeeEl) {
    if (distanceFee === 0) {
      distFeeEl.textContent = lang === "ar" ? "0 ر.س (مشمول)" : "0 SAR (Included)";
      distFeeEl.className = "appt-free-highlight";
    } else {
      distFeeEl.textContent = `+${money(distanceFee)}`;
      distFeeEl.className = "appt-summary-price";
    }
  }

  const distBadgeEl = document.getElementById("apptDistanceBadge");
  if (distBadgeEl) {
    if (distanceFee === 0) {
      distBadgeEl.textContent = lang === "ar" ? "زيارة 0 ر.س" : "0 SAR Visit";
      distBadgeEl.className = "appt-delivery-free-badge";
    } else {
      distBadgeEl.textContent = lang === "ar" ? `رسوم مسافة +${money(distanceFee)}` : `Travel +${money(distanceFee)}`;
      distBadgeEl.className = "appt-delivery-free-badge appt-delivery-fee-badge";
    }
  }

  const totalEl = document.getElementById("apptSummaryTotal");
  if (totalEl) totalEl.textContent = money(total);

  const submitTextEl = document.getElementById("apptSubmitBtnText");
  if (submitTextEl) {
    const prefix = lang === "ar" ? "تأكيد وحجز الموعد — " : "Confirm & Book Appointment — ";
    submitTextEl.textContent = `${prefix}${money(total)}`;
  }

  const promoContainer = document.getElementById("apptPromoFabrics");
  if (promoContainer) {
    promoContainer.querySelectorAll(".appt-promo-card").forEach((el) => {
      el.classList.toggle("is-selected", el.dataset.clothId === state.cloth);
    });
  }
}

function openApptModal() {
  if (!els.apptModal) return;
  els.apptModal.hidden = false;
  requestAnimationFrame(() => {
    els.apptModal.classList.add("is-open");
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
    els.apptCity.value = state.city || "Riyadh";
  }
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
  els.apptModal.classList.remove("is-open");
  setTimeout(() => {
    els.apptModal.hidden = true;
    document.body.style.overflow = "";
  }, 280);
}

function handleApptSubmit(e) {
  e.preventDefault();
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
  if (!checkField(addressInput)) valid = false;

  if (!valid) {
    showToast("toast.need");
    return;
  }

  const serviceType = serviceInput ? serviceInput.value : "home";
  const serviceTitles = {
    home: lang === "ar" ? "زيارة قياس منزلية" : "Home Measurement Visit",
    atelier: lang === "ar" ? "زيارة فرع الأتيليه" : "Atelier Lounge Visit",
    consultancy: lang === "ar" ? "استشارة تصميم ومظهر" : "Style Consultation",
    lounge: lang === "ar" ? "زيارة فرع الأتيليه" : "Atelier Lounge Visit",
    wedding: lang === "ar" ? "استشارة تصميم ومظهر" : "Style Consultation",
  };

  const distTitles = {
    "0-15": "0 – 15 km (0 SAR)",
    "15-35": "15 – 35 km (+25 SAR)",
    "35-70": "35 – 70 km (+50 SAR)",
  };
  const distText = distTitles[apptDistanceZone] || "0 – 15 km (0 SAR)";

  const clothPrefValue = clothPrefSelect ? clothPrefSelect.value : "current";
  const clothSummary = clothPrefValue === "current" ? clothName(state.cloth) : clothPrefSelect.options[clothPrefSelect.selectedIndex].text;
  const clothObj = CLOTHS.find((c) => c.id === state.cloth) || CLOTHS[0];
  const unitPrice = getDiscountedPrice(clothObj);
  const distanceFee = DISTANCE_FEES[apptDistanceZone] !== undefined ? DISTANCE_FEES[apptDistanceZone] : 0;
  const bookingTotal = (unitPrice * apptQty) + distanceFee;

  const bookingId = Date.now();
  const ref = `ALD-APT-${String(bookingId).slice(-4)}`;

  const booking = {
    id: bookingId,
    ref: ref,
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    city: citySelect ? citySelect.value : state.city,
    address: addressInput.value.trim(),
    date: dateInput.value,
    slot: slotSelect ? slotSelect.value : "14:00 – 18:00",
    service: serviceTitles[serviceType] || serviceType,
    distanceZone: apptDistanceZone,
    distanceFee: distanceFee,
    cloth: state.cloth,
    clothName: clothSummary,
    qty: apptQty,
    total: bookingTotal,
    pay: "COD",
    status: "pending",
  };

  const list = loadBookings();
  list.unshift(booking);
  saveBookings(list.slice(0, 24));
  renderDesk();

  const waMsg = lang === "ar"
    ? `السلام عليكم، حجز موعد من أتيليه الدرزي.\nالمرجع: ${ref}\nالاسم: ${booking.name}\nالجوال: ${booking.phone}\nنوع الخدمة: ${booking.service}\nنطاق المسافة: ${distText}\nالمدينة: ${cityName(booking.city)}\nالعنوان: ${booking.address}\nالتاريخ: ${booking.date} (${booking.slot})\nالقماش: ${clothSummary} (الكمية: ${apptQty})\nالمبلغ الإجمالي: ${money(bookingTotal)} (الدفع عند الاستلام)`
    : `As-salamu alaykum, AL-DORZY Atelier Appointment.\nRef: ${ref}\nName: ${booking.name}\nMobile: ${booking.phone}\nService: ${booking.service}\nDistance Radius: ${distText}\nCity: ${cityName(booking.city)}\nAddress: ${booking.address}\nDate: ${booking.date} (${booking.slot})\nFabric: ${clothSummary} (Qty: ${apptQty})\nTotal Amount: ${money(bookingTotal)} (Pay on Delivery)`;

  const waUrl = waLink(waMsg);

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
          <strong>${cityName(booking.city)} — ${escapeHtml(booking.address)}</strong>
        </div>
        <div class="appt-ticket__item">
          <small>${lang === "ar" ? "المبلغ والدفع" : "Total & Payment"}</small>
          <strong style="color: var(--gold);">${money(bookingTotal)} (${lang === "ar" ? "الدفع عند الاستلام" : "Pay on Delivery"})</strong>
        </div>
      `;
    }

    if (els.apptSuccessWa) {
      els.apptSuccessWa.href = waUrl;
    }
  }

  showToast("toast.ok");
}

function initApptModal() {
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

  // Flash Sale Live Countdown Timer
  const timerEl = document.getElementById("saasTimer");
  if (timerEl) {
    const STORAGE_KEY = "qasr_flash_end";
    let endTime = parseInt(sessionStorage.getItem(STORAGE_KEY) || "0", 10);
    const now = Date.now();
    // 3 hours, 45 minutes, 18 seconds (13518000 ms) duration
    if (!endTime || endTime < now) {
      endTime = now + (3 * 3600 + 45 * 60 + 18) * 1000;
      sessionStorage.setItem(STORAGE_KEY, String(endTime));
    }

    const updateTimer = () => {
      const remaining = Math.max(0, endTime - Date.now());
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((remaining % (1000 * 60)) / 1000);
      const pad = (n) => String(n).padStart(2, "0");
      timerEl.textContent = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }
}

const kpiIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp();
        kpiIo.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);
kpiIo.observe(document.getElementById("kpis"));

// ==========================================================================
// AL-DORZY Bespoke Journey — video player + animated offer rail
// ==========================================================================

const JOURNEY_OFFERS = [
  {
    id: "jp-ivory",
    clothId: "jp-ivory",
    img: "/jubba/Image/banner-discount-japanese-toyobo-3x4.jpg",
    badgeKey: "offer.1.badge",
    titleKey: "offer.1.title",
    noteKey: "offer.1.note",
    ctaKey: "offer.book",
    action: "cloth",
  },
  {
    id: "kr-opal",
    clothId: "kr-opal",
    img: "/jubba/Image/banner-discount-korean-crepe-16x9.jpg",
    badgeKey: "offer.2.badge",
    titleKey: "offer.2.title",
    noteKey: "offer.2.note",
    ctaKey: "offer.book",
    action: "cloth",
  },
  {
    id: "cn-white",
    clothId: "cn-white",
    img: "/jubba/Image/banner-discount-dynasty-cotton-16x9.jpg",
    badgeKey: "offer.3.badge",
    titleKey: "offer.3.title",
    noteKey: "offer.3.note",
    ctaKey: "offer.book",
    action: "cloth",
  },
  {
    id: "th-breeze",
    clothId: "th-breeze",
    img: "/jubba/Image/banner-discount-thai-linen-3x4.jpg",
    badgeKey: "offer.4.badge",
    titleKey: "offer.4.title",
    noteKey: "offer.4.note",
    ctaKey: "offer.book",
    action: "cloth",
  },
  {
    id: "visit",
    clothId: null,
    img: "/jubba/Image/banner-delivery-van.jpg",
    badgeKey: "offer.5.badge",
    titleKey: "offer.5.title",
    noteKey: "offer.5.note",
    priceKey: "offer.5.price",
    ctaKey: "offer.bookVisit",
    action: "visit",
  },
  {
    id: "royal15",
    clothId: null,
    img: "/jubba/Image/banner-privilege-card.jpg",
    badgeKey: "offer.6.badge",
    titleKey: "offer.6.title",
    noteKey: "offer.6.note",
    priceKey: "offer.6.price",
    ctaKey: "offer.copy",
    action: "code",
    code: "ROYAL15",
  },
];

function offerPriceParts(offer) {
  if (offer.clothId) {
    const cloth = CLOTHS.find((c) => c.id === offer.clothId);
    if (!cloth) return { was: "", now: "", showWas: false };
    const discounted = Boolean(cloth.discount);
    return {
      was: discounted ? money(cloth.price) : "",
      now: money(getDiscountedPrice(cloth)),
      showWas: discounted,
    };
  }
  return { was: "", now: t(offer.priceKey || ""), showWas: false };
}

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
  const stage = document.getElementById("offerStage");
  const rail = document.getElementById("offerRail");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const OFFER_MS = 4600;
  let userPaused = reduceMotion;
  let seeking = false;
  let offerIdx = 0;
  let offerTimer = null;
  let offerPaused = false;

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

  if (stage && rail) {
    stage.innerHTML = JOURNEY_OFFERS.map((offer, i) => `
      <article class="offer-card${i === 0 ? " is-active" : ""}" data-offer="${offer.id}" role="tabpanel">
        <div class="offer-card__media">
          <img class="offer-card__img" src="${offer.img}" alt="" />
          <span class="offer-card__shine" aria-hidden="true"></span>
          <span class="offer-card__live"><span data-badge></span></span>
        </div>
        <div class="offer-card__body">
          <strong class="offer-card__title" data-title></strong>
          <p class="offer-card__note" data-note></p>
          <p class="offer-card__price">
            <s data-was hidden></s>
            <b data-now></b>
          </p>
          <button type="button" class="offer-card__cta" data-cta>
            <span data-cta-label></span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
        <div class="offer-card__progress" aria-hidden="true"><span data-progress></span></div>
      </article>
    `).join("");

    rail.innerHTML = JOURNEY_OFFERS.map((offer, i) => `
      <button type="button" class="offer-thumb${i === 0 ? " is-active" : ""}" data-offer="${offer.id}" role="tab" aria-selected="${i === 0}">
        <img src="${offer.img}" alt="" />
        <span data-thumb></span>
      </button>
    `).join("");
  }

  const cards = stage ? Array.from(stage.querySelectorAll(".offer-card")) : [];
  const thumbs = rail ? Array.from(rail.querySelectorAll(".offer-thumb")) : [];

  const paintOffers = () => {
    JOURNEY_OFFERS.forEach((offer, i) => {
      const card = cards[i];
      const thumb = thumbs[i];
      if (!card) return;
      const price = offerPriceParts(offer);
      const badge = card.querySelector("[data-badge]");
      const title = card.querySelector("[data-title]");
      const note = card.querySelector("[data-note]");
      const was = card.querySelector("[data-was]");
      const now = card.querySelector("[data-now]");
      const cta = card.querySelector("[data-cta-label]");
      if (badge) badge.textContent = t(offer.badgeKey);
      if (title) title.textContent = t(offer.titleKey);
      if (note) note.textContent = t(offer.noteKey);
      if (cta) cta.textContent = t(offer.ctaKey);
      if (was) {
        was.hidden = !price.showWas;
        was.textContent = price.was;
      }
      if (now) now.textContent = price.now;
      const img = card.querySelector("img");
      if (img) img.alt = t(offer.titleKey);
      if (thumb) {
        const label = thumb.querySelector("[data-thumb]");
        if (label) label.textContent = t(offer.badgeKey);
        thumb.setAttribute("aria-label", t(offer.titleKey));
      }
    });
    const offers = document.getElementById("journeyOffers");
    if (offers) offers.setAttribute("aria-label", t("journey.offersAria"));
  };

  const restartProgress = () => {
    const active = cards[offerIdx];
    if (!active) return;
    const bar = active.querySelector("[data-progress]");
    if (!bar) return;
    bar.style.animation = "none";
    void bar.offsetWidth;
    if (!offerPaused && !reduceMotion) {
      bar.style.animation = `offerProgress ${OFFER_MS}ms linear`;
    } else {
      bar.style.transform = "scaleX(1)";
    }
  };

  const showOffer = (idx) => {
    if (!cards.length) return;
    offerIdx = (idx + cards.length) % cards.length;
    cards.forEach((card, i) => {
      const prev = (offerIdx - 1 + cards.length) % cards.length;
      card.classList.toggle("is-active", i === offerIdx);
      card.classList.toggle("is-prev", i === prev && i !== offerIdx);
    });
    thumbs.forEach((thumb, i) => {
      const on = i === offerIdx;
      thumb.classList.toggle("is-active", on);
      thumb.setAttribute("aria-selected", String(on));
      if (on && rail) {
        const left = thumb.offsetLeft - rail.clientWidth / 2 + thumb.clientWidth / 2;
        rail.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
    restartProgress();
  };

  const startOfferTimer = () => {
    if (offerTimer) clearInterval(offerTimer);
    if (reduceMotion || cards.length < 2) return;
    offerTimer = setInterval(() => {
      if (offerPaused || document.hidden) return;
      showOffer(offerIdx + 1);
    }, OFFER_MS);
  };

  const runOfferAction = async (offer) => {
    if (!offer) return;
    if (offer.action === "cloth" && offer.clothId) setCloth(offer.clothId);
    if (offer.action === "code" && offer.code) {
      try {
        await navigator.clipboard.writeText(offer.code);
      } catch (_) {
        const inp = document.createElement("input");
        inp.value = offer.code;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand("copy");
        document.body.removeChild(inp);
      }
      showToast("banner.copied");
    }
    if (typeof openApptModal === "function") openApptModal();
  };

  cards.forEach((card, i) => {
    const cta = card.querySelector("[data-cta]");
    if (!cta) return;
    cta.addEventListener("click", () => runOfferAction(JOURNEY_OFFERS[i]));
  });
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => showOffer(i));
  });

  if (stage) {
    stage.addEventListener("mouseenter", () => { offerPaused = true; });
    stage.addEventListener("mouseleave", () => { offerPaused = false; restartProgress(); });
    stage.addEventListener("focusin", () => { offerPaused = true; });
    stage.addEventListener("focusout", () => { offerPaused = false; restartProgress(); });
  }

  paintOffers();
  showOffer(0);
  startOfferTimer();

  updateJourneyStoryUI = () => {
    paintOffers();
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
// House cuts collage + limited cloth offer
// ==========================================================================
const HOUSE_CUTS = [
  { style: "Saudi", img: "/jubba/Image/saudi.png", nameKey: "cuts.saudi" },
  { style: "Kowaity", img: "/jubba/Image/kowaity.png", nameKey: "cuts.kowaity" },
  { style: "Qutari", img: "/jubba/Image/qutari.png", nameKey: "cuts.qutari" },
  { style: "Emaraty", img: "/jubba/Image/emaraty.png", nameKey: "cuts.emaraty" },
  { style: "Noom", img: "/jubba/Image/noom.png", nameKey: "cuts.noom" },
  { style: "Saideria", img: "/jubba/Image/saideria.png", nameKey: "cuts.saideria", badgeKey: "cuts.badge15" },
  { style: "Dagla", img: "/jubba/Image/dagla.png", nameKey: "cuts.dagla", badgeKey: "cuts.badge20" },
  { style: "Code", img: "/jubba/Image/code.png", nameKey: "cuts.code", badgeKey: "cuts.badge10" },
];

const CUT_OFFERS = [
  {
    style: "Saideria",
    clothId: "jp-ivory",
    img: "/jubba/Image/banner-discount-japanese-toyobo-3x4.jpg",
    badgeKey: "cuts.badge15",
    titleKey: "cuts.o1.title",
    noteKey: "cuts.o1.note",
  },
  {
    style: "Dagla",
    clothId: "kr-opal",
    img: "/jubba/Image/banner-discount-korean-crepe-16x9.jpg",
    badgeKey: "cuts.badge20",
    titleKey: "cuts.o2.title",
    noteKey: "cuts.o2.note",
  },
  {
    style: "Code",
    clothId: "cn-white",
    img: "/jubba/Image/banner-discount-dynasty-cotton-16x9.jpg",
    badgeKey: "cuts.badge10",
    titleKey: "cuts.o3.title",
    noteKey: "cuts.o3.note",
  },
  {
    style: "Saudi",
    clothId: "th-breeze",
    img: "/jubba/Image/banner-discount-thai-linen-3x4.jpg",
    badgeKey: "cuts.pick",
    titleKey: "cuts.o4.title",
    noteKey: "cuts.o4.note",
  },
];

function bookHouseCut(styleName, clothId) {
  const chip = document.querySelector(`#styleStrip .style-chip[data-style="${styleName}"]`);
  if (chip) chip.click();
  if (clothId) setCloth(clothId);
  if (typeof openApptModal === "function") openApptModal();
}

function initHouseCuts() {
  const collage = document.getElementById("cutsCollage");
  const stage = document.getElementById("cutOfferStage");
  if (!collage || !stage) return;

  const feature = document.getElementById("cutsFeature");
  const featureImg = document.getElementById("cutsFeatureImg");
  const featureName = document.getElementById("cutsFeatureName");
  const featureChip = document.getElementById("cutsFeatureChip");
  const tiles = Array.from(collage.querySelectorAll(".cuts-tile"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cutIdx = HOUSE_CUTS.findIndex((cut) => cut.style === "Saideria");
  if (cutIdx < 0) cutIdx = 0;
  let offerIdx = 0;
  let cutTimer = null;
  let offerTimer = null;
  let cutPaused = false;
  let offerPaused = false;

  stage.innerHTML = CUT_OFFERS.map((offer, i) => `
    <article class="cut-banner${i === 0 ? " is-active" : ""}">
      <div class="cut-banner__media">
        <img src="${offer.img}" alt="" data-img />
        <span class="cut-banner__shine" aria-hidden="true"></span>
        <span class="cut-banner__badge" data-badge></span>
      </div>
      <div class="cut-banner__body">
        <strong data-title></strong>
        <p data-note></p>
        <p class="cut-banner__price"><s data-was hidden></s><b data-now></b></p>
        <button type="button" data-cta><span data-cta-label></span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
      </div>
    </article>
  `).join("");

  const banners = Array.from(stage.querySelectorAll(".cut-banner"));

  const paint = () => {
    const cut = HOUSE_CUTS[cutIdx];
    if (featureName) featureName.textContent = t(cut.nameKey);
    if (featureChip) {
      featureChip.hidden = !cut.badgeKey;
      featureChip.textContent = cut.badgeKey ? t(cut.badgeKey) : "";
    }
    if (featureImg) featureImg.alt = t(cut.nameKey);
    tiles.forEach((tile) => {
      const name = tile.querySelector("b");
      const key = HOUSE_CUTS.find((item) => item.style === tile.dataset.style)?.nameKey;
      if (name && key) name.textContent = t(key);
      const chip = tile.querySelector(".cuts-chip");
      const badgeKey = HOUSE_CUTS.find((item) => item.style === tile.dataset.style)?.badgeKey;
      if (chip && badgeKey) chip.textContent = t(badgeKey);
    });
    banners.forEach((banner, i) => {
      const offer = CUT_OFFERS[i];
      const cloth = CLOTHS.find((item) => item.id === offer.clothId);
      banner.querySelector("[data-badge]").textContent = t(offer.badgeKey);
      banner.querySelector("[data-title]").textContent = t(offer.titleKey);
      banner.querySelector("[data-note]").textContent = t(offer.noteKey);
      banner.querySelector("[data-cta-label]").textContent = t("cuts.book");
      banner.querySelector("[data-img]").alt = t(offer.titleKey);
      const was = banner.querySelector("[data-was]");
      const now = banner.querySelector("[data-now]");
      if (cloth && cloth.discount) {
        was.hidden = false;
        was.textContent = money(cloth.price);
        now.textContent = money(getDiscountedPrice(cloth));
      } else if (cloth) {
        was.hidden = true;
        now.textContent = money(cloth.price);
      }
    });
    const aside = document.getElementById("cutOffers");
    if (aside) aside.setAttribute("aria-label", t("cuts.offerAria"));
  };

  const showCut = (idx) => {
    cutIdx = (idx + HOUSE_CUTS.length) % HOUSE_CUTS.length;
    const cut = HOUSE_CUTS[cutIdx];
    if (feature) feature.dataset.style = cut.style;
    if (featureImg && featureImg.getAttribute("src") !== cut.img) {
      featureImg.classList.add("is-swap");
      window.setTimeout(() => {
        featureImg.src = cut.img;
        featureImg.alt = t(cut.nameKey);
        featureImg.classList.remove("is-swap");
      }, reduceMotion ? 0 : 180);
    }
    if (featureName) featureName.textContent = t(cut.nameKey);
    if (featureChip) {
      featureChip.hidden = !cut.badgeKey;
      if (cut.badgeKey) featureChip.textContent = t(cut.badgeKey);
    }
    tiles.forEach((tile) => tile.classList.toggle("is-on", tile.dataset.style === cut.style));
  };

  const showOffer = (idx) => {
    offerIdx = (idx + banners.length) % banners.length;
    banners.forEach((banner, i) => {
      banner.classList.toggle("is-active", i === offerIdx);
      banner.classList.toggle("is-prev", i === (offerIdx - 1 + banners.length) % banners.length);
    });
  };

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const cut = HOUSE_CUTS.find((item) => item.style === tile.dataset.style);
      const offer = CUT_OFFERS.find((item) => item.style === tile.dataset.style);
      showCut(HOUSE_CUTS.indexOf(cut));
      if (offer) showOffer(CUT_OFFERS.indexOf(offer));
      bookHouseCut(tile.dataset.style, offer ? offer.clothId : null);
    });
  });
  if (feature) {
    feature.addEventListener("click", () => {
      const styleName = feature.dataset.style;
      const offer = CUT_OFFERS.find((item) => item.style === styleName);
      bookHouseCut(styleName, offer ? offer.clothId : null);
    });
  }
  banners.forEach((banner, i) => {
    banner.querySelector("[data-cta]").addEventListener("click", () => {
      const offer = CUT_OFFERS[i];
      showCut(HOUSE_CUTS.findIndex((cut) => cut.style === offer.style));
      bookHouseCut(offer.style, offer.clothId);
    });
  });

  collage.addEventListener("mouseenter", () => { cutPaused = true; });
  collage.addEventListener("mouseleave", () => { cutPaused = false; });
  stage.addEventListener("mouseenter", () => { offerPaused = true; });
  stage.addEventListener("mouseleave", () => { offerPaused = false; });

  paint();
  showCut(cutIdx);
  showOffer(0);

  if (!reduceMotion) {
    cutTimer = setInterval(() => {
      if (!cutPaused && !document.hidden) showCut(cutIdx + 1);
    }, 3800);
    offerTimer = setInterval(() => {
      if (!offerPaused && !document.hidden) showOffer(offerIdx + 1);
    }, 4600);
  }

  const previous = updateJourneyStoryUI;
  updateJourneyStoryUI = () => {
    if (typeof previous === "function") previous();
    paint();
  };
  void cutTimer;
  void offerTimer;
}

// ==========================================================================
// Privilege Offer Live Countdown Timer Controller
// ==========================================================================
function initGalleryTimer() {
  const card = document.getElementById("galleryTimerCard");
  const cutClock = document.getElementById("cutTimerClock");
  if (!card && !cutClock) return;

  const daysEl = document.getElementById("timerDays");
  const hoursEl = document.getElementById("timerHours");
  const minsEl = document.getElementById("timerMins");
  const secsEl = document.getElementById("timerSecs");
  const copyBtn = document.getElementById("galleryCopyBtn");
  const ctaBtn = document.getElementById("galleryTimerCta");

  // Rolling 48-hour cycle anchored in localStorage
  const STORAGE_KEY = "aldorzy_timer_target";
  let targetTime = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  const now = Date.now();

  if (!targetTime || targetTime < now) {
    targetTime = now + (47 * 3600 + 48 * 60 + 35) * 1000;
    try {
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    } catch (_) {}
  }

  function updateTimer() {
    const diff = Math.max(0, targetTime - Date.now());
    const totalSecs = Math.floor(diff / 1000);

    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    if (daysEl) daysEl.textContent = String(d).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(m).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(s).padStart(2, "0");
    if (cutClock) {
      const pad = (n) => String(n).padStart(2, "0");
      const totalH = Math.floor(totalSecs / 3600);
      cutClock.textContent = `${pad(totalH)}:${pad(m)}:${pad(s)}`;
    }

    if (diff <= 0) {
      targetTime = Date.now() + 48 * 3600 * 1000;
      try {
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
      } catch (_) {}
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // Copy Promo Code on Click
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const code = copyBtn.dataset.code || "ROYAL15";
      try {
        await navigator.clipboard.writeText(code);
      } catch (_) {
        const inp = document.createElement("input");
        inp.value = code;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand("copy");
        document.body.removeChild(inp);
      }

      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = `<strong>COPIED!</strong> <i class="fa-solid fa-check" style="color: #4ade80;"></i>`;
      copyBtn.style.borderColor = "var(--gold-hi, #e6ca85)";
      copyBtn.style.background = "rgba(201, 162, 74, 0.28)";

      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.style.borderColor = "";
        copyBtn.style.background = "";
      }, 2200);

      if (typeof showToast === "function") {
        showToast("banner.copied");
      }
    });
  }

  // CTA Click opens Appointment modal or scrolls to #book
  if (ctaBtn) {
    ctaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof openApptModal === "function") {
        openApptModal();
      } else {
        const bookSec = document.getElementById("book");
        if (bookSec) {
          bookSec.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }
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
  initGalleryTimer();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}


