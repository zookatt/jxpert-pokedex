export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        ©{currentYear} Pokémon. ©1995 - {currentYear} Nintendo/Creatures
        Inc./GAME FREAK inc. TM, ®Nintendo.
      </p>
    </footer>
  );
}
