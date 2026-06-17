import type { CSSProperties } from "react";
import { TypeIcon } from "../atoms/TypeIcon";
import { PokemonStats } from "./PokemonStats";
import type { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType = pokemon.types[0].type.name;
  const secondaryType = pokemon.types[1]?.type.name;

  const customStyles = {
    "--color-type": `var(--color-${primaryType})`,
  } as CSSProperties;

  return (
    <li>
      <article className="card" style={customStyles}>
        <header className="card__head">
          <div className="card__tag">
            <p>#{pokemon.id.toString().padStart(3, "0")}</p>
          </div>

          <div className="card__tag">
            <TypeIcon type={primaryType} label="primary type" />
            {secondaryType && (
              <TypeIcon type={secondaryType} label="secondary type" />
            )}
          </div>
        </header>

        <img
          className="card__avatar"
          src={
            pokemon.sprites.other["official-artwork"].front_default ?? undefined
          }
          loading="lazy"
          alt={`${pokemon.name} artwork`}
        />

        <section className="card__content">
          <h3 className="card__title">{pokemon.name}</h3>
          <PokemonStats stats={pokemon.stats} />
        </section>
      </article>
    </li>
  );
}
