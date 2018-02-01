import { StackNavigator } from 'react-navigation';
import Home from './src/Home';
import Menu from './src/Menu';
import Search from './src/Search';
import ProductByCategory from './src/ProductByCategory';
import ProductDetail from './src/ProductDetail';
import Cart from './src/Cart';
import MainContentCart from './src/MainContentCart';
import Register from './src/Register';

const App = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Menu: {
      screen: Menu,
    },
    Search: {
      screen: Search,
    },
    ProductByCategory: {
      screen: ProductByCategory,
    },
    ProductDetail: {
      screen: ProductDetail,
    },
    Cart: {
      screen: Cart,
    },
    MainContentCart: {
      screen: MainContentCart,
    },
    Register: {
      screen: Register,
    },
  }, {
    headerMode: 'none',
  }
);

export default App;
