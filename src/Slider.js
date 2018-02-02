import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, ImageBackground
} from 'react-native';
import Swiper from 'react-native-swiper';

import slider1 from './images/slider1.jpg';
import slider2 from './images/slider2.jpg';
import slider3 from './images/slider3.jpg';
import slider4 from './images/slider4.jpg';
import slider5 from './images/slider5.jpg';
import slider6 from './images/slider6.jpg';

const { width } = Dimensions.get('window');

export default class Slider extends Component<{}> {
  render() {
    const { swiper, slider } = styles;
    return (
        <View style={swiper}>
          <Swiper
            width={width} height={(width * 320) / 1140}
            showsPagination autoplay activeDotColor='#F03464'
            paginationStyle={{bottom:5}}
            >
              <Image style={slider} source={slider1} />
              <Image style={slider} source={slider2} />
              <Image style={slider} source={slider3} />
              <Image style={slider} source={slider4} />
              <Image style={slider} source={slider5} />
              <Image style={slider} source={slider6} />
          </Swiper>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper:{
    width,
    height: (width * 320) / 1140,
  },
  slider:{
    width,
    height: (width * 320) / 1140,
    alignItems: 'center',
  },
});
