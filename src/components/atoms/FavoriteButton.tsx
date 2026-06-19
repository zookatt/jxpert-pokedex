interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}
export function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className={`favorite-button ${isFavorite ? "active" : ""}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
      </svg>
    </button>
  );
}
