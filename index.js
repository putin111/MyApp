import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/reducers/ProductReducer';

const store = createStore(reducer);

export default class AppContainer extends Component<{}>{
  constructor(props){
    super(props);
    this.state = {
      isConnected: null,
    };
  }
  async componentDidMount() {
      await fetch('http://113.161.198.106:8888/dongthappro.vn/json/productHot.php')// eslint-disable-line
          .then(res => res.json())
          .then(resJson => {
              this.setState({ isConnected: true });
          })
          .done();
  }
  render(){
    if(this.state.isConnected){
      return(
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Dongthappro.vn</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F03464',
  },
  text:{
    color:'#FFF',
    fontSize:36,
    fontFamily: 'Lobster-Regular',
  }
});

AppRegistry.registerComponent('ShopDongThap', () => AppContainer);
