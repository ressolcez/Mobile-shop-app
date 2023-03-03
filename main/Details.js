import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';


function Details({route}) {
    const { userId, itemId, itemNazwa,itemTyp,itemCena,itemDodatkowyOpis,itemavatarUrl } = route.params;
    const [click, setClick] = useState(false);
    const addToCart = async () => {
       setClick(true);
       axios.post('http://10.0.2.2:3000/cart',{
            userId: userId,
            itemId: itemId,
       }).then(response => {
         alert("Poprawnie dodano do koszyka!")
       }).catch(error =>{
         console.log(error);
       })
       setClick(false);
    };

    return (
        <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30}}>
              
            <Image style={styles.productImg} source={{uri:itemavatarUrl}}/>
            <Text style={styles.name}>{itemNazwa}</Text>
            <Text style={styles.Typstyle}>{itemTyp}</Text>
            <Text style={styles.price}>{itemCena}</Text>
            <Text style={styles.description}>
             {itemDodatkowyOpis}
            </Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity disabled={click} onPress={addToCart} style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Dodaj do koszyka</Text>  
            </TouchableOpacity>
          </View> 
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: "rgb(21,25,28)",
    },
    productImg:{
      marginTop:40,
      width:400,
      height:350,
    },
    name:{
      fontSize:28,
      color:"rgb(255,117,0)",
      fontWeight:'bold'
    },
    price:{
      marginTop:10,
      fontSize:18,
      color:"green",
      fontWeight:'bold'
    },
    description:{
      textAlign:'center',
      marginTop:10,
      color:"rgb(255,117,0)",
    },
    star:{
      width:40,
      height:40,
    },
    btnColor: {
      height:30,
      width:30,
      borderRadius:30,
      marginHorizontal:3
    },
    btnSize: {
      height:40,
      width:40,
      borderRadius:40,
      borderColor:'#778899',
      borderWidth:1,
      marginHorizontal:3,
      backgroundColor:'white',
  
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentColors:{ 
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:20
    },
    contentSize:{ 
      justifyContent:'center', 
      marginHorizontal:30, 
      flexDirection:'row', 
      marginTop:20
    },
    Typstyle:{ 
        fontSize:15,
        color:"rgb(255,117,0)",
        fontWeight:'bold'
      },
    separator:{
      height:2,
      backgroundColor:"#eeeeee",
      marginTop:20,
      marginHorizontal:30,
      backgroundColor: "rgb(21,25,28)",

    },
    shareButton: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "rgb(255,117,0)",
    },
    shareButtonText:{
      color: "rgb(21,25,28)",
      fontSize:20,
    },
    addToCarContainer:{
      marginHorizontal:30
    }
  });    
      
export default Details;