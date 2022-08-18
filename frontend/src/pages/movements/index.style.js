import styled from 'styled-components'

const MovementStyle = styled.div`
	display: flex;
	flex-direction: column;

	.column_dueDate {
		max-width: 150px;
	}

	.column_account {
		max-width: 250px;
	}

	.column_value {
		max-width: 250px;
		justify-content: flex-end;
	}

	.column_status {
		max-width: 150px;
	}

	.column_commands {
		justify-content: flex-end;
		max-width: 60px;

		button {
			background-color: transparent;
			border: none;
			cursor: pointer;
			margin: 0;
			padding: 0;
			transition: all 0.25s;

			&:hover {
				color: #666;
				transform: scale(1.2);
			}
		}
	}

	.commands {
		display: flex;
		flex-direction: row;
		margin-bottom: 14px;
		margin-top: 14px;

		& > * {
			margin-right: 14px;
		}
	}
`

export default MovementStyle
