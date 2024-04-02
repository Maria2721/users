import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	loadUserById,
	selectCurrentUser,
	selectUsersInfo,
} from "./users-slice";

export const useUserInfo = (id) => {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const { status, error } = useSelector(selectUsersInfo);

	useEffect(() => {
		dispatch(loadUserById(id));
	}, [id, dispatch]);

	return [user, { status, error }];
};
