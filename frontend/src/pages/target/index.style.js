import styled from 'styled-components'

const TargetStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;

	.column_account {
		max-width: 250px;
	}

	.column_targetValue {
		max-width: 250px;
        text-align: right;
		justify-content: flex-end;
	}

	.column_targetDate {
		max-width: 150px;
	}

	.column_commands {
        text-align: right;
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

		& > * {
			margin-right: 7px;
		}
	}
`

export default TargetStyle
