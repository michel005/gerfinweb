import styled from 'styled-components'

const VerticalProgressIndicatorStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	transition: all 0.25s;

	* {
		transition: all 0.25s;
	}

	&.currentDay {
		.label {
			background-color: #393;
			font-weight: bold;
		}
	}

	&:hover {
		.background {
			background-color: #f4f4f4;
		}
		.backgroundNegative {
			background-color: #f4f4f4;
		}

		.progresso {
			background-color: #39f;
		}
		.progressoNegative {
			background-color: #f00;
		}

		.value {
			opacity: 1;
		}

		.label {
			background-color: #111;
		}

		&.currentDay {
			.label {
				background-color: #390;
				font-weight: bold;
			}
		}
	}

	.progresso {
		background-color: #39fa;
		width: 100%;
		height: ${(props) => (props.value <= 0 ? 0 : `${(props.value * 100) / props.maximum}%`)};
	}

	.progressoNegative {
		background-color: #f00a;
		width: 100%;
		height: ${(props) =>
			props.value >= 0 ? 0 : `${(props.value * -1 * 100) / (props.minimum * -1)}%`};
	}

	.background {
		display: flex;
		flex-direction: column;
		background-color: transparent;
		justify-content: flex-end;
		height: 100%;
		width: 100%;
	}

	.backgroundNegative {
		display: flex;
		flex-direction: column;
		background-color: transparent;
		justify-content: flex-start;
		height: 100%;
		width: 100%;
	}

	.label {
		background-color: #333;
		color: #fff;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 30px;
		text-align: center;
		justify-content: center;
		font-size: 12px;
	}

	.value {
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		opacity: 0;
		writing-mode: vertical-lr;
		width: 30px;
		transform: translateY(14px) translateX(10px);
	}
`

export default VerticalProgressIndicatorStyle
