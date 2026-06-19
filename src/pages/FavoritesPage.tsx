import { FavoritesCollage } from "../components/organisms/FavoritesCollage";
import { useFavoritePokemons } from "../hooks/useFavoritePokemons";

export function FavoritesPage() {
  const { favoritePokemons } = useFavoritePokemons();

  return (
    <main className="favorites-page">
      {favoritePokemons.length > 0 ? (
        <FavoritesCollage pokemons={favoritePokemons} />
      ) : (
        <p className="nopokemons">No favorite pokemons yet</p>
      )}
    </main>
  );
}
