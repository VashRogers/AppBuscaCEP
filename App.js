import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Keyboard} from 'react-native';
import api from './src/services/api'



export default function App() {
  
  const[cep, setCep] = useState('');
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = useState(null)

  async function buscar(){
    if(cep == ''){
      alert('Digite um CEP válido');
      setCep('');
      return;
    }


    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      
      setCepUser(response.data);
      Keyboard.dismiss();
    }catch(error){
      console.log('ERROR '+ error);
    }

      
    
  }


  function limpar(){
    setCep('');
    inputRef.current.focus();
  }  


  return (
    <SafeAreaView style={styles.container}>
      
      
      <View>
        <Text style={styles.text}>Digite o CEP:</Text>
        <TextInput style={styles.input} placeholder='Ex.:79003241' value={cep} onChangeText={(texto) => setCep(texto)} keyboardType="numeric" ref={inputRef} />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoText} onPress={ buscar }>Buscar</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.botao2} onPress={limpar}>
          <Text style={styles.botaoText2}>Limpar</Text>
        </TouchableOpacity>
      </View>

      
      { cepUser && 
      
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
        
      }



      
    
    </SafeAreaView>
      
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
    
    justifyContent: 'center',
  },
  text:{
    fontSize:25,
    fontStyle:'italic',
    fontWeight:'bold',
    textAlign:'center'
    
  },
  input:{
    width:350,
    margin:15,
    borderWidth:0.5,
    borderColor:'black',
    backgroundColor:'white',
    borderRadius:5,
    padding:10,
    alignSelf:'center'
  },
  areaBtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:15,
    marginBottom:10,
  },
  botao:{
    height:25,
    width:60,
    backgroundColor:'#FFDD00',
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#003C7B'
  },
  botaoText:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#003C7B',
    fontSize:16
  },
  botao2:{
    height:25,
    width:60,
    backgroundColor:'#003C7B',
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#FFDD00'
  },
  botaoText2:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#FFDD00',
    fontSize:16,
  },
  resultado:{
    justifyContent:'center',
    alignItems:'center',
  },
  itemText:{
    fontSize:25,
    fontWeight:'bold',
    color:'black',
  },

});
