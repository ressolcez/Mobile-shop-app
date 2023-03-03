import React, {useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base"
import axios from 'axios';

export default function LoginScreen({navigation}){

  const [ name, setName] = useState("");
  const [ password, setPassword] = useState("");
  const [click, setClick] = useState(false);

    return (    
   <NativeBaseProvider>
     <Center flex={1} px="3" style={{ backgroundColor: 'rgb(21,25,28)' }}>
     <Box safeArea p="2" py="8" w="90%" maxW="290" style={{ backgroundColor: 'rgb(21,25,28)' }}>
      <Heading  style={{ backgroundColor: 'rgb(21,25,28)' }}
        size="lg"
        fontWeight="600"
        color='rgb(255, 117, 0)'
        _dark={{
          color: "rgb(21,25,28)",
        }}
      >
        Witamy
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color='rgb(255, 117, 0)'
        fontWeight="medium"
        size="xs"
      >
        Zaloguj się, aby kontynuować!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
        <Text style={{color: "rgb(255, 117, 0)"}}>Login</Text>
          <Input style={styles.InputStyle} onChangeText={setName} />
        </FormControl>
        <FormControl>
          <Text style={{color: "rgb(255, 117, 0)"}}>Hasło</Text>
          <Input style={styles.InputStyle} onChangeText={setPassword} type="password" />
        </FormControl>
        <Button mt="2" colorScheme='rgb(255, 117, 0)' disabled={click} onPress={
          () => {
            axios.get('http://10.0.2.2:3000/users',{
              params: {username: name, password: password}
            }).then(response => {
              setClick(true)
              if (Object.keys(response.data).length == 0) {
                  alert("Blędne haslo lub login");
                  console.log(response.data);
              } else {
                console.log(response.data[0].id);
                console.log(name);
                navigation.navigate('Home', {
                  userId: response.data[0].id,
                  name: response.data[0].username,
                  url: response.data[0].avatarUrl,
                  fullName: response.data[0].fullName,
                  password: response.data[0].password,
                });
              }
              setClick(false)
            }).catch(error =>{
              console.log(error);
            });
          }}>
            Zaloguj
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            Nowy? Zarejestruj się!{" "}
          </Text>
          <Link
            _text={{
              color: 'rgb(255, 117, 0)',
              fontWeight: "medium",
              fontSize: "sm",
            }}
            onPress={() => navigation.navigate('Ekran Rejestracji')}
          >
            Rejestracja
          </Link>
        </HStack>
      </VStack>
    </Box>
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

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "rgb(31, 36, 42)",
    borderRadius: 15,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 2,
    borderLeftColor:  "rgb(255, 117, 0)",
    borderRightColor:  "rgb(255, 117, 0)",
    borderTopColor:  "rgb(255, 117, 0)",
    borderBottomColor:  "rgb(255, 117, 0)"
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'rgb(255, 117, 0)'
  },
  
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: 'rgb(255, 117, 0)',
  },

  RegisterBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: 'rgb(255, 117, 0)',
  },
  InputStyle: {
    backgroundColor: "rgb(31, 36, 42)",
    color: "rgb(255, 117, 0)", 
    borderColor: "rgb(255, 117, 0)",

  }
});