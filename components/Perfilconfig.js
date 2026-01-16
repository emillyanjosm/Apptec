import React from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default ({ navigation }) => {
  return (
    <View style={styles.column}>
      <View style={styles.view}>
        <View style={styles.box}></View>
      </View>

      <View style={styles.view2}>
        <TouchableOpacity style={styles.button} onPress={() => alert('Pressed!')}>
          <Text style={styles.text}>{"M"}</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.view3}>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text2}>{"Informações pessoais"}</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.viewBotao2}>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text2}>{"Meus Pontos"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.view4} onPress={() => navigation.navigate('Capa')}>
        
        <View style={styles.row}>
          <View style={styles.box2}></View>
          <Text style={styles.text3}>{"Sair "}</Text>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/kuwj2jg1_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.view5}>
        <Image
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/FjIUQ5mUYZ/6ojrs7q2_expires_30_days.png" }}
          resizeMode={"stretch"}
          style={styles.image2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    backgroundColor: "#FFFFFF",
    flex: 1, 
  },
  box: {
    width: 35,
    height: 37,
    marginTop: 52,
    marginBottom: 3,
  },
  box2: {
    width: 21,
    height: 21,
    marginRight: 4,
  },
  button: {
    backgroundColor: "#2C2C2C",
    borderRadius: 9999,
    paddingVertical: 31,
    paddingHorizontal: 35,
  },
  button2: {
    backgroundColor: "#368642",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    minWidth: 230, 
    alignItems: 'center'
  },
  image: {
    width: 21,
    height: 21,
  },
  image2: {
    width: 200,
    height: 105,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#356C7D",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  text: {
    color: "#F5F5F5",
    fontSize: 20,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  text3: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
  },
  view: {
    alignItems: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingRight: 11,
    marginBottom: 49,
  },
  view2: {
    alignItems: "center",
    marginBottom: 55,
  },
  view3: {
    alignItems: "center",
    marginBottom: 15, 
  },
  viewBotao2: {
    alignItems: "center",
    marginBottom: 300,
  },
  view4: {
    alignItems: "center",
    marginBottom: 95,
  },
  view5: {
    alignItems: "flex-end",
  },
});