import styled from 'styled-components'

const DataBasePickerStyle = styled.div`
	background-color: ${(props) => (props.reduced ? '#3333' : '#fff3')};
	backdrop-filter: ${(props) => (props.reduced ? 'blur(15px)' : 'none')};
	box-shadow: ${(props) => (props.reduced ? '#aaa9 0 0 7px' : 'none')};
	border-radius: 4px;
	color: #fff;
	display: flex;
	flex-direction: row;
	margin: 0 14px;
	position: ${(props) => (props.reduced ? 'fixed' : 'relative')};
	bottom: ${(props) => (props.reduced ? '199px' : 'auto')};
	transform: ${(props) =>
		props.reduced ? 'rotate(-90deg) translateY(-64px) translateX(62px)' : 'none'};
	left: ${(props) => (props.reduced ? '0' : 'auto')};
	width: 204px;
	width: ${(props) => (props.reduced ? 'auto' : '204px')};
	transition: all 0.3s;

	.label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		padding: 0 14px;
		width: 100%;
	}

	button {
		padding: 0;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		border-radius: 4px 0 0 4px;
		padding: 14px;

		&:last-child {
			border-radius: 0 4px 4px 0;
		}

		svg {
			color: #fff;
			margin-right: 0px;
		}
	}
`

export default DataBasePickerStyle
