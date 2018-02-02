import React, { Component } from 'react';
import {
  StyleSheet, ScrollView,
} from 'react-native';

import Slider from './Slider';
import Category from './Category';
import ProductHot from './ProductHot';

export default class Main extends Component<{}> {
  render() {
    const { container } = styles;
    return (
      <ScrollView style={container}>
        <Slider />
        <Category navigation={this.props.navigation}/>
        <ProductHot navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2BBE4C',
  }
});
