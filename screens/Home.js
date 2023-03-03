import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import HomeTabs from '../main/HomeTabs';

const Drawer = createDrawerNavigator();


export default function Home({route}){
  const { userId, name, url,fullName,password } = route.params;
  console.log(userId, name, url);
    return (
    <Drawer.Navigator initialRouteName="HomeTabs" drawerActiveBackgroundColor = 'rgb(255,117,0)' 
    screenOptions={
      {
        drawerStyle: {
          backgroundColor: "rgb(21,25,28)",
          
        },
      drawerActiveTintColor:"rgb(255,117,0)",
      drawerInactiveTintColor:"rgb(255,117,0)",
      
      
    }}
    
    drawerContent={props => {
      return (
        <DrawerContentScrollView {...props} style = {styles.description}>
          <DrawerItemList {...props} />
          <DrawerItem inactiveTintColor='rgb(255,117,0)' activeTintColor='rgb(255,117,0)' label="Wyloguj się" onPress={() => props.navigation.navigate("Login")} />
        </DrawerContentScrollView>
      )
    }}
    >
      <Drawer.Screen name="Ekran Startowy"initialParams={{userId: userId, name: name, url: url,fullName: fullName,password: password}} component={HomeTabs} options = {{headerTintColor : "rgb(255, 117, 0)",headerStyle : {backgroundColor: "rgb(31, 36, 42)"}}} />
      <Drawer.Screen name="Autorzy" component={AuthorsScreen} options = {{headerTintColor : "rgb(255, 117, 0)",headerStyle : {backgroundColor: "rgb(31, 36, 42)"}}}/>
      
    </Drawer.Navigator>
    );{
  }}


function AuthorsScreen(){

  const [data, setData] = useState('');

  const getAuthors = async () => {
      axios.get("http://10.0.2.2:3000/authors")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
 };

 useEffect(async () => getAuthors(),[]);


 const displayAuthors = ({item}) => {

  return (
    <View style = {{backgroundColor: 'rgb(21,25,28)',color: 'rgb(255,117,0'}}>
      <TouchableOpacity>
        <View style={styles.box}>
        
          <Image style={styles.image} source={{uri: item.image}} />
          <View style={styles.boxContent}>
            <Text style={styles.title}>{item.fullname}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )

 }



  return (
    <FlatList 
      style = {{backgroundColor: 'rgb(21,25,28)'}}

      enableEmptySections={true}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={displayAuthors}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(21,25,28)",
    alignItems: "center",
    justifyContent: "center",
  },
  displayText: {
      color: 'rgb(255, 117, 0)',
      fontSize: 15
    },
    image: {
      width: 100,
      height:100,
    },
    icon:{
      width:20,
      height:20,
      alignSelf:'center',
      marginRight:10
    },
    box: {
      padding:20,
      marginTop:5,
      marginBottom:5,
      backgroundColor: 'rgb(21,25,28)',
      flexDirection: 'row',
      color: 'rgb(255,117,0)'
    },
    boxContent: {
      flex:1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft:10,
    },
    description:{
      fontSize:15,
      color: "#646464",

    },
    title:{
      fontSize:18,
      color:"rgb(255,117,0)",
    }
});