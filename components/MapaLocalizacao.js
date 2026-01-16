// components/MapaFullScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  ActivityIndicator, 
  Text, 
  StyleSheet, 
  StatusBar,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { 
  getCurrentPositionAsync, 
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function MapaFullScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mapType, setMapType] = useState('standard');
  
  // Referência para o subscription
  const locationSubscription = useRef(null);

  // Estilo para mapa dark
  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#2c2c2c" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{ "color": "#3c3c3c" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#3d3d3d" }]
    }
  ];

  // Estilo para mapa light
  const lightMapStyle = [];

  async function requestLocationPermissions() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      
      if (!granted) {
        setError('Permissão de localização negada');
        setLoading(false);
        return;
      }

      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setLoading(false);
    } catch (err) {
      setError('Erro ao obter localização');
      setLoading(false);
      console.error(err);
    }
  }

  // Iniciar watch de localização
  const startWatchingLocation = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) return;

      const subscription = await watchPositionAsync(
        {
          accuracy: LocationAccuracy.High,
          timeInterval: 5000,
          distanceInterval: 10
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
      
      locationSubscription.current = subscription;
    } catch (err) {
      console.error('Erro ao observar localização:', err);
    }
  };

  // Parar watch de localização
  const stopWatchingLocation = () => {
    if (locationSubscription.current) {
      // CORREÇÃO: watchPositionAsync retorna um objeto com método remove
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  };

  useEffect(() => {
    requestLocationPermissions();
    startWatchingLocation();

    // Cleanup
    return () => {
      stopWatchingLocation();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingFullScreen}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      </View>
    );
  }

  if (error || !location) {
    return (
      <View style={styles.errorFullScreen}>
        <Text style={styles.errorText}>{error || 'Localização não disponível'}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={requestLocationPermissions}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Botão de tema */}
      <TouchableOpacity 
        style={[
          styles.themeButton, 
          isDarkMode ? styles.darkButton : styles.lightButton
        ]}
        onPress={() => setIsDarkMode(!isDarkMode)}
      >
        <Ionicons 
          name={isDarkMode ? "sunny" : "moon"} 
          size={24} 
          color={isDarkMode ? "#FFD700" : "#333"} 
        />
      </TouchableOpacity>

      {/* Mapa */}
      <MapView 
        style={styles.fullScreenMap}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        customMapStyle={isDarkMode ? darkMapStyle : lightMapStyle}
        mapType={mapType}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Sua Localização"
          pinColor={isDarkMode ? "#4FC3F7" : "#007AFF"}
          description={`Modo ${isDarkMode ? "escuro" : "claro"} ativo`}
        />

        {/* Marcadores de exemplo */}
        <Marker

          coordinate={{
            latitude: location.coords.latitude + 0.002,
            longitude: location.coords.longitude + 0.002,
          }}
          title="Ponto de Coleta 1"
          description="Papel e plástico"
          pinColor="#4CAF50"
        />
        <Marker
          coordinate={{
            latitude: location.coords.latitude - 0.003,
            longitude: location.coords.longitude - 0.001,
          }}
          title="Ponto de Coleta 2"
          description="Vidro e metal"
          pinColor="#FF9800"
        />
      </MapView>



      {/* Controles de tipo de mapa */}
      <View style={styles.mapTypeControls}>
        <TouchableOpacity 
          style={[styles.mapTypeButton, mapType === 'standard' && styles.activeMapTypeButton]}
          onPress={() => setMapType('standard')}
        >
          <Text style={styles.mapTypeButtonText}>Padrão</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.mapTypeButton, mapType === 'satellite' && styles.activeMapTypeButton]}
          onPress={() => setMapType('satellite')}
        >
          <Text style={styles.mapTypeButtonText}>Satélite</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.mapTypeButton, mapType === 'hybrid' && styles.activeMapTypeButton]}
          onPress={() => setMapType('hybrid')}
        >
          <Text style={styles.mapTypeButtonText}>Híbrido</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    width: '100%',
  },
  fullScreenMap: {
    ...StyleSheet.absoluteFillObject, 
  },
  loadingFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    color: '#856404',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  // Botão de tema/////////////////////
  themeButton: {
    position: 'absolute',
    top: 10,
    right: 260,
    zIndex: 1000,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lightButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  darkButton: {
    backgroundColor: '#333',
  },
  // Indicador de tema
  themeIndicator: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    zIndex: 1000,
  },
  themeIndicatorText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  // Controles de tipo de mapa
  mapTypeControls: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1000,
  },
  mapTypeButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    minWidth: 80,
    alignItems: 'center',
  },
  activeMapTypeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  mapTypeButtonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 12,
  },
  // Botão de atualizar
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 5,
  },
  refreshButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
});