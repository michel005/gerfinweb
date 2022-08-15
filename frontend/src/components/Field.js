import styles from './Field.module.scss'

export default function Field({id, label, type, defaultValue = null}) {
	return (
		<div className={styles.inputGroup}>
			<label htmlFor={id}>{label}</label>
			<input id={id} type={type} defaultValue={defaultValue} />
		</div>
	)
}
