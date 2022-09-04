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

	input {
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
		padding: 7px;
		transition: all 0.25s;

		&:focus {
			border-color: #999;
		}

		&:disabled {
			cursor: not-allowed;
		}
	}
`

export default FieldStyle