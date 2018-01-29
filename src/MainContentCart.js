import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import TabNavigator from 'react-native-tab-navigator';
import Main from './Main';
import Contact from './Contact';
import Cart from './Cart';
import Header from './Header';
import Drawer from 'react-native-drawer';
import Menu from './Menu';

import home from './images/home.png';
import homeselect from './images/homeselect.png';
import contact from './images/contact.png';
import contactselect from './images/contactselect.png';
import cart from './images/cart.png';
import cartselect from './images/cartselect.png';

class MainContentCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'cart',
        };
    }
    openControlPanel = () => {
      this.drawer.open();
    };
    closeControlPanel = () => {
      this.drawer.close();
    };
    render() {
        const { container, img, title, selectedTitle, badge, badgeText } = styles;
        return (
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
            <TabNavigator
              tabBarStyle={{backgroundColor:'#FFF',
              borderTopWidth: 1,
              borderColor: '#2BBE4C',}}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'main'}
                    title="Trang chủ"
                    titleStyle={title}
                    selectedTitleStyle={selectedTitle}
                    renderIcon={() => <Image source={home} style={img} />}
                    renderSelectedIcon={() => <Image source={homeselect} style={img} />}
                    //badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'main' })}
                >
                    <Main navigation={this.props.navigation} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'cart'}
                    title="Giỏ hàng"
                    titleStyle={title}
                    selectedTitleStyle={selectedTitle}
                    renderIcon={() => <Image source={cart} style={img} />}
                    renderSelectedIcon={() => <Image source={cartselect} style={img} />}
                    renderBadge={() => <View style={badge}>
                        <Text style={badgeText}>{this.props.count}</Text>
                    </View>}
                    //badgeText= "9"
                    onPress={() => this.setState({ selectedTab: 'cart' })}
                >
                    <Cart navigation={this.props.navigation} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'contact'}
                    title="Liên hệ"
                    titleStyle={title}
                    selectedTitleStyle={selectedTitle}
                    renderIcon={() => <Image source={contact} style={img} />}
                    renderSelectedIcon={() => <Image source={contactselect} style={img} />}
                    //renderBadge={() => <CustomBadgeView />}
                    onPress={() => this.setState({ selectedTab: 'contact' })}
                >
                    <Contact />
                </TabNavigator.Item>
            </TabNavigator>

          </Drawer>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e90ff',
    },
    img:  {
      width: 20,
      height: 20,
    },
    title:{
      fontSize:12,
      //fontWeight: 'bold',
      color:'#F03464',
      fontFamily: 'Lobster-Regular',
    },
    selectedTitle:{
      color:'#2BBE4C',
      fontFamily: 'Lobster-Regular',
    },
    badge:{
      backgroundColor:'#F03464',
      width:16,
      height:16,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:8,
      marginTop:3,
    },
    badgeText:{
      color:'#FFF',
      fontSize:10,
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

export default connect(mapStateToProps, null )(MainContentCart);
