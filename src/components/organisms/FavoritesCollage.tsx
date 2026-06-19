import type { CSSProperties } from "react";
import type { PokemonCardData } from "../../types/pokemon";
import { getPokemonVisualSize } from "../../utils/pokemonVisualSize";

interface FavoritesCollageProps {
  pokemons: PokemonCardData[];
}

export function FavoritesCollage({ pokemons }: FavoritesCollageProps) {
  const dreamTeam = pokemons.slice(0, 6);

  return (
    <section className="favorites-collage" aria-label="Dream team">
      <div className="favorites-collage__frame">
        <span className="favorites-collage__label">Dream team</span>

        <div className="favorites-collage__pokemons">
          {dreamTeam.map((pokemon, index) => {
            const customStyles = {
              "--pokemon-size": `${getPokemonVisualSize(pokemon)}px`,
            } as CSSProperties;

            return (
              <img
                key={pokemon.id}
                src={pokemon.image ?? undefined}
                alt={pokemon.name}
                className={`favorites-collage__pokemon favorites-collage__pokemon--${index}`}
                style={customStyles}
              />
            );
          })}
        </div>

        <div className="favorites-collage__icons" aria-hidden="true">
          {dreamTeam.map((pokemon) => (
            <img key={pokemon.id} src={pokemon.image ?? undefined} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
}
