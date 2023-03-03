import React, { useState, useEffect  } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";

import { useIsFocused } from '@react-navigation/native';
import { Button } from "react-native-paper";
import axios from 'axios';


import {
  Modal,
  FormControl,
  Input, FlatList, Center, NativeBaseProvider,Box } from "native-base";

function Complaint({route,navigation}) {
 
  const { userId, itemId } = route.params;
  const [data, setData] = useState('');
  const isFocused = useIsFocused();

  const getData = async () => {
    axios.get("http://10.0.2.2:3000/Reklamacja?userId="+userId)
    .then((response) => {
      console.log(response.data);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const ItemSeparatorView = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'rgb(255,117,0)',
      }}
    />
  );
};

useEffect(async () => getData(),[isFocused]);

const displayData = ({item}) => {
  return (
    <View style = {{backgroundColor: 'rgb(21,25,28)',color: 'rgb(255,117,0'}}>
    
      <View style={styles.box}>
      
        <Image style={styles.image} source={{uri: item.avatarUrl}} />
        <View style={styles.boxContent}>
          <Text style={styles.title}>{item.opis}</Text>
          
        </View>
      </View>
    
  </View>
)
}

return (
  <NativeBaseProvider>
    <Box style={{height: "100%", backgroundColor: 'rgb(21,25, 28)'}}>
    <View style={{justifyContent: "center", alignItems: "center",backgroundColor:'rgb(31, 36, 42)',color: 'rgb(31, 36, 42)' }}>
    
      <Button
        style={{ width: "30%",marginBottom: 20, marginTop: 20,backgroundColor: 'rgb(255,117,0)' }}
        icon="camera"
        mode="contained"
        onPress={ () => navigation.navigate('Szczegóły Reklamacji', {
          userId: userId,
        })}

      >
        Dodaj skarge
      </Button>

    </View>       
          <FlatList
              data={data}
              ItemSeparatorComponent={ItemSeparatorView}

              renderItem={displayData}
              keyExtractor={(item) => item.id}
          />

      </Box>
    </NativeBaseProvider>
    
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
export default Complaint;