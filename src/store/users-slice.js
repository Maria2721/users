import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadUsers = createAsyncThunk(
	"@@users/load-users",
	(_, { extra: { client, api } }) => {
		return client.get(api.ALL_USERS);
	}
);

const initialState = {
	status: "idle",
	error: null,
	data: [],
	currentUser: null,
};

const usersSlice = createSlice({
	name: "@@users",
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		updateUserById: (state, action) => {
			const { id, updatedUser } = action.payload;
			const index = state.data.findIndex((user) => user.id === id);
			if (index !== -1) {
				state.data[index] = { ...state.data[index], ...updatedUser };
			}
		},
	},
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
				state.data = action.payload.data;
			});
	},
});

export const usersReducer = usersSlice.reducer;

export const { setCurrentUser, updateUserById } = usersSlice.actions;

export const selectUsersInfo = (state) => ({
	status: state.users.status,
	error: state.users.error,
	qty: state.users.data.length,
});

export const selectAllUsers = (state) => state.users.data;

export const selectAllUsersName = (state) =>
	state.users.data.map((user) => user["name"]);

export const selectCurrentUser = (state) => state.users.currentUser;

export const selectCurrentUserInfo = (state, curUserId) => {
	return state.users.data.find((user) => user.id === curUserId);
};
