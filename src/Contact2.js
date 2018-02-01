import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import besen from './images/besen.png';
const { width, height } = Dimensions.get('window');
export default class Contact2 extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'Đồng Tháp',
  };
  constructor(props) {
        super(props);
        this.state = {
            region: {
              latitude: 10.3594284,
              longitude: 105.7569212,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }
        };
    }
  render() {
    const { container, map, text, slogan } = styles;
    return (
      <View style={container}>
        <View style={{flex:4, backgroundColor:'#FFF'}}>
          <MapView
                style={map}
                region={this.state.region}
            >
                <MapView.Marker
                    coordinate={{ latitude:10.3594284, longitude: 105.7569212 }}
                    title="DongThapPro.vn"
                    image={besen}
                >
                </MapView.Marker>
            </MapView>
        </View>
        <View style={{flex:1, backgroundColor:'#FFF', paddingTop: 10}}>
          <View style={{flexDirection:'row'}}>
            <Text style={slogan}>Đồng tháp thuần khiết như hồn sen</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={text}>Địa chỉ:</Text>
            <Text style={text}>Xã Bình Thạnh, Huyện Cao Lãnh, Tỉnh Đồng Tháp</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={text}>Điện thoại:</Text>
            <Text style={text}>0907 548 379</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map:{
    ...StyleSheet.absoluteFillObject,
    //width,
    //height: height / 2,
  },
  text:{
    fontSize:12,
    color:'#F03464',
    padding:5,
    fontFamily: 'Lobster-Regular',
  },
  slogan:{
    fontSize:16,
    color:'#F03464',
    padding:5,
    fontFamily: 'Lobster-Regular',
  },
});
