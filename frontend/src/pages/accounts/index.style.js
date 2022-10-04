import styled from 'styled-components'

const AccountsStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;

	.responsiveLayout {
		padding: 7px;
		transition: all 0.25s;
		width: 100%;

		&:hover {
			background-color: #f4f4f4;

			.commands {
				display: flex;
			}
		}

		.layoutName {
			font-size: 20px;
			padding: 7px;
		}

		.layoutBank {
			color: #ccc;
			padding: 0 7px 7px;
		}

		.layoutBalance {
			color: #999;
			display: flex;
			flex-direction: column;
			padding: 7px;
			transition: all 0.25s;
			overflow: hidden;
			pointer-events: none;

			.balanceDescription {
				color: #111;
			}

			.mainValue {
				display: flex;
				flex-direction: row;

				.currency {
					font-size: 14px;
				}

				.value {
					font-size: 20px;
					text-align: right;
					width: 100%;
				}
			}
		}

		.commands {
			padding: 4px 4px 0;

			& > button {
				margin-right: 10px;
			}
		}
	}

	.column_type {
		max-width: 150px;
	}

	.column_currentBalance,
	.column_futureBalance,
	.column_balance {
		justify-content: flex-end;
		text-align: right;
		max-width: 200px;
	}

	.column_commands {
		text-align: center;
		justify-content: center;
		max-width: 100px;

		button {
			background-color: transparent;
			border: none;
			cursor: pointer;
			margin: 0 0 0 14px;
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
	}
`

export default AccountsStyle
