import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, Dimensions,
  ActivityIndicator, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { addProduct } from './actions';
import back from './images/back.png';
import cart from './images/cartmenu.png';
const { width } = Dimensions.get('window');

class ProductDetail extends Component<{}> {
  constructor(props) {
      super(props);
      this.state = {
          dataProduct: '',
          dataHinh: '',
          isFetching: true,
      };
  }
  async componentDidMount() {
      const { state } = this.props.navigation;
      await fetch('http://113.161.198.106:8888/dongthappro.vn/json/hinhById.php?id='+ state.params.id)// eslint-disable-line
          .then(res => res.json())
          .then(resJson => {
              this.setState({ dataHinh: resJson, isFetching: false });
          })
          .done();
          await fetch('http://113.161.198.106:8888/dongthappro.vn/json/productDetails.php?id='+ state.params.id)// eslint-disable-line
              .then(res => res.json())
              .then(resJson => {
                  this.setState({ dataProduct: resJson, isFetching: false });
              })
              .done();
  }
  renderItem(item) {
      const { product, img, name, price, unit, addcart, ncc } = styles;
      const url = "http://dongthappro.vn/images/";
      //const { navigate } = this.props.navigation;
      return (
          <View style={product}>
            <View style={{flexDirection:'row'}}>
              <Image source={{ uri: url + item.Hinh }} style={img} />
              <View style={{paddingLeft: 10}}>
                <Text style={name}>{item.TenSanPham}</Text>
                <Text style={ncc}>Mã sản phẩm: {item.MaSanPham}</Text>
                <Text style={ncc}>NCC: {item.TenNCC}</Text>

                <Text style={price}>{item.DonGia} VNĐ</Text>
                <Text style={unit}>Đơn vị tính: {item.DonViTinh}</Text>
                <Text style={unit}>Khối lượng: {item.KhoiLuong}</Text>

                <TouchableOpacity onPress={()=>this.props.addProduct(item.id, item.TenSanPham, item.DonGia, item.Hinh)}>
                  <Text style={addcart}>Thêm vào giỏ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      );
  }
  renderItemHinh(item) {
      const { product, img } = styles;
      const url = "http://dongthappro.vn/images/";
      //const { navigate } = this.props.navigation;
      return (
          <View style={product}>
              <Image source={{ uri: url + item.Hinh }} style={img} />
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
    const { navigate, goBack, state } = this.props.navigation;
    const { dataProduct, dataHinh } = this.state;
    console.log(this.props);
    return (
      <View style={container}>
        <View style={header}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => { goBack(); }} >
              <Image style={icon} source={back} />
            </TouchableOpacity>
            <Text style={title}>{state.params.TenSanPham}</Text>
          </View>
          <View style={{width:30}}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=> navigate('MainContentCart')}>
              <Image style={icon} source={cart} />
              <Text style={badge}>{this.props.count}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
            {
              this.state.isFetching ? this.renderActivityIndicator() :
              <FlatList

                  data={dataProduct}
                  renderItem={({ item }) => this.renderItem(item)}
                  keyExtractor={(item, index) => index}
              />
            }
          </View>
          <View style={{ flex: 1 }}>
              {
                this.state.isFetching ? this.renderActivityIndicator() :
                <FlatList
                    horizontal
                    data={dataHinh}
                    renderItem={({ item }) => this.renderItemHinh(item)}
                    keyExtractor={(item, index) => index}
                />
              }
            </View>
            <View style={{ flex: 1 }} />
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
    borderRadius:10,
  },
  name:{
    color:'#2BBE4C',
    fontFamily: 'Lobster-Regular',
    fontSize:14,
  },
  price:{
    fontFamily: 'Lobster-Regular',
    marginTop:10,
    color:'#F03464',
  },
  unit:{
    color:'#F03464',
    fontFamily: 'Lobster-Regular',
  },
  ncc:{
    color:'#2BBE4C',
    fontSize:14,
    fontFamily: 'Lobster-Regular',
  },
  addcart:{
    backgroundColor:'#2BBE4C',
    color:'#FFF',
    paddingVertical:5,
    paddingHorizontal:15,
    //fontWeight:'bold',
    //fontStyle:'italic',
    borderTopLeftRadius:10,
    borderBottomRightRadius:10,
    fontSize:14,
    textAlign:'center',
    marginTop:10,
    fontFamily: 'Lobster-Regular',
    width: (width / 2) - 14,
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
export default connect(mapStateToProps,{addProduct})(ProductDetail);
