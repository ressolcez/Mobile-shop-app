import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
function Search({route, navigation}) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const { userId } = route.params;
  
  useEffect(() => {
    fetch('http://10.0.2.2:3000/rzeczy')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
   
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.nazwa
            ? item.nazwa.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
     
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    
return (
  <View style = {{backgroundColor: 'rgb(21,25,28)'}}key={item.id}>
    <TouchableOpacity
     onPress={() => getItem(item)}
    >
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

    );
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(21,25,28)'}}>
      <View style={styles.container}>
        
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          style = {{backgroundColor: 'rgb(21,25,28)'}}
        />
      </View>
    </SafeAreaView>
  );
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
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
    marginTop: 5,
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
  }
});
export default Search;