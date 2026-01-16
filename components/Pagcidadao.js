import React, { useState } from "react";
import { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity,
  Image, 
  StyleSheet,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Appearance } from "react-native";

import MapaLocalizacao from "./MapaLocalizacao";
import Perfilconfig from "./Perfilconfig";

const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  
  // Use dark color scheme
}


export default function Pagcidadao({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      
      <ScrollView style={styles.scrollView}>

        {/*header */}
        <View style={styles.row}>
          <Text style={styles.text}>
            {"Olá SR. Fulano"}
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Notificacao1')}>
            <Ionicons name="notifications-circle-sharp" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.view} onPress={() => navigation.navigate('Perfilconfig')}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/itsu7d2d_expires_30_days.png" }}
              resizeMode={"stretch"}
              style={styles.image}
            />

          </TouchableOpacity>
        </View>
        
        {/*mapa */}
        <View style={styles.mapSection}>

          <View style={styles.mapContainer}>
            <MapaLocalizacao />
          </View>

        </View>
        
      </ScrollView>
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
    backgroundColor: "#368642",
    paddingTop: 50, 
    paddingHorizontal: 20,
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

  mapSection: {
    margin: 15,
    backgroundColor: 'white',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    color: '#333',
  },
  mapContainer: {
    height: 600, // Altura fixa para o mapa
  },

});