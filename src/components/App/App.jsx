import UsersList from "../UsersList/UsersList";
import UserInfo from "../UserInfo/UserInfo";
import styles from "./App.module.css";

import { useUsers } from "../../store/use-users";

function App() {
	const [users, { status, error }] = useUsers();

	return (
		<div className={styles.wrapper}>
			{error && <h2>Can't fetch data</h2>}
			{status === "loading" && <h2>Loading...</h2>}

			{status === "received" && (
				<>
					<UsersList />
					{/* <UserInfo /> */}
				</>
			)}
		</div>
	);
}

export default App;
