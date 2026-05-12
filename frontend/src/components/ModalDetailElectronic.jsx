import { useState, useEffect } from "react"
import axios from "axios"
import  typeConfig  from "../config/deviceTypeConfig"
import "../styles/components/modaldetail.sass"
const ModalDeviceDetail = ({ device, type, closeModal }) => {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // useEffect(() => {

  //   axios
  //     .get(`/api/electronics/${type}/${device.id}`)
  //     .then((res) => {
  //       console.log("Ответ от сервера:", res.data)
  //       setDetails(res.data)
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.error("Ошибка при запросе деталей:", err.message)
  //       if (err.response) {
  //         console.error("Статус:", err.response.status)
  //         console.error("Данные ошибки:", err.response.data)
  //       }
  //       setFetchError(
  //         `Ошибка загрузки: ${err.message} (статус ${err.response?.status || "нет ответа"})`
  //       )
  //       setLoading(false)
  //     })
  // }, [device?.id, type])


  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
  const fetchDetails = async () => {
    if (!device?.id || !type) {
      setFetchError("Отсутствует ID устройства или тип");
      setLoading(false);
      return;
    }

    try {
      // Исправленный URL — делаем type строкой
      const typeStr = String(type);
      const url = `${API_BASE}/api/electronics/${typeStr}/${device.id}`;
      
      console.log("Запрос деталей по URL:", url);

      const response = await axios.get(url);
      console.log("✅ Успешный ответ:", response.data);

      setDetails(response.data);
    } catch (err) {
      console.error("❌ Полная ошибка:", err);
      
      if (err.response) {
        console.error("Статус:", err.response.status);
        console.error("Данные ошибки от сервера:", err.response.data);
      }

      let msg = "Ошибка на сервере";
      if (err.response?.status === 404) msg = "Устройство не найдено";
      else if (err.response?.status === 400) msg = "Неверные параметры запроса";

      setFetchError(msg);
    } finally {
      setLoading(false);
    }
  };

    fetchDetails();
  }, [device?.id, type, API_BASE]);

  
  const config = typeConfig?.[type] || { title: "Неизвестный тип", fields: [] }
  const title = device?.name_device || device?.name || `Устройство #${device?.id || "?"}`


  const components = details?.components || details?.device?.components || device?.components || []

  console.log("Что будет отображено:", {
    componentsFound: components.length,
    firstComponentKeys: components[0] ? Object.keys(components[0]) : "нет",
  })

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>×</button>

        <h2>{title}</h2>

        <div className="modal-body">
          {loading ? (
            <div className="loading">Загрузка данных устройства...</div>
          ) : fetchError ? (
            <div className="error">
              <strong>Ошибка:</strong> {fetchError}
            </div>
          ) : components.length > 0 ? (
            <div className="component-grid">
              {components.map((item, idx) => (
                <div key={item.id || idx} className="component-card">
                  <div className="features">
                    {(config?.fields || []).map((field) => {
                      const value = item[field.key]
                      let display = value

                      if (field.format) display = field.format(value)
                      if (field.unit && value != null && !field.isButton) {
                        display = `${value}${field.unit}`
                      }

                      if (field.isButton && item[field.key]) {
                        return (
                          <div key={field.key} className="feature button-feature">
                            <a
                              href={item[field.key]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="buy-button"
                            >
                              {field.buttonText || "Купить"}
                            </a>
                          </div>
                        )
                      }

                      return (
                        <div key={field.key} className="feature">
                          {field.label && <span className="label">{`${field.label}:`}</span>}
                          <span className="value">{display ?? "—"}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Компоненты отсутствуют или не пришли</p>
              <p style={{ fontSize: "0.9em", color: "#777", marginTop: "8px" }}>
                Проверь консоль браузера (F12 → Console) — там должна быть информация о запросе
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ModalDeviceDetail