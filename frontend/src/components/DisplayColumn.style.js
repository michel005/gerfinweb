import styled from 'styled-components'

const DisplayColumnStyle = styled.div`
	display: flex;
	flex-direction: column;

	.field {
		margin-bottom: 14px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	& > div {
		flex-grow: 1;
		height: 100%;
	}
`

export default DisplayColumnStyle
