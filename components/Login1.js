import React from "react";
import {  View, ScrollView, ImageBackground, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';

export default ({navigation}) => {

  const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline':require('../assets/rawline-400.ttf')
  });
  


	return ( <ScrollView  style={styles.scrollView}>
	
  
  <ImageBackground 
		source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/794ih8pg_expires_30_days.png"}} 
		resizeMode = {'stretch'}
		style={styles.view}
		>
	
	</ImageBackground>
	<Text style={styles.text}>
			{"Login"}
		</Text>

	<View style={styles.view2}>
		<View >
			<Text style={styles.text2}>
				{"EMAIL"}
        
			</Text>
			<View style={styles.view3}>
				<TextInput
        style={styles.box}
        placeholder="Digite seu email aqui"
      />
			</View>
		</View>
	</View>
	<View style={styles.view2}>
		<View style={styles.box2}>
		</View>
	</View>
	<View style={styles.view2}>
		<View >
			<Text style={styles.text3}>
				{"SENHA"}
			</Text>
			<View style={styles.view3}>
			<TextInput
        style={styles.box}
        placeholder="Digite sua senha aqui"
      />
			</View>
		</View>
	</View>
	<View style={styles.view4}>
		<View style={styles.box3}>
		</View>
	</View>
	<Text style={styles.text4} onPress={() => navigation.navigate('Recuperação')} > 
		{"Esqueci a senha"}
	</Text>

	<View style={styles.view5}>
		<View style={styles.row}>
		
			<TouchableOpacity style={styles.button2} onPress={()=>{navigation.navigate('Pagcidadao')}}>
				<Text style={styles.text5}>
					{"Fazer Login"}
				</Text>
			</TouchableOpacity>
		</View>
	</View>
	<View style={styles.view6}>
		<Image
			source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/5ff20z5a_expires_30_days.png"}} 
			resizeMode = {"stretch"}
			style={styles.image}
		/>
	</View>
</ScrollView>

)
}
		
    const styles = StyleSheet.create({
	box: {
		width: 260,
		height: 37,
	},
	box2: {
		width: 276,
		height: 20,
	},
	box3: {
		width: 276,
		height: 1,
		backgroundColor: "#49454F",
	},

	button2: {
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
	image: {
		width: 206,
		height: 108,
	},
	row: {
		flexDirection: "row",
	},
	scrollView: {
		backgroundColor: "#F0EDDC",
	},
	text: {
		color: "#2F8A54",
		fontSize: 48,
		marginTop: 158,
		marginBottom: 2,
    alignSelf:"center",
    fontFamily:"Guity"
	},
	text2: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 236,
	},
	text3: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 231,
	},
	text4: {
		color: "blue",
    textDecorationLine: 'underline',
		fontSize: 12,
		marginBottom: 46,
		marginLeft: 43,
	},
	text5: {
		color: "#FFFFFF",
		fontSize: 14,
	},
	view: {
		alignSelf: "flex-start",
		paddingLeft: 156,
		marginBottom: 46,
	},
	view2: {
		alignItems: "center",
	},
	view3: {
		alignSelf: "flex-start",
		backgroundColor: "#C8DC6D4F",
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		paddingVertical: 16,
		paddingLeft: 16,
	},
	view4: {
		alignItems: "center",
		marginBottom: 11,
	},
	view5: {
		alignItems: "center",
		marginBottom: 264,
	},
	view6: {
		alignItems: "flex-end",
	},
});
