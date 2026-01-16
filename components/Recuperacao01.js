import React from "react";
import {  View, ScrollView, ImageBackground, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';


export default ({ navigation }) => {

   const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline':require('../assets/rawline-400.ttf')
  });

	return ( <ScrollView  style={styles.scrollView}>
		<View style={styles.column}>
			<Image
				source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/elbmnqty_expires_30_days.png"}} 
				resizeMode = {"stretch"}
				style={styles.image}
			/>
			<Text style={styles.absoluteText}>
				{"Recuperar Senha"}
			</Text>
		</View>
		<Text style={styles.text}>
			{"EMAIL"}
		</Text>
		<View style={styles.view}>
			<View style={styles.view2}>
			<TextInput
                style={styles.box}
                placeholder="Digite seu sobrenome"
              />
			</View>
		</View>
		<View style={styles.view3}>
			<View style={styles.box2}>
			</View>
		</View>
		<View style={styles.view4}>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recuperação2')} >
				<Text style={styles.text2}>
					{"Enviar código"}
				</Text>
			</TouchableOpacity>
		</View>
	</ScrollView>
  )
}
  
  
  const styles = StyleSheet.create({
	absoluteText: {
		position: "absolute",
		bottom: -105,
		right: -4,
		color: "#2F8A54",
		fontSize: 48,
		textAlign: "center",
		width: 250,
  fontFamily:"Guity"
	},
	box: {
		width: 260,
		height: 44,
	},
	box2: {
		width: 276,
		height: 1,
		backgroundColor: "#49454F",
	},
	button: {
		backgroundColor: "#368642",
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 16,
		shadowColor: "#00000026",
		shadowOpacity: 0.2,
		shadowOffset: {
		    width: 0,
		    height: 1
		},
		shadowRadius: 3,
		elevation: 3,
	},
	column: {
		alignSelf: "flex-start",
		marginBottom: 105,
	},
	image: {
		width: 298,
		height: 213,
	},
	image2: {
		width: 206,
		height: 108,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
		marginLeft: 45,
	},
	text2: {
		color: "#FFFFFF",
		fontSize: 14,
	},
	view: {
		alignItems: "center",
	},
	view2: {
		backgroundColor: "#C8DC6D4F",
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		paddingVertical: 16,
		paddingLeft: 16,
	},
	view3: {
		alignItems: "center",
		marginBottom: 20,
	},
	view4: {
		alignItems: "center",
		marginBottom: 154,
	},
	view5: {
		alignItems: "flex-end",
	},
});