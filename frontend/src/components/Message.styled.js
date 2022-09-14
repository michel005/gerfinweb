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

	.content {
		background-color: #fff;
		border-radius: 4px;
		box-shadow: #3333 0 0 7px;
		left: 50%;
		padding: 14px;
		position: fixed;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		min-width: 430px;
		max-width: 550px;

		.header {
			color: #333;
			display: flex;
			flex-direction: row;
			font-size: 24px;

			.headerText {
				display: flex;
				flex-direction: column;
				width: 100%;
			}

			svg {
				color: #aaa;
				cursor: pointer;
				font-size: 18px;
				transition: all 0.25s;
				margin-left: 7px;
				margin-top: 7px;
				margin-bottom: 7px;

				&:hover {
					color: #ccc;
				}
			}
		}

		.text {
			color: #999;
			font-size: 16px;
			margin-top: 14px;

			.field {
				margin-bottom: 10px;
			}
		}

		.commands {
			display: flex;
			color: #999;
			flex-direction: row;
			font-size: 16px;
			justify-content: flex-end;
			margin-top: 21px;

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
`

export default MessageStyle
