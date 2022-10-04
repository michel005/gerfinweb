import styled from 'styled-components'

const MENU_WIDTH = '260px'
const MENU_REDUCED_WIDTH = '58px'
const HEADER_HEIGHT = '100px'

const MainStyle = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;

	.reduceButton {
		top: 0;
		left: ${(props) => (props.reduced ? `${MENU_REDUCED_WIDTH}` : `calc(${MENU_REDUCED_WIDTH})`)};
		position: fixed;
		transition: all 0.25s;
		z-index: 100;

		button {
			background-color: ${(props) => (props.reduced ? 'transparent' : '#fff3')};
			border: none;
			border-radius: 4px;
			color: ${(props) => (props.reduced ? '#222' : '#222')};
			cursor: pointer;
			margin: 0;
			padding: 7px 10px;
			transition: all 0.25s;
			transform: translateX(-44px) translateY(10px);

			&:hover {
				background-color: ${(props) => (props.reduced ? '#3333' : '#3333')};
				color: ${(props) => (props.reduced ? '#222' : '#fff')};
			}
		}
	}

	.menu {
		background: ${(props) =>
			props.reduced
				? 'linear-gradient(to bottom, #fffc, #fff9)'
				: 'linear-gradient(to bottom, #fffc, #fff9)'};
		box-shadow: ${(props) => (props.reduced ? '#3333 0 0 14px' : '#3333 0 0 14px')};
		display: flex;
		flex-direction: column;
		height: ${(props) => (props.reduced ? '100%' : '100%')};
		left: 0;
		position: fixed;
		padding-bottom: 14px;
		top: 0;
		width: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : 'calc(' + MENU_WIDTH + ' - 28px)')};
		transition: all 0.25s;
		z-index: 30;

		&:hover {
			box-shadow: ${(props) => (props.reduced ? '#3336 0 0 14px' : '#3336 0 0 14px')};
		}

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
			margin-bottom: 7px;
			transition: all 0.25s;
			width: 100%;

			.userDescription {
				color: #333;
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
						color: #333;
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

		.options {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			flex-grow: 1;
			height: 100%;
			padding-top: 14px;

			.fullHeight {
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				height: 100%;
			}

			.optionContainer {
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				padding-top: 7px;

				.spacer {
					height: 14px;
				}

				button {
					background-color: transparent;
					border: none;
					color: ${(props) => (props.reduced ? 'transparent' : '#111')};
					cursor: pointer;
					font-size: 14px;
					min-width: calc(${(props) =>
						props.reduced ? MENU_REDUCED_WIDTH + ' - 21px' : MENU_WIDTH + ' - 70px'});
					padding: 14px;
					text-align: ${(props) => (props.reduced ? 'center' : 'left')};
					white-space: nowrap;
					overflow: hidden;
					transition: all 0.25s;

					&:hover {
						background-color: ${(props) => (props.reduced ? '#3331' : '#3331')};
					}

					&:active {
						transform: scale(0.95);
					}

					&.active {
						background-color: ${(props) => (props.reduced ? '#3333' : '#39f')};
						box-shadow: ${(props) => (props.reduced ? 'none' : '#39fa 0 0 7px')};
						color: ${(props) => (props.reduced ? 'transparent' : '#fff')};

						svg {
							color: ${(props) => (props.reduced ? '#333' : '#fff')};
						}
					}

					svg {
						color: ${(props) => (props.reduced ? '#333' : '#000')};
						margin-right: ${(props) => (props.reduced ? '0' : '14px')};
					}
				}
			}

			.balances {
				background-color: ${(props) => (props.reduced ? '#3336' : 'transparent')};
				backdrop-filter: ${(props) => (props.reduced ? 'blur(15px)' : 'none')};
				box-shadow: ${(props) => (props.reduced ? '#aaa9 0 0 7px' : 'none')};
				border-radius: 4px;
				color: ${(props) => (props.reduced ? '#fff' : '#333')};
				margin: ${(props) => (props.reduced ? '14px' : '14px 14px 0 14px')};
				padding: 14px;
				transform: ${(props) => (props.reduced ? 'translateX(-166px)' : 'none')};
				width: ${(props) => (props.reduced ? '202px' : 'calc(100% - 28px)')};
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
						margin-bottom: 0;
					}

					.title {
						color: ${(props) => (props.reduced ? '#fff' : '#000')};
						font-size: 14px;
					}

					.value {
						display: flex;
						flex-direction: row;

						.currency {
							font-size: 12px;
							margin-top: 5px;
						}

						.val {
							font-size: 28px;
							text-align: right;
							width: 100%;

							&.zero {
								color: ${(props) => (props.reduced ? '#fff' : '#ccc')};
							}

							&.negative {
								color: ${(props) => (props.reduced ? '#fff' : '#f32727')};
							}
						}
					}
				}
			}
		}
	}

	.content {

		.mainHeader {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			min-height: ${HEADER_HEIGHT};
			position: fixed;
			left: calc(${(props) =>
				props.reduced ? `calc(${MENU_REDUCED_WIDTH} + 22px)` : `calc(${MENU_WIDTH} - 4px)`});
			top: 0;
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

		.centeredContent {
			display: flex;
			flex-direction: column;
			height: calc(100% - ${HEADER_HEIGHT} - 48px - 28px);
			position: fixed;
			top: calc(${HEADER_HEIGHT} + 14px);
			left: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : `calc(${MENU_WIDTH} - 28px)`)};
			padding: 0 14px;
			overflow-y: auto;
			overflow-x: hidden;
			transition: all 0.25s;
			width: calc(100% - ${(props) =>
				props.reduced ? MENU_REDUCED_WIDTH : `calc(${MENU_WIDTH} - 28px)`});
			
			& > div {
				margin: 14px 0 !important;
				height: calc(100% - 28px);
            }
		}
	}

	@media only screen and (max-width: 1000px) {
		.reduceButton {
			top: 0;
			left: 58px;
			position: fixed;
			transition: all 0.25s;

			button {
				background-color: ${(props) => (props.reduced ? 'transparent' : '#fff3')};
				border: none;
				border-radius: 4px;
				color: ${(props) => (props.reduced ? '#222' : '#222')};
				cursor: pointer;
				margin: 0;
				padding: 6px 10px 7px;
				transition: all 0.25s;
				transform: translateX(-44px) translateY(10px);
				font-size: 20px;

				&:hover {
					background-color: ${(props) => (props.reduced ? '#3333' : '#3333')};
					color: ${(props) => (props.reduced ? '#222' : '#fff')};
				}
			}
		}

		.menu {
			background: ${(props) => (props.reduced ? 'transparent' : '#fffe')};
			box-shadow: none;
			backdrop-filter: blur(10px);
			border-radius: 0;
			display: flex;
			flex-direction: column;
			height: 100%;
			left: 0;
			margin: 0;
			position: fixed;
			padding-bottom: 14px;
			top: 0;
			width: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : '100%')};
			transition: all 0.25s;
			opacity: ${(props) => (props.reduced ? 0 : 1)};
			pointer-events: ${(props) => (props.reduced ? 'none' : 'auto')};
			z-index: 30;

			&:hover {
				box-shadow: none;
			}

			.userImageContainer {
				display: flex;
				flex-direction: row;
				justify-content: center;
				padding: 14px 0;
				margin-top: 0;
				transition: all 0.25s;

				.userImg {
					border-radius: ${(props) => (props.reduced ? '20px' : '100px')};
					height: 80px;
					width: 80px;
					transition: all 0.25s;
					box-shadow: #333 0 0 4px;
				}
			}

			.userInfo {
				margin-bottom: 0;
				transition: all 0.25s;
				width: 100%;

				.userDescription {
					color: #333;
					display: ${(props) => (props.reduced ? 'none' : 'flex')};
					flex-direction: column;
					padding: 10px;
					transition: all 0.25s;
					opacity: ${(props) => (props.reduced ? '0' : '1')};
					pointer-events: ${(props) => (props.reduced ? 'none' : 'auto')};

					.commands {
						display: flex;
						flex-direction: row;
						justify-content: center;
						margin-top: 4px;

						button {
							background-color: transparent;
							border: none;
							color: #333;
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

			.balances {
				background-color: ${(props) => (props.reduced ? '#3336' : 'transparent')};
				backdrop-filter: ${(props) => (props.reduced ? 'blur(15px)' : 'none')};
				box-shadow: ${(props) => (props.reduced ? '#aaa9 0 0 7px' : 'none')};
				border-radius: 4px;
				color: ${(props) => (props.reduced ? '#fff' : '#333')};
				margin: ${(props) => (props.reduced ? '14px' : '14px 14px 0 14px')};
				padding: 14px;
				transform: ${(props) => (props.reduced ? 'translateX(-166px)' : 'none')};
				width: calc(100% - 28px) !important;
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
						margin-bottom: 0;
					}

					.title {
						color: ${(props) => (props.reduced ? '#fff' : '#000')};
						font-size: 14px;
					}

					.value {
						display: flex;
						flex-direction: row;

						.currency {
							font-size: 12px;
							margin-top: 5px;
						}

						.val {
							font-size: 28px;
							text-align: right;
							width: 100%;

							&.zero {
								color: ${(props) => (props.reduced ? '#fff' : '#ccc')};
							}

							&.negative {
								color: ${(props) => (props.reduced ? '#fff' : '#f32727')};
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
			height: calc(100% - 20px);
			position: fixed;
			top: 0;
			transition: all 0.25s;
			z-index: 10;
			left: ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)};
			width: calc(100% - 24px - ${(props) => (props.reduced ? MENU_REDUCED_WIDTH : MENU_WIDTH)});

			.mainHeader {
				opacity: 0;
			}

			.centeredContent {
				top: 60px;
				left: 0;
				width: 100%;
				padding: 0 14px;
				height: calc(100% - ${HEADER_HEIGHT} - 22px);

				& > div {
					margin: 14px 0 !important;
					height: calc(100% - 28px);
				}
			}
		}
	}
}
`

export default MainStyle
