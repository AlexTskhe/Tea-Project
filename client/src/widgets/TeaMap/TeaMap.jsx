import React, { useEffect, useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import L from 'leaflet';


export default function TeaMap() {
//   const [teas, setTeas] = useState([
//     {
//       id: 1,
//       name: 'Green Dragon',
//       description: 'Light and floral.',
//       latitude: 55.751244,
//       longitude: 37.618423,
//     },
//     {
//       id: 2,
//       name: 'Black Pearl',
//       description: 'Strong and bold.',
//       latitude: 59.9342802,
//       longitude: 30.3350986,
//     },
//     // ...ещё чаи
//   ]);

//   useEffect(() => {
//     // const getTeas = async () => {
//     //   try {
//     //     const { data } = await TeaApi.getAll();
//     //     setTeas(data);
//     //   } catch (error) {
//     //     console.log(error);
//     //   }
//     // };
//     // getTeas();

//     const map = L.map('map').setView([55.751244, 37.618423], 5); // Центр РФ

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors',
//     }).addTo(map);

//     // Добавляем маркеры на карту
//     teas.forEach((tea) => {
//       if (tea.latitude && tea.longitude) {
//         L.marker([tea.latitude, tea.longitude])
//           .addTo(map)
//           .bindPopup(`<b>${tea.name}</b><br>${tea.description}`);
//       }
//     });

//     return () => {
//       map.remove(); // очищаем карту при размонтировании
//     };
//   }, [teas]);

  return <div id='map' style={{ height: '100%', width: '100%' }} />;
}
