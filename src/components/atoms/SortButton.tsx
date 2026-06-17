interface SortButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function SortButton({ isOpen, onClick }: SortButtonProps) {
  return (
    <button
      role="combobox"
      aria-haspopup="listbox"
      aria-controls="sort-list"
      aria-label="Sort by"
      aria-expanded={isOpen}
      className="sort__button"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isOpen ? "var(--color-accent)" : "var(--color-neutral-700)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l9 0" />
        <path d="M4 12l7 0" />
        <path d="M4 18l7 0" />
        <path d="M15 15l3 3l3 -3" />
        <path d="M18 6l0 12" />
      </svg>
    </button>
  );
}