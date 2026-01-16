import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';
import React, {useState} from 'react';
import { useTheme, ThemeProvider } from './theme/ThemeContext';

import Pagcidadao from './components/Pagcidadao';
import { NavigationContainer } from '@react-navigation/native';
import Perfilconfig from './components/Perfilconfig';
import Notificacao1 from './components/Notificacao1';
import Capa from './components/Capa';
import Cadastro from './components/Cadastro';
import Pagcatador from './components/Pagcatador';
import Perfilcatador from './components/Perfilcatador';
import Login1 from './components/Login1';
import Recuperacao01 from './components/Recuperacao01';
import Recuperacao02 from './components/Recuperação02';
import Recuperacao03 from './components/Recuperação03';
import Addmaterial from './components/Addmaterial';
import Pontocoletamap from './components/Pontocoletamap';
import Addmaterial2 from './components/Addmaterial2';
import Addmaterial3 from './components/Addmaterial3';
import Endereco1 from './components/Endereco1';
import Pontocoletamap2 from './components/Pontocoletamap2';
import Tutorial1 from './components/Tutorial1';
import Tutorial2 from './components/Tutorial2';
import Logingoogle from './components/Logingoogle';
import Historico from './components/Historico';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

const screenOptionsCidadao = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {

    if (route.name === 'Adicionar Materiais' || route.name === 'Minhas Coletas') {
      return <FontAwesome5 name="box-open" size={size} color={color} />;
    }

    let iconName;
    if (route.name === 'Início') iconName = 'home';
    

    else if (route.name === 'Pontos de Coleta' ) iconName = 'location';
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#368642',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
});

function CidadaoTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptionsCidadao}>
      <Tab.Screen name="Início" component={Pagcidadao} />
      <Tab.Screen name="Adicionar Materiais" component={Addmaterial} />
      <Tab.Screen name="Pontos de Coleta" component={Pontocoletamap} />
    </Tab.Navigator>
  );
}

const screenOptionsCatador = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    if (route.name === 'Minhas coletas') {
      return <FontAwesome5 name="box-open" size={size} color={color} />;
    }
    let iconName;
    if (route.name === 'Início') iconName = 'home';
    else if (route.name === 'Historico') iconName = 'folder';

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#088395',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
});

function CatadorTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptionsCatador}>
      <Tab.Screen name="Início" component={Pagcatador} />
      <Tab.Screen name="Historico" component={Historico} />
      

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Capa" 
          component={ Capa}
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Cadastro" 
          component={Cadastro}
          options={{ title: ' ' }} 
         />
        <Stack.Screen name="Login"
         component={Login1} 
         options={{ title: 'Acessar' }}
        />
        <Stack.Screen
          name="Logingoogle" 
          component={Logingoogle}
          options={{ headerShown: false }}
        />


        <Stack.Screen name="Recuperação" 
        component={Recuperacao01}
         options={{ title: 'Recupere sua senha' }} 
        />

        <Stack.Screen name="Recuperação2"
         component={Recuperacao02}
         options={{ title: 'Recupere sua senha' }} 
        />

        <Stack.Screen name="Recuperação3" 
        component={Recuperacao03} 
        options={{ headerShown: false }} 
        />



        <Stack.Screen 
          name="Pagcatador" 
          component={CatadorTabs} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen
          name="Pagcidadao" 
          component={CidadaoTabs}
          options={{ headerShown: false }}
        />


        <Stack.Screen name="Addmaterial" 
        component={Addmaterial} 
        options={{ title: ' ' }} 
        />
        <Stack.Screen name="Addmaterial2"
         component={Addmaterial2}
          options={{ title: ' ' }}
        />
        <Stack.Screen name="Addmaterial3"
         component={Addmaterial3} 
         options={{ title: ' ' }} 
         />
          <Stack.Screen name="historico"
         component={Historico} 
         options={{ title: ' ' }} 
         />


        <Stack.Screen name="Pontocoletamap" 
        component={Pontocoletamap} 
        options={{ headerShown: false}} 
        />
        <Stack.Screen name="Pontocoletamap2" 
        component={Pontocoletamap2} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen name="Endereco1" 
        component={Endereco1} 
        options={{ title: ' ' }} 
        />


        <Stack.Screen name="Perfilconfig" 
          component={Logingoogle} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Perfilcatador" 
          component={Perfilconfig} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Notificacao1" 
          component={Notificacao1} 
          options={{ title: ' ' }} 
        />

        <Stack.Screen name="Tutorial1"
         component={Tutorial1}
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Tutorial2"
         component={Tutorial2}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

