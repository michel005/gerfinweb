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
		padding: 21px 21px 28px;
		position: fixed;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 600px;

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
				margin-right: 14px;

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}

	button {
		background-color: #39f;
		border: 0px solid transparent;
		border-radius: 7px;
		color: #fff;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		font-size: 14px;
		justify-content: center;
		min-width: 100px;
		padding: 10px 14px;
		transition: all 0.25s;

		.logo {
			margin-bottom: -4px;
		}

		&:hover {
			background-color: #3090f0;
		}

		&.transparent {
			background-color: transparent;
			color: #333;

			&:hover {
				background-color: #3331;
			}
		}
	}
`

export default MessageStyle