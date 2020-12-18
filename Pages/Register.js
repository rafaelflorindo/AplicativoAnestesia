import React, {useState, useEffect, Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import {FlatList, Text, View, TouchableOpacity, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const db = SQLite.openDatabase('anestesico.db');

export default function Register({ navigation }) {

    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists tbl_anestesico (id integer primary key not null, nome text, dose real, mg real);'
        );
      });


    let[Nome_anes, setNome_anes] = useState('');
    let[Dose_anes, setDose_anes] = useState('');
    let[Mg_anes, setMg_anes] = useState('');

    let Register_anes = () => {
        if(!Nome_anes) {
            alert('Escreva um anestésico');
            return;
        } else if(!Dose_anes) {
            alert('Escreva uma dose');
            return;
        } else if(!Mg_anes) {
            alert('Escreva uma Mg');
            return;
        }
        db.transaction(
            tx => {
              tx.executeSql('insert into tbl_anestesico (nome, dose, mg) values (?, ?, ?)', [Nome_anes, Dose_anes, Mg_anes]);
              tx.executeSql('select * from tbl_anestesico', [], (_, { rows }) =>
                alert('Anéstesico cadastrado com sucesso!'),
                console.log('legal')
              );
            },
          );
    };

    let [flatListItems, setFlatListItems] = useState([]);

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM tbl_anestesico',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
      });
    }, []);
  
    let listViewItemSeparator = () => {
      return (
        <View style={{height: 0.2, width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderBottomColor: 'rgba(0,44,117,1)',
        borderBottomWidth: 2,}} />
      );
    };
  
    let listItemView = (item) => {
      return (
        <View
          key={item.id}
          style={{backgroundColor: 'rgba(225,255,255,0)',
          padding: 20,
          borderBottomColor: 'rgba(0,44,117,1)',
          borderSize: 2, }}>
          <Text>Id: {item.id}</Text>
          <Text>Nome: {item.nome}</Text>
          <Text>Dose: {item.dose}</Text>
          <Text>MG: {item.mg}</Text>
        </View>
      );
    };  
    
    return(
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.header}>
        <View style={styles.headerleft}>
        <FontAwesome5.Button name={'arrow-left'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => navigation.goBack()} />
        <Text style={styles.titulo}> MIS </Text>
        </View>
        <View style={styles.headerright}>
        <FontAwesome5.Button name={'pencil-alt'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => navigation.navigate('Editar')} />
        <FontAwesome5.Button name={'trash-alt'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => navigation.navigate('Deletar')} />
        </View>
        </View>
            <View style={styles.campoinput}>
                <TextInput 
                    placeholder="Nome"
                    onChangeText={(Nome_anes) => setNome_anes(Nome_anes)}
                    style={styles.campo}
                />
                <TextInput 
                    placeholder="Dose"
                    onChangeText={(Dose_anes) => setDose_anes(Dose_anes)}
                    style={styles.campo}
                />
                <TextInput 
                    placeholder="Mg"
                    onChangeText={(Mg_anes) => setMg_anes(Mg_anes)}
                    style={styles.campo}
                />
                <TouchableOpacity style={styles.botao} onPress={Register_anes}>
                    <Text style={styles.textbotao}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
            </View>
            <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: 'rgba(0,44,117,1)',
      borderBottomWidth: 2,
    },
    header:{
      width: '100%',
      height: 80,
      backgroundColor: 'rgba(0,44,117,1)',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    headerleft:{
      width: '50%',
      height: 60,
      backgroundColor: 'rgba(0,44,117,1)',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginTop: 20,
    },
    headerright:{
      width: '50%',
      height: 60,
      backgroundColor: 'rgba(0,44,117,1)',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginTop: 20,
    },
    titulo: {
      backgroundColor: 'rgba(0,44,117,1)',
      textAlign: 'center',
      paddingLeft: 20,
      fontSize: 27,
      color:  'white',
      marginRight: '25%',
    },
    campo: {
      width: '80%',
      backgroundColor: 'rgba(225,255,255,0)',
      marginTop: 30,
      fontSize: 16,
      color: 'rgba(0,44,117,1)',
      borderBottomColor: 'rgba(0,44,117,1)',
      borderBottomWidth: 2,
    },
    campoinput: {
        width: '100%',
        backgroundColor: 'rgba(225,255,255,0)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      botao: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        margin: 20,
        padding: 10,
        backgroundColor: 'rgba(0,44,117,1)',
      },
      textbotao: {
        color: 'white',
      },
  
  })