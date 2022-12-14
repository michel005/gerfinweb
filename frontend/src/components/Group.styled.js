import styled from 'styled-components'

const GroupStyled = styled.div`
	background-color: #fffc;
	border-radius: 7px;
	box-shadow: #3333 0 0 7px;
	display: flex;
	flex-direction: column;
	padding: 21px;

	.title {
		font-size: 18px;
		font-weight: bold;
		padding-bottom: 14px;
		width: 100%;
	}

	.groupContent {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	@media only screen and (max-width: 700px) {
		.groupContent {
			overflow-x: auto;
		}
	}
`

export default GroupStyled
