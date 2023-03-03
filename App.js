import React, {useContext, useState} from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import HomeTabs from './main/HomeTabs';
import Details from './main/Details';
import ComplaintDetails from './main/ComplaintDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
return (
  
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen options = {{headerShown: false}}name="Login" component={LoginScreen}/>
        <Stack.Screen options = {{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options = {{headerShown: false}} name="HomeTabs" component={HomeTabs}/>
        <Stack.Screen name="Szczegóły" component={Details} options = {{headerTintColor : "rgb(255, 117, 0)",headerStyle : {backgroundColor: "rgb(31, 36, 42)"}}}/>
        <Stack.Screen name="Ekran Rejestracji" component={RegisterScreen} options = {{headerTintColor : "rgb(255, 117, 0)",headerStyle : {backgroundColor: "rgb(31, 36, 42)"}}}/>
        <Stack.Screen name="Szczegóły Reklamacji" component={ComplaintDetails} options = {{headerTintColor : "rgb(255, 117, 0)",headerStyle : {backgroundColor: "rgb(31, 36, 42)"}}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}