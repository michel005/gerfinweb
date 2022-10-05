import styled from 'styled-components'

const CommandBarStyle = styled.div`
	display: flex;
	flex-direction: row;
	padding-bottom: ${(props) => (props.noPaddingBottom ? 0 : '14px')};

	& > * {
		margin-right: 7px;

		&:last-child {
			margin-right: 0;
		}
	}

	@media only screen and (max-width: 700px) {
		flex-direction: column;

		& > * {
			margin-right: 0;
			margin-bottom: 7px;

			&:last-child {
				margin-right: 0;
				margin-bottom: 0;
			}
		}
	}
`

export default function CommandBar({ children, noPaddingBottom = false }) {
	return <CommandBarStyle noPaddingBottom={noPaddingBottom}>{children}</CommandBarStyle>
}
