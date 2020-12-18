import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert, SafeAreaView, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('anestesico.db');

const DeleteAnes = ({navigation}) => {
  let [Id_anes, setId_anes] = useState('');
  let [DataAnes, setDataAnes] = useState({});

  let SearchAnes = () => {
    console.log(Id_anes);
    setDataAnes({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tbl_anestesico where id = ?',
        [Id_anes],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setDataAnes(results.rows.item(0));
          } else {
            alert('Não encontrado');
          }
        }
      );
    });
  };

  let deleteAnes = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  tbl_anestesico where id=?',
        [Id_anes],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Anéstesico deletado com sucesso',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Insira um ID válida');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
     <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.header}>
        <View style={styles.headerleft}>
        <FontAwesome5.Button name={'arrow-left'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => navigation.goBack()} />
        <Text style={styles.titulo}> MIS </Text>
        </View>
        <View style={styles.headerright}>
        <FontAwesome5.Button name={'plus'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => navigation.navigate('Register')} />
        <FontAwesome5.Button name={'pencil-alt'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => navigation.navigate('Editar')} />
        </View>
        </View>
      <View style={styles.campoinput}>
        <View style={styles.campoinput}>
          <TextInput
            placeholder="Digite a ID do anéstésico"
            onChangeText={
              (Id_anes) => setId_anes(Id_anes)
            }
            style={styles.campo}
          />

                <TouchableOpacity style={styles.botao} onPress={SearchAnes}>
                    <Text style={styles.textbotao}>Procurar anestésico</Text>
                </TouchableOpacity>
          <View style={styles.campoinput_2}>
            <Text style={styles.checkboxTxt}>Id: {DataAnes.id}</Text>
            <Text style={styles.checkboxTxt}>Nome: {DataAnes.nome}</Text>
            <Text style={styles.checkboxTxt}>Dose: {DataAnes.dose}</Text>
            <Text style={styles.checkboxTxt}>Mg: {DataAnes.mg}</Text>
          </View>
          <TouchableOpacity style={styles.botao} onPress={deleteAnes}>
                <Text style={styles.textbotao}>Deletar anestésico</Text>
            </TouchableOpacity>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};
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
      campoinput_2: {
        width: '80%',
        backgroundColor: 'rgba(225,255,255,0)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
      checkboxTxt: {
        marginLeft: 15,
        fontWeight: 'bold',
        padding: 10,
      },
  
  })
export default DeleteAnes;