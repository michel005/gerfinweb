const { default: styled } = require('styled-components')

const DashboardStyle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;

	.groups {
		display: flex;
		flex-direction: row;
		gap: 14px;

		& > * {
			flex-grow: 1;
			width: 100px;
		}
	}

	.balances {
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		height: 400px;
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
				padding: 4px 14px;
			}

			.dueDate {
				min-width: 50px;
			}

			.description {
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
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
				padding: 4px 14px;
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

	@media only screen and (max-width: 700px) {
		.groups {
			display: flex;
			flex-direction: column;

			& > * {
				flex-grow: 1;
				width: 100%;
			}

			.groupContent {
				.balances {
					min-width: 700px;
				}
			}
		}
	}
`

export default DashboardStyle
