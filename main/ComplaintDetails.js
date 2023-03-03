import React, { useState, useEffect,useIsFocused  } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";
import CameraModule from '../configuration/CameraModule'
import axios from 'axios';



function ComplaintDetails({route}) {
  const [image, setImage] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [data, setData] = useState('');
  const [opis,setOpis] = useState('')

  const { userId } = route.params;



  const cos = (result) => {
    console.log("wtf " + result);
    axios.post('http://10.0.2.2:3000/Reklamacja/',{
      userId: userId,
      opis: opis,
      avatarUrl: image
    }).then((response) => {
      alert("dodano reklamacje")
    });
  }


useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>Brak uprawnień do kamery - nie można użyć</Text>;
  }


return (
  <View style={{ flex: 1, alignItems: "center",backgroundColor: 'rgb(21,25,28)' }}>
    
    <Text style = {{fontSize: 15,color: 'rgb(255, 117, 0)',textAlign: 'center',marginTop: 10,paddingLeft:20 }}>Zdjęcie przedmiotu  </Text>

    <Image
      source={{ uri: image }}
      style={{ width: 400, height: 400, backgroundColor: 'rgb(21,25,28)', marginTop: 20}}
      
    />
    
    <Text style = {{fontSize: 15,color: 'rgb(255, 117, 0)',textAlign: 'center',marginTop: 10,paddingLeft:20 }}>Opis reklamacji  </Text>
    
    <TextInput
      onChangeText={setOpis} style = {{width: 500, height: 350, backgroundColor: 'rgb(31, 36, 42)',color: 'rgb(255,117,0)',textAlignVertical: 'top'}}
    
  />

  <Button color = 'rgb(21,25,28)'
    style={{ marginTop: 20,width: "60%",backgroundColor:'rgb(255,117,0)' ,color: 'rgb(21,25,28)' }}
    onPress={() => {
      setShowCamera(true);
      
    }}
  >
    Dodaj Zdjęcie
  </Button>

  <Button color = 'rgb(21,25,28)'
    style={{ margin: 10,width: "60%",backgroundColor:'rgb(255,117,0)'  }}
    onPress={() => cos()}
  >
    Dodaj Reklamacje
  </Button>
{camera && (
    <CameraModule
    setImage={(result) => setImage(result.uri)}
      showModal={camera}
      setModalVisible={() => setShowCamera(false)}
    />
  )}
</View>
);
}


export default ComplaintDetails;