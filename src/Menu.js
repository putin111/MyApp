import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, AsyncStorage,
  ImageBackground, Dimensions, ScrollView } from 'react-native';

import menubackground from './images/menubackground.jpg';
import avatar from './images/user.png';

const { width } = Dimensions.get('window');
export default class Menu extends Component {
  constructor(props) {
      super(props);
      this.state = {
          dataCategory: [],
          isFetching: true,
      };
  }
  async componentDidMount() {
      await fetch('http://113.161.198.106:8888/dongthappro.vn/json/categorymenu.php')// eslint-disable-line
          .then(res => res.json())
          .then(resJson => {
              this.setState({ dataCategory: resJson, isFetching: false });
          })
          .done();
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
    const { container, header, center, user, userimg, usertext, slogan, headertop,
      category, dm, text, title } = styles;
    const url = "http://dongthappro.vn/images/";
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={container}>
        <View style={header}>
            <View style={headertop}>
              <View style={user}>
                <Image style={userimg} source={avatar} />
                <Text style={usertext}>Trương Lâm Tuấn</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigate('User')}>
                  <Text style={usertext}>Đăng ký</Text>
                </TouchableOpacity>
                <Text style={usertext}> | </Text>
                <TouchableOpacity onPress={() => navigate('Login')}>
                  <Text style={usertext}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={slogan}>Đồng tháp thuần khiết như hồn sen</Text>
        </View>
        <View style={center}>
          <View style={category}>
            <Text style={title}>Danh mục sản phẩm</Text>
            {
                this.state.dataCategory.map((items, key) => {
                    return (
                      <TouchableOpacity style={{flexDirection:'row', alignItems:'center', margin:5}} key={items.id} onPress={() => navigate('ProductByCategory', {id: items.id, TenDanhMuc: items.TenDanhMuc})}>
                          <Image style={dm} source={{ uri: url + items.Hinh }} />
                          <Text style={text}>{items.TenDanhMuc}</Text>
                      </TouchableOpacity>
                    );
                })
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header:{
    flex:1,
    borderColor:'#2BBE4C',
    borderBottomWidth:2,
    backgroundColor:'#F03464',
  },
  center:{
    flex:3,
  },
  headertop:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin: 10,
  },
  user:{
    //paddingLeft:10,
    //paddingTop:10,
  },
  userimg:{
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  usertext:{
    color:'#FFF',
    fontSize:14,
    paddingTop:5,
    fontFamily: 'Lobster-Regular',
  },
  slogan:{
    color:'#FFF',
    fontSize:14,
    //fontWeight:'bold',
    //fontStyle:'italic',
    textAlign:'center',
    paddingTop: 15,
    fontFamily: 'Lobster-Regular',
  },
  category:{
    flexDirection:'column',
    borderColor:'#2BBE4C',
    borderBottomWidth:1,
  },
  dm:{
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  text:{
    color: '#2BBE4C',
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: 'Lobster-Regular',
  },
  activityIndicatorContainer: {
      flex: 1,
      justifyContent: 'center'
  },
  title:{
    color: '#F03464',
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
    fontFamily: 'Lobster-Regular',
  }
});
