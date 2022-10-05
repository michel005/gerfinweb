import styled from 'styled-components'

const DataBasePickerStyle = styled.div`
	background-color: #fffc;
	border-radius: 4px;
	color: #333;
	display: flex;
	height: 34px;
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
		width: calc(100% - 68px);
		transition: all 0.3s;
	}

	button {
		background-color: transparent;
		border: none;
		height: 34px;
		flex-direction: row;
		justify-content: center;
		border-radius: 0 !important;
		transition: all 0.3s;
		width: 34px;

		&:hover {
			background-color: #3333 !important;
			color: #fff;
		}

		svg {
			margin: 0;
		}
	}
`

export default DataBasePickerStyle
