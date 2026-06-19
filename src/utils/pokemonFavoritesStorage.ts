import type { PokemonCardData } from "../types/pokemon";

const FAVORITES_STORAGE_KEY = "favorite-pokemons";

export function getFavoritePokemons(): PokemonCardData[] {
  const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    return JSON.parse(storedFavorites) as PokemonCardData[];
  } catch {
    return [];
  }
}
export function saveFavoritePokemons(favorites: PokemonCardData[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}
export function isFavoritePokemon(
  favorites: PokemonCardData[],
  pokemonId: number,
): boolean {
  return favorites.some((pokemon) => pokemon.id === pokemonId);
}

export function toggleFavoritePokemon(
  favorites: PokemonCardData[],
  pokemon: PokemonCardData,
): PokemonCardData[] {
  if (isFavoritePokemon(favorites, pokemon.id)) {
    return favorites.filter((favorite) => favorite.id !== pokemon.id);
  }

  return [...favorites, pokemon];
}