import { StatBar } from "../atoms/StatBar";
import type { PokemonCardData, PokemonStatName } from "../../types/pokemon";

interface PokemonStatsProps {
  stats: PokemonCardData["stats"];
}

const STAT_OPTIONS: {
  name: PokemonStatName;
  label: string;
  shortName: string;
}[] = [
  { name: "hp", label: "Health points", shortName: "Hp" },
  { name: "attack", label: "Attack", shortName: "At" },
  { name: "defense", label: "Defense", shortName: "Df" },
  { name: "special-attack", label: "Special attack", shortName: "SpA" },
  { name: "special-defense", label: "Special defense", shortName: "SpD" },
  { name: "speed", label: "Speed", shortName: "Spd" },
] as const;

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <ul aria-description="Stats resume">
      {STAT_OPTIONS.map(({ name, label, shortName }) => {
        const value = stats[name];

        return (
          <StatBar
            key={name}
            label={label}
            shortName={shortName}
            value={value}
          />
        );
      })}
    </ul>
  );
}
