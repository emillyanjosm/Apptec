// components/PinsDecorativos.js
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const PinsDecorativos = () => {
  const pins = [
    { id: 1, lat: -4.978399, lng: -39.015302, cor: '#b63a24', label: 'P1' },
    { id: 2, lat: -4.949167, lng: -39.058889, cor: '#368642', label: 'P2' },
    { id: 3, lat: -4.966389, lng: -39.008333, cor: '#FFD700', label: 'P3' },
  ];

  return (
    <>
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          coordinate={{ latitude: pin.lat, longitude: pin.lng }}
          title={`Ponto ${pin.id}`}
          description={`Label: ${pin.label}`}
          pinColor={pin.cor}
        />
      ))}
    </>
  );
};

// No Pagcidadao.js
<View style={styles.mapContainer}>
  <MapView 
    style={{ flex: 1 }}
    initialRegion={{
      latitude: -4.978399,
      longitude: -39.015302,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }}
  >
    <PinsDecorativos />
    {/* Outros markers... */}
  </MapView>
</View>