import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/users-slice";
import { selectInfo } from "../../store/info-slice";

import { ReactComponent as UserIcon } from "../../assets/imgs/user.svg";
import styles from "./Item.module.css";

const Item = ({ data, index, style, handleEdit }) => {
	const dispatch = useDispatch();
	const { status } = useSelector(selectInfo);

	const item = data[index];
	const openEdit = () => {
		if (status === "idle") {
			dispatch(setCurrentUser(item.id));
			handleEdit();
		}
	};

	return (
		<div className={styles.item} style={style} onClick={openEdit}>
			<UserIcon className={styles.icon} />
			{item.name}
		</div>
	);
};

export default Item;
