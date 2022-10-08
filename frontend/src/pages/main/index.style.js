import styled from 'styled-components'

const DEF = {
	TOPBAR: {
		width: '100%',
		height: '60px',
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
			width: '60px',
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
		background-color: #fff;
		border-color: #3331;
		border-width: 0 0 1px 0;
		border-style: solid;
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
				display: flex;
				flex-direction: column;
				height: ${DEF.TOPBAR.height};
				justify-content: center;
				padding: 0 7px;

				& > .button {
					width: calc(${DEF.SIDEBAR.width} - 14px);

					& > .buttonIcon,
					& > .buttonContent {
						font-size: 18px;
						font-weight: bold;

						.highlight {
							color: #39f;
						}
					}

					& > .buttonContent {
						width: 100%;
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
					overflow-x: hidden;
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
			background-color: #fff;
			border-color: #3331;
			border-width: 0 1px 0 0;
			border-style: solid;
			display: flex;
			flex-direction: column;
			height: calc(${DEF.SIDEBAR.height} + 1);
			margin-top: -1px;
			width: ${(props) => (props.reduced ? DEF.REDUCED.SIDEBAR.width : DEF.SIDEBAR.width)};
			transition: all 0.25s;

			& > .line {
				background-color: #3331;
				margin: 0 7px;
				height: 1px;
				width: calc(
					${(props) => (props.reduced ? DEF.REDUCED.SIDEBAR.width : DEF.SIDEBAR.width)} - 14px
				);
			}

			& > .button {
				background-color: transparent;
				color: #333;
				font-size: 16px;
				justify-content: flex-start;
				margin: 7px 7px 0;
				padding: 10px 14px;

				& > .buttonContent {
					opacity: ${(props) => (props.reduced ? 0 : 1)};
					pointer-events: ${(props) => (props.reduced ? 'none' : 'auto')};
				}

				&:hover {
					background-color: #d1deff;

					& > .buttonContent {
						color: #79a0ff;
					}

					& > .buttonIcon {
						color: #79a0ff;
					}
				}

				&.active {
					background-color: #c4d5ff;

					& > .buttonContent {
						color: #5c8bff;
					}

					& > .buttonIcon {
						color: #5c8bff;
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
