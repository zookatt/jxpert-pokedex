//datos fijos
export const REGIONS = {
  kanto: { offset: 0, limit: 151 },
  johto: { offset: 151, limit: 100 },
  hoenn: { offset: 251, limit: 135 },
  sinnoh: { offset: 386, limit: 108 },
  unova: { offset: 494, limit: 155 },
  kalos: { offset: 649, limit: 72 },
  alola: { offset: 721, limit: 88 },
  galar: { offset: 809, limit: 96 },
  paldea: { offset: 905, limit: 120 },
} as const;

export type RegionName = keyof typeof REGIONS;