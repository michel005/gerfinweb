import styled from 'styled-components'

const DisplayRowStyle = styled.div`
	display: flex;
	flex-direction: row;

	&.expand {
		flex-grow: 1;
	}

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

	@media only screen and (max-width: 700px) {
		flex-direction: ${(params) => (params.forceResponsive ? 'row' : 'column')};
	}
`

export default DisplayRowStyle
