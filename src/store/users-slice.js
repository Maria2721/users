import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadUsers = createAsyncThunk(
	"@@users/load-users",
	(_, { extra: { client, api } }) => {
		return client.get(api.ALL_USERS);
	}
);

export const loadUserById = createAsyncThunk(
	"@@users/load-user-by-id",
	(id, { extra: { client, api } }) => {
		return client.get(api.userById(id));
	}
);

const initialState = {
	status: "idle",
	error: null,
	list: [],
	currentUser: null,
};

const usersSlice = createSlice({
	name: "@@users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadUsers.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(loadUsers.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.payload || action.meta.error;
			})
			.addCase(loadUsers.fulfilled, (state, action) => {
				state.status = "received";
				state.list = action.payload.data;
			})
			.addCase(loadUserById.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(loadUserById.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.payload || action.meta.error;
			})
			.addCase(loadUserById.fulfilled, (state, action) => {
				state.status = "received";
				state.currentUser = action.payload.data;
			});
	},
});

export const usersReducer = usersSlice.reducer;

export const selectUsersInfo = (state) => ({
	status: state.users.status,
	error: state.users.error,
	qty: state.users.list.length,
});

export const selectAllUsers = (state) => state.users.list;

export const selectAllUsersName = (state) =>
	state.users.list.map((user) => user["name"]);

export const selectCurrentUser = (state) => state.users.currentUser;
