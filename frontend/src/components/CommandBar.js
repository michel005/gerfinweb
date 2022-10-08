import styled from 'styled-components'

const CommandBarStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding-left: ${(props) => (props.paddingLeftRight ? '14px' : '0')};
	padding-right: ${(props) => (props.paddingLeftRight ? '14px' : '0')};
	padding-bottom: ${(props) => (props.noPaddingBottom ? 0 : '14px')};

	& > * {
		margin-right: 7px;

		&:last-child {
			margin-right: 0;
		}
	}

	@media only screen and (max-width: 700px) {
		flex-direction: column;
		width: 100%;
		position: ${(props) => (props.fixedInBottom ? 'fixed' : 'relative')};
		bottom: ${(props) => (props.fixedInBottom ? '0' : 'auto')};
		left: ${(props) => (props.fixedInBottom ? '0' : 'auto')};
		padding: ${(props) =>
			props.fixedInBottom ? '14px' : props.noPaddingBottom ? 0 : '0 0 14px 0'};

		& > * {
			margin-right: 0;
			margin-bottom: 7px;
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
	noPaddingBottom = false,
	paddingLeftRight = false,
	fixedInBottom = false,
}) {
	return (
		<CommandBarStyle
			fixedInBottom={fixedInBottom}
			noPaddingBottom={noPaddingBottom}
			paddingLeftRight={paddingLeftRight}
		>
			{children}
		</CommandBarStyle>
	)
}
