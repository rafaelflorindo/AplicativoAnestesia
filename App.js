import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Pages/HomeScreen';
import Calc from './Pages/Calc';
import Register from './Pages/Register';
import Editar from './Pages/Editar';
import Deletar from './Pages/Deletar';

const Stack = createStackNavigator();

export default function app() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerTransparent: true,
          headerTitle: null,
        }} />
        <Stack.Screen name="Calc" component={Calc} options={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }} />
        <Stack.Screen name="Register" component={Register} options={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }} />
        <Stack.Screen name="Editar" component={Editar} options={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }} />
        <Stack.Screen name="Deletar" component={Deletar} options={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}