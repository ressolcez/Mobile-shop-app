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

export default function RegisterScreen(){

  const [ name, setName] = useState("")
  const [ password, setPassword] = useState("")
  const [ fullname, setFullname] = useState("")
  const [ confpassword, setconfPassword] = useState("")
  const [click, setClick] = useState(false);
  const addName = () => {

    if (!name || !password) {
      alert("Uzupelnij pola");
      return false;
    }

      if(password != confpassword){
        alert("Hasla sa rozne");
        return false;
      }

      axios.get('http://10.0.2.2:3000/users',{
        params: {username: name}
      }).then(response => {
        if (Object.keys(response.data).length == 0) {

          axios.post('http://10.0.2.2:3000/users',{
            username: name,
            password: password,
            fullName: fullname,
            avatarUrl: "data:image/png;base64,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"
          }).then(response => {
            alert("Poprawnie zarejestorwano użytkownika")
          }).catch(error =>{
            console.log(error);
          })

        } else {
          alert("Podany login jest zajęty");
        }
      }).catch(error =>{
        console.log(error);
      });
    };

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
         Rejestracja
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
         Nie czekaj ani chwili dłużej, po prostu się zarejestruj!
       </Heading>
 
       <VStack space={3} mt="5">
         <FormControl>
         <Text style={{color: "rgb(255, 117, 0)"}}>Login</Text>
           <Input style={styles.InputStyle} onChangeText={setName} />
         </FormControl>
         <FormControl>
         <Text style={{color: "rgb(255, 117, 0)"}}>Imię i nazwisko</Text>
           <Input style={styles.InputStyle} onChangeText={setFullname} />
         </FormControl>
         <FormControl>
           <Text style={{color: "rgb(255, 117, 0)"}}>Hasło</Text>
           <Input style={styles.InputStyle} onChangeText={setPassword} type="password" />
         </FormControl>
         <FormControl>
           <Text style={{color: "rgb(255, 117, 0)"}}>Potwierdź hasło</Text>
           <Input style={styles.InputStyle} onChangeText={setconfPassword} type="password" />
         </FormControl>
         <Button mt="2" colorScheme='rgb(255, 117, 0)' disabled={click} onPress={addName}>
             Zarejestruj
         </Button>
       </VStack>
     </Box>
      </Center>
    </NativeBaseProvider>

)}

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
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 3,
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