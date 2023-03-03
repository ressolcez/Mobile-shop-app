import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Search from './Search';
import Cart from './Cart';
import Profile from './Profile';
import Complaint from './Complaint';
import HomeMain from './HomeMain';

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs({route}) {
  const { userId, name, url,fullName,password } = route.params;
    return (
        <Tab.Navigator    activeColor="rgb(255,117,0)"
        inactiveColor="rgb(255,117,0)"
        barStyle={{ backgroundColor: 'rgb(31, 36, 42)' }}

      >
        <Tab.Screen   name="Ekran Główny" initialParams={{userId: userId}} component={HomeMain}  options={{
                      tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="home" color={color} size={26} 
/>
                      ),
                     
                     
            }}
            />
        <Tab.Screen name="Wyszukiwanie" initialParams={{userId: userId}} component={Search} options={{
                      tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="magnify" color={color} size={26} />
                      ),
                     
        }}/>

        <Tab.Screen name="Koszyk" initialParams={{userId: userId}} component={Cart} options={{
                      tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="cart" color={color} size={26} />
                      ),
        }}/>

        <Tab.Screen name="Reklamacja" component={Complaint} initialParams={{userId: userId}} options={{
                      tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="account-cash" color={color} size={26} />
                      ),
        }}/>

        <Tab.Screen name="Profil" initialParams={{userId: userId, name: name, url: url, fullName: fullName,password: password}} component={Profile} options={{
                      tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                      ),
        }}/>
      </Tab.Navigator>
    )
}