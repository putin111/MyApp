export const addProduct = (id, ten, dongia, hinh) => ({
    type: 'ADD_PRODUCT',
    id,
    ten,
    dongia,
    hinh,
  });
export const removeProduct = (id) => ({
    type: 'REMOVE_PRODUCT',
    id,
  });
export const incrementProduct = (id, soluong) => ({
    type: 'INCREMENT_PRODUCT',
    id,
    soluong,
  });
export const decrementProduct = (id, soluong) => ({
    type: 'DECREMENT_PRODUCT',
    id,
    soluong,
  });
