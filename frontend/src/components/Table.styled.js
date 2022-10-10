import styled from 'styled-components'

const LINE_SIZE = '40px'

const TableStyle = styled.div`
	background-color: #fff;
	box-shadow: #ccc 0 0 7px;
	border-radius: 7px;
	display: flex;
	flex-direction: column;
	height: 100%;
	min-height: 500px;
	overflow: hidden;

	* {
		user-select: none;
	}

	.table {
		display: flex;
		flex-direction: column;
		height: 100%;
		max-width: 100%;

		.header {
			background-color: #39f;
			border: 0 solid #ccc;
			border-bottom-width: 1px;
			display: flex;
			flex-direction: row;
			height: calc(${LINE_SIZE} + 6px);
			min-height: calc(${LINE_SIZE} + 6px);
			width: 100%;
			padding-right: 15px;

			& > .column {
				color: #fff;
				display: flex;
				flex-grow: 1;
				font-weight: bold;
				font-size: 14px;
				padding: 13px 14px;
				transition: all 0.25s;
				width: 100px;

				svg {
					margin-left: 14px;
					margin-top: 4px;
				}

				&:first-child {
					border-top-left-radius: 7px;
				}

				&:last-child {
					border-top-right-radius: 7px;
				}

				&.right {
					justify-content: flex-end;
					text-align: right;
				}

				&.scrollbarSpace {
					padding: 0;
					max-width: 15px;
				}

				&.hovered {
					background-color: #3090f0;
				}
			}
		}

		.body {
			display: flex;
			flex-direction: column;
			overflow-y: scroll;
			height: 100%;

			::-webkit-scrollbar {
				width: 15px;
			}

			::-webkit-scrollbar-track {
				background: #fff;
			}

			::-webkit-scrollbar-thumb {
				background: #888;
			}

			::-webkit-scrollbar-thumb:hover {
				background: #555;
			}

			.rowsContainer {
				display: flex;
				flex-direction: column;

				.line {
					background-color: #fff;
					display: flex;
					flex-direction: row;
					transition: all 0.25s;
					height: ${LINE_SIZE};
					min-height: ${LINE_SIZE};
					width: 100%;

					.hovered {
						background-color: #f4f4f4 !important;
					}

					&:nth-child(even) {
						background-color: #f4f4f4;

						.hovered {
							background-color: #eee !important;
						}
					}

					&:hover {
						background-color: #ddd;
						border-radius: 0;
					}

					&.emptyTable {
						color: #ccc;
						display: flex;
						flex-direction: column;
						height: 100%;
						font-size: 14px;
						justify-content: center;
						padding: 15px 17px;
						text-align: center;

						&:hover {
							background-color: transparent;
							transform: none;
							box-shadow: none;
						}
					}

					& > .column {
						color: #000;
						display: flex;
						flex-direction: column;
						flex-grow: 1;
						font-size: 14px;
						padding: 0 10px;
						justify-content: center;
						transition: all 0.25s;
						width: 100%;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;

						.loading {
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							width: 100%;
							height: ${LINE_SIZE};

							svg {
								font-size: 20px;
								margin-top: 14px;
								margin-left: 4px;
							}
						}

						.columnContent {
							border: 1px solid transparent;
							padding: 4px;
						}

						&.negative {
							color: red;
						}

						&.right {
							justify-content: flex-end;
							text-align: right;
						}

						&.scrollbarSpace {
							padding: 0;
							max-width: 15px;
						}
					}
				}
			}
		}

		.page {
			border: 0 solid #ccc;
			border-top-width: 1px;
			display: flex;
			flex-direction: row;
			height: 50px;
			min-height: 50px;
			width: 100%;

			.currentPageDisplay {
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex-grow: 1;
				pointer-events: none;
				padding: 0 21px;
				user-select: none;
			}

			.pageController {
				display: flex;
				flex-direction: row;
				padding: 0 7px;

				.button {
					background-color: transparent;
					border: none;
					color: #000;
					display: flex;
					justify-content: center;
					flex-direction: column;
					margin: 0 7px !important;
					padding: 0;
				}

				.currentPage {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin: 0 7px 1px;
					pointer-events: none;
					user-select: none;
				}
			}
		}
	}

	@media only screen and (max-width: 700px) {
		height: calc(100% - 47px);
		min-height: initial;
		overflow: hidden;

		.table {
			.header {
				.column.responsive {
					color: transparent;
					width: 0;
					max-width: 0;
					min-width: 0;
					padding: 0;
					pointer-events: none;
				}
			}

			.body {
				overflow-y: auto;
			}

			.page {
				justify-content: center;

				.pageController {
					width: 100%;

					.currentPage {
						flex-grow: 1;
						text-align: center;
						width: 100%;
					}
				}
			}

			.currentPageDisplay {
				color: transparent;
				width: 0;
				max-width: 0;
				min-width: 0;
				padding: 0 !important;
				margin: 0;
			}
		}
	}
`

export default TableStyle
