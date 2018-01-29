import React, { Component } from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';

export default class Contact extends Component<{}> {
  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <Text>This is Contact</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  }
});
