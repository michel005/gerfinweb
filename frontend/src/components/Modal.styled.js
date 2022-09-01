const { default: styled } = require('styled-components')

const ModalStyle = styled.div`
	background-color: #3333;
	backdrop-filter: blur(10px);
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
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
		width: ${props => props.width};
		height: ${props => props.height};

		.header {
			color: #333;
			display: flex;
			flex-direction: row;
			font-size: 24px;
            margin-bottom: 28px;

			.text {
				width: 100%;
			}

			.close {
				margin-top: -10px;

				button {
					background-color: transparent;
					border: none;
                    cursor: pointer;
					transform: rotate(45deg);
				}
			}
		}

        .field {
            margin-bottom: 14px;
        }
	}
`

export default ModalStyle
