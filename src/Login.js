import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Dimensions, TextInput, Image, TouchableOpacity, Keyboard, AsyncStorage
} from 'react-native';
import email from './images/email.png';
import pass from './images/pass.png';
import phone from './images/phone.png';
import back from './images/goback.png';
const { width, height } = Dimensions.get('window');
export default class Login extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'Đăng nhập',
  };
  constructor(props) {
        super(props);
        this.state = {
          email: '',
          pass: '',
          token: 'this is token display',
        }
  }
   async getToken(){
    try {
      //alert('acesstoken');
      var acesstoken = await AsyncStorage.getItem('@TOKEN_LOGIN');
      alert(acesstoken);
      //this.setState({token: acesstoken});
    } catch (e) {
      console.log(e);
    }

  }
  createToken(abc){
    try {
        //console.log("Token was stored successfull ");
        //console.log(abc);
         AsyncStorage.setItem('@TOKEN_LOGIN', abc);
        //this.setState({token: "Token was stored successfull"});
        alert("Token was stored successfull ");

    } catch(error) {
        console.log(error);
    }
  }
  async go(){
       const { goBack } = this.props.navigation;
       const { email, pass } = this.state;

        await fetch('http://113.161.198.106:8888/dongthappro.vn/json/login.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          pass: pass,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson != "Đăng nhập không thành công")
          {
            console.log(responseJson);
            //let token = responseJson;
            //console.log(token);
            this.createToken('responseJson');
            //goBack();
            //Keyboard.dismiss();
          }
          else {
            alert(responseJson)
          }
      })
      .catch((error) => {
        console.error(error);
      });
 }
  render() {
    const { container, title, info, textinput, icon, line, button, buttontext, iconback } = styles;
    const { navigate } = this.props.navigation;
    return (
      <View style={container}>
        <TouchableOpacity style={iconback} onPress={()=>{navigate('Home'); Keyboard.dismiss();}}>
          <Image style={{width:20, height: 20}} source={back} />
        </TouchableOpacity>
        <Text style={title}>Đăng nhập</Text>
        <View style={info}>
          <View style={line}>
            <Image style={icon} source={email} />
            <TextInput
              style={textinput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              underlineColorAndroid="transparent"
              placeholderTextColor="white"
              placeholder="Nhập email hoặc số điện thoại..."
              autoFocus
              ref='email'
              returnKeyType = {"next"}
              onSubmitEditing={(event) => {
                this.refs.phone.focus();
              }}
            />
          </View>
          <View style={line}>
            <Image style={icon} source={pass} />
            <TextInput
              style={textinput}
              onChangeText={(pass) => this.setState({pass})}
              value={this.state.pass}
              underlineColorAndroid="transparent"
              placeholderTextColor="white"
              placeholder="Nhập mật khẩu..."
              secureTextEntry
              ref='pass'
              returnKeyType = {"next"}
              onSubmitEditing={(event) => {
                this.refs.passr.focus();
              }}
            />
          </View>
        </View>
        <TouchableOpacity style={button} onPress={()=>this.go()}>
          <Text style={buttontext}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={buttontext}>{this.state.token}</Text>
        <TouchableOpacity style={button} onPress={()=>this.getToken()}>
          <Text style={buttontext}>Get token</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F03464',
  },
  title:{
    textAlign:'center',
    color:'#FFF',
    paddingVertical:15,
    fontFamily: 'Lobster-Regular',
    fontSize: 36,
  },
  info:{
    marginHorizontal: 10,
  },
  textinput:{
    height: 40,
    fontFamily: 'Lobster-Regular',
    paddingLeft: 15,
    //borderColor: '#2BBE4C',
    //borderWidth: 1,
    width: width - 100,
    color: '#FFF',
  },
  icon:{
    height: 20,
    width: 20,
    marginRight: 10,
  },
  iconback:{
    position:'absolute',
    top: 10,
    left: 20,
  },
  line:{
    flexDirection:'row',
    alignItems:'center',
    //paddingVertical: 5,
    marginVertical: 5,
    borderColor: '#FFF',
    borderBottomWidth: 1,
  },
  button:{
    backgroundColor:'#2BBE4C',
    height:40,
    width: width - 60,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 15,
    justifyContent:'center'
  },
  buttontext:{
    textAlign:'center',
    color:'#FFF',
    fontFamily: 'Lobster-Regular',
    fontSize: 16,
  },
});
