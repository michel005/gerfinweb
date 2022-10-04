import styled from 'styled-components'

const DataBasePickerStyle = styled.div`
	background-color: #3339;
	border-radius: 4px;
	color: #333;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	margin: 0 14px;
	transition: all 0.25s;
	position: fixed;
	right: 0;
	bottom: 14px;
	z-index: 100;

	.label {
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		padding: 0 14px;
		width: 100%;
		transition: all 0.3s;
	}

	button {
		height: 100%;
		flex-direction: column;
		justify-content: center;
		border-radius: 0 !important;
		padding: 14px;
		transition: all 0.3s;

		&:hover {
			background-color: #fff3 !important;
			color: #39f;
		}

		svg {
			color: #fff;
			margin-right: 0;
		}
	}

	@media only screen and (max-width: 1000px) {
		width: calc(100% - 28px);
	}
`

export default DataBasePickerStyle
