import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const db = SQLite.openDatabase('anestesico.db');

const UpdateAnes = ({ navigation }) => {
  let [Id_anes, setId_anes] = useState('');
  let [Nome_anes, setNome_anes] = useState('');
  let [Dose_anes, setDose_anes] = useState('');
  let [Mg_anes, setMg_anes] = useState('');

  let updateAll = (Nome_anes, Dose_anes, Mg_anes) => {
    setNome_anes(Nome_anes);
    setDose_anes(Dose_anes);
    setMg_anes(Mg_anes);
  };

  let SearchAnes = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tbl_anestesico where id = ?',
        [Id_anes],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAll(
              res.nome,
              res.dose,
              res.mg
            );
          } else {
            alert('Não foi encontrado anestésicos');
          }
        }
      );
    });
  };
  let updateAnes = () => {

    if (!Id_anes) {
      alert('Por favor, insira uma ID');
      return;
    }
    if (!Nome_anes) {
      alert('Por favor, insira um Nome');
      return;
    }
    if (!Dose_anes) {
      alert('Por favor, insira uma Dose');
      return;
    }
    if (!Mg_anes) {
      alert('Por favor, insira um MG');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tbl_anestesico set nome=?, dose=? , mg=? where id=?',
        [Nome_anes, Dose_anes, Mg_anes, Id_anes],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Successo',
              'Anéstesico alterado com sucesso',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Alteração falhou');
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
        <FontAwesome5.Button name={'trash-alt'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => navigation.navigate('Deletar')} />
        </View>
        </View>
          <View style={styles.campoinput}>
              <TextInput
                placeholder="Enter User Id"
                style={styles.campo}
                onChangeText={
                  (Id_anes) => setId_anes(Id_anes)
                }
              />
                <TouchableOpacity style={styles.botao} onPress={SearchAnes}>
                    <Text style={styles.textbotao}>Pesquisar</Text>
                </TouchableOpacity>
              <TextInput
                style={styles.campo}
                placeholder="Digite o nome"
                value={Nome_anes}
                onChangeText={
                  (Nome_anes) => setNome_anes(Nome_anes)
                }
              />
              <TextInput
                placeholder="Digite a dose"
                value={'' + Dose_anes}
                onChangeText={
                  (Dose_anes) => setDose_anes(Dose_anes)
                }
                style={styles.campo}
                keyboardType="phone-pad"
              />
              <TextInput
                value={'' + Mg_anes}
                placeholder="Digite a MG"
                onChangeText={
                  (Mg_anes) => setMg_anes(Mg_anes)
                }
                style={styles.campo}
                keyboardType="phone-pad"
              />
                <TouchableOpacity style={styles.botao} onPress={updateAnes}>
                    <Text style={styles.textbotao}>Alterar</Text>
                </TouchableOpacity>
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

export default UpdateAnes;