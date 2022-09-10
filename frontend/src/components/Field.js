import FieldStyle from './Field.style'

export default function Field({
	id,
	label,
	type,
	disabled = false,
	defaultValue = undefined,
	value = undefined,
	onChange = () => {},
	list = {},
	nullable = true,
	nullableText = '',
	idModifier = undefined,
	valueModifier = undefined,
}) {
	return (
		<FieldStyle className={'field ' + id}>
			<label htmlFor={id}>{label}</label>
			{type === 'select' ? (
				<select
					disabled={disabled}
					id={id}
					defaultValue={defaultValue}
					value={value}
					onChange={onChange}
				>
					{nullable && <option value={''}>{nullableText}</option>}
					{Object.keys(list).map((value, index) => {
						return (
							<option key={index} value={idModifier ? idModifier(list[value]) : value}>
								{valueModifier ? valueModifier(list[value]) : list[value]}
							</option>
						)
					})}
				</select>
			) : (
				<input
					disabled={disabled}
					id={id}
					type={type}
					defaultValue={defaultValue}
					value={value}
					onChange={onChange}
				/>
			)}
		</FieldStyle>
	)
}
