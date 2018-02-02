import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image,
    TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addProduct } from './actions';

class ProductHot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: '',
            isFetching: true,
        };
    }
    async componentDidMount() {
        await fetch('http://113.161.198.106:8888/dongthappro.vn/json/productHot.php')// eslint-disable-line
            .then(res => res.json())
            .then(resJson => {
                this.setState({ dataProduct: resJson, isFetching: false });
            })
            .done();
    }
    renderItem(item) {
        const { product, img, name, price, unit, addcart } = styles;
        const url = "http://dongthappro.vn/images/";
        const { navigate } = this.props.navigation;
        return (
            <View style={product}>
              <TouchableOpacity onPress={() => navigate('ProductDetail',{id: item.id, TenSanPham: item.TenSanPham})}>
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
        console.log(this.props);
        const { container, title } = styles;
        const { dataProduct } = this.state;
        return (
            <View style={container}>
                <Text style={title}>Sản phẩm đặc sản</Text>
                {
                    this.state.isFetching ? this.renderActivityIndicator() :
                        <FlatList
                            horizontal
                          //ItemSeparatorComponent={() => <View style={{ width: 1, backgroundColor:'#FFF' }} />}
                            data={dataProduct}
                            renderItem={({ item }) => this.renderItem(item)}
                            keyExtractor={(item, index) => index}
                        />
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#ECECEC',
    },
    title: {
        color: '#FFF',
        fontSize: 12,
        paddingLeft: 10,
        backgroundColor: '#F03464',
        paddingVertical: 3,
        borderBottomWidth: 1,
        borderColor: '#2BBE4C',
        fontFamily: 'Lobster-Regular',
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    product:{
      backgroundColor:'#FFF',
    },
    img: {
        width: 120,
        height: 120,
    },
    name:{
      color:'#2BBE4C',
      fontSize:14,
      textAlign:'center',
      fontFamily: 'Lobster-Regular',
    },
    price:{
      fontWeight:'bold',
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
      fontWeight:'bold',
      fontStyle:'italic',
      marginTop:5,
      marginBottom:5,
      textAlign:'center',
      borderTopLeftRadius:10,
      borderBottomRightRadius:10,
      fontSize:12,
      fontFamily: 'Lobster-Regular',
    }
});
function mapStateToProps(state){
  return{
    count: state
  }
}
export default connect(mapStateToProps,{addProduct})(ProductHot);
