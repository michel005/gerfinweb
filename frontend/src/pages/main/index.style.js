import styled from 'styled-components'

const DEF = {
	TOPBAR: {
		width: '100%',
		height: '50px',
	},
	SIDEBAR: {
		width: '200px',
		height: '100%',
	},
	FOOTER: {
		width: '100%',
		height: '50px',
	},
	REDUCED: {
		SIDEBAR: {
			width: '50px',
			height: '100%',
		},
	},
}

const MainStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;
	transition: all 0.2s;

	& > .topBar {
		display: flex;
		flex-direction: row;
		height: ${DEF.TOPBAR.height};
		width: ${DEF.TOPBAR.width};

		& > .title {
			display: flex;
			flex-direction: row;
			height: ${DEF.TOPBAR.height};
			width: ${DEF.SIDEBAR.width};
			overflow: hidden;

			& > .reduceButton {
				height: ${DEF.TOPBAR.height};
				width: ${DEF.TOPBAR.height};

				& > button {
					background-color: transparent;
					border: none;
					cursor: pointer;
					font-size: 18px;
					height: 100%;
					width: 100%;

					&:hover {
						color: #aaa;
					}
				}
			}

			& > .text {
				color: #333;
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
				font-size: 18px;
				height: ${DEF.TOPBAR.height};
				justify-content: center;
				transform: translateY(-1px);
				width: calc(100% - ${DEF.TOPBAR.height});

				& > .textContainer {
					text-overflow: ellipsis;

					& > .highlight {
						color: #39f;
					}
				}
			}
		}

		& > .user {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: ${DEF.TOPBAR.height};
			width: calc(100% - ${DEF.SIDEBAR.width});

			& > .userContainer {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				width: 100%;

				& > .userImageContainer {
					border-radius: 24px;
					cursor: pointer;
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 4px;
					margin: 7px;

					&:hover {
						background-color: #ccc;
					}

					& > .userImg {
						border-radius: 18px;
						height: 36px;
						width: 36px;
					}
				}

				& > .userOptions {
					background-color: #3339;
					backdrop-filter: blur(10px);
					border-radius: 4px;
					display: flex;
					right: 7px;
					flex-direction: column;
					position: fixed;
					top: calc(${DEF.TOPBAR.height} + 3px);
					width: 130px;
					overflow: hidden;
					z-index: 100;

					& > button {
						background-color: transparent;
						border: none;
						color: #fff;
						cursor: pointer;
						padding: 7px;

						&:hover {
							background-color: #3333;
						}
					}
				}
			}
		}
	}

	& > .content {
		display: flex;
		flex-direction: row;
		height: calc(100% - ${DEF.TOPBAR.height});
		width: 100%;

		& > .sideBar {
			display: flex;
			flex-direction: column;
			height: ${DEF.SIDEBAR.height};
			width: ${(props) => (props.reduced ? DEF.REDUCED.SIDEBAR.width : DEF.SIDEBAR.width)};
			transition: all 0.25s;

			& > .optionContainer {
				display: flex;
				flex-direction: column;
				height: ${DEF.TOPBAR.height};
				justify-content: center;
				padding: 0 16px;
				cursor: pointer;
				width: ${(props) => (props.reduced ? DEF.REDUCED.SIDEBAR.width : DEF.SIDEBAR.width)};
				transition: all 0.25s;

				&.active {
					background-color: #39f;
					border-top-right-radius: 7px;
					border-bottom-right-radius: 7px;

					& > button {
						color: #fff;
					}
				}

				& > button {
					background-color: transparent;
					border: none;
					cursor: pointer;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;

					& > svg {
						height: 18px;
						margin-right: 20px;
						width: 18px;
					}
				}
			}
		}

		& > .stage {
			height: 100%;
			overflow-y: auto;
			padding: 14px;
			width: ${(props) =>
				props.reduced
					? `calc(100% - ${DEF.REDUCED.SIDEBAR.width})`
					: `calc(100% - ${DEF.SIDEBAR.width})`};
			transition: all 0.25s;
		}
	}

	@media only screen and (max-width: 700px) {
		& > .topBar {
			height: ${DEF.TOPBAR.height};
			width: ${DEF.TOPBAR.width};
			transition: all 0.25s;

			& > .user {
				height: ${DEF.TOPBAR.height};
				width: calc(100% - ${DEF.REDUCED.SIDEBAR.width});
				transition: all 0.25s;
			}
		}

		& > .content {
			height: calc(100% - ${DEF.TOPBAR.height});
			width: 100%;

			& > .sideBar {
				background-color: #eff2fdff;
				height: ${DEF.SIDEBAR.height};
				left: 0;
				position: fixed;
				top: ${DEF.TOPBAR.height};
				overflow: hidden;
				width: ${(props) => (props.reduced ? 0 : DEF.SIDEBAR.width)};
				z-index: 100;

				& > .optionContainer {
					&.active {
						border-top-right-radius: 0;
						border-bottom-right-radius: 0;
					}
				}
			}

			& > .stage {
				height: 100%;
				width: 100%;
			}
		}
	}
`

export default MainStyle
