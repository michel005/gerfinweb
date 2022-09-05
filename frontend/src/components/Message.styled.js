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
		min-width: 500px;
		max-width: 600px;

		.header {
			color: #333;
			font-size: 24px;
		}

		.text {
			color: #999;
			font-size: 16px;
			margin-top: 14px;
		}

		.commands {
			display: flex;
			color: #999;
			flex-direction: row;
			font-size: 16px;
			justify-content: center;
			margin-top: 21px;

			button {
				margin-right: 10px;

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
`

export default MessageStyle