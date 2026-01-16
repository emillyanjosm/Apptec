import React, { useState, useRef } from "react";
import {  
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, Modal
} from "react-native";
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
import MapaLocalizacao from './MapaLocalizacao'


export default ({ navigation }) => {
	  const pinsDecorativos = [
    {
		id: 1,
		latitude: -4.974945,    // Localização real da Prefeitura
		longitude: -39.013273,
		title: "Prefeitura Municipal",
		description: "Sede da administração municipal",
		cor: "#cc1800"  // Azul municipal
    },
    {
	  id: 2,
	  latitude: -4.974100,
	  longitude: -39.012500,
	  title: "Secretaria de Saúde",
	  description: "Coordenação da saúde municipal",
      cor: "#cc1800"
    },
	{
		id: 3,
		latitude: -4.973850,
		longitude: -39.014200,
		title: "Fórum de Quixadá",
		description: "Poder Judiciário",
      cor: "#cc1800"
	}


  ];

  const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline': require('../assets/rawline-400.ttf')
  });

 //consts separados
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [enderecoTexto, setEnderecoTexto] = useState("");
  const mapRef = useRef(null);

  // pegar o endereço selecionado
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    
    setLocalSelecionado(coordinate);
    setModalVisivel(true);
    

  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}> Meus pontos de coleta</Text>
      </View>


      <View style={styles.mapaContainer}>
		 {/* Mapa */}
        <View style={styles.mapSection}>
          <View style={styles.mapContainer}>

            <MapView 
              style={{ flex: 1 }}
              initialRegion={{
                latitude: -4.978399,
                longitude: -39.015302,
                latitudeDelta: 0.08, 
                longitudeDelta: 0.08,
              }}
            >

              {/* pins decorativos */}
              {pinsDecorativos.map((pin) => (
                <Marker
                  key={pin.id}
                  coordinate={{
                    latitude: pin.latitude,
                    longitude: pin.longitude
                  }}
                  title={pin.title}
                  description={pin.description}
                  pinColor={pin.cor}
                />
              ))}
            </MapView>
          </View>
          

        </View>
      </View>


      {/* confirmação da pagina */}
      {localSelecionado && !modalVisivel && (
        <View style={styles.confirmarContainer}>
          <TouchableOpacity 
            style={styles.botaoConfirmar}
            onPress={() => setModalVisivel(true)}
          >
            <Text style={styles.botaoConfirmarTexto}>
              Definir local como ponto de coleta
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  header: {
    backgroundColor: "#368642",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.9,
  },
  mapaContainer: {
    flex: 1,
    position: 'relative',
  },
  mapa: {
    flex: 1,
    width: '100%',
  },
  instrucoes: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
  },
  instrucoesTexto: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  confirmarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  botaoConfirmar: {
    backgroundColor: "#368642",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  botaoConfirmarTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },


  // Modal styles/////////////////////////////
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#368642',
  },
  modalEndereco: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBotao: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalBotaoCancelar: {
    backgroundColor: '#ccc',
  },
  modalBotaoConfirmar: {
    backgroundColor: '#368642',
  },
  modalBotaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mapSection: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapContainer: {
    height: 500, 
  },
});