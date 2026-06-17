import { useEffect, useState } from "react";
import { getPokemonsByRegion } from "../services/pokemonApi";
import type { RegionName } from "../constants/regions";
import type { Pokemon } from "../types/pokemon";

export function usePokemonsByRegion(region: RegionName) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadPokemons() {
      setIsLoading(true);

      try {
        const data = await getPokemonsByRegion(region);

        if (!ignore) {
          setPokemons(data);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPokemons();

    return () => {
      ignore = true;
    };
  }, [region]);

  return { pokemons, isLoading };
}