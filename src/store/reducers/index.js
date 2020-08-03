import {combineReducers} from "redux";

import { videoReducer } from "./videoReducer";

export const rootReducer = combineReducers({
    videoReducer,
});
