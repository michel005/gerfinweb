import styled from 'styled-components'

const LoginStyle = styled.div`
	.loginPage,
	.createAccountPage {
		background-color: #fff;
		border-radius: 7px;
		box-shadow: #3333 0 0 7px;
		left: 50%;
		padding-bottom: 21px;
		position: fixed;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 350px;

		.header {
			color: #000;
			font-size: 18px;
			font-weight: bold;
			padding: 35px 21px;
		}

		.fields {
			padding: 14px 21px;

			& > * {
				margin-bottom: 7px;
			}
		}

		.commandBar {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			padding: 7px 21px;

			& > button {
				margin-bottom: 7px;
			}
		}

		.commandBarH {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			padding: 7px 21px;

			& > button {
				margin-right: 7px;
			}
		}
	}
`

export default LoginStyle
