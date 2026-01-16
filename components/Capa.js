
import React from "react";
import {  View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, } from "react-native";
import { useFonts } from 'expo-font';//Importar o useFonts
import { Ionicons} from '@expo/vector-icons';

export default ({ navigation }) => {

  //Dizer qual fonte é 
  const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline':require('../assets/rawline-400.ttf')
  });
  
	return (
	
			<View  style={styles.scrollView}>
				<View style={styles.column}>
					<Text style={styles.text}>
						{"Bem vindo ao\napp do  "}
					</Text>
					<ImageBackground 
						source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/jZMyHt4aMo/af34uhon_expires_30_days.png"}} 
						resizeMode = {'stretch'}
						style={styles.view}
						>
						<View style={styles.column2}>
							<Text style={styles.text2}>
								{"Projeto"}
							</Text>
							<View style={styles.view2}>
								<Text style={styles.text3}>
									{"PRODUTEC"}
								</Text>
							</View>
						</View>
					</ImageBackground>
				</View>
                
        <View style=
        {styles.buttonView}>
        	<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
					<Text style={styles.text4}>
						{"Primeira vez? Cadastre"}
					</Text>
				</TouchableOpacity>
			<TouchableOpacity  style={styles.button2} onPress={() => navigation.navigate('Login')} >
      <Text style={styles.text4}>
        {"Já é cadastrado? Login "}
      </Text>
    </TouchableOpacity>
				<Text style={styles.text5}>
					{"ou"}
				</Text>
		<TouchableOpacity  style={styles.button3} onPress={() => navigation.navigate('Logingoogle')} >
  <Text style={styles.text4}>
    {"Entrar com Google"}
  </Text>
   <Ionicons name="logo-google" size={15} color="white" paddingTop={4} />
</TouchableOpacity>
        </View>
			
			</View>
	
	)
}
const styles = StyleSheet.create({
	
	button: {
		backgroundColor: "#088395",
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 16,
		marginBottom: 26,
	},
	button2: {
		backgroundColor: "#368642",
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 16,
		marginBottom: 11,
	},
	button3: {
		backgroundColor: "#356C7D",
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 16,
		marginTop: 4,
		marginBottom: 172,
    flexDirection:'row'
	},
	column: {
		marginTop: 75,
		marginBottom: 38,
    paddingHorizontal:10,
	},
	column2: {
		alignSelf: "center",
		paddingBottom: 10,
		paddingHorizontal: 1,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#F0EDDC",
	},

  buttonView: {
		flex: 1,
		backgroundColor: "#F0EDDC",
    paddingHorizontal: 80,
	},

	text: {
		color: "#368642",
		fontSize: 32,
		marginLeft: 17,
		width: 171,
    fontFamily: "Guity",
   // fontFamily: "roboto"
	},
	text2: {
		color: "#D6FF1F",
		fontSize: 28,
		marginLeft: 14,
    fontFamily: "Guity",
	},
	text3: {
		color: "#10DB63",
		fontSize: 55,
    fontFamily: "Guity",
	},
	text4: {
		color: "#FFFFFF",
		fontSize: 14,
    alignSelf:"center",
    fontFamily:"Rawline",
    paddingHorizontal: 10,
    fontWeight:'bold'
	},
	text5: {
		color: "#000000",
		fontSize: 14,
		marginBottom: 7,
    alignSelf:"center",
    fontFamily:"Guity"
	},
	view: {
		alignSelf: "center",
		paddingVertical: 70,
		paddingHorizontal: 30,
	},
	view2: {
		alignSelf: "flex-start",
	},
});