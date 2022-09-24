import styled from 'styled-components'
import Button from './Button'
import { useState } from 'react'

const ButtonChooserStyle = styled.div`
	display: flex;
	flex-direction: row;

	.label {
		background-color: transparent;
		border-radius: 0;
		cursor: default;
		font-weight: bold;

		&:hover {
			background-color: transparent;
		}
	}

	.values {
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}

	.secondary {
		background-color: #ccc;
		border-radius: 0;
		color: #333;

		&:hover {
			background-color: #999c;
		}

		&.selected {
			background-color: #666;
			color: #fff;

			&:hover {
				background-color: #666c;
			}
		}
	}
`

export default function ButtonChooser({
	label,
	list = {},
	nullable = false,
	nullableText = '',
	defaultValue,
	onChange = () => null,
}) {
	const [value, setValue] = useState(defaultValue)

	function onChangeCall(vl) {
		onChange(vl)
		setValue(vl)
	}

	return (
		<ButtonChooserStyle>
			{label && <Button className={'label transparent'}>{label}</Button>}
			<div className={'values'}>
				{nullable && (
					<Button
						className={'secondary ' + (!value ? 'selected' : '')}
						onClick={() => onChangeCall(null)}
					>
						{nullableText}
					</Button>
				)}
				{Object.keys(list).map((vl, index) => {
					return (
						<Button
							className={'secondary ' + (value === vl ? 'selected' : '')}
							key={index}
							onClick={() => onChangeCall(vl)}
						>
							{list[vl]}
						</Button>
					)
				})}
			</div>
		</ButtonChooserStyle>
	)
}
