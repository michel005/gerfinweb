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
		background-color: ${(props) => (props.reduced ? 'transparent' : '#222')};
		box-shadow: ${(props) => (props.reduced ? 'none' : '#3339 0 0 14px')};
		display: flex;
		flex-direction: column;
		height: 100vh;
		left: 0;
		position: fixed;
		padding-bottom: 21px;
		top: 0;
		width: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)};
		transition: all 0.25s;
		z-index: 30;

		.userImageContainer {
			display: flex;
			flex-direction: row;
			justify-content: center;
			padding: ${(props) => (props.reduced ? '14px 0 0 0' : '20px 0')};
			margin-top: ${(props) => (props.reduced ? '38px' : '0')};
			transition: all 0.25s;

			.userImg {
				border-radius: ${(props) => (props.reduced ? '20px' : '100px')};
				height: ${(props) => (props.reduced ? `calc(${MENU_REDUCED_WIDTH} - 18px)` : '150px')};
				width: ${(props) => (props.reduced ? `calc(${MENU_REDUCED_WIDTH} - 18px)` : '150px')};
				transition: all 0.25s;
				box-shadow: #333 0 0 4px;
			}
		}

		.userInfo {
			width: 100%;
			transition: all 0.25s;
			margin-bottom: 7px;

			.userDescription {
				background-color: #3336;
				backdrop-filter: blur(10px);
				color: #fff;
				display: ${(props) => (props.reduced ? 'none' : 'flex')};
				flex-direction: column;
				padding: 10px;
				transition: all 0.25s;
				opacity: ${(props) => (props.reduced ? '0' : '1')};
				pointer-events: ${(props) => (props.reduced ? 'none' : 'auto')};

				.userFullName,
				.userEmail {
					font-size: 14px;
					padding-bottom: 4px;
					text-align: center;
				}

				.userFullName {
					svg {
						margin-right: 7px;
					}
				}

				.commands {
					display: flex;
					flex-direction: row;
					justify-content: center;
					margin-top: 4px;

					button {
						background-color: transparent;
						border: none;
						color: #fff;
						cursor: pointer;
						font-weight: bold;
						margin-right: 8px;
						text-align: left;
						transition: all 0.25s;

						&:hover {
							color: #39f;
						}
					}
				}
			}
		}

		.reduceButton {
			left: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)};
			position: fixed;
			transition: all 0.25s;

			button {
				background-color: ${(props) => (props.reduced ? 'transparent' : '#222')};
				border: none;
				border-radius: 4px;
				color: ${(props) => (props.reduced ? '#222' : '#fff')};
				cursor: pointer;
				margin: 0;
				padding: 7px 10px;
				transition: all 0.25s;
				transform: translateX(-44px) translateY(10px);

				&:hover {
					background-color: ${(props) => (props.reduced ? '#3333' : '#fff3')};
				}
			}
		}

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
				padding: 7px 7px 0 7px;
				justify-content: center;
				text-align: center;

				.spacer {
					height: 14px;
				}

				button {
					background-color: transparent;
					border: none;
					border-radius: 4px;
					color: ${(props) => (props.reduced ? 'transparent' : '#fff')};
					cursor: pointer;
					font-size: 14px;
					height: 100%;
					text-overflow: ellipsis;
					min-width: calc(
						${(props) => (props.reduced ? MENU_REDUCED_WIDTH + ' - 14px' : MENU_WIDTH + ' - 14px')}
					);
					padding: 10px 14px;
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
					}

					svg {
						color: ${(props) => (props.reduced ? '#333' : '#fff')};
						margin-right: 14px;
					}
				}
			}

			.balances {
				background-color: ${(props) => (props.reduced ? '#3336' : '#fff3')};
				backdrop-filter: ${(props) => (props.reduced ? 'blur(15px)' : 'none')};
				box-shadow: ${(props) => (props.reduced ? '#aaa9 0 0 7px' : 'none')};
				border-radius: 4px;
				color: #fff;
				margin: 14px;
				padding: 14px;
				transform: ${(props) => (props.reduced ? 'translateX(-166px)' : 'none')};
				width: 202px;
				transition: all 0.25s;

				&:hover {
					transform: ${(props) => (props.reduced ? 'translateX(-0)' : 'none')};
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
			padding: 7px 21px 21px;
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

				.header {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					width: 100%;

					h1 {
						margin-top: 30px;
						margin-bottom: 4px;

						svg {
							margin-right: 7px;
						}
					}

					h3 {
						color: #aaa;
						font-weight: normal;
						margin-bottom: 7px;
					}
				}
			}
		}
	}
`

export default MainStyle
