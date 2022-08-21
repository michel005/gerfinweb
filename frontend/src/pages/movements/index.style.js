import styled from 'styled-components'

const MovementStyle = styled.div`
	display: flex;
	flex-direction: column;

    .templateLabel {
        background-color: #aaa;
        border-radius: 4px;
        color: #fff;
        font-size: 10px;
        margin: -2px 14px;
        padding: 4px 7px;
    }

	.column_description .columnContent {
        display: flex;
		flex-direction: row;
	}

	.templateList {
		background-color: #fffc;
		backdrop-filter: blur(10px);
		border-radius: 4px;
		box-shadow: #ccc 0 0 7px;
		padding: 7px;
		position: absolute;
		transform: translateY(44px) translateX(130px);
		width: 300px;
		transition: all 0.25s;

		.templateItem {
			border-radius: 4px;
			color: #333;
            cursor: pointer;
			display: flex;
			flex-direction: row;
			font-size: 14px;
			padding: 14px;
			transition: all 0.25s;

			&:hover {
				background-color: #3331;
			}

			.dueDay {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				width: 50px;
			}
		}
	}

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
