import React, { useState } from "react";
import { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity,
  Image, 
  StyleSheet,
  Modal,
  Linking,
  Alert
} from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Callout } from 'react-native-maps';

export default function Pagcidadao({ navigation }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Pins com informações de coleta (SEM PONTOS)
  const pinsColeta = [
    {
      id: 1,
      latitude: -4.978399,
      longitude: -39.015302,
      title: "Praça da Matriz",
      endereco: "Centro, Rua Principal, 123",
      items: [
        { id: 1, nome: "Papelão", quantidade: "5 caixas" },
        { id: 2, nome: "Garrafas PET", quantidade: "3 sacos" },
        { id: 3, nome: "Latinhas", quantidade: "2 kg" }
      ],
      horario: "08:00 - 18:00",
      status: "disponivel",
      cor: "#b63a24",
      contato: "(88) 99999-9999"
    },
    {
      id: 2,
      latitude: -4.973500,
      longitude: -39.016800,
      title: "Mercado Público",
      endereco: "Av. Central, 456",
      items: [
        { id: 4, nome: "Vidro", quantidade: "4 caixas" },
        { id: 5, nome: "Plástico", quantidade: "6 sacos" },
        { id: 6, nome: "Óleo de Cozinha", quantidade: "10 litros" }
      ],
      horario: "06:00 - 20:00",
      status: "disponivel",
      cor: "#088395",
      contato: "(88) 98888-8888"
    },
    {
      id: 3,
      latitude: -4.966700,
      longitude: -39.023400,
      title: "Terminal Rodoviário",
      endereco: "Rua das Flores, 789",
      items: [
        { id: 7, nome: "Papel", quantidade: "8 kg" },
        { id: 8, nome: "Eletrônicos", quantidade: "3 unidades" }
      ],
      horario: "24 horas",
      status: "disponivel",
      cor: "#088395",
      contato: "(88) 97777-7777"
    },
    {
      id: 4,
      latitude: -4.974800,
      longitude: -39.010500,
      title: "UBS Central",
      endereco: "Rua Saúde, 321",
      items: [
        { id: 9, nome: "Medicamentos", quantidade: "2 caixas" },
        { id: 10, nome: "Pilhas/Baterias", quantidade: "15 unidades" }
      ],
      horario: "07:00 - 19:00",
      status: "disponivel",
      cor: "#4CAF50",
      contato: "(88) 96666-6666"
    }
  ];

  // Função para abrir modal com itens
  const handlePinPress = (pin) => {
    setSelectedPin(pin);
    setSelectedItems([]); // Limpa seleção anterior
    setShowItemModal(true);
  };

  // Função para selecionar/deselecionar item
  const toggleItemSelection = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Função para criar rota no Google Maps
  const criarRotaNoGoogleMaps = () => {
    if (!selectedPin || selectedItems.length === 0) {
      Alert.alert("Aviso", "Selecione pelo menos um item para aceitar a coleta.");
      return;
    }

    const destino = `${selectedPin.latitude},${selectedPin.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destino}&travelmode=driving`;
    
    Alert.alert(
      "Aceitar Coleta",
      `Você está aceitando ${selectedItems.length} item(s) para coleta.\n\nDeseja criar rota no Google Maps?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Criar Rota",
          onPress: () => {
            Linking.openURL(url).catch(err => {
              Alert.alert("Erro", "Não foi possível abrir o Google Maps.");
              console.error(err);
            });
            
            // Fecha o modal após aceitar
            setShowItemModal(false);
            
            // Alerta de sucesso
            Alert.alert(
              "Coleta Aceita!",
              `✅ Coleta agendada com sucesso!\n\n📍 Local: ${selectedPin.title}\n📦 Itens: ${selectedItems.length}`
            );
          }
        }
      ]
    );
  };

  // Modal para visualizar itens
  const renderItemModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showItemModal}
      onRequestClose={() => setShowItemModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Cabeçalho do modal */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>📦 Itens para Coleta</Text>
            <TouchableOpacity onPress={() => setShowItemModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Informações do local */}
          <View style={styles.localInfo}>
            <Text style={styles.localNome}>{selectedPin?.title}</Text>
            <View style={styles.localDetails}>
              <Ionicons name="location" size={14} color="#666" />
              <Text style={styles.localEndereco}>{selectedPin?.endereco}</Text>
            </View>
            <View style={styles.localDetails}>
              <Ionicons name="time" size={14} color="#666" />
              <Text style={styles.localHorario}>{selectedPin?.horario}</Text>
            </View>
            <View style={styles.localDetails}>
              <Ionicons name="call" size={14} color="#666" />
              <Text style={styles.localContato}>{selectedPin?.contato}</Text>
            </View>
          </View>

          {/* Lista de itens */}
          <ScrollView style={styles.itemsList}>
            <Text style={styles.itemsTitle}>Selecione os itens para coletar:</Text>
            
            {selectedPin?.items.map((item) => {
              const isSelected = selectedItems.some(i => i.id === item.id);
              
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.itemCard,
                    isSelected && styles.itemCardSelected
                  ]}
                  onPress={() => toggleItemSelection(item)}
                >
                  <View style={styles.itemLeft}>
                    <View style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected
                    ]}>
                      {isSelected && (
                        <Ionicons name="checkmark" size={16} color="#FFF" />
                      )}
                    </View>
                    
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemNome}>{item.nome}</Text>
                      <Text style={styles.itemQuantidade}>{item.quantidade}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.itemRight}>
                    <MaterialIcons name="recycling" size={24} color="#4CAF50" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Resumo e botão de ação */}
          <View style={styles.modalFooter}>
            <View style={styles.resumoContainer}>
              <Text style={styles.resumoText}>
                {selectedItems.length} item(s) selecionado(s)
              </Text>
            </View>
            
            <TouchableOpacity
              style={[
                styles.aceitarButton,
                selectedItems.length === 0 && styles.aceitarButtonDisabled
              ]}
              onPress={criarRotaNoGoogleMaps}
              disabled={selectedItems.length === 0}
            >
              <MaterialIcons name="directions" size={24} color="#FFF" />
              <Text style={styles.aceitarButtonText}>
                Aceitar Coleta e Criar Rota
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelarButton}
              onPress={() => setShowItemModal(false)}
            >
              <Text style={styles.cancelarButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.mainContainer}>
      
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.row}>
          <Text style={styles.text}>
            {"Olá Catador"}
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Notificacao1')}>
            <Ionicons name="notifications-circle-sharp" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('Perfilcatador')}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/itsu7d2d_expires_30_days.png" }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        
        {/* Instrução */}
        <View style={styles.instrucaoContainer}>
          <Ionicons name="information-circle" size={20} color="#088395" />
          <Text style={styles.instrucaoText}>
            Toque em um marcador para ver os itens disponíveis e aceitar a coleta
          </Text>
        </View>
        
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
              {/* Pins de coleta */}
              {pinsColeta.map((pin) => (
                <Marker
                  key={pin.id}
                  coordinate={{
                    latitude: pin.latitude,
                    longitude: pin.longitude
                  }}
                  pinColor={pin.cor}
                  onPress={() => handlePinPress(pin)}
                >
                  <Callout tooltip>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutTitle}>{pin.title}</Text>
                      <Text style={styles.calloutSubtitle}>Toque para ver itens</Text>
                      <View style={styles.calloutBadge}>
                        <Text style={styles.calloutBadgeText}>
                          {pin.items.length} itens disponíveis
                        </Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          </View>
          
          {/* Legenda dos pins */}
          <View style={styles.legendaContainer}>
            <Text style={styles.legendaTitulo}>📍 Pontos de Coleta:</Text>
            
            {pinsColeta.map((pin) => (
              <TouchableOpacity 
                key={pin.id} 
                style={styles.legendaItem}
                onPress={() => handlePinPress(pin)}
              >
                <View style={[styles.legendaCor, { backgroundColor: pin.cor }]} />
                <View style={styles.legendaTextoContainer}>
                  <Text style={styles.legendaTexto}>{pin.title}</Text>
                  <Text style={styles.legendaItens}>
                    {pin.items.length} itens disponíveis
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        

        
      </ScrollView>

      {/* Modal de itens */}
      {renderItemModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  scrollView: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#088395",
    paddingTop: 50, 
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 32,
    fontFamily: "Guity",
    flex: 1,
  },
  view: {
    paddingVertical: 0,
    paddingHorizontal: 18,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  instrucaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    margin: 15,
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
  },
  instrucaoText: {
    marginLeft: 10,
    color: '#1565C0',
    fontSize: 14,
    flex: 1,
  },
  mapSection: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapContainer: {
    height: 400,
  },
  // Estilos do Callout
  calloutContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  calloutSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  calloutBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  calloutBadgeText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '500',
  },
  // Legenda
  legendaContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  legendaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  legendaCor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendaTextoContainer: {
    flex: 1,
  },
  legendaTexto: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  legendaItens: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  // Dicas
  dicasContainer: {
    margin: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  dicasTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  dicaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dicaTexto: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  localInfo: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  localNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  localDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  localEndereco: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  localHorario: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  localContato: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  itemsList: {
    maxHeight: 300,
    padding: 20,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemCardSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemQuantidade: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  itemRight: {
    marginLeft: 10,
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  resumoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resumoText: {
    fontSize: 14,
    color: '#666',
  },
  aceitarButton: {
    flexDirection: 'row',
    backgroundColor: '#088395',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  aceitarButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  aceitarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cancelarButton: {
    padding: 15,
    alignItems: 'center',
  },
  cancelarButtonText: {
    color: '#666',
    fontSize: 16,
  },
});