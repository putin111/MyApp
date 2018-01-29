import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, ImageBackground
} from 'react-native';

import Header from './Header';
import Menu from './Menu';
import MainContent from './MainContent';

import Drawer from 'react-native-drawer';

export default class Home extends Component<{}> {
  closeControlPanel = () => {
    this.drawer.close();
  };
  openControlPanel = () => {
    this.drawer.open();
  };
  render() {
    const { container } = styles;
    return (
      <View style={container}>
          <Drawer
            type="overlay"
            tapToClose
            openDrawerOffset={0.3}
            panOpenMask={10}
            //styles={drawerStyles}
            tweenHandler={(ratio) => ({
              main: { opacity: (2 - ratio) / 2 }
            })}
            ref={(ref) => { this.drawer = ref; }}
            content={<Menu
              closeMenu={this.closeControlPanel.bind(this)}
              navigation={this.props.navigation}
            />}
          >
            <Header openMenu={this.openControlPanel.bind(this)} navigation={this.props.navigation}/>
            <MainContent navigation={this.props.navigation}/>

          </Drawer>
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
