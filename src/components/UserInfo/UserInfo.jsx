import { useUserInfo } from "../../store/use-userInfo";
import styles from "./UserInfo.module.css";

const UserInfo = () => {
	const [user, { status, error }] = useUserInfo(1);
	console.log(user);

	return (
		<>
			test
			{/* {status === "loading" && <h2>Loading...</h2>}
			{error && <h2>{error}</h2>}
			{user && (
				<div className={styles.info}>
					<div>{user.name}</div>
					<div>{user.surname}</div>
					<div>{user.age}</div>
					<div>{user.email}</div>
				</div>
			)} */}
		</>
	);
};

export default UserInfo;
