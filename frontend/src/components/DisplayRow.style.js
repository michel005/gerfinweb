import styled from 'styled-components'

const DisplayRowStyle = styled.div`
	display: flex;
	flex-direction: row;

	.field {
		margin-right: 14px;

		&:last-child {
			margin-right: 0;
		}
	}

	& > div {
		flex-grow: 1;
		width: 100%;
	}
`

export default DisplayRowStyle
