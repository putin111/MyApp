import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { removeProduct, incrementProduct, decrementProduct } from './actions';
import del from './images/deletecart.png';

const { width } = Dimensions.get('window');

class Cart extends Component<{}> {
  render() {
    const { container1, container1Text, container, product, img, name, price,
      dau, icon, total, totaltext, btndel } = styles;
    const url = "http://dongthappro.vn/images/";
    var kq = 0;
    for(var i = 0 ; i < this.props.products.length; i++)
    {
      kq = kq + (parseFloat(this.props.products[i]['dongia'])*parseFloat(this.props.products[i]['soluong']));
    }
    if(this.props.products.length < 1){
      return (
        <View style={container1}>
          <Text style={container1Text}>Không có sản phẩm nào</Text>
        </View>
      );
    }
    return (
      <View style={container}>
        <ScrollView style={{flex:1}}>
            {
                this.props.products.map((items, key) => {
                    return (
                      <View style={product} key={items.id}>
                        <View style={{flexDirection:'row'}}>
                          <Image source={{ uri: url + items.hinh }} style={img} />
                          <View style={{paddingLeft: 10}}>
                            <Text style={name}>{items.ten}</Text>
                            <Text style={price}>Đơn giá:  {items.dongia} VNĐ</Text>
                            <View style={{flexDirection:'row'}}>
                              <Text style={price}>Số lượng:  </Text>
                              <TouchableOpacity onPress={()=>this.props.decrementProduct(items.id, items.soluong)}>
                                <Text style={dau}> - </Text>
                              </TouchableOpacity>
                              <Text style={price}>    {items.soluong}    </Text>
                              <TouchableOpacity onPress={()=>this.props.incrementProduct(items.id, items.soluong)}>
                                <Text style={dau}> + </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View style={btndel}>
                            <TouchableOpacity onPress={()=>this.props.removeProduct(items.id)}>
                              <Image source={del} style={icon} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                })
            }
          </ScrollView>
          <View style={total}>
            <Text style={totaltext}>Total: {numberWithCommas(kq)}.000 VNĐ</Text>
          </View>
        </View>
    );
  }
}
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}
const styles = StyleSheet.create({
  container1:{
    flex: 1,
    backgroundColor: '#F03464',
    alignItems:'center',
    justifyContent:'center'
  },
  container1Text:{
    color:'#FFF',
    fontFamily: 'Lobster-Regular',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#F03464',
  },
  product:{
    width: width - 10,
    //height: 110,
    backgroundColor:'#FFF',
    padding: 5,
    marginHorizontal: 5,
    marginTop: 5,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius:10,
  },
  name:{
    color:'#2BBE4C',
    fontFamily: 'Lobster-Regular',
    fontSize:16,
  },
  price:{
    fontFamily: 'Lobster-Regular',
    marginTop:10,
    color:'#F03464',
  },
  dau:{
    color:'#FFF',
    backgroundColor:'#2BBE4C',
    fontSize: 14,
    marginTop:10,
    paddingHorizontal: 2,
    //paddingVertical: 2,
    //padding: 2,
    justifyContent:'center',
    alignItems: 'center',
    fontFamily: 'Lobster-Regular',
  },
  icon:{
    width: 20,
    height: 20,
  },
  totaltext:{
    color:'#FFF',
    fontSize: 16,
    fontFamily:'Lobster-Regular',
  },
  total:{
    width: width - 10,
    height: 40,
    backgroundColor:'#2BBE4C',
    margin: 5,
    alignItems:'center',
    justifyContent: 'center',
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
  },
  btndel:{
    position:'absolute', right: 2, top: 0,
  },
});
function mapStateToProps(state){
  return{
    products: state.ArrayProducts
  }
}
export default connect(mapStateToProps, {removeProduct, incrementProduct, decrementProduct} )(Cart);
