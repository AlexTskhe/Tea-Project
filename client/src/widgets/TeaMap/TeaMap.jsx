import React, { useEffect, useState } from 'react';
import { TeaApi } from '../../entities/teas/TeaApi';
import L from 'leaflet';
import styles from './TeaMap.module.css';


export default function TeaMap() {

  return <div id='map' className={styles.mapContainer}></div>;
}
