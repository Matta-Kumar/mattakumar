# Visual asset prompt pack — mattakumar.com

Every placeholder on the site, with a generation prompt and target spec.
Tools: stills — Midjourney v7 (`--style raw`), GPT-Image, or Imagen. Video — Veo 3, Runway Gen-4, or Kling.
Add to every still prompt: **"no text, no words, no logos, no watermarks"** (negative prompt if the tool supports it).

## Global style block (prepend to every light-section prompt)

> Premium digital marketing agency aesthetic. Pure white background (#FFFFFF), near-black ink details (#0B0A14), signature violet accent (#5B3DF5) with soft lavender tints (#EFECFF). Swiss minimal design, generous negative space, soft diffused studio lighting, subtle film grain, high-end 3D render quality.

Dark variant (case studies / dark chapters):

> Deep ink background (#0B0A14), low-key dramatic lighting, violet (#5B3DF5) rim light and glow accents, cinematic, premium product-launch mood.

---

## 1. Hero scroll-video (the canvas scrubber)

- **Spec:** 5–8 s, 1920×1080 or 4K, exported to ~96 JPEG frames.
- **Critical:** motion must be SLOW and LINEAR (constant speed, no easing, no cuts, no camera shake) — the video is scrubbed by scroll, so any speed change feels broken.
- **Convert:** `ffmpeg -i hero.mp4 -vf "fps=12,scale=1920:-1" public/frames/f-%03d.jpg` then `<ScrollVideo framePath="/frames/f-{i}.jpg" frameCount={96} />`.

**Concept — "every channel, one engine" (supports the hero copy directly):** six floating channel cards — a search result, an AI chat answer, a vertical social video, a display ad, a product page, an email — start scattered at the edges, then glide into an orderly orbit around a glowing violet core and connect to it. Scattered channels → one engine. The canvas placeholder on the site already previews this exact motion.

**Video prompt:**
> Bright minimal white studio space, very slow push-in toward center. Six floating glassy UI cards drift in scattered from the edges of frame — a wide search bar card, an AI chat answer card, a tall vertical social-video card, a square display-ad card, a product-page card, an email card (abstract layouts, no readable text). Over the course of the shot they glide smoothly into a clean orbital ring around a small glowing violet sphere (#5B3DF5) at center, straightening and aligning as thin violet light lines connect each card to the sphere. Soft studio light, subtle shadows under the cards, shallow depth of field. Constant slow motion, no cuts, no camera shake, no text. 8 seconds.

(B-variant if you'd rather have people in it: same assembly concept, but shot over the shoulder of a founder at a desk — the cards assemble in the air above their laptop. Harder to keep clean; the abstract version reads better as a scrubbed background.)

**Alternative hero — "the work, up close" (real-world workstation, user-revised — screens only, no paper props):**
> Slow continuous lateral dolly shot across a professional desk setup — a sleek white desk near a large window with soft daylight, holding a laptop, two large connected monitors, and a tablet propped on a stand, all part of one clean modern workstation. The camera glides at constant speed past the screens in sequence: the tablet showing a colorful grid of social media posts, the laptop showing a split view — a search results page with one result highlighted in violet beside an AI chat assistant answer panel with one cited source glowing violet — the first monitor showing a marketing funnel diagram drawn in violet on a digital whiteboard app, and finally the main monitor displaying a clean analytics dashboard with a rising violet line chart that climbs as the camera arrives on it. Only a coffee cup and a phone rest on the desk between the devices — no papers, no notebooks. All screen content abstract and blurred-stylized with no readable text. Shallow depth of field, photoreal, bright and clean. One continuous take, no cuts, no shake, constant speed. 8 seconds.

Caveat: multi-screen AI video loves to invent gibberish UI text — reject renders with readable fake words, and verify the dashboard line climbs steadily through the whole shot (that climb is the scroll-scrub payoff).

---

## 2. Service expansion panels (7 stills, 16:10, ≥1600×1000)

Prepend the global light style block to each.

1. **SEO · GEO · AEO** — "A floating stack of minimal white search-result cards, the top card highlighted with a violet border and a #1 badge shape; above it hovers a glowing AI chat-answer card connected by a thin violet light line, with a small citation chip. Soft 3D, isometric-ish camera."
2. **Performance ads** — "A minimal 3D dashboard slab floating over white, displaying a single rising violet curve; small ad-creative thumbnail cards orbit around it; one violet target ring with a dart of light passing through."
3. **Content marketing** — "A single white document page splitting into a fan of layered sheets — article, video tile, email, social-post shapes — spreading outward like cards; the source page has a violet edge glow."
4. **Social media** — "Three floating smartphone-screen cards at different angles showing abstract reel, post, and thread layouts (blocks only, no text), connected by thin violet orbit lines, soft drop shadows on white."
5. **Web development** — "Split composition: left half a gray wireframe of a webpage built from outline boxes; right half the same layout fully rendered and polished with violet accents; thin morphing lines bridge the two halves."
6. **Ecommerce** — "A premium minimal product card with a floating add-to-cart button; a violet motion trail arcs from the button to a glowing checkout badge; a small rising revenue sparkline sits beneath. Soft 3D on white."
7. **Brand & design** — "Overhead flat-lay of a brand identity board: blank logo tiles, color chips in violet, ink, and white, abstract type-specimen blocks, ruler and grid lines — everything aligned to a strict Swiss grid on white."

---

## 1b. Hero 3D model of Satish (CURRENT hero plan — replaces hero video)

The hero scrubs a turntable of a 3D Satish model through the search eras; at the end, platform chips orbit him (built in code — the video only needs the model itself).

- **Spec:** 8 s, 1080×1350 or square, model chest-up on a clean turntable, **constant rotation speed, ~1.5 full revolutions total**, plain very light background (#F4F3FA or white), centered, static camera, no cuts/text.
- **Convert:** `ffmpeg -i model.mp4 -vf "fps=12,scale=1080:-1" public/model/f-%03d.jpg` → `<ModelSequence framePath="/model/f-{i}.jpg" frameCount={96} />`.

**Option A — real 3D scan (best likeness, full control):** capture ~30 overlapping photos of Satish (chest up, neutral expression, even light) with Luma AI / Polycam / Kiri, clean the mesh, render the turntable in Blender (8s, 96 frames, soft studio HDRI, subtle violet rim light).

**Option B — Veo, stylized 3D render (needs reference images of Satish):**
> Premium stylized 3D character render, chest-up bust of [reference: attached photos of an Indian man in his 40s], standing on a minimal round turntable pedestal, rotating slowly at perfectly constant speed through one and a half full revolutions. Matte clay-ceramic material with subtle violet rim light on one side, plain very light lavender-white studio background, soft even lighting, centered composition, static camera. One continuous take, no cuts, no zoom, no text. 8 seconds.

Likeness check: review the render with Satish before shipping — an AI 3D face of a real person must be approved by that person. If likeness is off, the stylized/clay treatment (less literal) reads intentional and avoids the uncanny valley.

---

## 2b. "The shift we deliver" — before/after photo pair (2 stills, ~2400×1350)

Real-world, with people. The section wipes between the two images, so they MUST share the exact same composition and camera angle — generate the BEFORE first, then create the AFTER as an **edit of that image** (or same seed + inpainting), don't generate independently.

**BEFORE:**
> Documentary photograph, 35mm, eye-level, centered composition: a small business owner alone behind the counter of a beautiful, well-designed store at dusk. Cool dim lighting, empty aisles, the owner checking their phone with a flat expression, quiet empty street visible through the front window. Muted color grade, cinematic realism.

**AFTER (edit of the BEFORE image — same framing):**
> The exact same store, same camera angle, now alive: warm bright lighting, several customers at the counter and browsing, the owner mid-smile handing a bag to a customer, a tablet on the counter showing a rising chart, people passing on the street outside. Warm hopeful grade.

(B2B alternative pair: a founder alone in a meeting room staring at a flat dashboard at night → same room in daylight, team mid-discussion, dashboard climbing, two clients at the table.)

---

## 3. Case study full-bleeds (3 stills, ~2400×1400, dark variant)

1. **D2C skincare (+212%)** — dark style block + "A minimalist frosted-glass skincare bottle on a dark stone pedestal, fine water mist in the air, single violet rim light tracing the bottle silhouette, deep shadows, cinematic macro depth of field."
2. **Ecommerce retailer (3.1x ROAS)** — dark style block + "A sculptural shopping bag made of glowing translucent material on a dark reflective floor, violet light streaks sweeping past it like fast traffic, long-exposure energy."
3. **B2B SaaS (5x pipeline)** — dark style block + "A composition of floating dark-glass UI panels with luminous violet data lines flowing between them, strong depth of field, one panel rising above the others."

---

## 4. Industry hover previews (10 stills, 4:3, ≥1200×900)

One consistent treatment so the set feels owned: **editorial documentary photography, natural light, muted neutral grade with a faint cool-violet cast in the shadows, shallow depth of field.** Prepend that to each subject:

1. SaaS & technology — "modern workspace, person at a laptop with an out-of-focus dashboard on screen, morning window light"
2. D2C & ecommerce — "beautifully arranged product flat-lay being photographed, hands adjusting a product, studio corner visible"
3. Healthcare & wellness — "bright calm clinic corridor, practitioner in soft focus, clean daylight"
4. Real estate — "striking residential facade at golden hour, strong geometry, warm-on-cool contrast"
5. Hospitality & travel — "infinity pool edge at dusk, resort architecture, one guest silhouette"
6. Education & e-learning — "student with headphones in a library nook, laptop glow, evening tones"
7. Finance & fintech — "glass office towers from below against sky, abstract reflections, cool grade"
8. Food & beverage — "chef's hands plating a dish, steam rising, dark restaurant ambience"
9. Fitness & sports — "athlete mid-movement in a gym, motion blur on limbs, hard directional light"
10. Local & home services — "craftsperson's hands at work on timber, sawdust in sunbeam, documentary close-up"

---

## 5. About portrait (4:5, B&W)

Best shot for real: this should be a **real photo of Satish**, not AI. Brief for the photographer:
> Black & white editorial portrait. Satish at his desk or whiteboard, mid-thought or mid-gesture — candid, not posed at camera. Big soft window light from one side, dark background falloff, shallow depth of field, shot at 50–85mm. Deliver 4:5 crop, high resolution.

(Temporary AI stand-in, if needed: "black and white editorial portrait of an Indian man in his 40s at a whiteboard mid-gesture, candid documentary style, soft window light, shallow depth of field" — replace before launch; never present an AI face as the real Satish.)

---

## 6. OG / social share image (1200×630)

> Global light style block + "A wide minimal composition: the violet light ribbon from the hero rising across a white field, small ink-colored grid details, empty space on the left third reserved for a wordmark." (Add the actual "Matta Kumar" text in Figma afterwards — don't let the model render text.)

---

## Not AI-generated (collect these)

- **Client logos** (8+, SVG preferred) — real clients only.
- **Real dashboard screenshots** for the before/after section and case metrics (GSC, Ahrefs, Meta/Google Ads, GA4) — anonymize client data as needed.
- **Real case numbers** to replace every "Sample" label.
