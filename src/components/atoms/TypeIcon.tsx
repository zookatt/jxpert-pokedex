import { TYPE_ICONS } from "../../constants/icons";
import type { PokemonTypeName } from "../../types/pokemon";

interface TypeIconProps {
  type: PokemonTypeName;
  label: string;
}

export function TypeIcon({ type, label }: TypeIconProps) {
  return (
    <img
      src={TYPE_ICONS[type]}
      className="card__type"
      alt={`${type} ${label}`}
    />
  );
}
