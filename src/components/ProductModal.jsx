import { useEffect } from "react";

export default function ProductModal({ product, onClose }) {
  const isOpen = Boolean(product);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal__panel" onMouseDown={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal__content">
          <div className="modal__imageWrap">
            <img
              className="modal__image"
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className="modal__info">
            <div className="modal__header">
              <div className="modal__category">{product.category}</div>
              <h2 className="modal__title">{product.title}</h2>
              <p className="modal__desc">{product.description}</p>
            </div>

            <div className="modal__bottom">
              <div className="modal__price">
                {Number(product.price).toLocaleString("ru-RU")} ₽
              </div>
              <button
                className="modal__buy"
                type="button"
                onClick={() => alert(`Покупка: ${product.title}`)}
              >
                Купить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
