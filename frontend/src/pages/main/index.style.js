import styled from 'styled-components'

const MENU_WIDTH = '230px'
const MENU_REDUCED_WIDTH = '58px'
const HEADER_HEIGHT = '84px'
const MONTH_HEIGHT = '30px'

const MainStyle = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;

	.menu {
		background-color: ${(props) => (props.reduced ? 'transparent' : '#39f')};
		box-shadow: ${(props) => (props.reduced ? 'none' : '#3339 0 0 14px')};
		display: flex;
		flex-direction: column;
		height: 100vh;
		left: 0;
		position: fixed;
		top: 0;
		width: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)};
		transition: all 0.25s;
		z-index: 30;

		.options {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			flex-grow: 1;
			height: 100%;

			.fullHeight {
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				height: 100%;
			}

			.optionContainer {
				display: flex;
				flex-direction: column;

				button {
					background-color: transparent;
					border: 0 solid transparent;
					border-left-width: 7px;
					color: ${(props) => (props.reduced ? 'transparent' : '#fff')};
					cursor: pointer;
					font-size: 14px;
					height: 100%;
					margin-top: 14px;
					text-overflow: ellipsis;
					min-width: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)};
					padding: 14px 21px 14px 14px;
					text-align: left;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					transition: all 0.25s;

					&:hover {
						background-color: ${(props) => (props.reduced ? '#3331' : '#fff6')};
					}

					&.active {
						background-color: ${(props) => (props.reduced ? '#3333' : '#fff3')};
						border-left-color: ${(props) => (props.reduced ? '#333' : '#fff')};
						border-left-width: 7px;
					}

					svg {
						color: ${(props) => (props.reduced ? '#333' : '#fff')};
						margin-right: 14px;
					}
				}

				&.reduceButton {
					width: ${MENU_REDUCED_WIDTH};

					button {
						color: ${(props) => (props.reduced ? '#333' : '#fff')};

						svg {
							margin-right: 0px;
						}
					}

					button:hover {
						background-color: transparent !important;
						color: #111;
					}
				}
			}

			.balances {
				background-color: ${(props) => (props.reduced ? '#1113' : '#fff3')};
				backdrop-filter: ${(props) => (props.reduced ? 'blur(15px)' : 'none')};
				box-shadow: ${(props) => (props.reduced ? '#aaa9 0 0 7px' : 'none')};
				border-radius: 4px;
				color: #fff;
				margin: 14px 14px 21px;
				padding: 14px;
				position: ${(props) => (props.reduced ? 'fixed' : 'relative')};
				bottom: ${(props) => (props.reduced ? '0' : 'auto')};
				left: ${(props) => (props.reduced ? '-161px' : 'auto')};
				width: 202px;
				transition: all 0.25s;

				&:hover {
					left: ${(props) => (props.reduced ? '0' : 'auto')};
				}

				.balance {
					display: flex;
					flex-direction: column;
					margin-bottom: 14px;
					transition: all 0.25s;

					&:last-child {
						margin-bottom: 0px;
					}

					.title {
						font-weight: bold;
					}

					.value {
						display: flex;
						flex-direction: row;

						.currency {
							font-size: 14px;
							margin-top: 5px;
						}

						.val {
							font-size: 30px;
							text-align: right;
							width: 100%;
						}
					}
				}
			}
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		height: 100%;
		left: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)};
		position: fixed;
		bottom: 0;
		width: calc(100% - ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)});
		transition: all 0.25s;
		z-index: 10;

		.centeredContent {
			display: flex;
			flex-direction: column;
			min-height: calc(100% - ${HEADER_HEIGHT} - ${MONTH_HEIGHT});
			height: calc(100% - ${HEADER_HEIGHT} - ${MONTH_HEIGHT});
			max-height: calc(100% - ${HEADER_HEIGHT} - ${MONTH_HEIGHT});
			margin-top: calc(${MONTH_HEIGHT} + ${HEADER_HEIGHT});
			padding: 21px;
			overflow-y: auto;
			overflow-x: none;
			transition: all 0.25s;
			width: 100%;

			.mainHeader {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				min-height: ${HEADER_HEIGHT};
				position: fixed;
				top: 0;
				width: calc(100% - ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)} - 42px);
				transition: all 0.25s;

				.userInfo {
					background-color: #fff9;
					border-radius: 7px;
					box-shadow: #eee 0 0 14px;
					display: flex;
					flex-direction: row;
					margin: 14px -7px 14px 14px;
					padding: 10px;
					min-width: 280px;

					.userImage {
						background-color: #ccc;
						border-radius: 18px;
						display: flex;
						flex-direction: column;
						min-height: 36px;
						min-width: 36px;
						height: 36px;
						width: 36px;
						text-align: center;
						justify-content: center;

						svg {
							color: #fff;
						}
					}

					.info {
						width: 100%;

						.fullName {
							font-size: 18px;
							text-align: right;
						}

						.commands {
							display: flex;
							flex-direction: column;

							button {
								color: #999;
								cursor: pointer;
								border: none;
								background-color: transparent;
								margin-top: 4px;
								text-align: right;
								transition: all 0.25s;

								&:hover {
									color: #333;
								}
							}
						}
					}
				}

				.header {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					width: 100%;

					h1 {
						margin-top: 20px;
						margin-bottom: 4px;

						svg {
							margin-right: 7px;
						}
					}

					h3 {
						color: #aaa;
						font-weight: normal;
						margin-bottom: 14px;
					}
				}
			}
		}
	}
`

export default MainStyle
