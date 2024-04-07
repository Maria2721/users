import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUsers, selectUsersInfo } from "../store/users-slice";

export const useUsers = () => {
	const dispatch = useDispatch();
	const { status, error, qty } = useSelector(selectUsersInfo);

	useEffect(() => {
		if (!qty) {
			dispatch(loadUsers());
		}
	}, [qty, dispatch]);

	return { status, error, qty };
};
