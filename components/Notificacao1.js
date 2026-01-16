import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, Modal } from "react-native";
import { useFonts } from 'expo-font';

export default ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'Guity': require('../assets/quity.otf'),
    'Rawline':require('../assets/rawline-400.ttf')
  });

  return (
    <View style={styles.container}>
    <Text style={styles.text}>
    {"Você ainda não possui notificações !"}
    </Text>
    </View>
  )}

  const styles = StyleSheet.create({

    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    text:{
      fontSize:18,
      fontWeight:'semiBold',
      fontFamily:'Rawline'
    }
  })