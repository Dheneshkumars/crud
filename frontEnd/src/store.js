import { configureStore } from '@reduxjs/toolkit';

const store = configureStore(
    {
        reducer: {
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        })
    }

);

export default store;