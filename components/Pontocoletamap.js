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
    
    buscarNomeEndereco(coordinate.latitude, coordinate.longitude);
  };

  //procurar na API
  const buscarNomeEndereco = async (latitude, longitude) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'SeuApp'
        }
      });

      //requsiiçao
      const data = await response.json();
      if (data.display_name) {
        const partes = data.display_name.split(',').slice(0, 3).join(', ');
        setEnderecoTexto(partes);
      } else {
        setEnderecoTexto(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`);
      }
    } catch (error) {
      setEnderecoTexto(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`);
    }
  };

//confirmar e salvar local ///////////////////////////
  const confirmarLocal = () => {
    Alert.alert(
      "Local Confirmado!",
      "Seu ponto de coleta foi definido no mapa.",
      [
        {
          text: "OK",
          onPress: () => {
            console.log("Local salvo:", localSelecionado);
            navigation.goBack();
          }
        }
      ]
    );
    setModalVisivel(false);
  };

  if (!fontsLoaded) {
    return null;
  }



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}> Selecione um local no mapa</Text>
      </View>


      <View style={styles.mapaContainer}>
        <MapView
          ref={mapRef}
          style={styles.mapa}
          initialRegion={{
            latitude: -4.9792,
            longitude: -39.0564,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
        >
          {/* MARCADOR PIN */}
          {localSelecionado && (
            <Marker
              coordinate={localSelecionado}
              title="Ponto de Coleta"
              description="Toque e segure para mover"
              pinColor="#b63a24"
              draggable
              onDragEnd={(e) => {
                setLocalSelecionado(e.nativeEvent.coordinate);
                buscarNomeEndereco(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude
                );
              }}
            />
          )}
        </MapView>


        <View style={styles.instrucoes}>
          <Text style={styles.instrucoesTexto}>
        	Toque no mapa para colocar um marcador
          </Text>

        </View>
      </View>

      {/* Modal de Confirmação ///////////////////*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}> Definir este local?</Text>
            
            <Text style={styles.modalEndereco}>
              {enderecoTexto || "Local selecionado no mapa"}
            </Text>

            <View style={styles.modalBotoes}>
              <TouchableOpacity 
                style={[styles.modalBotao, styles.modalBotaoCancelar]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.modalBotaoTexto}>Cancelar</Text>
              </TouchableOpacity>
        

              <TouchableOpacity 
                style={[styles.modalBotao, styles.modalBotaoConfirmar]}
                onPress={confirmarLocal}
              >
                <Text style={styles.modalBotaoTexto}>Confirmar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

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
});