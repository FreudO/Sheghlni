export const MOTION_EASE = [0.2, 0.8, 0.2, 1] as const;

export const PAGE_TRANSITION = {
  duration: 0.25,
  ease: MOTION_EASE,
} as const;

export const REVEAL_VIEWPORT = { once: true, amount: 0.3 } as const;

export const DEMO_LOADING_MS = 600;
