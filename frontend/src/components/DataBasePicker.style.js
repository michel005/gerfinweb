import styled from 'styled-components'

const DataBasePickerStyle = styled.div`
	background-color: #fffc;
	border-radius: 7px;
	box-shadow: #3333 0 0 7px;
	color: #333;
	display: flex;
	flex-direction: row;
	transition: all 0.25s;
	overflow: hidden;

	.label {
		color: #333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		font-size: 14px;
		padding: 0 14px;
		width: 100%;
		transition: all 0.3s;
	}

	.button {
		width: 40px;
		height: 100%;
	}

	.left {
		border-radius: 7px 0 0 7px;
	}

	.right {
		border-radius: 0 7px 7px 0;
	}
`

export default DataBasePickerStyle
