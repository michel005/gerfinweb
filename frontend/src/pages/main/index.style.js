import styled from 'styled-components'

const MENU_WIDTH = '100%'
const MENU_HEIGHT = '60px'

const MONTH_HEIGHT = '30px'

const MainStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;

	.menu {
		background-color: #39f;
		display: flex;
		flex-direction: column;
		height: ${MENU_HEIGHT};
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 20;

		.centeredMenu {
			display: flex;
			flex-direction: column;
			height: ${MENU_HEIGHT};
			max-width: ${MENU_WIDTH};
			transform: translateX(-50%);
			margin-left: 50%;
			width: 100%;

			.topDivision {
				display: flex;
				flex-direction: row;
				height: ${MENU_HEIGHT / 2}px;
				width: 100%;

				.appName {
					color: #f4f4f4;
					display: flex;
					flex-direction: column;
					font-size: 24px;
					justify-content: center;
					height: ${MENU_HEIGHT};
					padding: 0 14px 5px;
				}

				.options {
					display: flex;
					flex-direction: row;
					justify-content: center;
					flex-grow: 1;
					width: 100%;

					.optionContainer {
						display: flex;
						flex-direction: column;
						justify-content: center;

						button {
							background-color: transparent;
							border: none;
							border-radius: 4px;
							/* border: 0 solid transparent; */
							/* border-width: 2px 0 2px 0; */
							color: #fff;
							cursor: pointer;
							font-size: 16px;
							height: auto;
							padding: 7px 10px;
							margin: 0 7px;
							transition: all 0.25s;

							&:hover {
								background-color: #fff6;
							}

							&.active {
								/* border-bottom-color: #fff; */
								background-color: #fff3;
							}
						}
					}
				}

				.userInfo {
					color: #fff;
					display: flex;
					flex-direction: row;
					height: ${MENU_HEIGHT};
					justify-content: flex-end;
					padding: 10px;
					min-width: 250px;

					.details {
						display: flex;
						flex-direction: column;

						.fullName {
							font-size: 18px;
						}

						.commands {
							display: flex;
							flex-direction: row;
							justify-content: flex-end;

							button {
								color: #fffa;
								cursor: pointer;
								border: none;
								background-color: transparent;
							}
						}
					}
				}
			}
		}
	}

	.monthController {
		background-color: #222;
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		height: ${MONTH_HEIGHT};
		font-size: 12px;
		justify-content: center;
		left: 0;
		position: fixed;
		top: ${MENU_HEIGHT};
		width: 100%;
		z-index: 20;

		.allMonths {
			display: flex;
			flex-direction: row;
			color: #fff;

			.month {
				padding: 6px 10px;
				cursor: pointer;
				transition: all 0.25s;

				&:hover {
					background-color: #fff6;
				}

				&.currentMonth {
					background-color: #fff3;
				}

				&.dark {
					font-weight: bold;

					&:hover {
						cursor: initial;
						background-color: transparent;
					}
				}
			}
		}

		button {
			background-color: transparent;
			border: none;
			color: #fff;
			cursor: pointer;
			margin: 0 14px;
		}

		.month {
			color: #fff;
			padding: 4px 14px;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		height: calc(100% - ${MENU_HEIGHT} - ${MONTH_HEIGHT});
		left: 0;
		position: fixed;
		top: calc(${MENU_HEIGHT} + ${MONTH_HEIGHT});
		width: 100%;
		z-index: 10;

		.centeredContent {
			//background-color: #fff;
			//box-shadow: #ccc 0 0 7px;
			display: flex;
			flex-direction: column;
			min-height: 100%;
			max-width: 100%;
			transform: translateX(-50%);
			margin-left: 50%;
			padding: 14px;
			overflow-y: auto;
			overflow-x: none;
			width: ${MENU_WIDTH};
		}
	}
`

export default MainStyle
