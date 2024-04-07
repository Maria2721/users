import styles from "./InfoInput.module.css";

const InfoInput = ({
	id,
	name,
	label,
	value,
	type,
	handleChange,
	blurHandler,
	isDirty,
	errorMessage,
}) => {
	return (
		<div className={styles.infoRow}>
			<label className={styles.infolabel} htmlFor={id}>
				{label}
			</label>
			<input
				className={
					errorMessage && isDirty
						? `${styles.infoInput} ${styles.infoInput_error}`
						: styles.infoInput
				}
				type={type}
				id={id}
				name={name}
				value={value}
				onBlur={() => blurHandler(id)}
				onChange={(e) => handleChange(e, id)}
			/>
			{errorMessage && isDirty && (
				<div className={styles.error}>{errorMessage}</div>
			)}
		</div>
	);
};

export default InfoInput;
