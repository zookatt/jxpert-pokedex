import { useState } from "react";

import type { PokemonCardData } from "../types/pokemon";
import {
  getFavoritePokemons,
  isFavoritePokemon,
  saveFavoritePokemons,
  toggleFavoritePokemon,
} from "../utils/pokemonFavoritesStorage";

export function useFavoritePokemons() {
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonCardData[]>(
    () => getFavoritePokemons(),
  );

  const toggleFavorite = (pokemon: PokemonCardData) => {
    setFavoritePokemons((currentFavorites) => {
      const nextFavorites = toggleFavoritePokemon(currentFavorites, pokemon);

      saveFavoritePokemons(nextFavorites);

      return nextFavorites;
    });
  };

  const isFavorite = (pokemonId: number) => {
    return isFavoritePokemon(favoritePokemons, pokemonId);
  };

  return {
    favoritePokemons,
    toggleFavorite,
    isFavorite,
  };
}
