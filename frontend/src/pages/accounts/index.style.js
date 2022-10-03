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
			background-color: #eee;

			.layoutBalance.balance,
			.layoutBalance.current,
			.layoutBalance.future,
			.commands {
				opacity: 1;
				margin-top: 0;
			}

			.commands {
				margin-top: 10px;
				pointer-events: auto;

				& > button {
					pointer-events: auto;
				}
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

		.layoutBalance.balance,
		.layoutBalance.current,
		.layoutBalance.future,
		.commands {
			opacity: 0;
		}

		.layoutBalance.balance {
			margin-top: -20px;
		}

		.layoutBalance.current {
			margin-top: -80px;
		}

		.layoutBalance.future {
			margin-top: -80px;
		}

		.commands {
			margin-top: -50px;
			padding: 0 4px;
			pointer-events: none;

			& > button {
				margin-right: 10px;
				pointer-events: none;
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
