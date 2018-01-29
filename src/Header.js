import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity
} from 'react-native';

import menu from './images/menu.png';
import besen from './images/besen.png';
import search from './images/search.png';

export default class Header extends Component<{}> {
  render() {
    const { header, icon, logo } = styles;
    const {navigate} = this.props.navigation;
    return (
        <View style={header}>
          <TouchableOpacity onPress={this.props.openMenu}>
            <Image style={icon} source={menu} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Cart')}>
          <Image style={logo} source={besen} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Search')}>
            <Image style={icon} source={search} />
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
  logo:{
    width: 30,
    height: 38,
  },
});
