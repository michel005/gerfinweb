const { default: styled } = require('styled-components')

const MessageStyle = styled.div`
	background-color: #3333;
	backdrop-filter: blur(10px);
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;
	transition: all 0.25s;

	.content {
		background-color: #fff;
		border-radius: 4px;
		box-shadow: #3337 0 0 7px;
		left: 50%;
		position: fixed;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 430px;
		transition: all 0.25s;

		.header {
			border: 0 solid #39f;
			border-bottom-width: 2px;
			color: #333;
			display: flex;
			flex-direction: row;
			font-size: 18px;
			transition: all 0.25s;

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
			color: #999;
			font-size: 16px;
			margin-top: 14px;
			margin-bottom: 14px;
			padding: 10px 14px;
			transition: all 0.25s;

			.field {
				margin-bottom: 10px;
			}

			& > div {
				margin-top: 14px !important;
			}
		}

		.commands {
			display: flex;
			color: #999;
			flex-direction: row;
			font-size: 16px;
			justify-content: flex-end;
			margin-top: 21px;
			padding: 0 14px 14px;
			transition: all 0.25s;

			button {
				margin-right: 10px;

				svg {
					margin-top: 4px;
				}

				&:last-child {
					margin-right: 0;
				}
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

		button.primary {
			background: #ff0000;

			&:hover {
				background: #ff6c6c;
			}
		}
	}

	@media only screen and (max-width: 700px) {
		.content {
			transform: translateX(calc(-50% - 21px)) translateY(-50%);
			margin: 0 21px;
			width: calc(100% - 42px);
		}
	}
`

export default MessageStyle
