import { TabNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';

const MainUser = TabNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
  }, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor:'#2BBE4C',
      indicatorStyle:{
        backgroundColor:'#2BBE4C',
      },
      style: {
        backgroundColor: '#F03464',
        height: 40,
      },
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Lobster-Regular',
      },
  },
  });

export default MainUser;
