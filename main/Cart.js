import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { StyleSheet, View, Text, Pressable, Button, Image, FlatList, Modal, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';

function Cart({route}) {
  const { userId } = route.params;
  let [data, setData] = useState([]);
  let [data2, setData2] = useState([]);
  const [selected, setSelected] = useState('');
  const [showModal, setShowModal] = useState(false)
  const isFocused = useIsFocused();
  const tablica1 = [];


  const getUserCart = async () => {

    const response1 = await axios.get('http://10.0.2.2:3000/cart?userId='+userId);
    const tab = [];
    const data = response1.data;
    for(let i = 0; i < data.length; ++i){
      tablica1.push({id: response1.data[i].id});
     console.log(tablica1)
      const resp = await axios.get('http://10.0.2.2:3000/rzeczy?id='+data[i].itemId);
      tab.push({...resp.data[0], id: i});
      console.log("tab"+tab)

    }
    setData(tab);
    setData2(tablica1);
  };
  
    useEffect(async () => getUserCart(),[isFocused]);

    const getItem = (item) => {
      axios.delete("http://10.0.2.2:3000/cart/"+data2[item].id)
    .then((response) => {
      getUserCart();
    })
    .catch((error) => {
      console.log(error);
    });
    };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1.5,
          width: '100%',
          backgroundColor: 'rgb(255,117,0)',
        }}
      />
    );
  };


    const displayCart = ({item}) => {
        return (
          <View key={item.id}>
          <TouchableOpacity  onPress={() => {
            setSelected(item.id);
            setShowModal(true);
          }}>
          <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Na pewno chcesz usunąć?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {getItem(selected); setShowModal(!showModal);}}
            >
              <Text style={styles.textStyle}>Usuń</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModal(!showModal)}
            >
              <Text style={styles.textStyle}>Wyjdź</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
            <View style={styles.box}>
                <Image style={styles.image} source={{uri: item.avatarUrl}} />
                <View style={styles.boxContent}>
                  <Text style={styles.title}>{item.nazwa}</Text>
                  <Text style={{color: 'rgb(255,117,0)', fontSize: 15}}>{item.typ}</Text>
                  <Text style={styles.description}>{item.cena}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      
       }


    return (
        <FlatList 
        ItemSeparatorComponent={ItemSeparatorView}
        keyExtractor={(item)=> item.id}
        style = {{backgroundColor: 'rgb(21,25,28)'}}
        data={data}
        renderItem={displayCart}/>
    )
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: 'rgb(21,25,28)'
  },
  itemStyle: {
    height: 150,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: 'rgb(255,117,0)',
    backgroundColor: 'rgb(31, 36, 42)',
    color:'rgb(255,117,0)'
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: 'rgb(21,25,28)'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgb(21,25,28)'
  },
  box: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: 'rgb(21,25,28)',
    flexDirection: 'row',
    color:'rgb(255,117,0)'
  },
  boxContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
    color:'rgb(255,117,0)'
  },
  description:{
    fontSize:14,
    color:'green'
  },
  title:{
    fontSize:22,
    color:'rgb(255,117,0)'
  },
  image: {
    width: 150,
    height:150,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgb(31, 36, 42)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "rgb(255,117,0)",
  },
  buttonClose: {
    backgroundColor: "rgb(255,117,0)",
  },
  textStyle: {
    color: "rgb(31, 36, 42)",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    color: "rgb(255,117,0)",
    textAlign: "center"
  }
});

export default Cart;