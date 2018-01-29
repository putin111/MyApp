import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity, TextInput,
    Dimensions, Text, FlatList, Image, Keyboard, ActivityIndicator
} from 'react-native';

import search from './images/search.png';
import del from './images/delete.png';

const { width } = Dimensions.get('window');
export default class Search extends Component {
  constructor(props) {
      super(props);
      this.state = {
          text: '',
          dataProduct: '',
          dataSanPham: '',
          isFetching: true,
      };
    }
    async componentDidMount() {
        await fetch('http://113.161.198.106:8888/dongthappro.vn/json/getAllProduct.php')// eslint-disable-line
            .then(res => res.json())
            .then(resJson => {
                this.setState({ dataProduct: resJson, isFetching: false });
            })
            .done();
    }
    filter(text) {
        //const data = dataCa.concat(dataRauCuQua).concat(dataGTGT);
        const {dataProduct} = this.state;
        const newData = dataProduct.filter((item) => {
            const itemData = item.TenSanPham.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSanPham: newData,
            text,
            isFetching: false,
        });
    }
    renderItem(item) {
        const { product, img, name, price, unit, addcart } = styles;
        const url = "http://dongthappro.vn/images/";
        //const { navigate } = this.props.navigation;
        return (
            <View style={product}>
              <Image source={{ uri: url + item.Hinh }} style={img} />
              <Text style={name}>{item.TenSanPham}</Text>
              <Text style={price}>{item.DonGia} vnđ</Text>
              <Text style={unit}>{item.DonViTinh}</Text>
              <TouchableOpacity>
                <Text style={addcart}>Thêm vào giỏ</Text>
              </TouchableOpacity>
            </View>
        );
    }
    renderActivityIndicator() {
        const { activityIndicatorContainer } = styles;
        return (
            <View style={activityIndicatorContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    render() {
        const {container, header, icon, input, textCancel, iconInputClose} = styles;
        const { goBack } = this.props.navigation;
        const { dataSanPham } = this.state;
        return (
            <View style={container}>
              <View style={header}>
                <Image style={icon} source={search} />
                <TextInput
                    value={this.state.text}
                    onChangeText={(text) => this.filter(text)}
                    style={input}
                    underlineColorAndroid="transparent"
                    placeholder="Search"
                    placeholderTextColor="white"
                    keyboardAppearance="dark"
                    autoFocus
                />
                {this.state.text ?
                    <TouchableOpacity
                        style={iconInputClose}
                        onPress={() => this.setState({ text: '', dataSanPham: '' })}
                    >
                        <Image style={icon} source={del} />
                    </TouchableOpacity>
                    : null}
                <TouchableOpacity onPress={() => { goBack(); Keyboard.dismiss(); }}>
                    <Text style={textCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                  {
                    this.state.isFetching ? this.renderActivityIndicator() :
                    <FlatList
                        data={dataSanPham}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item, index) => index}
                        numColumns={2}
                    />
                  }
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header:{
      backgroundColor: '#F03464',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderBottomWidth: 2,
      borderColor: '#2BBE4C',
    },
    icon:{
      width: 20,
      height: 20,
    },
    input: {
        width: width - (width / 4),
        height: 40,
        paddingLeft: 15,
        paddingRight: 40,
        borderRadius: 3,
        color: 'white',
        fontSize: 14,
        marginTop: 5,
        //backgroundColor: 'black'
        fontFamily: 'Lobster-Regular',
    },
    textCancel: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Lobster-Regular',
    },
    iconInputClose: {
        position: 'absolute',
        top: 10,
        right: 65,
        zIndex: 1,
        backgroundColor: 'transparent'
    },
    product:{
      width: (width / 2) - 4,
      margin: 2,

    },
    img: {
        width: (width / 2) - 4,
        height: (width / 2) - 4,
    },
    name:{
      color:'#2BBE4C',
      //fontWeight:'bold',
      fontSize:14,
      textAlign:'center',
      fontFamily: 'Lobster-Regular',
    },
    price:{
      //fontWeight:'bold',
      textAlign:'center',
      fontFamily: 'Lobster-Regular',
      //fontSize:8,
    },
    unit:{
      textAlign:'center',
      fontFamily: 'Lobster-Regular',
    },
    addcart:{
      backgroundColor:'#F03464',
      color:'#FFF',
      paddingVertical:5,
      //fontWeight:'bold',
      //fontStyle:'italic',
      marginTop:5,
      marginBottom:5,
      textAlign:'center',
      borderTopLeftRadius:10,
      borderBottomRightRadius:10,
      fontSize:12,
      fontFamily: 'Lobster-Regular',
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center'
    },
});
