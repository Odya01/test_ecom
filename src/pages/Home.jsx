import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    setStatus("loading");
    setError("");

    fetch("/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить products.json");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data))
          throw new Error("Неверный формат данных (ожидался массив)");
        if (!isMounted) return;
        setProducts(data);
        setStatus("success");
      })
      .catch((e) => {
        if (!isMounted) return;
        setStatus("error");
        setError(e?.message || "Неизвестная ошибка");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => String(p.title).toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div className="app">
      <div className="app__container">
        <div className="app__header">
          <h1 className="app__title">Каталог товаров</h1>
          <p className="app__subtitle">
            Нажмите на карточку, чтобы открыть детали
          </p>
        </div>

        <SearchBar value={query} onChange={setQuery} />

        {status === "loading" && <div className="state">Загрузка товаров…</div>}
        {status === "error" && <div className="state state--error">Ошибка</div>}

        {status === "success" && (
          <ProductGrid products={filtered} onSelect={(p) => setSelected(p)} />
        )}

        <ProductModal product={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}
