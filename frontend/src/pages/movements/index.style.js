import styled from 'styled-components'

const MovementStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;

	.column_description .columnContent {
		display: flex;
		flex-direction: row;
	}

	.templateList {
		background-color: #fffc;
		backdrop-filter: blur(12px);
		border-radius: 4px;
		box-shadow: #ccc 0 0 7px;
		padding: 7px;
		position: absolute;
		width: 300px;
		transition: all 0.25s;
		opacity: ${(props) => (props.showTemplates ? 1 : 0)};
		pointer-events: ${(props) => (props.showTemplates ? 'auto' : 'none')};
		transform: ${(props) =>
			props.showTemplates
				? 'translateY(40px) translateX(83px)'
				: 'translateY(20px) translateX(83px)'};

		.templateItem {
			border-radius: 4px;
			color: #333;
			cursor: pointer;
			display: flex;
			flex-direction: row;
			font-size: 14px;
			padding: 7px;
			transition: all 0.25s;

			&:hover {
				background-color: #1113;
			}

			.dueDay {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				width: 50px;
			}
		}
	}

	.column_dueDate,
	.column_movementDate {
		max-width: 170px;
	}

	.column_account {
		max-width: 250px;
	}

	.column_value {
		max-width: 180px;
		text-align: right;
		justify-content: flex-end;
	}

	.column_status {
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
		padding-bottom: 14px;

		& > * {
			margin-right: 7px;
		}
	}
`

export default MovementStyle
