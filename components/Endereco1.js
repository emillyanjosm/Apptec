import React from "react";
import {  View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, TextInput, SafeAreaView} from "react-native";
import { useFonts } from 'expo-font';

export default ({ navigation }) => {
 const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline':require('../assets/rawline-400.ttf')
  });

	return (
   
  <ScrollView  style={styles.scrollView}>
	    <View style={styles.row}>
	
		  <View style={styles.view}>
		
	  	</View>
	    </View>
	<View style={styles.view2}>
		<Text style={styles.text2}>
			{"Adicione o endereço para coleta"}
		</Text>
	</View>
  
  <View style={styles.view2}>
        <View >
          <View style={styles.box2}>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text3}>
              {"Rua/Avenida e número"}
            </Text>
            <View style={styles.view4}>
              <TextInput
                style={styles.box}
                placeholder=" Ex: Rua da Consolação, 1234"
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.view2}>
        <View >
          <View style={styles.box2}>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text3}>
              {"Bairro"}
            </Text>
            <View style={styles.view4}>
              <TextInput
                style={styles.box}
                placeholder=" Ex: Centro"
              />
            </View>
          </View>
        </View>
      </View>

       <View style={styles.view2}>
        <View >
          <View style={styles.box2}>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text3}>
              {"Cep"}
            </Text>
            <View style={styles.view4}>
              <TextInput
                style={styles.box}
                placeholder=" Ex: 00000-00"
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.view2}>
        <View >
          <View style={styles.box2}>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text3}>
              {"Ponto de Referência"}
            </Text>
            <View style={styles.view4}>
              <TextInput
                style={styles.box}
                placeholder=" Ex: Perto do mercado"
              />
            </View>
          </View>
        </View>
      </View>

        <View style={styles.viewBotao}>
          <View >
            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Pontocoletamap')}>
              <Text style={styles.text8}>
                {" Adicionar Endereço no mapa"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

           <View style={styles.view2}>
          <View >
            <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Pagcidadao')}>
            
              <Text style={styles.text8}>
                {"Finalizar Adição de Materiais"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

</ScrollView>

)}


const styles = StyleSheet.create({
  box: {
    width: 260,
    height: 42,
  },

	box2: {
    width: 276,
    height: 2,
  },
  
    column2: {
    alignSelf: "flex-start",
  },
  
   button2: {
    alignSelf: "flex-start",
    backgroundColor: "#45B071",
    borderRadius: 60,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowRadius: 3,
    elevation: 3,
    width: 270,
    height: 56,
  },

  button3: {
    alignSelf: "flex-start",
    backgroundColor: "#368642",
    borderRadius: 60,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowRadius: 3,
    elevation: 3,
    width: 270,
    height: 56,
  },
  
  row: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#368642",
		paddingHorizontal: 13,
		marginBottom: 35,
	},
	scrollView: {
		backgroundColor: "#F0EDDD",
    height: 125,
    marginBottom: 50
	},

	text2: {
		color: "#45B071",
		fontSize: 42,
		textAlign: "center",
		width: 266,
    fontFamily:"Guity"
	},

  text3: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },

  text8: {
    color: "#FFFFFF",
    fontSize: 15,
    alignSelf:"center",
    paddingTop:6,
    fontWeight: "bold"
  },
 
	view: {
		backgroundColor: "#368642",
		paddingVertical: 10,
		paddingHorizontal: 18,
		marginTop: 27,
		marginBottom: 8,
	},
	view2: {
		alignItems: "center",
		marginBottom: 24,
   // marginTop: 8,
	},

 view4: {
    alignSelf: "flex-start",
    backgroundColor: "#C8DC6D4F",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingVertical: 6,
    paddingLeft: 16,
  },

  viewBotao: {
		alignItems: "center",
		marginBottom: 24,
    marginTop: 25,
	},

 
});