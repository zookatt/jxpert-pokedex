import type { SortOption } from "../utils/pokemonSort";

interface SortOptionConfig {
  value: SortOption;
  label: string;
  shortLabel: string;
}

export const SORT_OPTIONS: SortOptionConfig[] = [
  { value: "default", label: "Default", shortLabel: "Default" },
  { value: "hp", label: "Health points", shortLabel: "Hp" },
  { value: "attack", label: "Attack", shortLabel: "At" },
  { value: "defense", label: "Defense", shortLabel: "Df" },
  { value: "special-attack", label: "Special attack", shortLabel: "SpA" },
  { value: "special-defense", label: "Special defense", shortLabel: "SpD" },
  { value: "speed", label: "Speed", shortLabel: "Spd" },
];