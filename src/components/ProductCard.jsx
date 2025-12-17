export default function ProductCard({ product, onOpen }) {
  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Открыть товар: ${product.title}`}
    >
      <img className="card__image" src={product.image} alt={product.title} />

      <div className="card__body">
        <h3 className="card__title">{product.title}</h3>
        <div className="card__price">
          {Number(product.price).toLocaleString("ru-RU")} ₽
        </div>
      </div>
    </article>
  );
}
