import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { translate } from './src/locales';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {isVisible: false};
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <Image source = {require('./imagens/Logo_Mis_1.png')}  style= {{ width: 200, height: 200, }}/>
        <View><Text style={styles.titulo}> Multimodal Infusion System </Text></View>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            this.setState({ isVisible: true });
          }}
          >
            <Text style={styles.appButtonText}>{translate('termos')}</Text>
        </TouchableOpacity>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => { this.setState({ isVisible: false }); }}
        >
          <StatusBar backgroundColor="rgba(0,44,117,1)"/>
          <View style={styles.modal}>
          <TouchableOpacity
            style={styles.botao_modal}
              onPress={() => {
                this.setState({ isVisible: false });
              }}
            >
            <Text style={styles.appButtonText}>{translate('fechar')}</Text>
            </TouchableOpacity>
            <View style={styles.caixatermo}>
            <Text style={styles.title_terms}>{translate('termos')}</Text>
            <View style={styles.caixa_terms}><Text style={styles.text_terms}>{translate('textotermo')}</Text>
            </View>
            </View>
          </View> 
        </Modal>
        <TouchableOpacity
              style={styles.botao_con}
              onPress={() => this.props.navigation.navigate('Calc')}
            >
            <Text style={styles.botao_con_text}>{translate('concordo')}</Text>
            </TouchableOpacity>
            <Text style={styles.text_tic}>Copyright © 2020 TicLab </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(0,44,117,1)',
    justifyContent: "center",
    alignItems: "center",
    },
    modal: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,1)',
      padding: 100,
    },
    caixatermo: {
        width: '170%',
        alignItems: 'center',
    },
    title_terms: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0,44,117,1)',
    },
    text_terms: {
      paddingTop: 30,
      textAlign: 'justify',
      fontSize: 18,
      color: 'rgba(0,0,0,1)',
    },  
    appButtonText: {
      fontSize: 12,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
  titulo: {
    width: '100%',
    backgroundColor: 'rgba(0,44,117,1)',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 20,
    fontSize: 20,
    color:  'white',
  },
  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    borderRadius: 10,
    height: 40,
    margin: 20,
    padding: 10,
    backgroundColor: 'rgba(8,78,193,1)',
    fontSize: 14,
  },
  botao_modal: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '50%',
    borderRadius: 10,
    position: "absolute",
    right: 10,
    height: 40,
    margin: 20,
    padding: 10,
    backgroundColor: 'rgba(0,44,117,1)',
  },
  botao_con: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    width: '50%',
    borderRadius: 10,
    height: 50,
    margin: 20,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  text_tic: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    color: 'white',
  },
  botao_con_text: {
    fontSize: 18,
    color: 'rgba(0,44,117,1)',
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
})

