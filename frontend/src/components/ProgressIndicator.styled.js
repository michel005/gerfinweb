import styled from 'styled-components'

const ProgressIndicatorStyled = styled.div`
	display: flex;
	flex-direction: column;
	transition: all 0.25s;

	* {
		transition: all 0.25s;
	}

	.label {
		color: #aaa;
		font-size: 12px;
		font-weight: bold;
		margin-bottom: 4px;
		margin-top: 14px;
	}

	.progresso {
		background-color: #39f;
		border-radius: 4px;
		height: 30px;
		max-width: ${(props) => `${(props.value * 100) / props.maximum}%`};
		margin-top: -30px;
	}

	.value {
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		font-weight: bold;
		height: 30px;
		justify-content: center;
		margin-top: -30px;
		padding-top: 4px;
	}

	.background {
		background-color: #eee;
		border-radius: 4px;
		height: 30px;
		justify-content: center;
		width: 100%;
	}
`

export default ProgressIndicatorStyled
