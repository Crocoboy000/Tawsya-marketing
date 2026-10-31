type DotsProps = {
  className?: string;
};

export function Dots({ className = '' }: DotsProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-grid size-7 shrink-0 place-items-center ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-brand/10" />

      <span className="absolute inset-[18%] rounded-full bg-brand/25" />

      <span className="relative size-[36%] rounded-full bg-brand" />
    </span>
  );
}
