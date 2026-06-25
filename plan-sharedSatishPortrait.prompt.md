## Plan: Unify Hero visuals around one global Satish image

TL;DR: Refactor `components/home/Hero.tsx` so the hero uses one shared Satish portrait plus stage-specific overlay layers, then animate each overlay independently with GSAP scroll triggers instead of toggling separate full visual components.

**Steps**
1. Audit the current `Hero.tsx` visual stage structure and refs.
2. Refactor the right-side hero stage:
   - Keep one shared stage wrapper that contains a `satishRef` portrait container.
   - Use three Satish image versions inside the shared portrait container: center portrait, left-facing, right-facing.
   - Convert the current `Gen1Visual`, `Gen2Visual`, `Gen3Visual`, and `Gen4Visual` render blocks into overlay layer containers within the same stage wrapper.
   - Keep separate refs for each overlay layer so they can be animated independently.
3. Update the scroll animation timeline:
   - Animate each overlay layer (`gen1Ref`, `gen2Ref`, `gen3Ref`, `gen4Ref`) individually for entry/exit.
   - Animate the shared portrait container position across the stage while swapping the active Satish image version based on direction.
   - Remove any full-component show/hide logic if it currently toggles entire visual sections.
4. Preserve existing behavior:
   - Keep the infinite logo scroll panel and `platformScrollRef` behavior.
   - Preserve the text transition sequence and vertical timeline markers.
   - Keep responsive layout and the `xl` breakpoint for the right-side panel.
5. Verify with type checks and browser review.

**Relevant files**
- `components/home/Hero.tsx` — primary refactor target
- `components/home/PlatformLogos.tsx` — no change unless platform names need adjustment

**Verification**
1. Run editor diagnostics on `components/home/Hero.tsx`.
2. Confirm the hero page renders with one shared portrait and synchronized overlay transitions.
3. Scroll through the hero section to ensure each overlay appears in sequence and the logo column loops.

**Decision points**
- Use one shared `satishRef` image and keep stage-specific overlay refs.
- Decide whether the current visual stage layouts should remain visually identical, or if a simplified shared overlay is acceptable.
