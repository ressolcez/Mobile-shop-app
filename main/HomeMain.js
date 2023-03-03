import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet} from 'react-native';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  FlatList,
  Pressable
} from "native-base"

function HomeMain({route, navigation}) {
  const { userId} = route.params;
  const [data, setData] = useState('');
  const [click, setClick] = useState(false);

  const getData = async () => {
    setClick(true);
      axios.get("http://10.0.2.2:3000/rzeczy")
      .then((response) => {
        //console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setClick(false);
 };

 useEffect(async () => getData(),[]);

 const getItem = (item) => {
    navigation.navigate('Szczegóły', {
    userId: userId,
    itemId: item.id,
    itemNazwa: item.nazwa,
    itemTyp: item.typ,
    itemCena: item.cena,
    itemDodatkowyOpis: item.DodatkowyOpis,
    itemavatarUrl: item.avatarUrl
  });
};

const displayDatas = ({item}) => {
  return (
    <Pressable onPress={() => {getItem(item);}}>
    
    <Box
    marginTop = "10"
    marginLeft="10"
    marginRight="10"
      maxW="800"
      rounded="lg"
      overflow="hidden"
      borderColor="rgb(255, 117, 0)"
      borderWidth="1"
      color = "rgb(255, 117, 0)"
    >
      <Box>
          <Image
            source={{
              uri: item.avatarUrl,
            }}
            alt="image"
            style={styles.responsiveImage}
          />
       
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1" color = "rgb(255, 117, 0)">
            {item.nazwa}
          </Heading>
          <Text
            fontSize = "14"
            fontWeight="500"
            ml="-0.5"
            mt="-1"
            color = " rgb(255, 117, 0)"
          >
            {item.typ}
          </Text>
        </Stack>
        <Text fontWeight="400" color = "rgb(255, 117, 0)" >
          {item.opis}
        </Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              style={{color:'green'}}
              fontWeight="400"

            >
              {item.cena}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
    </Pressable>
  )
}

return (
  <NativeBaseProvider>
    <Center backgroundColor = 'rgb(21,25,28)' color = " rgb(255, 117, 0) " >

          <FlatList
              data={data}
              renderItem={displayDatas}
              keyExtractor={(item) => item.id}
          />
         
    </Center>
  </NativeBaseProvider>
)
}

const styles = StyleSheet.create({

  responsiveImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },

});
export default HomeMain;