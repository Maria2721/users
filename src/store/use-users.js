import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadUsers, selectAllUsers, selectUsersInfo } from "./users-slice";

export const useUsers = () => {
	const dispatch = useDispatch();
	const users = useSelector(selectAllUsers);
	const { status, error, qty } = useSelector(selectUsersInfo);

	useEffect(() => {
		if (!qty) {
			dispatch(loadUsers());
		}
	}, [qty, dispatch]);

	return [users, { status, error, qty }];
};
