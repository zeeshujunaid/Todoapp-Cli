import { configureStore } from "@reduxjs/toolkit";
import Todoreducer from "./slicetodo";

export const store = configureStore({
    reducer: {
        todos:Todoreducer,
    },
});