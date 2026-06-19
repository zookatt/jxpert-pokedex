export interface PokemonCardData {
  id: number;
  name: string;
  image: string | null;
  height: number;
  weight: number;
  types: PokemonTypeName[];
  stats: Record<PokemonStatName, number>;
}

export type PokemonTypeName =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export type PokemonStatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export interface PokemonType {
  type: {
    name: PokemonTypeName;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: PokemonStatName;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}
