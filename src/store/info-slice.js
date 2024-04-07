import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const putInfoById = createAsyncThunk(
	"@@info/put-info-by-id",
	({ id, updatedInfo }, { extra: { client, api } }) => {
		return client.put(api.userById(id), updatedInfo);
	}
);

const initialState = {
	status: "idle",
	error: null,
	data: [],
};

const infoSlice = createSlice({
	name: "@@info",
	initialState,
	reducers: {
		resetInfo: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(putInfoById.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(putInfoById.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.payload || action.meta.error;
			})
			.addCase(putInfoById.fulfilled, (state, action) => {
				state.status = "received";
				state.data = action.payload.data;
			});
	},
});

export const infoReducer = infoSlice.reducer;

export const { resetInfo } = infoSlice.actions;

export const selectInfo = (state) => ({
	status: state.info.status,
	error: state.info.error,
	qty: state.info.data.length,
});

export const selectInfoData = (state) => state.info.data;
