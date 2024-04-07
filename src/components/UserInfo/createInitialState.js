export const createInitialState = (user) => {
	const initialState = {
		name: {
			value: String(user.name),
			isDirty: false,
			error: "",
		},
		surname: {
			value: String(user.surname),
			isDirty: false,
			error: "",
		},
		age: {
			value: String(user.age),
			isDirty: false,
			error: "",
		},
		email: {
			value: String(user.email),
			isDirty: false,
			error: "",
		},
	};

	return initialState;
};
