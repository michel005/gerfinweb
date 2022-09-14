import styled from 'styled-components'

const AlertStyle = styled.div`
	display: flex;
	flex-direction: row;
	border-radius: 4px;
	border: 1px solid #ccc;
	background-color: #f4f4f4;
	margin-bottom: 14px;

	.icon {
		background-color: #fff;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 14px;

		svg {
			background-color: #ccc;
			border-radius: 30px;
			height: 30px;
			width: 30px;
			padding: 7px;
			color: #fff;
		}
	}

	.alertText {
		color: #999;
		font-size: 14px;
		padding: 7px 10px;
	}

	&.error {
		border: 1px solid #ff7373;
		background-color: #ffdada;

		.icon {
			svg {
				background-color: #ffa2a2;
				color: red;
			}
		}

		.alertText {
			color: red;
		}
	}
`

export default AlertStyle
