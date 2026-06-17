import { StatBar } from "../atoms/StatBar";
import type { Pokemon } from "../../types/pokemon";

interface PokemonStatsProps {
  stats: Pokemon["stats"];
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <ul aria-description="Stats resume">
      <StatBar
        label="Health points"
        shortName="Hp"
        value={stats[0].base_stat}
      />
      <StatBar label="Attack" shortName="At" value={stats[1].base_stat} />
      <StatBar label="Defense" shortName="Df" value={stats[2].base_stat} />
      <StatBar
        label="Special attack"
        shortName="SpA"
        value={stats[3].base_stat}
      />
      <StatBar
        label="Special defense"
        shortName="SpD"
        value={stats[4].base_stat}
      />
      <StatBar label="Speed" shortName="Spd" value={stats[5].base_stat} />
    </ul>
  );
}