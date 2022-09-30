import styled from 'styled-components'

const DataBasePickerStyle = styled.div`
	background-color: ${(props) => (props.reduced ? '#3336' : 'transparent')};
	backdrop-filter: ${(props) => (props.reduced ? 'blur(15px)' : 'none')};
	box-shadow: ${(props) => (props.reduced ? '#aaa9 0 0 7px' : 'none')};
	border-radius: 4px;
	color: ${(props) => (props.reduced ? '#fff' : '#333')};
	display: flex;
	flex-direction: row;
	margin: 0 14px;
	bottom: ${(props) => (props.reduced ? '199px' : 'auto')};
	transform: ${(props) => (props.reduced ? 'translateX(-166px)' : 'none')};
	width: 202px;
	transition: all 0.25s;
	min-height: 44px;
	overflow: hidden;

	&:hover {
		transform: ${(props) => (props.reduced ? 'translateX(0)' : 'none')};
	}

	.label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		padding: 0 14px;
		width: 100%;
		transition: all 0.3s;
	}

	button {
		color: ${(props) => (props.reduced ? '#fff' : '#333')};
		height: 100%;
		flex-direction: column;
		justify-content: center;
		border-radius: 0 !important;
		padding: 14px;
		transition: all 0.3s;

		&:hover {
			background-color: #fff3 !important;
			color: ${(props) => (props.reduced ? '#fff' : '#39f')};
		}

		svg {
			color: ${(props) => (props.reduced ? '#fff' : '#333')};
			margin-right: 0;
		}
	}

	@media only screen and (max-width: 1000px) {
		width: calc(100% - 28px);
	}
`

export default DataBasePickerStyle
