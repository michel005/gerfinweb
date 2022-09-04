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
		padding-bottom: 21px;
		top: 0;
		width: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)};
		transition: all 0.25s;
		z-index: 30;

		.userInfo {
			background-color: #222;
			background-image: ${(props) => (props.reduced ? 'url(https://randomuser.me/api/portraits/men/9.jpg)' : 'none')};
			border-radius: ${(props) => (props.reduced ? '0 0 4px 0' : '0')};
			background-size: cover;
			display: flex;
			flex-direction: column;
			padding: ${(props) => (props.reduced ? '10px 0px' : '24px 14px 14px')};
			transition: all 0.25s;

			.userImage {
				display: flex;
				flex-direction: row;
				justify-content: center;
				width: 100%;
				opacity: ${(props) => (props.reduced ? '0' : '1')};

				.userImageMocked {
					background-color: #fff;
					background-image: url(https://randomuser.me/api/portraits/men/9.jpg);
					background-size: cover;
					box-shadow: #111 0 0 7px;
					border-radius: 50px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					font-size: 50px;
					font-size: ${(props) => (props.reduced ? '12px' : '50px')};
					height: ${(props) => (props.reduced ? '40px' : '100px')};
					width: ${(props) => (props.reduced ? '40px' : '100px')};
				}
			}

			.userDescription {
				color: #fff;
				display: flex;
				flex-direction: column;
				padding-top: 21px;

				.userFullName,
				.userEmail {
					font-size: 14px;
				}

				.commands {
					display: flex;
					flex-direction: row;
					margin-top: 4px;

					button {
						background-color: transparent;
						border: none;
						color: #fff;
						cursor: pointer;
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
				background-color: #222;
				border: none;
				border-bottom-right-radius: 4px;
				color: ${(props) => (props.reduced ? '#fff' : '#fff')};
				cursor: pointer;
				margin: 0;
				padding: 7px;
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

				.spacer {
					height: 14px;
				}

				button {
					background-color: transparent;
					border: 0 solid transparent;
					border-left-width: 7px;
					color: ${(props) => (props.reduced ? 'transparent' : '#fff')};
					cursor: pointer;
					font-size: 14px;
					height: 100%;
					text-overflow: ellipsis;
					min-width: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)};
					padding: 14px;
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
			}

			.balances {
				background-color: ${(props) => (props.reduced ? '#3336' : '#fff3')};
				backdrop-filter: ${(props) => (props.reduced ? 'blur(15px)' : 'none')};
				box-shadow: ${(props) => (props.reduced ? '#aaa9 0 0 7px' : 'none')};
				border-radius: 4px;
				color: #fff;
				margin: 14px;
				padding: 14px;
				transform: ${(props) => (props.reduced ? 'translateX(-170px)' : 'none')};
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
