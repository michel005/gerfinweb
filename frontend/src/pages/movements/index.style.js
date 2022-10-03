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

	.commands {
		display: flex;
		flex-direction: row;
		padding-bottom: 14px;

		& > * {
			margin-right: 7px;
		}
	}

	@media only screen and (max-width: 700px) {
		.templateList {
			transform: ${(props) =>
				props.showTemplates
					? 'translateY(40px) translateX(0px)'
					: 'translateY(20px) translateX(0px)'};
		}
	}
`

export default MovementStyle
