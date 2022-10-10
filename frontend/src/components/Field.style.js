import styled from 'styled-components'

const FieldStyle = styled.div`
	display: flex;
	flex-direction: column;

	label {
		color: #666;
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 7px;
		text-align: left;
	}

	.commandInputContainer {
		display: flex;
		flex-direction: row;

		.button {
			margin-left: 14px;
		}
	}

	input,
	select {
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
		padding: 7px;
		transition: all 0.25s;\
		flex-grow: 1;

		&:focus {
			border-color: #999;
		}

		&:disabled {
			cursor: not-allowed;
		}
	}
`

export default FieldStyle
