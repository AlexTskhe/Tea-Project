import React, { useEffect, useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import L from 'leaflet';
import TeaMap from '../../widgets/TeaMap/TeaMap';
import TeaPage from '../TeaPage/TeaPage';
import { useNavigate } from 'react-router';

export default function MainPage() {
  const [teas, setTeas] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getTeas = async () => {
      try {
        const { data } = await TeaApi.getAll();
        setTeas(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTeas();
  }, []);

  useEffect(() => {
    const map = L.map('map').setView([55.751244, 37.618423], 5); // Центр РФ

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Добавляем маркеры на карту
    teas?.forEach((tea) => {
      if (tea.location) {
        const [latitude, longitude] = tea.location.split(' ');

        L.marker([latitude, longitude]).addTo(map).bindPopup(`  <div>
    <b>${tea.name}</b><br />
    <button class="popup-btn" data-id="${tea.id}">Подробнее</button>
  </div> `);
      }
    });

    map.on('popupopen', function (e) {
      const button = e.popup._contentNode.querySelector('.popup-btn');
      if (button) {
        button.addEventListener('click', () => {
          const teaId = button.getAttribute('data-id');
          navigate(`/teasPage/${teaId}`); // импортируй useNavigate из react-router-dom
        });
      }
    });

    return () => {
      map.remove(); // очищаем карту при размонтировании
    };
  }, [teas]);
  return (
    <>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: '2', minWidth: 0 }}>
          <TeaMap teas={teas} />
        </div>
        <div style={{ flex: '1', overflowY: 'auto', padding: '1rem' }}>
          <TeaPage teas={teas} />
        </div>
      </div>
    </>
  );
}
