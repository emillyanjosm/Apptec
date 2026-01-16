import React from "react";
import {  View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, } from "react-native";
import { useFonts } from 'expo-font';


export default ({ navigation }) => {
 const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline':require('../assets/rawline-400.ttf')
  });

	return ( <ScrollView  style={styles.scrollView}>
	<View style={styles.row}>
	
		<View style={styles.view}>
		
		</View>
	</View>
	<View style={styles.view2}>
		<Text style={styles.text2}>
			{"Adicione os materiais para coleta"}
		</Text>
	</View>
	<View style={styles.view3}>
		<Text style={styles.text3}>
			{"É essencial que ele esteja arrumado conforme dito no Tutorial"}
		</Text>
    <Text style={styles.text4}  onPress={() => navigation.navigate('Tutorial1')} >
    {"Tutorial Aqui!"}
    </Text>
	</View>
   <View style={styles.view4} >
            <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Addmaterial3')}>
            
              <Text style={styles.text8}>
                {"Adicionar de Materiais"}
              </Text>
            </TouchableOpacity>
          </View>
</ScrollView>

)}


const styles = StyleSheet.create({
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
    paddingLeft: 25
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
	},

	text2: {
		color: "#45B071",
		fontSize: 42,
		textAlign: "center",
		width: 266,
    fontFamily:"Guity"
	},
	text3: {
		color: "#333333",
		fontSize: 16,
		textAlign: "center",
		width: 259,
	},
	text4: {
		color: "blue",
		fontSize: 16,
		marginBottom: 37,
    textDecorationLine:"underline"
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
		marginBottom: 86,
  
	},
  view4: {
		alignSelf: "center",
		marginBottom: 24,
	},

	view8: {
		alignItems: "center",
		paddingVertical: 16,
		marginBottom: 8,
		marginHorizontal: 27,
	},
	view9: {
		alignItems: "center",
		paddingVertical: 16,
		marginBottom: 32,
		marginHorizontal: 27,
	},
});