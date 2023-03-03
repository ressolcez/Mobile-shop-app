import React, { useState, useEffect,useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import CameraModule from '../configuration/CameraModule'
import axios from 'axios';

import {
  Modal,
  FormControl,
  Input,Button, FlatList, Center, NativeBaseProvider } from "native-base";

function Profile({route}) {
  const [image, setImage] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [data, setData] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { userId, name,fullName,password,url } = route.params;


 
  const cos = (result) => {
    
    setImage(result);
    console.log("cos " + result);
    axios.put('http://10.0.2.2:3000/users/'+userId,{
      id: userId,
      username: name,
      password: password,
      fullName: fullName,
      avatarUrl: result
    }).then((response) => {
      getPersonalData();
    });
  }

  const changePassword = async (result) => {

    if(password != oldPassword){
      alert("Hasla sa rozne");
      console.log("password " + password)
      console.log("Stare hasło " +oldPassword)
      return false;
    }
    console.log(newPassword);
 
   axios.put('http://10.0.2.2:3000/users/'+userId,{
    id: userId,
    username: name,
    password: newPassword,
    fullName: fullName,
    avatarUrl: url
   }).then(response => {
     alert("Poprawnie zmieniono hasło")
   }).catch(error =>{
     console.log(error);
   })
 
};

  const getPersonalData = async () => {
      axios.get("http://10.0.2.2:3000/users?id="+userId)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
 };

useEffect(async () => getPersonalData(),[],() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

 
  if (hasPermission === false) {
    return <Text>Brak uprawnień do kamery - nie można użyć</Text>;
  }

  const displayData = ({item}) => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     
        <Image
          source={{ uri: item.avatarUrl }}
          style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: 'red', marginTop: 40}}
          
        />
        
        <Text style = {{fontSize: 30,color: 'rgb(255, 117, 0)',textAlign: 'center',marginTop: 10,paddingLeft:20 }}>{item.fullName}   </Text>
        
      <Button
        style={{ margin: 10,width: "60%"  }}
        colorScheme='rgb(255, 117, 0)'
        onPress={() => {
          setShowCamera(true);
          
        }}
      >
        Ustaw Zdjęcie
      </Button>

      <Button   colorScheme='rgb(255, 117, 0)' style = {{width: "60%"}} onPress={() => setShowModal(true)}>Zmień hasło</Button>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                  <Modal.Content maxWidth="400px" style = {{backgroundColor: "rgb(31, 36, 42)", color: "rgb(255,117,0)", borderColor: "rgb(255,117,0)"}}>
                    <Modal.CloseButton />
                  
                    <Modal.Body>
                      <FormControl>
                        <FormControl> <Text style={{color: "rgb(255, 117, 0)"}}>Stare Hasło</Text></FormControl>
                        <Input style = {{borderColor: "rgb(255,117,0)", color: "rgb(255,117,0)"}} onChangeText={setOldPassword}/>
                      </FormControl>
                      <FormControl mt="3">
                      <FormControl> <Text style={{color: "rgb(255, 117, 0)"}}>Nowe Hasło</Text></FormControl>

                        <Input style = {{borderColor: "rgb(255,117,0)",color: "rgb(255,117,0)"}}onChangeText={setNewPassword}/>
                      </FormControl>
                    </Modal.Body>
                    <Modal.Footer style = {{backgroundColor:"rgb(31, 36, 42)" }}>
                      <Button.Group space={2}>
                        <Button
                         
                          colorScheme="rgb(255,117,0)"
                          onPress={() => {
                            setShowModal(false)
                          }}
                        >
                          Wyjdź
                        </Button>
                        <Button
                         colorScheme="rgb(255,117,0)"
                          onPress={changePassword}
                        >
                          Zmień
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
    {camera && (
        <CameraModule
        setImage={(result) => cos(result.uri)}
          showModal={camera}
          setModalVisible={() => setShowCamera(false)}
      
        
        />
      )}
    </View>
  );
}




return (
  <NativeBaseProvider>
      <Center style={{height: "100%", backgroundColor: 'rgb(21,25, 28)'}}>
          {data && (
          <FlatList
              data={data}
              renderItem={displayData}
              keyExtractor={(item) => item.id}
          />
          )}
      </Center>
  </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgb(21,25,28)",
      alignItems: "center",
      justifyContent: "center",
    },
});

export default Profile;