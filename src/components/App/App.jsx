import { useState } from "react";
import { useSelector } from "react-redux";
import { useUsers } from "../../hooks/useUsers";
import {
	selectCurrentUser,
	selectCurrentUserInfo,
} from "../../store/users-slice";

import UsersList from "../UsersList/UsersList";
import UserInfo from "../UserInfo/UserInfo";

import styles from "./App.module.css";

function App() {
	const { status, error } = useUsers();
	const userId = useSelector(selectCurrentUser);
	const user = useSelector((state) => selectCurrentUserInfo(state, userId));
	const [edit, setEdit] = useState(false);

	return (
		<div className={styles.wrapper}>
			{error && <h2>Can't fetch data</h2>}
			{status === "loading" && <h2>Loading...</h2>}

			{status === "received" && (
				<>
					<UsersList handleEdit={() => setEdit(true)} />
					{userId && edit && (
						<UserInfo
							user={user}
							userId={userId}
							edit={edit}
							handleEdit={() => setEdit(false)}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default App;
