import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Modal, FlatList 
} from "react-native";
import { Ionicons} from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline': require('../assets/rawline-400.ttf')
  });

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  

  const listaProdutos = [
    { id: '1', nome: 'Plástico', icon: 'bag-handle-outline'},
    { id: '2', nome: 'Papel', icon: 'newspaper'},
    { id: '3', nome: 'Vidro' , icon: 'beer'},
    { id: '4', nome: 'Metal' , icon: 'cut'},
    { id: '5', nome: 'Papelão' , icon: 'file-tray-sharp'},
    { id: '6', nome: 'Madeira' , icon: 'flower'}
  ];

  const toggleProduto = (produto) => {
    if (produtosSelecionados.some(p => p.id === produto.id)) {

      setProdutosSelecionados(produtosSelecionados.filter(p => p.id !== produto.id));
    } else {

      setProdutosSelecionados([...produtosSelecionados, produto]);
    }
  };

  const ItemProduto = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemProduto,
        produtosSelecionados.some(p => p.id === item.id) && styles.itemSelecionado
      ]}
      onPress={() => toggleProduto(item)}
    >
    <View style={styles.viewmaterial}>
      <Text style={[
        styles.textoProduto,
        produtosSelecionados.some(p => p.id === item.id) && styles.textoSelecionado
      ]}>
        {item.nome}
      </Text>
      <Ionicons name={item.icon} size={20} color={'green'} />
      </View>
      <View style={[
        styles.checkbox,
        produtosSelecionados.some(p => p.id === item.id) && styles.checkboxSelecionado
      ]}>
        {produtosSelecionados.some(p => p.id === item.id) && (
          <Text style={styles.checkboxTexto}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.row}>
        <View style={styles.view}>
        </View>
      </View>
      
      <View style={styles.view2}>
        <Text style={styles.text2}>
          {"Adicione os materiais para coleta"}
        </Text>
      </View>
      
      <View style={styles.listaContainer}>
        <Text style={styles.tituloLista}>
          {produtosSelecionados.length > 0 
            ? `Materiais selecionados (${produtosSelecionados.length})` 
            : "Selecione os materiais abaixo"}
        </Text>
        
        <TouchableOpacity 
          style={styles.botaoAbrirLista}
          onPress={() => setModalVisivel(true)}
        >
          <Text style={styles.botaoAbrirListaTexto}>
            {produtosSelecionados.length > 0 
              ? "Editar seleção" 
              : "Clique para selecionar materiais"}
          </Text>
        </TouchableOpacity>
        
        {produtosSelecionados.length > 0 && (
          <View style={styles.produtosSelecionadosContainer}>
            {produtosSelecionados.map((produto) => (
              <View key={produto.id} style={styles.produtoSelecionado}>
                <Text style={styles.produtoSelecionadoTexto}>{produto.nome}</Text>
                <TouchableOpacity 
                  style={styles.botaoRemover}
                  onPress={() => toggleProduto(produto)}
                >
                  <Text style={styles.botaoRemoverTexto}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.view3}>
      </View>

      <TouchableOpacity style={styles.button3}  onPress={() => navigation.navigate('Endereco1')}>
        <View style={styles.view3}>
          <Text style={styles.text5}>
            {"Adicionar Materiais"}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Selecione os Produtos</Text>
            
            <FlatList
              data={listaProdutos}
              renderItem={({ item }) => <ItemProduto item={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.flatList}
            />
            
            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={[styles.modalBotao, styles.modalBotaoConfirmar]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.modalBotaoTexto}>Confirmar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalBotao, styles.modalBotaoCancelar]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.modalBotaoTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#368642",
    paddingHorizontal: 13,
    marginBottom: 35,
  },
  scrollView: {
    backgroundColor: "#F0EDDD",
  },
  button3: {
    alignSelf: "center",
    backgroundColor: "#368642",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 8,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 12,
    marginTop: 20,
  },
  text2: {
    color: "#45B071",
    fontSize: 42,
    textAlign: "center",
    width: 266,
    fontFamily: "Guity"
  },
  text5: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  view: {
    backgroundColor: "#368642",
    paddingVertical: 13,
    paddingHorizontal: 18,
    marginTop: 27,
    marginBottom: 8,
  },
  view2: {
    alignItems: "center",
    marginBottom: 23,
  },
  view3: {
    alignItems: "center",
    marginBottom: 6,
  },
  viewmaterial: {
    flexDirection:'row',
    alignItems: 'center',
    gap:20
  },

  
  //  lista de seleção
  listaContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tituloLista: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#368642",
    marginBottom: 10,
    textAlign: "center",
  },
  botaoAbrirLista: {
    backgroundColor: "#45B071",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  botaoAbrirListaTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  produtosSelecionadosContainer: {
    marginTop: 10,
  },
  produtoSelecionado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0F8F0",
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  produtoSelecionadoTexto: {
    color: "#368642",
    fontSize: 14,
  },
  botaoRemover: {
    backgroundColor: "#FF6B6B",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoRemoverTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  // modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalConteudo: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#368642",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Guity",
  },
  flatList: {
    maxHeight: 400,
  },
  itemProduto: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemSelecionado: {
    backgroundColor: "#E8F5E9",
  },
  textoProduto: {
    fontSize: 16,
    color: "#333",
  },
  textoSelecionado: {
    color: "#368642",
    fontWeight: "bold",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelecionado: {
    backgroundColor: "#45B071",
    borderColor: "#45B071",
  },
  checkboxTexto: {
    color: "white",
    fontWeight: "bold",
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  modalBotao: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalBotaoConfirmar: {
    backgroundColor: "#368642",
  },
  modalBotaoCancelar: {
    backgroundColor: "#FF6B6B",
  },
  modalBotaoTexto: {
    color: "white",
    fontWeight: "bold",
  },
});