Build a complete, production-ready Next.js 14 furniture e-commerce website
for "মা ফার্নিচার" with a brand new design system, completely different
from any previous version. Every layout, component, and style must be
freshly designed — no recycled patterns.
═══ BUSINESS INFORMATION ════
Shop Name  : মা ফার্নিচার (Ma Furniture)
Address    : কুষ্টিয়া, দৌলতপুর, সাতারপাড়া বাজার
Phone      : +8801729728818
WhatsApp   : +8801979728818
WA URL     : https://wa.me/8801979728818
══ TECH STACK ══
Framework    : Next.js 14 (App Router)
Language     : JavaScript (no TypeScript)
Styling      : CSS Modules + Global CSS (NO Tailwind, NO Bootstrap)
State        : React useState / useEffect / useContext / useReducer
Icons        : react-icons (fa6, gi, tb sets)
Fonts        : next/font/google:
               "Rozha One" (display headings — bold Devanagari-style serif)
               "Noto Sans Bengali" (Bangla body text)
               "Bebas Neue" (English accent labels)
               "Fira Code" (product IDs, codes)
Animation    : CSS @keyframes only (no Framer Motion, no GSAP)
               Intersection Observer API for scroll reveals
Data         : JS array files in /data/ (no database)
Payment      : NONE — WhatsApp only
Images       : next/image
══ NEW DESIGN CONCEPT — "WARM GRAIN EDITORIAL" ══
Aesthetic: A high-end furniture catalog meets a rustic Bengali craft
magazine. Think warm parchment pages, bold editorial typography,
generous whitespace, asymmetric card layouts, hand-drawn-style
decorative borders, and tactile wood-grain textures in CSS.
NEVER USE: Black, dark grey, navy, purple, cold blues, or any dark
background. Every surface must feel like warm wood, parchment, or
natural linen.
NEW COLOR PALETTE (completely different from previous versions):
  --walnut:       #7C4B2A   /* rich walnut — primary brand */
  --walnut-deep:  #5A3118   /* deep walnut — headings */
  --walnut-soft:  #9E6644   /* medium walnut */
  --honey:        #D4882A   /* honey amber — CTA accent */
  --honey-light:  #EDB96A   /* pale honey */
  --sienna:       #B5541E   /* burnt sienna — badges/alerts */
  --parchment:    #FDF6E8   /* main background */
  --parchment-2:  #F7EBCF   /* section alt bg */
  --parchment-3:  #F0DEB8   /* deeper parchment */
  --linen:        #EAD9BC   /* card surfaces */
  --linen-dark:   #D9C5A0   /* borders/dividers */
  --bark:         #3B1F0C   /* darkest brown — text */
  --bark-mid:     #6B3D22   /* secondary text */
  --bark-soft:    #9E7455   /* muted/placeholder text */
  --moss:         #4A7C59   /* in-stock green */
  --whatsapp:     #25D366
  --border:       rgba(124,75,42,0.16)
  --border-focus: rgba(212,136,42,0.55)
  --shadow-warm:  rgba(91,49,24,0.14)
NEW LAYOUT LANGUAGE:
  - Asymmetric split sections (NOT equal 50/50 columns)
  - Overlapping elements with z-index depth
  - Diagonal section separators (CSS clip-path skew)
  - Large decorative page numbers / section numbers
  - Thick left-border accent cards (editorial style)
  - Horizontal rule decorations (CSS drawn)
  - Product grid uses MASONRY-inspired unequal heights
  - Wide image cards alternating with narrow text cards
  - "Magazine spread" style for featured products
═════ PROJECT STRUCTURE ═════
ma-furniture/
├── package.json
├── next.config.js
├── data/
│   ├── categories.js
│   ├── products.js
│   ├── gallery.js
│   └── designs.js
├── public/
│   └── (placeholder)
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js
    │   ├── page.module.css
    │   ├── category/[id]/
    │   │   ├── page.js
    │   │   └── page.module.css
    │   ├── search/
    │   │   ├── page.js
    │   │   └── page.module.css
    │   ├── photo-gallery/
    │   │   ├── page.js
    │   │   └── page.module.css
    │   ├── design-gallery/
    │   │   ├── page.js
    │   │   └── page.module.css
    │   └── admin/
    │       ├── page.js
    │       └── page.module.css
    ├── components/
    │   ├── Loader/
    │   │   ├── WorkshopLoader.js
    │   │   └── WorkshopLoader.module.css
    │   ├── Layout/
    │   │   ├── SiteHeader.js
    │   │   ├── SiteHeader.module.css
    │   │   ├── SiteFooter.js
    │   │   ├── SiteFooter.module.css
    │   │   └── TickerBanner.js
    │   ├── Home/
    │   │   ├── CinematicHero.js
    │   │   ├── CinematicHero.module.css
    │   │   ├── SmartSearchBlock.js
    │   │   ├── SmartSearchBlock.module.css
    │   │   ├── BestsellerTrack.js
    │   │   ├── BestsellerTrack.module.css
    │   │   ├── CategoryBento.js
    │   │   ├── CategoryBento.module.css
    │   │   ├── CategorySection.js
    │   │   ├── CategorySection.module.css
    │   │   ├── WoodTypesGrid.js
    │   │   ├── DesignTeaser.js
    │   │   ├── GalleryTeaser.js
    │   │   ├── OrderSteps.js
    │   │   ├── OrderSteps.module.css
    │   │   └── ContactBlock.js
    │   ├── Product/
    │   │   ├── ProductCard.js
    │   │   ├── ProductCard.module.css
    │   │   ├── ProductDrawer.js
    │   │   └── ProductDrawer.module.css
    │   ├── Gallery/
    │   │   ├── MasonryGallery.js
    │   │   ├── MasonryGallery.module.css
    │   │   ├── DesignGrid.js
    │   │   ├── DesignGrid.module.css
    │   │   ├── DesignDrawer.js
    │   │   └── DesignDrawer.module.css
    │   ├── Admin/
    │   │   ├── AdminShell.js
    │   │   ├── AdminShell.module.css
    │   │   ├── DashboardPanel.js
    │   │   ├── ProductsPanel.js
    │   │   ├── ProductForm.js
    │   │   ├── ProductForm.module.css
    │   │   ├── CategoriesPanel.js
    │   │   ├── PhotoGalleryPanel.js
    │   │   ├── DesignGalleryPanel.js
    │   │   └── ExportPanel.js
    │   └── UI/
    │       ├── FloatingWA.js
    │       ├── ScrollTop.js
    │       ├── ToastStack.js
    │       ├── ToastStack.module.css
    │       ├── ConfirmDialog.js
    │       └── ConfirmDialog.module.css
    └── context/
        ├── ToastContext.js
        └── AdminContext.js
═════ LOADING ANIMATION — WorkshopLoader MOST CRITICAL COMPONENT — BUILD WITH FULL DETAIL ═════

File: src/components/Loader/WorkshopLoader.js
CSS:  src/components/Loader/WorkshopLoader.module.css
Displayed full-screen on initial site load.
Managed in layout.js via useState(true) → false after 4200ms.
Background: var(--parchment) — warm cream, never dark.
━━━━━ THE STORY ANIMATION: TWO WORKERS IN A FURNITURE WORKSHOP ━━━━━
SCENE LAYOUT:
  Full screen, centered content
  Workshop floor at bottom 28%:
    Background: var(--linen)
    CSS wood plank lines:
      repeating-linear-gradient(
        90deg,
        transparent, transparent 60px,
        rgba(91,49,24,0.06) 60px, rgba(91,49,24,0.06) 62px
      ),
      repeating-linear-gradient(
        180deg,
        transparent, transparent 18px,
        rgba(91,49,24,0.04) 18px, rgba(91,49,24,0.04) 20px
      )
    Soft top edge shadow
    Workshop bench/worktable in center-right area:
    CSS drawn: a thick brown rectangle (var(--walnut-deep))
    Legs: two thinner rectangles below
    Top surface: lighter tone (var(--linen-dark))
    Width: 220px, height: 18px (tabletop), legs 60px tall

━WORKER 1 — THE CARRIER (LEFT SIDE) ━━━Position: starts at far-left (translateX: -60px from left edge)
Role: Picks up wooden planks/logs from a pile, carries them to Worker 2

SVG CHARACTER (~170px tall, friendly cartoon style):
HEAD:
  Circle, 44px diameter
  Fill: #E8C49A (warm skin)
  Eyes: 2 small filled circles (#3B1F0C), 4px each
  Smile: small arc path, stroke #3B1F0C, stroke-width 1.5
  Hard hat / cap: flattened ellipse on top, fill: var(--sienna)
  Sweat drop: tiny teardrop shape beside head (shows effort)
BODY:
  Rounded rect, 28×38px, fill: var(--walnut) (work shirt)
  Collar: small triangle, fill: var(--parchment)
ARMS:
  Left arm: rotated slightly forward (carrying position)
    Rect 8×30px, fill: #E8C49A, transform-origin: shoulder
  Right arm: same, mirrored
  Both arms extend FORWARD AND DOWN (as if carrying heavy load)
HANDS:
  Small rounded rect, 10px, fill: #E8C49A at end of each arm
LEGS:
  Left leg: rect 10×32px, fill: var(--walnut-deep)
    transform-origin: hip, CSS walking animation
  Right leg: same, mirrored, opposite phase
FEET:
  Small rounded rects, 14×8px, fill: #3B1F0C (dark boots)
WOODEN PLANKS BEING CARRIED:
  Stack of 3 horizontal planks resting on Worker 1's arms:
    Plank 1: rect 120×10px, fill: var(--honey), rx:2
    Plank 2: rect 110×10px, fill: var(--walnut-soft), rx:2, offset +3px
    Plank 3: rect 100×10px, fill: var(--honey-light), rx:2, offset +6px
  Wood grain lines on each plank:
    repeating-linear-gradient(90deg, transparent 0, transparent 12px,
    rgba(91,49,24,0.12) 12px, rgba(91,49,24,0.12) 14px)
  Stack positioned resting on forearms
━━ WORKER 1 WALKING ANIMATION ━━━━━
@keyframes worker1Walk:
  0%   { transform: translateX(-30px); }
  40%  { transform: translateX(160px); }   ← arrives near Worker 2
  45%  { transform: translateX(160px); }   ← brief stop, hands planks
  48%  { transform: translateX(160px) scaleX(-1); } ← turns around
  90%  { transform: translateX(-30px) scaleX(-1); } ← walks back
  95%  { transform: translateX(-30px); }   ← turns forward again
  100% { transform: translateX(-30px); }
animation: worker1Walk 3.6s ease-in-out infinite
@keyframes worker1Legs (left leg):
  0%,100% { transform: rotate(-28deg); }
  50%     { transform: rotate(+28deg); }
animation: worker1Legs 0.42s ease-in-out infinite
Right leg: same but animation-delay: 0.21s (opposite phase)
PLANKS HANDOFF ANIMATION:
  When Worker 1 at translateX(160px) (40%–45% of main anim):
  Planks position relative to Worker 1 smoothly transitions
  to appear in Worker 2's hands (absolute positioned planks
  morph/translate toward Worker 2's arm position)
  @keyframes planksHandoff:
    0%,38%  { opacity:1; transform: translate(0,0) rotate(0deg); }
    42%     { opacity:1; transform: translate(80px, -5px) rotate(-5deg); }
    45%,100%{ opacity:0; transform: translate(90px, -5px) rotate(-5deg); }
  animation: planksHandoff 3.6s ease-in-out infinite

━━━ WORKER 2 — THE BUILDER (RIGHT SIDE, AT WORKBENCH) ━━━
Position: standing at right side of workbench, fixed position
Role: Receives planks from Worker 1, then assembles them into furniture
SVG CHARACTER (~180px tall, slightly larger, craftsman appearance):
HEAD:
  Circle, 46px, fill: #D4A876 (slightly darker skin tone)
  Eyes: two circles, focused/squinting (slightly smaller, angled brows)
  Eyebrows: two small rect paths, angled inward (concentration)
  Mouth: straight line (focused expression)
  Hair: dark brown irregular shape on top (#3B1F0C)
  Safety glasses: two small circle outlines with thin bridge (#3B1F0C)
BODY:
  Rounded rect, 30×40px, fill: var(--moss) (green work apron)
  Apron pocket: small rect outline on chest
ARMS:
  Default: arms down at sides
  Assembly phase: arms raised, working
LEGS:
  Standing position, slight weight-shift sway:
  @keyframes worker2Sway:
    0%,100% { transform: rotate(-2deg); }
    50%     { transform: rotate(+2deg); }
  animation: worker2Sway 2s ease-in-out infinite
  (gives subtle "standing and working" feel)
━━ FURNITURE ASSEMBLY ON WORKBENCH ━━━
The furniture being assembled appears ON the workbench surface.
It cycles through building a CHAIR (then resets and repeats).
CHAIR ASSEMBLY — 5 SVG parts, each animated:
PART 1 — Left front leg:
  rect 8×40px, fill: var(--walnut), rx:2
  Position: workbench left area
  @keyframes: slideUpFade (translateY 15px→0, opacity 0→1)
  animation-delay: 0s, duration: 0.5s, fill-mode: both
  Appears when Worker 1 first delivers planks (sync with 42% mark)
PART 2 — Right front leg:
  Same shape, mirrored position
  animation-delay: 0.5s
PART 3 — Back support / backrest vertical:
  rect 8×55px (taller), fill: var(--walnut-deep)
  animation-delay: 1.0s
PART 4 — Seat plank (horizontal):
  rect 65×12px, fill: var(--honey), rx:2
  Wood grain texture overlay
  animation-delay: 1.5s
  @keyframes: slideInFromRight (translateX 20px→0, opacity 0→1)
PART 5 — Backrest top rail:
  rect 65×9px, fill: var(--honey-light), rx:2
  animation-delay: 2.0s
WORKER 2 ASSEMBLY ARM ANIMATION:
  When parts appear (1.0s–2.5s into cycle), Worker 2's right arm:
  @keyframes builderArm:
    0%,30%  { transform: rotate(0deg); }
    35%     { transform: rotate(-35deg); }   ← reaches for piece
    42%     { transform: rotate(+20deg); }   ← places piece
    48%     { transform: rotate(-35deg); }   ← reaches again
    55%     { transform: rotate(+20deg); }   ← places again
    65%,100%{ transform: rotate(0deg); }     ← done, rests
  animation: builderArm 3.6s ease-in-out infinite

TOOL IN HAND:
  Small L-shaped SVG (represents a wood clamp/mallet)
  Fill: var(--walnut-deep)
  Attached to right hand, moves with arm animation

CHAIR RESET:
  After all 5 parts assembled (at ~2.8s mark):
  All parts: @keyframes fadeOutUp (opacity 1→0, translateY 0→-20px)
  animation-delay: 3.0s, duration: 0.4s
  Then cycle restarts — next loop, new chair begins building

━━WOOD PILE (FAR LEFT) ━━
Static decorative pile of lumber at far left:
  5–6 stacked log/plank shapes (varying sizes)
  Colors: var(--honey), var(--walnut-soft), var(--honey-light)
  Slight rotation on each for natural pile look
  Drop shadow below pile
  Worker 1 "picks from" this pile at start of each cycle

━━ AMBIENT DETAILS ━
SAWDUST PARTICLES (near workbench):
  12 tiny circles (3–6px), various wood-tone colors
  Each has CSS custom property --dx (range -25px to +25px)
  @keyframes sawFloat:
    0%   { transform: translate(0,0) scale(1); opacity: 0.9; }
    100% { transform: translate(var(--dx), -55px) scale(0.2); opacity: 0; }
  animation: sawFloat 1.4s ease-out infinite
  Staggered delays: 0s, 0.12s, 0.24s... (12 particles)
TOOL RACK (background decoration, far right):
  CSS-drawn: vertical plank with 3 hanging tools
  (simple L and T shapes representing hammer and clamps)
  Static, decorative depth
DUST MOTES:
  4–5 very small dots (2px) floating lazily upward
  @keyframes dustDrift:
    0%   { transform: translate(0,0); opacity:0.4; }
    50%  { transform: translate(8px, -30px); opacity:0.6; }
    100% { transform: translate(-5px, -60px); opacity:0; }
  animation: dustDrift 4s ease-in-out infinite
  Different delays each

━━━ BOTTOM UI ELEMENTS ━━━
SHOP NAME (above scene):
  "মা ফার্নিচার" — Rozha One, 32px, var(--walnut-deep)
  Decorative: a small wooden plank SVG icon beside text
ANIMATED MESSAGE (below scene, two lines alternate):
  Line A: "কারিগর কাজ করছেন..." (Noto Sans Bengali, 17px, var(--bark-mid))
  Line B: "Building your dream furniture..." (Bebas Neue, 18px, var(--honey))
  @keyframes msgSwap:
    0%,42%  { opacity:1; transform:translateY(0); }
    48%,95% { opacity:0; transform:translateY(-10px); }
    98%     { opacity:0; transform:translateY(10px); }
  Line A: msgSwap 4.2s ease-in-out infinite
  Line B: msgSwap 4.2s ease-in-out infinite 2.1s
PROGRESS BAR:
  Width: clamp(240px, 55vw, 340px), height: 6px
  Track: var(--linen-dark), border-radius: 10px
  Fill: linear-gradient(90deg, var(--walnut), var(--honey), var(--walnut-soft))
  background-size: 200% 100%
  Two animations:
    1. @keyframes progressGrow: width 0→100%, 4.2s ease-in-out infinite
    2. @keyframes gradientShift: background-position 0%→200%, 2s linear infinite
  Animated "wood chip" dot at progress tip:
    8px circle, var(--honey), absolute at right edge of fill
    @keyframes chipBounce: translateY 0→-4px→0, 0.5s ease-in-out infinite
STEP INDICATOR (below progress bar):
  3 small dots: ● ○ ○ (walnut filled = done, outline = upcoming)
  Dot 1 fills at 0s, Dot 2 at 1.4s, Dot 3 at 2.8s
  CSS animation on background-color

━━━ SCREEN EXIT TRANSITION ━━━━━
When isLoading = false:
  .exiting class added
  @keyframes loaderExit:
    0%   { opacity:1; transform: scale(1) translateY(0); }
    100% { opacity:0; transform: scale(1.06) translateY(-20px); }
  animation: loaderExit 0.65s cubic-bezier(0.4,0,0.2,1) forwards
━━ LOADING SCREEN RESPONSIVE ━━━
Scene container: transform scale
  < 400px: scale(0.52)
  < 600px: scale(0.68)
  < 800px: scale(0.82)
  > 800px: scale(1)
══ DESIGN SYSTEM — globals.css ═
All CSS variables defined in :root (listed in color palette above)
Plus:
  --radius-sm:    6px
  --radius-md:    14px
  --radius-lg:    24px
  --radius-pill:  100px
  --radius-card:  18px
  --shadow-sm:    0 2px 12px rgba(91,49,24,0.10)
  --shadow-md:    0 8px 28px rgba(91,49,24,0.14)
  --shadow-lg:    0 20px 60px rgba(91,49,24,0.18)
  --shadow-card:  0 4px 24px rgba(91,49,24,0.12)
  --section-py:   clamp(56px, 8vw, 120px)
  --gap:          clamp(14px, 2.2vw, 26px)
  --container-px: clamp(18px, 5vw, 90px)
  --max-w:        1480px
NEW TYPOGRAPHY SCALE:
  .heading-xl  : Rozha One, clamp(2.8rem,6vw,6rem), walnut-deep
  .heading-lg  : Rozha One, clamp(2rem,4vw,3.8rem), walnut-deep
  .heading-md  : Rozha One, clamp(1.5rem,3vw,2.6rem), walnut
  .label-caps  : Bebas Neue, clamp(0.9rem,1.5vw,1.2rem), honey, letter-spacing 0.25em
  .body-text   : Noto Sans Bengali, clamp(0.9rem,1.3vw,1.05rem), bark-mid, line-height 1.8
  .code-text   : Fira Code, 12px, bark-soft

WOOD GRAIN TEXTURE UTILITY (used on any surface):
  .wood-grain {
    background-image:
      repeating-linear-gradient(92deg, transparent 0, transparent 4px,
        rgba(124,75,42,0.03) 4px, rgba(124,75,42,0.03) 8px),
      repeating-linear-gradient(180deg, transparent 0, transparent 20px,
        rgba(124,75,42,0.02) 20px, rgba(124,75,42,0.02) 22px);
  }

DECORATIVE ELEMENTS (CSS utilities):
  .section-number: absolute, Bebas Neue, 160px, opacity 0.05, walnut
  .ruled-heading::before: display:block, content:'', width:48px,
    height:4px, bg:var(--honey), border-radius 2px, margin-bottom 16px
  .double-border: outline: 3px solid var(--linen-dark),
    outline-offset: 6px, border: 1px solid var(--border)
GLOBAL ANIMATIONS (globals.css):
  @keyframes fadeUp       { 0%{opacity:0;transform:translateY(36px)} 100%{opacity:1;transform:none} }
  @keyframes fadeIn       { 0%{opacity:0} 100%{opacity:1} }
  @keyframes slideLeft    { 0%{opacity:0;transform:translateX(30px)} 100%{opacity:1;transform:none} }
  @keyframes slideRight   { 0%{opacity:0;transform:translateX(-30px)} 100%{opacity:1;transform:none} }
  @keyframes scaleIn      { 0%{opacity:0;transform:scale(0.9)} 100%{opacity:1;transform:scale(1)} }
  @keyframes shimmer      { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes pulseRing    { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.9);opacity:0} }
  @keyframes tickerMove   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes floatY       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes spinSlow     { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
  @keyframes toastIn      { 0%{transform:translateX(110%);opacity:0} 100%{transform:none;opacity:1} }
  @keyframes toastOut     { 0%{transform:none;opacity:1} 100%{transform:translateX(110%);opacity:0} }
  @keyframes drawerIn     { 0%{transform:translateX(100%)} 100%{transform:none} }
  @keyframes drawerOut    { 0%{transform:none} 100%{transform:translateX(100%)} }
  @keyframes overlayIn    { 0%{opacity:0} 100%{opacity:1} }

::selection { background: var(--honey); color: var(--parchment); }
::-webkit-scrollbar { width: 8px; background: var(--parchment-2); }
::-webkit-scrollbar-thumb { background: var(--walnut-soft); border-radius: 4px; }
:focus-visible { outline: 2.5px solid var(--honey); outline-offset: 3px; }
═════ ROOT LAYOUT — src/app/layout.js ═════
'use client'
Import fonts via next/font/google
Import ToastContext provider
Import AdminContext provider
State: isLoading = true → false after 4200ms (useEffect)
Render order:
  <ToastProvider>
    <AdminProvider>
      {isLoading && <WorkshopLoader isExiting={exiting} />}
      <TickerBanner />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingWA />
      <ScrollTop />
      <ToastStack />
    </AdminProvider>
  </ToastProvider>
Metadata:
  title: "মা ফার্নিচার — কুষ্টিয়ার সেরা আসবাবপত্র"
  description: "কুষ্টিয়া দৌলতপুরের প্রিমিয়াম হস্তনির্মিত আসবাবপত্র"
  themeColor: "#7C4B2A"
═════ TICKER BANNER ═════

Height: 38px, bg: var(--walnut), color: var(--parchment)
Infinite ticker (CSS animation tickerMove):
"🪵 বিনামূল্যে হোম ডেলিভারি (কুষ্টিয়া)  ✦  কাস্টম ফার্নিচার অর্ডার নেওয়া হয়  
 ✦  সেগুন, মেহগনি ও গামারি বিশেষজ্ঞ  ✦  ১ বছর ওয়ারেন্টি সকল পণ্যে  
 ✦  ইনস্টলেশন সার্ভিস ফ্রি  🪵"
Double the content for seamless loop
═════ SITE HEADER — BRAND NEW DESIGN ═════
File: SiteHeader.js
LAYOUT: 3-zone header, height 78px desktop / 62px mobile
Background: var(--parchment-2)
Border-bottom: 3px solid var(--honey)
Position: sticky top:0, z-index: 900
On scroll > 80px: bg var(--parchment), box-shadow var(--shadow-md)
Transition: background 0.3s, box-shadow 0.3s
ZONE LEFT — Brand:
  SVG logo mark:
    A stylized house/roof shape made of wood plank outlines
    Color: var(--walnut), size: 38×30px
  Text block:
    "মা ফার্নিচার" Rozha One 24px var(--walnut-deep)
    "সাতারপাড়া বাজার, দৌলতপুর" Noto Sans Bengali 10px var(--bark-soft)

ZONE CENTER — Navigation (desktop only, > 1024px):
  Links: হোম | পণ্য সমূহ ▾ | ফটো গ্যালারি | ডিজাইন গ্যালারি | অর্ডার প্রক্রিয়া | যোগাযোগ
  Style: Noto Sans Bengali 14px var(--bark-mid), uppercase letter-spacing 0.05em
  
  Active/hover state:
    Text color: var(--walnut)
    Animated underline: ::after with height 2px bg var(--honey)
    scaleX 0→1 on hover, transform-origin: left
   "পণ্য সমূহ" MEGA DROPDOWN:
    Full-width panel, max-height 380px
    Background: var(--parchment) with top border 3px honey
    Box-shadow: var(--shadow-lg)
    Grid: 5 columns of category cards
    Each card:
      Warm linen background
      react-icons icon (50px, walnut colored)
      Category name Noto Sans Bengali bold
      Product count badge (honey pill)
      Hover: lift + border-bottom honey
    Appears with slideDown 0.3s ease animation

ZONE RIGHT:
  🔍 Search icon button (walnut, 22px)
  Divider line
  📞 "+8801729728818" Bebas Neue 15px walnut
  Divider
  WhatsApp button:
    Pill shape, bg: var(--whatsapp), color white
    "💬 অর্ডার করুন" Noto Sans Bengali 13px
    Hover: brightness(1.1), translateY(-1px)

MOBILE (< 1024px):
  Logo + hamburger (animated bars ↔ X)
  Hamburger opens:
    Full-screen slide-in panel (drawerIn animation)
    Background: var(--parchment)
    Large Rozha One nav links
    Category accordion (expand/collapse)
    Contact info bottom
═════ HOMEPAGE — page.js — ALL SECTIONS DETAILED ═════

'use client'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — CINEMATIC HERO (CinematicHero.js)
NEW LAYOUT: "MAGAZINE SPREAD" — NOT TRADITIONAL SLIDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Height: 100vh, min 620px
Background: var(--parchment-2) + wood grain texture

OUTER GRID:
  Left strip (8%): decorative vertical text
    "মা ফার্নিচার ২০২৪" rotated 90°, Bebas Neue, honey color
    Thin vertical line beside it
  
  Main area (92%): two-column asymmetric
    Left content (45%): editorial text side
    Right image (55%): full-height product image

LEFT CONTENT COLUMN:
  Section label: "FEATURED COLLECTION" Bebas Neue 13px honey
                  with 40px horizontal line before text
  
  Large heading (3 lines, Rozha One):
    "আপনার ঘর" — 68px walnut-deep
    "হোক আরও" — 80px walnut, background-clip text gradient effect:
      background: linear-gradient(135deg, var(--walnut), var(--honey))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
    "সুন্দর" — 68px walnut-deep, italic
  
  Decorative element: handwritten-style underline (SVG path, honey)
  
  Description: Noto Sans Bengali 16px bark-mid, line-height 1.9, max-width 420px
  
  Price block (editorial style):
    Left border: 5px solid var(--honey)
    Padding-left: 20px
    "শুরু মাত্র" Bebas Neue 14px bark-soft
    "৳২,৫০০" Rozha One 52px walnut
    "থেকে" Noto Sans Bengali 14px bark-soft
  
  CTA row:
    Button 1 (PRIMARY): bg walnut→honey gradient, parchment text
      "পণ্য সংগ্রহ দেখুন" Noto Sans Bengali 15px
      Pill shape, height 54px, arrow icon inside
      Hover: reverse gradient + translateY(-3px) + shadow
    Button 2 (OUTLINE): walnut border 2px, walnut text
      "ডিজাইন গ্যালারি" 
      Pill shape, height 54px
      Hover: bg fills with linen
  
  Trust row (below buttons):
    3 items with honey dot separators:
    "⭐ ৪.৯ রেটিং" | "১০+ বছর" | "৫০০+ পণ্য"
    Fira Code, 13px, bark-soft

RIGHT IMAGE COLUMN:
  Full height, overflow hidden, position relative
  
  Main product image:
    next/image, fill, object-cover
    Rounded left edge: border-radius 0 0 0 80px (asymmetric)
    animation: floatY 5s ease-in-out infinite
  
  OVERLAPPING DECORATIVE CARDS (absolute positioned):
    
    Card A — "Current Product" (bottom-left, overlaps left column):
      Width 200px, bg var(--parchment) with wood grain
      Double-border style: outline 2px honey, offset 4px
      Product name (small, bold) + price + mini WA button
      Shadow: var(--shadow-md)
      animation: fadeUp 1s 0.5s both
    
    Card B — "Rating" (top-right inside image):
      Small circle, 70px, bg var(--walnut)
      "4.9" Rozha One 22px parchment
      "★★★★★" honey stars (small)
  
  Decorative geometric:
    Large hollow circle outline (200px, 2px dashed, honey 30% opacity)
    Positioned center-right, behind image

SLIDER CONTROLS:
  Bottom-center of left column:
    5 segments (not dots): each 30px wide, 4px tall, linen-dark
    Active segment: full honey color, 50px wide (expands)
    Prev/Next: minimal arrow buttons (walnut outline circle)
  
  Auto-advance: 5.5 seconds
  Transition: opacity + slight translateX crossfade

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — SMART SEARCH BLOCK (SmartSearchBlock.js)
NEW LAYOUT: "COMMAND BAR" STYLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: var(--walnut-deep)
Skewed top edge: clip-path polygon(0 0, 100% 6%, 100% 100%, 0 100%)
Padding: 70px var(--container-px)

Layout: 2 cols (text left 35%, form right 65%)

Left:
  Label: "SEARCH" Bebas Neue 13px honey
  Heading: "খুঁজে নিন আপনার পছন্দের আসবাব" Rozha One 36px parchment
  Subtext: Noto Sans Bengali bark-soft (parchment tinted)

Right: Search form
  Container: bg rgba(255,255,255,0.07), border: 1px solid rgba(212,136,42,0.3)
  Border-radius: var(--radius-lg), padding 24px
  
  ROW 1: Large text input (full width)
    Placeholder: "পণ্যের নাম বা ID লিখুন..."
    Style: transparent bg, parchment text, bottom-border only honey
    Font: Noto Sans Bengali 18px
  
  ROW 2: 4 filter selects + search button (flex row)
    Category | Min ৳ | Max ৳ | Sort
    Each: small, honey-focused, parchment text
    
    SEARCH BUTTON:
      bg: var(--honey), bark text, pill, Bebas Neue 18px
      "খুঁজুন →" with search icon
      Hover: bg honey-light + scale(1.03)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — BESTSELLER TRACK (BestsellerTrack.js)
NEW LAYOUT: OVERLAPPING TICKER ROW WITH LARGE FEATURE CARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: var(--parchment)
Section number: "01" absolute, Bebas Neue 180px, opacity 0.04, walnut

Section header (left-aligned):
  .ruled-heading class
  "BEST SELLERS" label caps
  "সর্বাধিক বিক্রিত পণ্য" heading-lg
  Product count badge: honey pill right-aligned

Content: TWO-PART layout

LEFT (35%): FEATURED BESTSELLER CARD
  Large card (full height of section)
  Background: var(--walnut) + wood grain
  Product image: next/image, aspect-ratio 3/4
  Bottom info bar: parchment bg bottom of card
    Product name (Rozha One, white/parchment)
    Price: honey color large
    "#1 বিক্রিত" badge sienna
    "অর্ডার করুন" mini button

RIGHT (65%): HORIZONTAL SCROLL TRACK
  Auto-scrolls (requestAnimationFrame smooth scroll)
  Pause on hover/touch
  ProductCard components (compact variant, 220px wide)
  Left/right arrow buttons
  Gradient fade edges (left/right) showing more items

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — CATEGORY BENTO GRID (CategoryBento.js)
NEW LAYOUT: BENTO BOX GRID (not equal cards)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: var(--parchment-2)
Skewed edges top/bottom: clip-path

Heading: centered
  "আমাদের পণ্য সংগ্রহ" + "COLLECTIONS" label

BENTO GRID (CSS Grid, not equal):
  Desktop: 4 columns, 2 rows
  Grid layout:
    Item 1 (LARGE): col 1-2, row 1-2 — double size hero category
    Item 2: col 3, row 1
    Item 3: col 4, row 1
    Item 4: col 3, row 2
    Item 5: col 4, row 2
    Items 6-10: 5-col row below, equal size

Each bento cell:
  Background: var(--linen) + wood grain
  Border: 1px solid var(--border)
  Border-radius: var(--radius-md)
  Overflow hidden
  
  LARGE CELL:
    react-icons icon (100px, walnut)
    Category name Rozha One 36px
    Product count
    Background image tint (colored per category)
    "দেখুন →" large button
  
  SMALL CELL:
    Icon (60px) + name (20px) + count badge
    Hover: bg var(--walnut), text parchment, icon becomes white
  
  All cells: hover scale(1.02), shadow increase, cursor pointer
  Click → navigate to /category/[id]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — CATEGORY PRODUCT SECTIONS (for all 10 categories)
NEW LAYOUT: ALTERNATING MAGAZINE STYLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For each category, render CategorySection component.
Section bg cycles: parchment / parchment-2 / parchment-3

SECTION HEADER (ASYMMETRIC):
  Left side:
    Large decorative section number (02, 03...) Bebas Neue 96px opacity:0.07
    Category icon (60px, walnut colored)
    "CATEGORY" label caps in honey
    Category name heading-md walnut-deep
    Product count pill
  Right side:
    "সকল [name] দেখুন →" link (walnut, underline hover)
    
PRODUCT ROW:
  Horizontal scroll with arrows (left/right walnut circle buttons)
  Auto-slides every 4.5 seconds
  Touch swipe support (touchstart/touchend)
  6 products visible

  PRODUCT CARDS: (see ProductCard section below)

"আরও পণ্য দেখুন" button (centered below, honey outline, Noto Sans Bengali):
  Hover: bg fills honey, text bark

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — WOOD TYPES GRID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: var(--walnut-deep) skewed section
Heading: parchment colored, centered
"আমাদের কাঠের মান" Rozha One

4-card grid (2×2 on mobile):
  Each card: bg rgba(255,255,255,0.06), honey border, border-radius-lg
  Top: wood log SVG icon
  Wood type name: parchment Rozha One 22px
  Description: bark-soft (parchment-tinted) small
  Material badge: honey pill

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — DESIGN TEASER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: var(--parchment-3)
TWO-COLUMN layout:
  Left (40%): editorial text
    Label + heading + description + "সকল ডিজাইন দেখুন →" button
  Right (60%): 6-item design grid (3×2)
    DesignCard components (compact)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — GALLERY TEASER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: var(--parchment-2)
3-column masonry (CSS columns)
9 gallery images with hover overlays
"আরও ছবি দেখুন" centered CTA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9 — ORDER STEPS (OrderSteps.js)
NEW LAYOUT: HORIZONTAL CARD TIMELINE WITH ICONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: var(--parchment)
Diagonal top: clip-path

4 step cards in a horizontal row (2×2 on mobile):
  Each card:
    bg: var(--linen), border: 1px solid var(--border)
    Border-radius: var(--radius-md)
    Top-center: large step number circle (walnut bg, parchment text, Rozha One)
    Icon: react-icons 36px honey
    Step title: Noto Sans Bengali bold walnut-deep
    Description: bark-soft small
    Card hover: walnut bg, all text parchment
  
  Zigzag connector between cards (CSS border trick, honey dashed)

WhatsApp CTA banner below (honey bg, walnut text):
  Full width, padding 32px
  "📱 এখনই WhatsApp এ অর্ডার করুন — +8801979728818"
  Large Rozha One + green WA button

━━━SECTION 10 — CONTACT (id="contact")
Background: var(--parchment-2)
Two columns:
  Left: contact info with icon rows, large WA button
  Right: styled map placeholder card (double-border, walnut)
═════ PRODUCT CARD — COMPLETELY NEW DESIGN ═════

File: ProductCard.js

TWO VARIANTS: 'standard' (default) and 'compact' (for rows)

STANDARD CARD:
  Background: var(--parchment) + wood grain overlay
  Border: 1px solid var(--border)
  Border-radius: var(--radius-card)
  Overflow: hidden
  Box-shadow: var(--shadow-card)
  Transition: all 0.38s cubic-bezier(0.34,1.56,0.64,1)
  
  Hover state:
    translateY(-8px) scale(1.015)
    box-shadow: var(--shadow-lg)
    border-color: var(--honey)
  
  IMAGE ZONE (aspect-ratio 5/4):
    next/image object-cover
    
    Warm overlay gradient: transparent → rgba(91,49,24,0.45) (bottom)
    On hover: image scale 1.07 (inner scale, card stays same)
    
    BADGES (top-left, stacked):
      SALE: bg var(--sienna), parchment text, Bebas Neue
        "৳X,XXX ছাড়" — pill shape
      NEW: bg var(--honey), bark text
        "নতুন" — pill
      HOT: bg walnut gradient, parchment
        "🔥 জনপ্রিয়" — pill
    
    PRODUCT ID (bottom-left):
      "#PRD-001" Fira Code 10px
      bg: rgba(91,49,24,0.7), parchment text, padding 3px 8px, radius 4px
    
    HOVER ACTION ROW (slides up from bottom on hover):
      Dark walnut strip at card bottom
      Two icon buttons: WhatsApp (green), Copy ID (honey)
      "বিস্তারিত দেখুন" text center
      transform: translateY(100%→0%) on parent hover

  CARD BODY (padding 18px):
    Category tag: Bebas Neue 11px, honey border, honey text, pill
    Product name: Noto Sans Bengali 600 15px walnut-deep, 2-line clamp
    
    Rating row: 5 stars (honey) + count Fira Code bark-soft
    
    PRICE ROW:
      Current: Rozha One 24px var(--walnut) "৳৪,৫০০"
      Original: Noto Sans Bengali 13px line-through bark-soft
      Discount: Bebas Neue 13px sienna bg parchment pill "১৮%"
    
    BOTTOM ACTION:
      "বিস্তারিত দেখুন" — full width 44px
      Default: bg transparent, border 1.5px walnut, walnut text
      Hover: bg walnut gradient, parchment text
      Noto Sans Bengali 14px
      Arrow icon slides in on hover (→)
═════ PRODUCT DRAWER — REPLACES MODAL, SLIDES FROM RIGHT ═════
File: ProductDrawer.js
Style: slides in from RIGHT side (not centered modal)
State in parent: selectedProduct (null or product object)
BACKDROP: rgba(59,31,12,0.55) fadeIn, click to close

DRAWER PANEL:
  Width: min(580px, 96vw)
  Height: 100vh
  Position: fixed right:0 top:0
  Background: var(--parchment)
  Box-shadow: -8px 0 40px rgba(91,49,24,0.2)
  animation: drawerIn 0.4s cubic-bezier(0.34,1.56,0.64,1)
  Overflow-y: auto

DRAWER HEADER (sticky top of drawer):
  Background: var(--parchment-2), border-bottom: 2px solid var(--honey)
  Height: 60px
  Left: "#PRD-001" Fira Code + copy button
  Center: "পণ্যের বিবরণ" Noto Sans Bengali
  Right: ✕ close button (walnut, hover honey)

IMAGE SECTION:
  Main image: next/image, aspect-ratio 4/3, object-cover
  Rounded corners: var(--radius-md)
  
  Below image: 3 thumbnail row
    Each: 68px height, object-cover, border-radius 8px
    Active: 2px honey border + honey shadow
    Click: swap main with crossfade opacity 0.2s

CONTENT SECTION (padding 24px):
  Product name: Rozha One 28px walnut-deep
  Rating: honey stars + review count
  
  Price block (left border 4px honey, padding-left 18px):
    Current: Rozha One 38px walnut "৳৪,৫০০"
    Original + discount (if applicable)
    Divider: 1px linen-dark
  SPECS GRID (2-column, alternating parchment/parchment-2 rows):
    Label (Noto Sans Bengali 12px bark-soft) | Value (14px bark)
    উপাদান | ফিনিশ | মাপ | রঙ | ওজন | ওয়ারেন্টি | স্টক
    In-stock: moss green "✅ পাওয়া যাচ্ছে"
  Description: Noto Sans Bengali 14px bark-mid, line-height 1.8
    Quantity:
    Label: "পরিমাণ:"
    [−] [02] [+] — walnut border, Fira Code number, honey focus
  STICKY BOTTOM ACTION BAR (fixed bottom of drawer):
    Background: var(--parchment-2), border-top: 2px honey
    Padding: 16px 24px
    Full width WhatsApp button (green 52px pill):
      "📱 WhatsApp এ অর্ডার করুন"
    Below: "📋 তথ্য কপি করুন" link
Mobile: drawer = full screen
═════ ADMIN PANEL — COMPLETELY NEW DESIGN ═════

File: src/app/admin/page.js + AdminShell.js
━━━━ PASSWORD GATE — NEW DESIGN ━━━━━━
Full page background: var(--parchment-2) + repeating wood grain
Center: 500px card with UNIQUE design:

  TOP DECORATIVE BAND:
    100% width, 10px height
    Background: repeating-linear-gradient(90deg, 
      var(--walnut) 0, var(--walnut) 20px,
      var(--honey) 20px, var(--honey) 40px,
      var(--walnut-soft) 40px, var(--walnut-soft) 60px)
    (striped like wood grain sample)
    LOGO BLOCK (center):
    Large SVG house/furniture icon (80px, walnut)
    "মা ফার্নিচার" Rozha One 32px walnut-deep
    "অ্যাডমিন প্যানেল" Bebas Neue 16px honey letter-spacing 0.4em
  
  PASSWORD INPUT AREA:
    Label: "🔐 পাসওয়ার্ড দিন" Noto Sans Bengali
    Input: 
      Full width, height 52px
      bg: var(--parchment), border: 2px solid var(--linen-dark)
      border-radius: var(--radius-md)
      Focus: border-color honey, box-shadow: 0 0 0 4px rgba(212,136,42,0.15)
      Noto Sans Bengali 16px
      Eye icon button (toggle visibility) inside right
    Forgot notice: "ডিফল্ট পাসওয়ার্ড: mafurniture2024" (tiny, bark-soft)
  
  LOGIN BUTTON:
    Full width, 54px height, border-radius var(--radius-md)
    Background: walnut → honey diagonal gradient (135deg)
    Text: "প্রবেশ করুন" Noto Sans Bengali 16px parchment
    Right: arrow icon →
    Hover: reverse gradient + translateY(-2px) + shadow-md
        Loading state (while "checking"): spinner icon inside, disabled
  ERROR STATE:
    Shake animation: @keyframes shake (translateX ±6px, 3 cycles, 0.4s)
    Red-tinted border on input + error message below:
      "ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।" bark-mid

━━━━ ADMIN SHELL LAYOUT ━━━━
Overall: 3-part layout
  TOP BAR (60px, full width)
  CONTENT AREA: LEFT SIDEBAR (260px) + MAIN (flex-grow)

TOP BAR:
  Background: var(--walnut-deep)
  Left: logo + "Admin Dashboard" Bebas Neue parchment
  Center: breadcrumb (current tab name, parchment)
  Right: clock (live time, Fira Code honey) + logout button (honey outline)
SIDEBAR:
  Background: var(--walnut)
  Width: 260px (collapsible to 72px on mobile)
  
  SHOP INFO CARD (top of sidebar):
    bg: rgba(255,255,255,0.07), border-radius var(--radius-md), padding 16px
    Small logo + shop name (parchment Rozha One) + address (bark-soft small)
    NAVIGATION MENU:
    Items (Noto Sans Bengali 14px parchment):
      [📊] ড্যাশবোর্ড
      [📦] পণ্য তালিকা
      [➕] নতুন পণ্য যোগ
      [🗂️] ক্যাটাগরি
      [📸] ফটো গ্যালারি
      [🎨] ডিজাইন গ্যালারি
      [💾] ডেটা Export
      [🚪] লগআউট
    
    Each item: flex row, icon (20px honey) + text
    Padding: 14px 20px
    Hover: bg rgba(255,255,255,0.1)
    Active: bg rgba(212,136,42,0.25) + left-border 4px honey
            + text color honey
    SIDEBAR FOOTER:
    Phone + WA number (parchment-dim, Fira Code tiny)
    Version "v1.0.0" (bark-soft tiny)
MAIN CONTENT AREA:
  Background: var(--parchment)
  Padding: 28px 32px
  Overflow-y: auto

━━━━ DASHBOARD PANEL ━━━━━━

Page title: "ড্যাশবোর্ড" Rozha One 32px walnut-deep
Subtitle: current date (Fira Code honey)

STATS GRID (2×2 desktop, 2×2 tablet, 1 col mobile):
  Each card — UNIQUE design:
    bg: var(--parchment-2) + wood grain
    Border-radius: var(--radius-md)
    Border-left: 6px solid (different color each card)
    Padding: 24px
    LEFT: Icon in circle (60px, color matches border)
    RIGHT: Count (Rozha One 48px walnut-deep)
            Label (Noto Sans Bengali 13px bark-soft)
            Change note (Fira Code 11px moss/sienna)
    
    Cards:
      1. 📦 মোট পণ্য — border: var(--walnut)
      2. 🗂️ ক্যাটাগরি — border: var(--honey)
      3. 🎨 ডিজাইন — border: var(--sienna)
      4. 📸 গ্যালারি — border: var(--moss)
QUICK ACTIONS ROW (below stats):
  4 pill buttons: "নতুন পণ্য" | "নতুন ডিজাইন" | "ছবি যোগ" | "Export"
  Each: honey border, walnut text → honey bg on hover
RECENT PRODUCTS TABLE (last 6):
  Title: "সম্প্রতি যোগ করা পণ্য" Rozha One 20px
  
  TABLE DESIGN (new style):
    No traditional table borders
    Each row: card-like, bg parchment-2, rounded, shadow-sm, margin-bottom 8px
    Columns: [thumb 48px] [ID+Name] [Category pill] [Price Rozha] [Stock] [Actions]
    Row hover: bg linen, translateX(4px) (slight slide effect)
    
    ID: Fira Code honey pill
    Category: Bebas Neue colored pill
    Price: Rozha One walnut
    Stock: ✅ moss green / ❌ sienna red pills
    Actions: pencil icon (honey) + trash icon (sienna)

━━━━ PRODUCT LIST PANEL ━━
Header row:
  Title: "পণ্য তালিকা" + total count badge
  Right: search input + category filter + "নতুন পণ্য যোগ করুন +" button
    Button: honey bg, walnut text, pill, Noto Sans Bengali

FILTER TOOLBAR (below header):
  Horizontal scrollable pill filters:
    All | by category name... | In Stock Only | Featured | Top Selling
  Active filter: walnut bg, parchment text
PRODUCT TABLE:
  Card-row style (same as dashboard recent but full columns):
    Cols: Thumb | ID | বাংলা নাম | ক্যাটাগরি | মূল্য | স্টক | Featured | TopSell | Actions 
    Thumb: 52×44px, border-radius 8px, object-cover, honey border
    ID: Fira Code 11px, honey pill
    Name: Noto Sans Bengali 14px walnut-deep
    Category: Bebas Neue pill (category color)
    Price: Rozha One 16px walnut
    Stock: toggle switch (moss=on, sienna=off), click updates state
    Featured: toggle switch
    TopSell: toggle switch
        Actions:
      ✏️ Edit button (honey outline pill, small): opens ProductForm pre-filled
      🗑️ Delete button (sienna outline pill, small): opens ConfirmDialog
PAGINATION:
  Custom styled: [← আগে] [1] [2] [3] ... [শেষ] [পরে →]
  Active page: walnut bg, parchment text, Rozha One
  20 items per page

━━━━ PRODUCT FORM (Add/Edit) — ProductForm.js ━━━━
Appears as: Panel replacement (not modal) — slides in from right
  OR on "নতুন পণ্য" tab click: renders in main area
FORM HEADER:
  Back arrow + title: "নতুন পণ্য যোগ করুন" / "পণ্য সম্পাদনা করুন"
  Subtitle: "সকল * চিহ্নিত তথ্য আবশ্যক"

FORM LAYOUT: 3-column grid (desktop), 2-col (tablet), 1-col (mobile)
SECTION A — পরিচিতি (Identity):
  Section heading with ruled-heading style
  পণ্য ID*: Fira Code styled input, auto-generates "PRD-071"
             (with "কপি" icon button inside)
  পণ্য নাম (বাংলা)*: large input, Noto Sans Bengali
  English Name*: Bebas Neue styled
  ক্যাটাগরি*: custom styled select (not browser default):
    Shows category icon + name in options
    Dropdown with honey active highlight
SECTION B — মূল্য (Pricing):
  Three fields in a row:
    বিক্রয় মূল্য* ৳ | আসল মূল্য ৳ | (auto-calc discount %)
  Discount badge preview (live):
    Shows "X% ছাড়" as you type both prices

SECTION C — ছবি (Images):
  "মূল ছবি URL"*: input + live preview card beside it
  "অতিরিক্ত ছবি ১" + "অতিরিক্ত ছবি ২": same style
  Preview cards: 80×60px thumbnails, border-radius 8px
                 If URL valid: shows image. If not: shows placeholder icon
SECTION D — বিবরণ (Details):
  উপাদান | ফিনিশ | মাপ (input with "সেমি" suffix) | রঙ | ওজন (input with "কেজি" suffix) | ওয়ারেন্টি
  Each in its own labeled input group
SECTION E — বিস্তারিত বিবরণ:
  বিবরণ* textarea (5 rows, Noto Sans Bengali 14px, honey focus)
  Tags input (comma-separated, pills appear as you type)
    Each tag: small honey pill with ✕ remove button
SECTION F — অবস্থা (Status) TOGGLES ROW:
  4 toggle switches with labels (full width, evenly spaced):
    স্টকে আছে | ফিচার্ড | সেরা বিক্রিত | নতুন পণ্য
  TOGGLE DESIGN (custom CSS):
    Track: 48×26px, border-radius 13px
    OFF: var(--linen-dark) bg
    ON: var(--honey) bg (animated)
    Thumb: white circle 20px, translateX animates 0→22px
    Label text: Noto Sans Bengali 14px bark-mid below
FORM FOOTER (sticky bottom):
  bg: var(--parchment-2), border-top: 2px honey, padding: 16px 24px
  Left: "* চিহ্নিত তথ্য আবশ্যক" (small bark-soft)
  Right: two buttons:
    "বাতিল করুন" — honey outline, walnut text, pill
    "পণ্য সংরক্ষণ করুন →" — walnut→honey gradient, parchment, pill
    Saving state: spinner + "সংরক্ষণ হচ্ছে..." text + disabled

FORM VALIDATION:
  Real-time validation (onBlur):
    Required fields: honey-glow border + small error message below
    Price validation: must be positive number
  
  On submit with errors: shake all invalid fields + scroll to first error

━━━━ CATEGORY PANEL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Two-column layout:
  Left (45%): Add/Edit form
    Card-style form (var(--parchment-2) bg, walnut border)
    Fields: নাম (বাংলা) | English Name | icon class (FA) | category color
    Submit: "ক্যাটাগরি যোগ করুন" honey button
  Right (55%): Categories list
    Card-row style, each shows: icon + name + product count + edit/delete

━━━━ PHOTO GALLERY PANEL ━━━━━
Header: title + "নতুন ছবি যোগ" button
Add form (collapsible panel, expands on button click):
  ID (auto) | শিরোনাম | URL | ক্যাটাগরি select | বিবরণ
  Image preview live
  "যোগ করুন" honey button
Gallery grid (3-col desktop, 2-col tablet, 1-col mobile):
  Each: image + hover overlay with title + delete button (sienna)
  Edit: click opens form pre-filled
━━━━ DESIGN GALLERY PANEL ━━━━━
Same structure as Photo Gallery panel but with extra fields:
  ক্যাটাগরি (select) | স্টাইল (select) | উপাদান | ট্যাগ | জনপ্রিয় toggle
━━━━ EXPORT PANEL ━━━━
4 export cards in 2×2 grid:
  Each card:
    bg: var(--parchment-2), honey border-top 4px
    Icon (60px, walnut) + label + count
    Two buttons: "JSON কপি করুন" + "ফাইল ডাউনলোড"
    Success state: button turns moss green "✅ কপি হয়েছে"

Instructions box (walnut bg, parchment text, walnut-deep border):
  Step-by-step instructions for manually updating data files

━━━━ TOAST NOTIFICATIONS ━━━━

ToastStack.js — useContext(ToastContext)
Position: fixed bottom-right, stacked, max 4 visible
Each toast:
  Width: 320px
  bg: var(--parchment-2), border-radius var(--radius-md)
  Left accent border 5px:
    Success: var(--moss) + ✅ icon
    Error: var(--sienna) + ❌ icon
    Info: var(--honey) + ℹ️ icon
  
  Animation: toastIn 0.35s ease + toastOut 0.35s ease (before remove)
  Auto-dismiss: 3.5s
  Manual ✕ close button
  Progress bar (bottom, shrinks over 3.5s, matching border color)

━━━━ CONFIRM DIALOG ━━━━━
Custom component, NOT window.confirm
Centered overlay:
  Backdrop: rgba(59,31,12,0.5)
  Box: 400px, parchment bg, walnut border 2px, radius-md
  
  Top: warning icon (sienna, 48px) + title Rozha One 22px
  Body: description Noto Sans Bengali 14px bark-mid
  Buttons: "হ্যাঁ, মুছে দিন" (sienna gradient) + "না, বাতিল" (outline)
  
  Animation: scaleIn 0.25s ease
═════ DESIGN GALLERY PAGE ═════
Page hero: var(--parchment-3), height 250px
Title: "ডিজাইন গ্যালারি" Rozha One 52px walnut-deep
Filter row (sticky): category tabs + style pills + result count
DESIGN GRID: 4/3/2/1 cols
DESIGN CARD (DesignCard.js) — new design:
  bg: var(--linen), border: 1px var(--border), radius: var(--radius-card)
    Image (aspect-ratio 4:3):
    object-cover
    ID badge top-left (Fira Code, walnut pill)
    Category top-right (Bebas Neue honey pill)
        Hover overlay (walnut semi-transparent):
      3 action buttons centered (icon-only circles):
        👁 View (parchment)
        ⬇ Download (honey)
        📋 Copy ID (linen)
      Scale 0→1 on hover (staggered)
    Body:
    Design name Noto Sans Bengali bold 14px walnut-deep
    Style badge (Bebas Neue pill, style-specific color)
    Material small bark-soft
    জনপ্রিয় badge if true: honey fill Bebas Neue
DESIGN DRAWER (DesignDrawer.js):
  Same slide-in-from-right style as ProductDrawer
  Image: full width, object-contain, bg linen
  Top actions:
    ID badge + copy button
    Download button: fetch→blob→anchor download
    Close ✕
   Details: name, category, style, material specs table
  Description
  WhatsApp order button (sticky bottom):
    Message: "আমি ডিজাইন ID: [id] ([name]) অর্ডার করতে চাই।"
═════ PHOTO GALLERY PAGE ═════
Hero: var(--walnut) bg + grain, height 230px, parchment text
Filter tabs: pill row (সব, শোরুম, ওয়ার্কশপ, ডেলিভারি, ইভেন্ট, টিম)
Active: honey bg bark text | Inactive: parchment bg walnut border
Masonry grid: CSS columns 3/2/1
Each photo:
  border-radius var(--radius-md), overflow hidden
  Hover: walnut overlay (0.65 opacity) + title + category (slide up)
  Click → Lightbox
LIGHTBOX:
  Overlay: rgba(59,31,12,0.9)
  Image centered, max 88vw × 88vh, border-radius var(--radius-md)
  Below: title + date (parchment Noto Sans Bengali)
  Left/Right arrows (walnut circle, 54px, honey icon)
  ✕ top-right
  ESC closes
════ CATEGORY PAGE ════
Hero: diagonal clip-path, walnut gradient, grain overlay
  Category icon (80px parchment) + name Rozha One 52px parchment
  Count + breadcrumb
Layout: sidebar (260px) + main grid
SIDEBAR (new style):
  bg: var(--parchment-2), border-right: 2px honey
    PRICE RANGE:
    Custom CSS range (honey thumb, linen track)
    Live price display with ৳ symbol
    SORT OPTIONS:
    Pill-style radio buttons (not traditional radio):
      নতুন | দাম ↑ | দাম ↓ | জনপ্রিয়
      Active: walnut bg parchment | Inactive: linen border
    STOCK TOGGLE: custom CSS switch
  CATEGORIES: 
    List pills, current: honey bg
    APPLY button: walnut gradient full-width pill
  CLEAR link: honey underline right-aligned
PRODUCT GRID: 4/3/2/1 cols, staggered fadeUp animations
═════ SEARCH PAGE ═════
Hero: search bar refilled, result count
Breadcrumb + applied filter pills (dismissible, honey ✕)
Highlight matched text: <mark> with honey bg bark text
Same sidebar + grid as category page
═════
SITE FOOTER
═════
Background: var(--walnut-deep) + grain
Border-top: 4px solid var(--honey)
4 cols (2×2 tablet, 1 col mobile):
  1. Brand: logo + tagline + social icons (honey colored)
  2. Quick links: arrow hover animation (→ slides right)
  3. Categories: all 10
  4. Contact: all info + WA button
Decorative: horizontal rule between cols (linen-dark opacity)
Bottom bar:
  "© ২০২৪ মা ফার্নিচার | কুষ্টিয়া, দৌলতপুর, সাতারপাড়া বাজার"
  Fira Code 11px parchment-dim
═════ FLOATING ELEMENTS ═════
WHATSAPP BUTTON (FloatingWA.js):
  Fixed bottom:28px right:28px
  62px circle, bg: var(--whatsapp)
  react-icons FaWhatsapp 28px white
  Two ring animations (pulseRing) staggered 0.5s
  Tooltip (left side): "WhatsApp এ অর্ডার করুন"
    Slides from right on hover, bg walnut parchment text pill
  Mobile: moves up when bottom nav shown

SCROLL TO TOP (ScrollTop.js):
  Fixed bottom:28px left:28px
  48px circle, bg: var(--honey), walnut arrow ↑
  Appears after 400px scroll (fadeIn)
  Hover: bg walnut, parchment icon

MOBILE BOTTOM NAV BAR:
  Fixed bottom:0, full width, height 62px
  Background: var(--parchment-2), border-top: 2px honey
  4 icons: 🏠 হোম | 🔍 খুঁজুন | 🎨 ডিজাইন | 📱 অর্ডার
  Active: honey icon + honey dot below
  Inactive: bark-soft icon
═════ INTERSECTION OBSERVER ANIMATIONS (main.js style via useEffect in each page) ═════
useEffect in each page component:
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
.reveal: opacity 0, translateY 32px, transition 0.65s ease
.reveal.visible: opacity 1, translateY 0
Stagger children: .reveal-stagger .reveal:nth-child(n) { transition-delay: n*80ms }
Stats counter animation: count up from 0 to target over 1.5s when visible
═════ DATA FILES (same structure as before) ═════
data/categories.js — 10 categories, export const categories = [...]
data/products.js   — 70+ products (7 per category), export const products = [...]
data/gallery.js    — 30+ images, export const galleryImages = [...]
data/designs.js    — 50+ designs, export const designs = [...]
All images: https://placehold.co/680x520/7C4B2A/FDF6E8?text=[Name]
            Use warm hex colors matching the palette
══ RESPONSIVE SYSTEM ═══
Mobile-first, all CSS Modules
/* < 480px: Small mobile */
  1-col grid | Stacked hero | Full-screen drawer
  Bottom nav visible | Loader: scale(0.52)
  Admin: sidebar as top tabs
/* 480–767px: Mobile */
  1-col grid | Loader: scale(0.68)
/* 768–1023px: Tablet */
  2-col grid | Drawer: 70vw
  Admin: collapsible sidebar overlay
/* 1024–1279px: Laptop */
  3-col grid | Full header | Sidebar visible
  Admin: 240px fixed sidebar
/* 1280–1439px: Desktop */
  4-col grid | max-width 1300px
/* 1440–1919px: Large desktop */
  4-col grid | max-width 1500px
/* 1920px+: Ultra-wide */
  5-col grid | max-width 1800px
  Loader: scale(1.2) for extra large
All values clamp() as defined in design system
══PACKAGE.JSON ══
{
  "name": "ma-furniture",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18",
    "react-dom": "^18",
    "react-icons": "^5"
  }
}
next.config.js:
const nextConfig = {
  images: {
    remotePatterns: [{ protocol:'https', hostname:'placehold.co' }]
  }
};
module.exports = nextConfig;
═ DELIVERABLES — GENERATE ALL FILES 100% COMPLETE ═

Generate EVERY file completely — no TODOs, no placeholders,
no incomplete functions, no "add logic here" comments.

 1.  package.json
 2.  next.config.js
 3.  data/categories.js
 4.  data/products.js                    (70+ products)
 5.  data/gallery.js                     (30+ images)
 6.  data/designs.js                     (50+ designs)
 7.  src/context/ToastContext.js
 8.  src/context/AdminContext.js
 9.  src/app/globals.css
10.  src/app/layout.js
11.  src/app/page.js
12.  src/app/page.module.css
13.  src/app/category/[id]/page.js
14.  src/app/category/[id]/page.module.css
15.  src/app/search/page.js
16.  src/app/search/page.module.css
17.  src/app/photo-gallery/page.js
18.  src/app/photo-gallery/page.module.css
19.  src/app/design-gallery/page.js
20.  src/app/design-gallery/page.module.css
21.  src/app/admin/page.js
22.  src/app/admin/page.module.css
23.  src/components/Loader/WorkshopLoader.js       ← STORY ANIMATION
24.  src/components/Loader/WorkshopLoader.module.css
25.  src/components/Layout/SiteHeader.js
26.  src/components/Layout/SiteHeader.module.css
27.  src/components/Layout/SiteFooter.js
28.  src/components/Layout/SiteFooter.module.css
29.  src/components/Layout/TickerBanner.js
30.  src/components/Home/CinematicHero.js
31.  src/components/Home/CinematicHero.module.css
32.  src/components/Home/SmartSearchBlock.js
33.  src/components/Home/SmartSearchBlock.module.css
34.  src/components/Home/BestsellerTrack.js
35.  src/components/Home/BestsellerTrack.module.css
36.  src/components/Home/CategoryBento.js
37.  src/components/Home/CategoryBento.module.css
38.  src/components/Home/CategorySection.js
39.  src/components/Home/CategorySection.module.css
40.  src/components/Home/WoodTypesGrid.js
41.  src/components/Home/DesignTeaser.js
42.  src/components/Home/GalleryTeaser.js
43.  src/components/Home/OrderSteps.js
44.  src/components/Home/OrderSteps.module.css
45.  src/components/Home/ContactBlock.js
46.  src/components/Product/ProductCard.js
47.  src/components/Product/ProductCard.module.css
48.  src/components/Product/ProductDrawer.js
49.  src/components/Product/ProductDrawer.module.css
50.  src/components/Gallery/MasonryGallery.js
51.  src/components/Gallery/MasonryGallery.module.css
52.  src/components/Gallery/DesignGrid.js
53.  src/components/Gallery/DesignGrid.module.css
54.  src/components/Gallery/DesignDrawer.js
55.  src/components/Gallery/DesignDrawer.module.css
56.  src/components/Admin/AdminShell.js
57.  src/components/Admin/AdminShell.module.css
58.  src/components/Admin/DashboardPanel.js
59.  src/components/Admin/ProductsPanel.js
60.  src/components/Admin/ProductForm.js
61.  src/components/Admin/ProductForm.module.css
62.  src/components/Admin/CategoriesPanel.js
63.  src/components/Admin/PhotoGalleryPanel.js
64.  src/components/Admin/DesignGalleryPanel.js
65.  src/components/Admin/ExportPanel.js
66.  src/components/UI/FloatingWA.js
67.  src/components/UI/ScrollTop.js
68.  src/components/UI/ToastStack.js
69.  src/components/UI/ToastStack.module.css
70.  src/components/UI/ConfirmDialog.js
71.  src/components/UI/ConfirmDialog.module.css
72.  README.md

START COMMANDS:
  npm install
  npm run dev      → http://localhost:3000
  Admin Panel      → http://localhost:3000/admin
  Admin Password   → mafurniture2024

THE LOADING ANIMATION IS THE HERO OF THIS PROJECT.
Worker 1 walks from left → hands planks to Worker 2 → 
Worker 2 assembles them into a chair on the workbench →
chair fades out → cycle repeats.
This must be smooth, charming, warm, and tell the story
of real craftsmen building real furniture.

Design standard: Looks like a ৳3,00,000 custom-built website.
Every component intentionally designed. Every animation purposeful.
Wood tones visible everywhere. NEVER cold. NEVER dark. ALWAYS warm.

