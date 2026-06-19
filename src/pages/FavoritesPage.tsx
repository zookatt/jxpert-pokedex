import { useFavoritePokemons } from "../hooks/useFavoritePokemons";
import { PokemonGrid } from "../components/organisms/PokemonGrid";

export function FavoritesPage() {
  const { favoritePokemons, toggleFavorite, isFavorite } =
    useFavoritePokemons();

  return (
    <main className="container">
      <PokemonGrid
        pokemons={favoritePokemons}
        isLoading={false}
        isFavoritePokemon={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      {favoritePokemons.length === 0 && (
        <p className="nopokemons">No favorite pokemons yet</p>
      )}
    </main>
  );
}