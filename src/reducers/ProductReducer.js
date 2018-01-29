const initialState = {
    ArrayProducts: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
        //return state + 1;
        /*let i = state.ArrayProducts.indexOf({ id: action.id });
        console.log('This is check ID:' + i);
        console.log('This is check ID:' + action.id);*/
        //if(state.ArrayProducts.length > 0)
        //{
          const index = state.ArrayProducts.findIndex(x => x.id === action.id);
          //console.log('This is check ID:' + index + action.id);
          if (index > -1) {
            state.ArrayProducts[index]['soluong']++;
            //return state;
            return Object.assign({}, state);
          }
        //}
        return Object.assign({}, state, {
                ArrayProducts: state.ArrayProducts.concat({
                    id: action.id,
                    ten: action.ten,
                    dongia: action.dongia,
                    hinh: action.hinh,
                    soluong: 1,
                })
            });
    case 'REMOVE_PRODUCT':
        //return state - 1;
        const index1 = state.ArrayProducts.findIndex(x => x.id === action.id);
        state.ArrayProducts.splice(index1, 1);
        return Object.assign({}, state);
    case 'INCREMENT_PRODUCT':
        //return state - 1;
        const index2 = state.ArrayProducts.findIndex(x => x.id === action.id);
        state.ArrayProducts[index2]['soluong']++;
        return Object.assign({}, state);
    case 'DECREMENT_PRODUCT':
        //return state - 1;
        const index3 = state.ArrayProducts.findIndex(x => x.id === action.id);
        state.ArrayProducts[index3]['soluong']--;
        if(state.ArrayProducts[index3]['soluong'] === 0){
          state.ArrayProducts.splice(index3, 1);
        }
        return Object.assign({}, state);
    default:
        return state;
  }
};
