import styled from 'styled-components'

const MovementStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;

	.responsiveLayout {
		padding: 7px;
		transition: all 0.25s;
		width: 100%;

		&:hover {
			background-color: #eee;
		}

		.layoutDate {
			display: flex;
			flex-direction: row;
			padding: 7px;

			.statusLabel {
				background-color: #fff;
				border-radius: 4px;
				border: 1px solid #ccc;
				color: #fff;
				font-size: 12px;
				margin-left: 10px;
				padding: 4px 7px 6px;
				margin-top: -3px;

				&.APPROVED {
					border-color: #24ad24;
					color: #24ad24;

					svg {
						background-color: #24ad24;
						color: #fff;
					}
				}

				&.PENDENT {
					border-color: #3a9dff;
					color: #3a9dff;

					svg {
						background-color: #3a9dff;
						color: #fff;
					}
				}

				&.template {
					border-color: #aaa;
					color: #aaa;

					svg {
						background-color: #aaa;
						color: #fff;
					}
				}

				svg {
					background-color: #fff;
					border-radius: 10px;
					font-size: 8px;
					font-weight: bold;
					color: #333;
					margin-left: 4px;
					margin-bottom: -3px;
					padding: 3px 0;
					height: 10px;
					width: 16px;
				}
			}
		}

		.layoutDescription,
		.layoutAccountName,
		.layoutValue {
			padding: 0 7px 4px;
		}

		.descriptionAccountGroup {
			display: flex;
			flex-direction: row;

			.layoutDescription,
			.layoutAccountName {
				width: 100%;
			}

			.layoutDescription {
				font-weight: bold;
			}

			.layoutAccountName {
				text-align: right;
			}
		}

		.layoutValue {
			display: flex;
			flex-direction: column;
			padding: 7px;
			transition: all 0.25s;
			overflow: hidden;
			pointer-events: none;

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
	}

	.column_description .columnContent {
		display: flex;
		flex-direction: row;
	}

	.column_dueDate,
	.column_movementDate {
		max-width: 110px;
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
		max-width: 100px;
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
`

export default MovementStyle
