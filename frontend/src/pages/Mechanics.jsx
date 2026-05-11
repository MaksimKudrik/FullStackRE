import React, { useState, useEffect } from 'react';
import ScrollToTop from "../components/ScrollButton";

const Mechanics = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  // Загрузка данных с сервера
  useEffect(() => {
    console.log('🚀 Запрос к /api/mechanics');

    fetch('/api/mechanics')
      .then(res => {
        console.log('📡 Статус:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('📦 Полученные данные:', data);

        if (data.error) {
          setError(data.error);
          setParts([]);
        } else {
          setParts(Array.isArray(data) ? data : []);
          setError(null);
        }
      })
      .catch(err => {
        console.error('❌ Ошибка:', err);
        setError('Не удалось подключиться к серверу');
      })
      .finally(() => setLoading(false));
  }, []);

  const openModal = (part) => setSelectedPart(part);
  const closeModal = () => setSelectedPart(null);

  if (loading) return <div className="loading">Загрузка деталей...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="mechanics-page">
        <a href="/" className="backLink">
          ← На главную
        </a>
      <h1 className="page-title">Механические детали</h1>
      <ScrollToTop />
      <div className="parts-grid">
        {parts.map((part) => (
          <div 
            key={part.id} 
            className="part-card"
            onClick={() => openModal(part)}
          >
            <div className="part-image">
              <img 
                src={part.photo || '/images/placeholder.png'}
                alt={part.name_detail}
                onError={(e) => {
                  e.target.src = '/images/placeholder.png';
                }}
              />
            </div>
            <div className="part-info">
              <h3>{part.name_detail}</h3>
              <button className="details-btn">Подробнее </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {selectedPart && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>

            <div className="modal-image">
                <img 
                  src={selectedPart.photo || '/images/placeholder.png'}
                  alt={selectedPart.name_detail}
                  onError={(e) => {
                    e.target.src = '/images/placeholder.png';
                  }}
                />
            </div>

            <h2>{selectedPart.name_detail}</h2>

            <div className="download-section">
              <div className="download-buttons">
                {selectedPart.stl && (
                  <a 
                    href={selectedPart.stl} 
                    download 
                    className="download-btn stl-btn"
                  >
                    Скачать .STL
                  </a>
                )}
                
                {selectedPart.m3d && (
                  <a 
                    href={selectedPart.m3d} 
                    download 
                    className="download-btn m3d-btn"
                  >
                    Скачать .M3D
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mechanics;