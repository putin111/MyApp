import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity
} from 'react-native';

const { width } = Dimensions.get('window');

export default class Home extends Component<{}> {
  constructor(props) {
      super(props);
      this.state = {
          dataCategory: [],
          isFetching: true,
      };
  }
  async componentDidMount() {
      await fetch('http://113.161.198.106:8888/dongthappro.vn/json/category.php')// eslint-disable-line
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
    const { category, dm, text } = styles;
    const { navigate } = this.props.navigation;
    const url = "http://dongthappro.vn/images/";
    return (
        <View style={category}>
        {
            this.state.dataCategory.map((items, key) => {
                return (
                  <TouchableOpacity key={items.id} onPress={() => navigate('ProductByCategory', {id: items.id, TenDanhMuc: items.TenDanhMuc})}>
                    <ImageBackground style={dm} source={{ uri: url + items.Hinh }}>
                      <Text style={text}>{items.TenDanhMuc}</Text>
                    </ImageBackground >
                  </TouchableOpacity>
                );
            })
        }
        </View>
    );
  }
}
const styles = StyleSheet.create({
  category:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop: 1,
  },
  dm:{
    width: (width / 2),
    height: ((width / 2) * 246) / 340,
    //margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'Lobster-Regular',
  },
  activityIndicatorContainer: {
      flex: 1,
      justifyContent: 'center'
  },
});
