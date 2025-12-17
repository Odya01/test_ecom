import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onSelect }) {
  if (!products.length) {
    return <div className="state">Ничего не найдено.</div>;
  }

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onOpen={() => onSelect(p)} />
      ))}
    </div>
  );
}
