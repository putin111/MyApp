import { TabNavigator } from 'react-navigation';

import Contact1 from './Contact1';
import Contact2 from './Contact2';

const Contact = TabNavigator({
  Contact1: {
    screen: Contact1,
  },
  Contact2: {
    screen: Contact2,
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

export default Contact;
