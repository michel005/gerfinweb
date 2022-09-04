import styled from 'styled-components'

const TableStyle = styled.div`
	background-color: #fff;
	border-radius: 7px;
	box-shadow: #ccc 0 0 7px;
	display: flex;
	flex-direction: column;
    height: 100%;
    min-height: 500px;

	* {
		user-select: none;
	}

	.table {
		display: flex;
		flex-direction: column;
		height: 100%;

		.header {
			background-color: #39f;
			border: 0 solid #ccc;
			border-bottom-width: 1px;
			border-top-left-radius: 7px;
			border-top-right-radius: 7px;
			display: flex;
			flex-direction: row;
			height: 50px;
			min-height: 50px;
			width: 100%;
			padding-right: 15px;

			& > .column {
				color: #fff;
				display: flex;
				flex-grow: 1;
				font-weight: bold;
				padding: 14px 21px;
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
					height: 50px;
					min-height: 50px;
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

					&:last-child {
						border-bottom-left-radius: 7px;
						border-bottom-right-radius: 7px;
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
						padding: 0px 17px;
						justify-content: center;
						transition: all 0.25s;
						width: 100%;

						.columnContent {
							border: 1px solid transparent;
							border-radius: 4px;
							padding: 4px;
						}

						select {
							background-color: #fffc;
							border: none;
							color: #333;
							height: 100%;
						}

						input {
							background-color: #fff;
							border: 1px solid #aaa;
							border-radius: 4px;
							font-size: 14px;
							padding: 4px;
							width: 100%;
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
				padding: 0px 21px;
				user-select: none;
			}

			.pageController {
				display: flex;
				flex-direction: row;
				padding: 0 7px;

				button {
					background-color: transparent;
					border: none;
					color: #000;
					display: flex;
					justify-content: center;
					flex-direction: column;
					margin: 0 7px !important;
					padding: 0px;
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
`

export default TableStyle
