const { default: styled } = require('styled-components')

const MessageStyle = styled.div`
	background-color: #3333;
	backdrop-filter: blur(10px);
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;

	.content {
		background-color: #fff;
		border-radius: 7px;
		box-shadow: #3337 0 0 7px;
		left: 50%;
		position: fixed;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 430px;

		.header {
			border: 0 solid #39f;
			border-bottom-width: 2px;
			color: #333;
			display: flex;
			flex-direction: row;
			font-size: 18px;

			svg {
				color: #39f;
				font-size: 18px;
				transition: all 0.25s;
				padding: 18px 0 14px 14px;
			}

			.headerText {
				display: flex;
				flex-direction: column;
				padding: 14px;
				width: 100%;
			}

			.fa-xmark {
				color: #aaa;
				cursor: pointer;
				font-size: 18px;
				transition: all 0.25s;
				padding: 18px 14px 14px;

				&:hover {
					color: #ccc;
				}
			}
		}

		.text {
			display: flex;
			flex-direction: column;
			color: #999;
			font-size: 16px;
			padding: 14px;
			transition: all 0.25s;

			& > * {
				display: flex;
				flex-direction: column;
				gap: 14px;

				p {
					margin: 0;
				}
			}
		}

		.commands {
			display: flex;
			color: #999;
			flex-direction: row;
			font-size: 16px;
			justify-content: flex-end;
			transition: all 0.25s;

			& > * {
				width: 100%;
			}
		}
	}

	.content.red {
		.header {
			border-color: red;

			svg {
				color: red;
			}

			.fa-xmark {
				color: #aaa;
			}
		}

		.button.primary {
			background: #ff0000;

			&:hover {
				background: #ff6c6c;
			}
		}
	}

	@media only screen and (max-width: 700px) {
		.content {
			top: 0;
			transform: translateX(calc(-50%)) translateY(0);
			height: 100%;
			max-height: calc(100%);
			width: calc(100%);
			overflow-y: auto;

			.text {
				overflow-y: auto;
				flex-grow: 1;
			}
		}
	}
`

export default MessageStyle
