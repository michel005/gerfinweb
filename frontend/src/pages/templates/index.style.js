import styled from 'styled-components'

const TemplateStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;

	.column_dueDay {
		max-width: 150px;
	}

	.column_account {
		max-width: 250px;
	}

	.column_value {
		max-width: 200px;
		text-align: right;
		justify-content: flex-end;
	}

	.column_recurrency {
		max-width: 150px;
	}

	.column_commands {
		text-align: center;
		justify-content: center;
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

export default TemplateStyle
