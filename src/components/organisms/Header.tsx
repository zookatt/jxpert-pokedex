import { Link } from "react-router-dom";
import pokeball from "../../assets/pokeball.svg";

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__brand" aria-label="Go to Pokédex home">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </Link>
    </header>
  );
}
