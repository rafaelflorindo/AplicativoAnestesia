import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Modal } from 'react-native';
import {CheckBox} from "native-base"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { translate } from './src/locales';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: (''),
      isVisible: false,
      peso: 0,
      tempo: 0,
      somaSul: 0,
      somaLido: 0,
      somaCet: 0,
      somaDex: 0,
      valDiluente: 0,
      sulDose: 0,
      sulMg: 0,
      cetDose: 0,
      cetMg: 0,
      lidoDose: 0,
      lidoMg: 0,
      dexDose: 0,
      dexMg: 0,
      totalSul: 0,
      totalLido: 0,
      totalCet: 0,
      totalDex: 0,
      checkedSul: false,
      checkedLido: false,
      checkedCet: false,
      checkedDex: false,
      anestotal: 0,
      dosediluente: 0,
    }
    this.calcular = this.calcular.bind(this)
  }
  calcular() {

    if(this.state.checkedSul == true) {
      this.state.somaSul = this.state.sulDose * this.state.peso * this.state.valDiluente / (this.state.valDiluente / this.state.tempo)
      this.state.totalSul = this.state.somaSul / this.state.sulMg
    } else {
      this.state.somaSul = 0
      this.state.totalSul = 0
    }

    if(this.state.checkedLido == true) {
      this.state.somaLido = this.state.lidoDose * this.state.peso * this.state.valDiluente / (this.state.valDiluente / this.state.tempo)
      this.state.totalLido = this.state.somaLido / this.state.lidoMg
    } else {
      this.state.somaLido = 0
      this.state.totalLido = 0
    }

    if(this.state.checkedCet == true) {
      this.state.somaCet= this.state.cetDose * this.state.peso * this.state.valDiluente / (this.state.valDiluente / this.state.tempo)
      this.state.totalCet = this.state.somaCet / this.state.cetMg
    } else {
      this.state.somaCet = 0
      this.state.totalCet = 0
    }

    if(this.state.checkedDex == true) {
      this.state.somaDex = this.state.dexDose * this.state.peso * this.state.valDiluente / (this.state.valDiluente / this.state.tempo)
      this.state.totalDex = this.state.somaDex / this.state.dexMg
    } else {
      this.state.somaDex = 0
      this.state.totalDex = 0
    }

    {/* let total = this.state.peso * this.state.tempo * (this.state.somaSul + this.state.somaLido + this.state.somaCet + this.state.somaDex); */}
    this.setState({ isVisible: true });
    this.state.anestotal = this.state.totalSul  + (this.state.totalLido + this.state.totalCet + this.state.totalDex)
    this.state.dosediluente = this.state.valDiluente - (this.state.totalSul + this.state.totalLido + this.state.totalCet + this.state.totalDex)
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.header}>
        <View style={styles.headerleft}>
        <FontAwesome5.Button name={'arrow-left'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => this.props.navigation.goBack()} />
        <Text style={styles.titulo}> MIS </Text>
        </View>
        <View style={styles.headerright}>
        <FontAwesome5.Button name={'plus'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => this.props.navigation.navigate('Register')} />
        <FontAwesome5.Button name={'pencil-alt'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => this.props.navigation.navigate('Editar')} />
        <FontAwesome5.Button name={'trash-alt'} size={22} backgroundColor={'rgba(0,44,117,1)'} color={'white'} onPress={() => this.props.navigation.navigate('Deletar')} />
        </View>
        </View>

      <View style={styles.campoText}>
      <Text style={styles.checkboxTxt}>Peso:</Text>
      <TextInput style={styles.campo} keyboardType={"phone-pad"} placeholder={translate('pesopaciente_2')}  onChangeText={(peso)=> {this.setState({peso})}} />
      </View>
      <View style={styles.campoText}>
      <Text style={styles.checkboxTxt}>Tempo:</Text>
      <TextInput style={styles.campo} keyboardType={"phone-pad"} placeholder={translate('tempocirurgia')} onChangeText={(tempo)=> {this.setState({tempo})}} />
      </View>
      <View style={styles.campoText}>
      <Text style={styles.checkboxTxt}>Volume:</Text>
      <TextInput style={styles.campo} keyboardType={"phone-pad"} placeholder={translate('volumetotal')} onChangeText={(valDiluente)=> {this.setState({valDiluente})}} />
      </View>
      
      
      <View style={styles.picker}>
      <View style={styles.viewcheck}>
      <CheckBox
        color='rgba(0,44,117,1)'
        checked={this.state.checkedSul}
        onPress={() => this.setState({ checkedSul: !this.state.checkedSul })}
        /><Text style={styles.checkboxTxt}>{translate('sulfato')}</Text>
        <Text style={styles.textvalInput}>Dose: </Text><TextInput style={styles.styleDose} keyboardType={"phone-pad"} placeholder="Dose" onChangeText={(sulDose)=> {this.setState({sulDose})}} />
        <Text style={styles.textvalInput}>Mg/Ml: </Text><TextInput style={styles.styleMg} keyboardType={"phone-pad"} placeholder="MG" onChangeText={(sulMg)=> {this.setState({sulMg})}} />
        </View>

      <View style={styles.viewcheck}>
      <CheckBox
            color='rgba(0,44,117,1)'
            checked={this.state.checkedLido}
            onPress={() => this.setState({ checkedLido: !this.state.checkedLido })}
        /><Text style={styles.checkboxTxt}>{translate('lidocaina')}</Text>
        <Text style={styles.textvalInput}>Dose: </Text><TextInput style={styles.styleDose} keyboardType={"phone-pad"} placeholder="Dose" onChangeText={(lidoDose)=> {this.setState({lidoDose})}} />
        <Text style={styles.textvalInput}>Mg/Ml: </Text><TextInput style={styles.styleMg} keyboardType={"phone-pad"} placeholder="MG" onChangeText={(lidoMg)=> {this.setState({lidoMg})}} />
        </View>

        <View style={styles.viewcheck}>
       <CheckBox
            color='rgba(0,44,117,1)'
            checked={this.state.checkedCet}
            onPress={() => this.setState({checkedCet: !this.state.checkedCet})}
        /><Text style={styles.checkboxTxt}>{translate('cetamina')}</Text>
        <Text style={styles.textvalInput}>Dose: </Text><TextInput style={styles.styleDose} keyboardType={"phone-pad"} placeholder="Dose" onChangeText={(cetDose)=> {this.setState({cetDose})}} />
        <Text style={styles.textvalInput}>Mg/Ml: </Text><TextInput style={styles.styleMg} keyboardType={"phone-pad"} placeholder="MG" onChangeText={(cetMg)=> {this.setState({cetMg})}} />
        </View>

        <View style={styles.viewcheck}>
        <CheckBox
            color='rgba(0,44,117,1)'
            checked={this.state.checkedDex}
            onPress={() => this.setState({checkedDex: !this.state.checkedDex})}
        /><Text style={styles.checkboxTxt}>{translate('dexmedetomidina')}</Text>
        <Text style={styles.textvalInput}>Dose: </Text><TextInput style={styles.styleDose} keyboardType={"phone-pad"} placeholder="Dose" onChangeText={(dexDose)=> {this.setState({dexDose})}} />
        <Text style={styles.textvalInput}>Mg/Ml: </Text><TextInput style={styles.styleMg} keyboardType={"phone-pad"} placeholder="MG" onChangeText={(dexMg)=> {this.setState({dexMg})}} />
        </View>
        </View>

      <TouchableOpacity style={styles.botao} onPress={this.calcular}>
        <Text style={styles.textbotao}>{translate('calcular')}</Text>
      </TouchableOpacity>
      <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => { this.setState({ isVisible: false }); }}
        >
          <StatusBar style="auto"/>
          <View style={styles.modal}>
          <TouchableOpacity
            style={styles.botao_modal}
              onPress={() => {
                this.setState({ isVisible: false });
              }}
            >
            <Text style={styles.appButtonText}>{translate('fechar')}</Text>
            </TouchableOpacity>
            <Text style={styles.textcirurgia}>{translate('dadoscirurgia')}</Text>
            <Text style={styles.infocirurgia}>{translate('pesopaciente')} {' ' + parseFloat(this.state.peso).toFixed(2)}</Text>
            <Text style={styles.infocirurgia}>{translate('tempodecirurgia')} {' ' + parseFloat(this.state.tempo).toFixed(2)}</Text>
            <Text style={styles.infocirurgia}>{translate('Volumetotal')} {' ' + parseFloat(this.state.valDiluente).toFixed(2)}</Text>
            <Text style={styles.infocirurgia}>{translate('vazao')} {' ' + parseFloat(this.state.valDiluente / this.state.tempo).toFixed(2) }</Text>
              
            <View style={styles.tabelainit}>
              <View style={styles.coluna1}>
              <Text>{translate('nome')}</Text>
              <Text>{translate('sulfatomg')}</Text>
              <Text>{translate('lidocainamg')}</Text>
              <Text>{translate('cetaminamg')}</Text>
              <Text>Dexmedet.(.mg/h)</Text>
              </View>
              <View style={styles.coluna1}>
              <Text>Dose</Text>
              <Text>{parseFloat(this.state.sulDose).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.lidoDose).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.cetDose).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.dexDose).toFixed(2)}</Text>
              </View>
              <View style={styles.coluna1}>
              <Text>(Mg/ml)</Text>
              <Text>{parseFloat(this.state.sulMg).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.lidoMg).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.cetMg).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.dexMg).toFixed(2)}</Text>
              </View>
              <View style={styles.coluna1}>
              <Text>.mg/50ml</Text>
              <Text>{parseFloat(this.state.somaSul).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.somaLido).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.somaCet).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.somaDex).toFixed(2)}</Text>
              </View>
              <View style={styles.coluna1}>
              <Text>.mg/ml</Text>
              <Text>{parseFloat(this.state.somaSul / this.state.valDiluente).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.somaLido / this.state.valDiluente).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.somaCet / this.state.valDiluente).toFixed(2)}</Text>
              <Text>{parseFloat(this.state.somaDex / this.state.valDiluente).toFixed(2)}</Text>
              </View>
              <View style={styles.coluna1}>
              <Text>ml</Text>
              <Text>{ parseFloat(this.state.totalSul).toFixed(2) }</Text>
              <Text>{ parseFloat(this.state.totalLido).toFixed(2) }</Text>
              <Text>{ parseFloat(this.state.totalCet).toFixed(2) }</Text>
              <Text>{ parseFloat(this.state.totalDex).toFixed(2) }</Text>
              </View>
            </View>
            <View style={styles.resultadodiluente}>
            <Text style={styles.totalanes}>{translate('totalanestesico')} {' ' + parseFloat(this.state.anestotal).toFixed(2)}</Text>
            <Text style={styles.totalanes}>{translate('dosediluente')} {' ' +  parseFloat(this.state.dosediluente).toFixed(2)}</Text>
            </View>
          
          </View> 
        </Modal>
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: "center",
    alignItems: "center",
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
    width: '60%',
    backgroundColor: 'rgba(225,255,255,0)',
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: 'rgba(0,44,117,1)',
    borderBottomColor: 'rgba(0,44,117,1)',
    borderBottomWidth: 2,
  },
  campoText: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },  
  viewcheck: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:20,
  },
  checkboxTxt: {
    marginLeft: 15,
    fontWeight: 'bold',
  },
  textvalInput: {
    fontSize: 15,
    marginLeft: 10,
  },
  modal: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 100,
  },
  textcirurgia: {
    fontSize: 16,
    fontWeight: 'bold',
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
  tabelainit:{
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: "absolute",
    left: 0,
    bottom: '40%',
    padding: 5,
  },
  coluna1:{
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(0,44,117,1)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,

  },
  resultadodiluente:{
    width: '120%',
    position:'absolute',
    bottom: '15%',
  },
  totalanes:{
    fontSize: 15,
    fontWeight:'bold',
  },
  appButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  infocirurgia: {
    fontSize: 14,
    marginBottom: 1,
    width: '120%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgba(0,44,117,1)'
  },
  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    margin: 20,
    padding: 10,
    backgroundColor: 'rgba(0,44,117,1)',
  },
  textbotao: {
    color: 'white',
  },
  picker: {
    width: '95%',
  },  
  viewDiluente:{
    textAlign: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: 'rgba(0,44,117,1)',
    height: 30,
  },
  textDiluente: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
  }

})
