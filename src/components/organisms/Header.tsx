import pokeball from "../../assets/pokeball.svg";

export function Header() {
  return (
    <header className="header">
      <img src={pokeball} alt="" className="header__logo" />
      <p className="header__title">Pokédex</p>
    </header>
  );
}
