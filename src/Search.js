import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity, TextInput,
    Dimensions, Text, FlatList, Image, Keyboard, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { addProduct } from './actions';
import search from './images/search.png';
import del from './images/delete.png';
import cart from './images/cartmenu.png';
const { width } = Dimensions.get('window');
class Search extends Component {
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
        const { navigate } = this.props.navigation;
        const url = "http://dongthappro.vn/images/";
        //const { navigate } = this.props.navigation;
        return (
            <View style={product}>
              <TouchableOpacity onPress={()=>navigate('ProductDetail',{id: item.id, TenSanPham: item.TenSanPham})}>
                <Image source={{ uri: url + item.Hinh }} style={img} />
              </TouchableOpacity>
              <Text style={name}>{item.TenSanPham}</Text>
              <Text style={price}>{item.DonGia} vnđ</Text>
              <Text style={unit}>{item.DonViTinh}</Text>
              <TouchableOpacity onPress={()=>this.props.addProduct(item.id, item.TenSanPham, item.DonGia, item.Hinh)}>
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
        const {container, header, icon, input, textCancel, iconInputClose, badge} = styles;
        const { goBack, navigate } = this.props.navigation;
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
                <View style={{width:30}}>
                  <TouchableOpacity style={{flexDirection:'row'}} onPress={() => navigate('MainContentCart')}>
                    <Image style={icon} source={cart} />
                    <Text style={badge}>{this.props.count}</Text>
                  </TouchableOpacity>
                </View>
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
        width: width - (width / 4) - 30,
        height: 40,
        paddingLeft: 15,
        paddingRight: 30,
        borderRadius: 3,
        color: 'white',
        fontSize: 14,
        marginTop: 5,
        fontFamily: 'Lobster-Regular',
    },
    textCancel: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Lobster-Regular',
        paddingRight: 10,
    },
    iconInputClose: {
        position: 'absolute',
        top: 10,
        right: 88,
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
      fontSize:14,
      textAlign:'center',
      fontFamily: 'Lobster-Regular',
    },
    price:{
      textAlign:'center',
      fontFamily: 'Lobster-Regular',
    },
    unit:{
      textAlign:'center',
      fontFamily: 'Lobster-Regular',
    },
    addcart:{
      backgroundColor:'#F03464',
      color:'#FFF',
      paddingVertical:5,
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
    badge:{
      position:'absolute',
      top:0,
      right:0,
      backgroundColor:'#FFF',
      color:'#F03464',
      width:16,
      height:16,
      borderRadius:8,
      fontSize:12,
      textAlign:'center', alignItems:'center',
    },
});
function mapStateToProps(state){
  var kq = 0;
  for(var i = 0 ; i < state.ArrayProducts.length; i++)
  {
    kq = kq + state.ArrayProducts[i]['soluong'];
  }
  return{
    count: kq
  }
}
export default connect(mapStateToProps,{addProduct})(Search);
