/** List with copper "+" markers and hairline separators. */
export function LineList({ items }: { items: readonly string[] }) {
  return (
    <ul className="line-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
