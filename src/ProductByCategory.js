import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, Dimensions, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { addProduct } from './actions';
import back from './images/back.png';
import cart from './images/cartmenu.png';
const { width } = Dimensions.get('window');
class ProductByCategory extends Component<{}> {
  constructor(props) {
      super(props);
      this.state = {
          dataProduct: '',
          isFetching: true,
      };
  }
  async componentDidMount() {
      const { state } = this.props.navigation;
      await fetch('http://113.161.198.106:8888/dongthappro.vn/json/productByCategory.php?id='+ state.params.id)// eslint-disable-line
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
    const { container, header, icon, title, badge } = styles;
    const { goBack, navigate, state } = this.props.navigation;
    const { dataProduct } = this.state;
    return (
      <View style={container}>
      <View style={header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => { goBack(); }} >
            <Image style={icon} source={back} />
          </TouchableOpacity>
          <Text style={title}>{state.params.TenDanhMuc}</Text>
        </View>
        <View style={{width:30}}>
          <TouchableOpacity style={{flexDirection:'row'}} onPress={() => navigate('MainContentCart')}>
            <Image style={icon} source={cart} />
            <Text style={badge}>{this.props.count}</Text>
          </TouchableOpacity>
        </View>
      </View>

        <ScrollView style={{ flex: 1 }}>
            {
              this.state.isFetching ? this.renderActivityIndicator() :
              <FlatList
                  data={dataProduct}
                  renderItem={({ item }) => this.renderItem(item)}
                  keyExtractor={(item, index) => index}
                  numColumns={2}
              />
            }
          </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: '#2BBE4C',
    justifyContent: 'space-between',
  },
  icon:{
    width: 20,
    height: 20,
  },
  title:{
    color:'#FFF',
    paddingLeft:10,
    fontSize: 16,
    fontFamily: 'Lobster-Regular',
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
    fontSize:14,
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
  //const reducer = (accumulator, currentValue) => accumulator + currentValue;
  var kq = 0;
  for(var i = 0 ; i < state.ArrayProducts.length; i++)
  {
    kq = kq + state.ArrayProducts[i]['soluong'];
  }
  return{
    count: kq
  }
}
export default connect(mapStateToProps,{addProduct})(ProductByCategory);
