import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import ScrollToTop from "../components/ScrollButton";
import { generateSlug } from "../utils/slug";   // ← важно!

const Electronics = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // для render
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // useEffect(() => {
  //   axios
  //     .get("/api/electronics")
  //     .then((res) => {
  //       setComponents(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError("Не удалось загрузить компоненты");
  //       setLoading(false);
  //       console.error(err);
  //     });
  // }, []);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/electronics`);
        setComponents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки компонентов:", err);
        setError(
          err.response?.status === 404
            ? "Компоненты не найдены (проверьте бэкенд)"
            : "Не удалось загрузить компоненты"
        );
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);
  if (loading) return <p>Загрузка...</p>;
  if (error) return <div className="container_error">{error}</div>;

  return (
    <section className="container">
      <header>
        <h1>Электронные компоненты</h1>
        <a href="/" className="backLink">
          ← На главную
        </a>
      </header>

      <main className="cards">
        {components.map((comp) => (
          <Card
            key={comp.id}
            to={`/electronics/${generateSlug(comp.name_detail, comp.id)}`}
            image={comp.images || "/images/placeholder.png"}
            title={comp.name_detail}
            description={comp.description || "Нет описания"}
            buttonText="Подробнее"
          />
        ))}
      </main>

      <ScrollToTop />
    </section>
  );
};

export default Electronics;
