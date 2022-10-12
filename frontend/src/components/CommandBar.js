import styled from 'styled-components'

const CommandBarStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: ${(props) => (props.center ? 'center' : 'flex-start')};
	padding: ${(props) => props.padding};
	gap: 7px;

	@media only screen and (max-width: 700px) {
		flex-direction: column;
		width: 100%;
		position: ${(props) => (props.fixedInBottom ? 'fixed' : 'relative')};
		bottom: ${(props) => (props.fixedInBottom ? '0' : 'auto')};
		left: ${(props) => (props.fixedInBottom ? '0' : 'auto')};
		padding: ${(props) => props.padding};

		& > * {
			width: 100%;

			&:last-child {
				margin-right: 0;
				margin-bottom: 0;
			}
		}
	}
`

export default function CommandBar({
	children,
	center = false,
	fixedInBottom = false,
	padding = '14px',
}) {
	return (
		<CommandBarStyle center={center} fixedInBottom={fixedInBottom} padding={padding}>
			{children}
		</CommandBarStyle>
	)
}
