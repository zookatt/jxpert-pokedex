import { useEffect, useState } from "react";
import { getPokemonsByRegion } from "../services/pokemonApi";
import type { RegionName } from "../constants/regions";
import type { PokemonCardData } from "../types/pokemon";

type GetPokemonsByRegion = (region: RegionName) => Promise<PokemonCardData[]>;

export function usePokemonsByRegion(
  region: RegionName,
  getPokemons: GetPokemonsByRegion = getPokemonsByRegion,
) {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadPokemons() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPokemons(region);

        if (!ignore) {
          setPokemons(data);
        }
      } catch {
        if (!ignore) {
          setError("Could not load pokemons");
          setPokemons([]);
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
  }, [region, getPokemons]);

  return { pokemons, isLoading, error };
}
