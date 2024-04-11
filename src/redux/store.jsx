import { configureStore } from "@reduxjs/toolkit";
import testActionSliceReducer from "./testActionSlice";

const store = configureStore({
    reducer: {
        testAction: testActionSliceReducer,
    },
});

export default store;