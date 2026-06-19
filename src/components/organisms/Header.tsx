import { Link } from "react-router-dom";
import pokeball from "../../assets/pokeball.svg";
import stars from "../../assets/stars.svg";

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__brand" aria-label="Go to Pokédex home">
        <img src={pokeball} alt="Pokédex logo" className="header__logo" />
        <span className="header__title">Pokédex</span>
      </Link>

      <Link
        to="/favorites"
        className="header__dreamteam"
        aria-label="Go to Pokédex favorites"
      >
        <img
          src={stars}
          alt="Pokédex logo favorites"
          className="header__dreamteam__icon"
        />
        <span className="header__dreamteam__title">Dream team</span>
      </Link>
    </header>
  );
}
