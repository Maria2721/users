import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

import * as api from "./config";
import { usersReducer } from "./users-slice";
import { infoReducer } from "./info-slice";

export const store = configureStore({
	reducer: {
		users: usersReducer,
		info: infoReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: {
					client: axios,
					api,
				},
			},
			serializableCheck: false,
		}),
});
