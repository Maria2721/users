import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import { selectAllUsersName } from "../../store/users-slice";
import styles from "./UsersList.module.css";

const Item = ({ data, index, style }) => {
	const item = data[index];
	return (
		<div className={styles.item} style={style}>
			{item}
		</div>
	);
};

const UsersList = () => {
	const names = useSelector(selectAllUsersName);

	return (
		<List
			className={styles.list}
			height={300}
			width={400}
			itemSize={40}
			itemCount={names.length}
			itemData={names}
		>
			{Item}
		</List>
	);
};

export default UsersList;
