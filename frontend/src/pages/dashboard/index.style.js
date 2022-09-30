const { default: styled } = require('styled-components')

const DashboardStyle = styled.div`
	display: flex;
	flex-direction: column;

	.groups {
		display: flex;
		flex-direction: row;
		margin-top: 14px;

		&:first-child {
			margin-top: 0;
		}

		& > * {
			flex-grow: 1;
			margin-right: 14px;
			width: 100px;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.fullHeight {
		display: flex;
		flex-grow: 1;
		height: 500px;
	}

	.balances {
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		flex-grow: 1;
	}

	.notFound {
		color: #ccc;
		padding: 14px;
	}

	.pendentMovements {
		.movement {
			display: flex;
			flex-direction: row;
			transition: all 0.25s;

			&:hover {
				background-color: #f8f8f8;
			}

			&.header {
				background-color: #eee;
				border-radius: 4px;
				font-weight: bold;
			}

			.dueDate,
			.description,
			.value {
				display: flex;
				padding: 7px 14px;
			}

			.dueDate {
				min-width: 50px;
			}

			.description {
				width: 100%;
			}

			.value {
				min-width: 130px;
				justify-content: flex-end;
			}
		}

		.moreElements {
			color: #39fa;
			cursor: pointer;
			padding: 7px 14px;
			transition: all 0.25s;

			&:hover {
				color: #39f;
			}
		}
	}

	.accountBalance {
		.account {
			display: flex;
			flex-direction: row;
			transition: all 0.25s;

			&:hover {
				background-color: #f8f8f8;
			}

			&.header {
				background-color: #eee;
				border-radius: 4px;
				font-weight: bold;
			}

			.accountColumn,
			.balance,
			.current,
			.future {
				display: flex;
				padding: 7px 14px;
			}

			.accountColumn {
				width: 100%;
			}

			.balance {
				min-width: 130px;
				justify-content: flex-end;
			}
		}
	}

	@media only screen and (max-width: 1000px) {
		.groups {
			display: flex;
			flex-direction: column;
			margin-top: 14px;

			& > * {
				flex-grow: 1;
				margin-right: 0;
				margin-top: 14px;
				width: 100%;

				&:last-child {
					margin-right: 0;
				}
			}
		}

		.group {
			.groupContent {
				.balances {
					min-width: 700px;
				}
				.account,
				.movement {
					min-width: 350px;
				}
			}
		}
	}
`

export default DashboardStyle
