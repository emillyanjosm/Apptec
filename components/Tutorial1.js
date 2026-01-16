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
				source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/3rtb0ftz_expires_30_days.png"}} 
				resizeMode = {"stretch"}
				style={styles.image2}
			/>
			<Image
				source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/o0cu4z6d_expires_30_days.png"}} 
				resizeMode = {"stretch"}
				style={styles.image3}
			/>
			<Image
				source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/kry91etg_expires_30_days.png"}} 
				resizeMode = {"stretch"}
				style={styles.image4}
			/>
		</View>
	</View>
	<View style={styles.view2}>
		<View style={styles.row2}>
			<Text style={styles.text}>
				{"Limpeza"}
			</Text>
			<Text style={styles.text2}>
				{"Reciclável seco"}
			</Text>
			<Text style={styles.text3}>
				{"Vidro seguro"}
			</Text>
		</View>
	</View>
	<View style={styles.button}>
		<Text style={styles.text4}>
			{"Descarte restos de comida ou líquido dos recipientes. Uma água rápida é suficiente para evitar mau cheiro e contaminação do material."}
		</Text>
	</View>
	<View style={styles.button}>
		<Text style={styles.text4}>
			{"Não precisamos de materiais encharcados. Seque o que for possível. Materiais secos valem mais e facilitam o trabalho do coletor!"}
		</Text>
	</View>
	<View style={styles.button}>
		<Text style={styles.text4}>
			{"Se for doar vidros quebrados, envolva-os em jornais ou caixas de papelão para evitar acidentes durante o manuseio."}
		</Text>
	</View>

	<View style={[styles.row3, {marginTop: 20}]}>
		<View style={styles.column2}>
			<TouchableOpacity style={styles.button3} onPress={()=>navigation.navigate('Tutorial2')}>
				<View style={styles.view3}>
					<Text style={styles.text5}>
						{"Continuar Tutorial"}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	</View>  
	<View style={[styles.row3, {marginTop: 3}]}>
		<View style={styles.column2}>
			<TouchableOpacity style={styles.button2}  onPress={() => navigation.navigate('Addmaterial3')}>
				<View style={styles.view3}>
					<Text style={styles.text7}>
						{"Pular"}
					</Text>
				</View>
			</TouchableOpacity>
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
	button2: {
		alignSelf: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 22,
		paddingVertical: 10,
		paddingHorizontal: 8,
    paddingLeft:30,
    paddingRight: 30,
		marginBottom: 12,
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
		marginRight: 51,
	},
	image3: {
		width: 67,
		height: 67,
		marginRight: 53,
	},
	image4: {
		width: 49,
		height: 49,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
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
	text: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 55,
	},
	text2: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 42,
	},
	text3: {
		color: "#000000",
		fontSize: 12,
		fontWeight: "bold",
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

	text7: {
		color: "#2F8A54",
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