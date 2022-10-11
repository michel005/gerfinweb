import styled from 'styled-components'

const DataBasePickerStyle = styled.div`
	background-color: #fffc;
	border-radius: 7px;
	box-shadow: #3333 0 0 7px;
	color: #333;
	display: flex;
	flex-direction: row;
	justify-content: ${(props) => props.align};
	transition: all 0.25s;

	.button {
		width: 40px;
		height: 100%;
	}

	.button.label {
		border-radius: 0;
		text-align: center;
		width: 100%;
		transition: all 0.3s;
	}

	.left {
		border-radius: 7px 0 0 7px;
	}

	.right {
		border-radius: 0 7px 7px 0;
	}

	@media only screen and (max-width: 700px) {
		justify-content: center;
	}
`

export default DataBasePickerStyle
