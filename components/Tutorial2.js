import React from "react";
import {  View, ScrollView, ImageBackground, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';


export default ({navigation}) => {
 const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline':require('../assets/rawline-400.ttf')
  });

	return (  
    <ScrollView  style={styles.scrollView}>
	<View style={styles.column}>
	<Text style={styles.textTitulo}>
			{"Limpeza e preparo"}
		</Text>
	</View>

  
	<View style={styles.view}>
		<View style={styles.row}>
			<Image
	source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/vr1dzy7d_expires_30_days.png"}} 
	resizeMode = {"stretch"}
	style={styles.image2}
/>
			<Image
	source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/r5b9dbcv_expires_30_days.png"}} 
	resizeMode = {"stretch"}
	style={styles.image3}
/>
		<Image
	source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/kgo72coc_expires_30_days.png"}} 
	resizeMode = {"stretch"}
	style={styles.image2}
/>
		</View>
	</View>
	<View style={styles.view2}>
		<View style={styles.row2}>
			<Text style={styles.text2}>
				{"Volume"}
			</Text>
			<Text style={styles.text2}>
				{"Separação Simples"}
			</Text>
			<Text style={styles.text2}>
				{"Sem mistura"}
			</Text>
		</View>
	</View>
	<View style={styles.button}>
		<Text style={styles.text4}>
			{"Compacte: Amasse latas e garrafas PET. Papelões podem ser desmontados. Isso economiza espaço na sua casa e no transporte do coletor!"}
		</Text>
	</View>
	<View style={styles.button}>
		<Text style={styles.text4}>
			{"Facilite a coleta: Separe o material seco em sacos transparentes. Se possível, organize por tipo (papel, plástico, metal) para agilizar o processo."}
		</Text>
	</View>
	<View style={styles.button}>
		<Text style={styles.text4}>
			{"Atenção: Nunca misture seu lixo orgânico (restos de comida, cascas) com os recicláveis. Eles contaminam todo o material!"}
		</Text>
	</View>

	<View style={[styles.row3, {marginTop: 20}]}>
		<View style={styles.column2}>
			<TouchableOpacity style={styles.button3}  onPress={() => navigation.navigate('Addmaterial3')}>
				<View style={styles.view3}>
					<Text style={styles.text5}>
						{"Concluir Tutorial"}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	</View>  
	<View style={[styles.row3, {marginTop: 3}]}>
		<View style={styles.column2}>
		</View>
	</View>
</ScrollView>
  )}


  const styles = StyleSheet.create({
	textTitulo: {
		color: "#2F8A54",
    fontSize: 38,
    marginTop: 78,
    marginBottom: 22,
    paddingLeft:42,
    textAlign: "center",
    fontFamily:"Guity"
	},

	button: {
		alignSelf: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 32,
		paddingVertical: 18,
		paddingHorizontal: 10,
    paddingLeft:10,
    paddingRight: 10,
		marginBottom: 12,
    elevation:5,
	},

  	button3: {
		alignSelf: "center",
		backgroundColor: "#368642",
		borderRadius: 22,
		paddingVertical: 10,
		paddingHorizontal: 8,
    paddingLeft:30,
    paddingRight: 30,
		marginBottom: 12,
	},
	
	column: {
		alignSelf: "flex-start",
	},
	column2: {
		flex: 1,
	},

	image2: {
		width: 63,
		height: 63,
		marginRight: 45,
    marginLeft: 10,
	},

  image3: {
		width: 40,
		height: 40,
		marginRight: 45,
    marginLeft: 10,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
    paddingLeft:12,
	},
	row2: {
		flexDirection: "row",
    alignItems:"center",
    paddingLeft: 0,
	},
	row3: {
		flexDirection: "row",
    alignItems:"center",
	},
	scrollView: {
		backgroundColor: "#F0EDDD",
	},

	text2: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 10,
    paddingHorizontal: 10,
    alignItems: "center"
	},

	text4: {
		color: "#333333",
		fontSize: 12,
		width: 317,
    textAlign:"center",
    fontFamily:"Rawline"
  },
	
  text5: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
    textAlign:"center",
	},

	view: {
		alignItems: "center",
		marginBottom: 3,
	},
	view2: {
		alignItems: "center",
		marginBottom: 53,
	},
	view3: {
		alignSelf: "flex-start",
		paddingBottom: 1,
	},
});