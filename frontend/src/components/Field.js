import FieldStyle from './Field.style'

export default function Field({id, label, type, disabled = false, defaultValue = undefined, value = undefined, onChange = () => {}}) {
	return (
		<FieldStyle className={'field'}>
			<label htmlFor={id}>{label}</label>
			<input disabled={disabled} id={id} type={type} defaultValue={defaultValue} value={value} onChange={onChange} />
		</FieldStyle>
	)
}
