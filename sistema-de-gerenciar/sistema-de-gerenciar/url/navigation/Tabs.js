import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import InsertScreen from '../screens/InsertScreen';
import EntradaScreen from '../screens/EntradaScreen';
import SaidaScreen from '../screens/SaidaScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function Tabs() {
  
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Inserir"
        component={InsertScreen}
        options={{
          tabBarLabel: 'Inserir',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="edit" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Entradas"
        component={EntradaScreen}
        options={{
          tabBarLabel: 'Minhas Entradas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Saídas"
        component={SaidaScreen}
        options={{
          tabBarLabel: 'Minhas Saídas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="money-off" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
