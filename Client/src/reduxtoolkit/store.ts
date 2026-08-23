import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// console.log(storage);

import authReducer from "./slices/auth/authSlice";
import cartReducer from "./slices/cart/cartSlice";
import wishlistReducer from "./slices/wishlist/wishlistSlice";
// const authPersistConfig = {
//   key: 'auth',
//   storage,
// };

// const persistedAuthReducer = persistReducer(
//   authPersistConfig,
//   authReducer
// );

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
