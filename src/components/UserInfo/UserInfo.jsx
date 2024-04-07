import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserById, setCurrentUser } from "../../store/users-slice";
import {
	putInfoById,
	resetInfo,
	selectInfo,
	selectInfoData,
} from "../../store/info-slice";

import InfoInput from "../InfoInput/InfoInput";
import { userFields } from "./userFields";
import { createInitialState } from "./createInitialState";

import { ReactComponent as Close } from "../../assets/imgs/close.svg";
import styles from "./UserInfo.module.css";

const UserInfo = ({ user, userId, edit, handleEdit }) => {
	const initialState = createInitialState(user);
	const [state, setState] = useState(initialState);
	const [valid, setValid] = useState(false);
	const { qty, status, error } = useSelector(selectInfo);
	const infoData = useSelector(selectInfoData);
	const dispatch = useDispatch();

	useEffect(() => {
		setState(initialState);
	}, [userId]);

	useEffect(() => {
		if (qty !== 0) {
			dispatch(updateUserById({ id: userId, updatedUser: infoData }));
		}
	}, [qty, dispatch, infoData, userId]);

	useEffect(() => {
		if (status === "received" || status === "rejected") {
			setTimeout(() => {
				handleEdit();
				dispatch(setCurrentUser(null));
				dispatch(resetInfo());
			}, 1000);
		}
	}, [status, dispatch]);

	const handleChange = (e, id) => {
		setState({
			...state,
			[id]: {
				...state[id],
				value: e.target.value,
			},
		});
	};

	const blurHandler = (type) => {
		setState((state) => ({
			...state,
			[type]: {
				...state[type],
				isDirty: true,
			},
		}));
		validateForm();
	};

	const compareObjects = (obj1, obj2) => {
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);

		if (keys1.length !== keys2.length) {
			return false;
		}

		for (let key of keys1) {
			if (obj1[key] !== obj2[key]) {
				return false;
			}
		}

		return true;
	};

	const handleClick = () => {
		let updatedInfo = {
			id: userId,
			name: state["name"].value,
			surname: state["surname"].value,
			age: state["age"].value,
			email: state["email"].value,
		};
		// сравниваем данные и отправляем их только если они изменились
		const isEqual = compareObjects(user, updatedInfo);

		if (isEqual) {
			return null;
		} else {
			let curValidSend = validateForm();

			for (let key in state) {
				// проходим по стейту и отмечаем isDirty, чтобы отобразилась ошибка у всех
				setState((state) => ({
					...state,
					[key]: {
						...state[key],
						isDirty: true,
					},
				}));
			}

			// отправляем обновленные данные
			if (curValidSend === true) {
				dispatch(putInfoById({ id: userId, updatedInfo: updatedInfo }));
			}
		}
	};

	const validateForm = () => {
		setValid(true);
		const regName = /^[A-ZА-ЯЁ\s0-9'-]+$/i;
		const regEmail = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+\.[a-zA-Z]{2,63}$/;
		const regEmailFirstSign = /^[a-zA-Z0-9]/;
		const serchPunycode = /\b@xn--\b/giu;
		const regNumber = /^\d+$/;

		for (const field of userFields) {
			const { rule, id } = field;
			const value = state[id].value.trim();
			let error;

			switch (rule) {
				case "name":
					if (value.length === 0) {
						error = "Необходимо заполнить";
						setValid(false);
						break;
					}
					if (!regName.test(value)) {
						error = "Недопустимые символы";
						setValid(false);
						break;
					}
					if (value.length > 200) {
						error = "Максимум 200 символов";
						setValid(false);
						break;
					}
					break;
				case "number":
					if (value.length === 0) {
						error = "Необходимо заполнить";
						setValid(false);
						break;
					}
					if (!regNumber.test(value)) {
						error = "Недопустимый формат";
						setValid(false);
						break;
					}
					break;
				case "email":
					if (value.length === 0) {
						error = "Необходимо заполнить";
						setValid(false);
						break;
					}
					if (!regEmailFirstSign.test(Array.from(value)[0])) {
						error = "Недопустимый формат";
						setValid(false);
						break;
					}
					if (serchPunycode.test(value)) {
						error = "Недопустимый формат";
						setValid(false);
						break;
					}
					if (!regEmail.test(value)) {
						error = "Недопустимый формат";
						setValid(false);
						break;
					}
					if (value.length < 5) {
						error = "Минимум 5 символов";
						setValid(false);
						break;
					}
					if (value.length > 200) {
						error = "Максимум 200 символов";
						setValid(false);
						break;
					}
					break;
				default:
					error = "";
			}

			setState((state) => ({
				...state,
				[id]: {
					...state[id],
					error: error ? error : "",
				},
			}));
		}
		return valid;
	};

	const closeEdit = () => {
		handleEdit();
		dispatch(setCurrentUser(null));
	};

	if (!edit) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			{status === "idle" && (
				<>
					<button
						type="button"
						className={styles.btnClose}
						onClick={closeEdit}
					>
						<Close className={styles.iconClose} />
					</button>
					<h2 className={styles.title}>Редактировать:</h2>
					<form className={styles.form}>
						{userFields.map((item) => (
							<InfoInput
								key={item.id}
								id={item.id}
								name={item.name}
								label={item.label}
								value={state[item.id].value}
								type={item.type}
								handleChange={handleChange}
								blurHandler={blurHandler}
								isDirty={state[item.id].isDirty}
								errorMessage={state[item.id].error}
							/>
						))}
					</form>
					<button
						type="button"
						className={styles.btnSave}
						onClick={handleClick}
					>
						Сохранить
					</button>
				</>
			)}
			{status === "loading" && (
				<h2 className={styles.title}>Loading...</h2>
			)}
			{status === "received" && (
				<h2 className={styles.title}>Данные успешно отправлены!</h2>
			)}

			{error && (
				<h2 className={styles.title}>
					Что-то пошло не так. Попробуйте отпрвить данные позднее!
				</h2>
			)}
		</div>
	);
};

export default UserInfo;
