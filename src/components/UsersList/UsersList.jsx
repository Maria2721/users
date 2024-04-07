import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../store/users-slice";

import Item from "../Item/Item";
import styles from "./UsersList.module.css";

const UsersList = ({ handleEdit }) => {
	const users = useSelector(selectAllUsers);

	return (
		<List
			className={styles.list}
			height={350}
			width={400}
			itemSize={35}
			itemCount={users.length}
			itemData={users}
		>
			{(props) => Item({ ...props, handleEdit })}
		</List>
	);
};

export default UsersList;
