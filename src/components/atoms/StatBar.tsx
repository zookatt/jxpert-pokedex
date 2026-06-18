interface StatBarProps {
  label: string;
  shortName: string;
  value: number;
  max?: number;
}

export function StatBar({ label, shortName, value, max = 255 }: StatBarProps) {
  return (
    <li className="card__stat" aria-label={label}>
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {shortName}
        </p>
        <p>{value}</p>
      </div>

      <progress value={value} max={max} />
    </li>
  );
}
