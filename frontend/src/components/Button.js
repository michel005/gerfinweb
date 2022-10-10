import styled from 'styled-components'

const ButtonStyle = styled.div`
	background-color: #39f;
	border: 0 solid transparent;
	border-radius: 7px;
	color: #fff;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	font-size: 14px;
	justify-content: center;
	padding: 10px 14px;
	transition: all 0.25s;
	opacity: ${(params) => (params.disabled ? 0.5 : 1)};
	pointer-events: ${(params) => (params.disabled ? 'none' : 'auto')};

	&:hover {
		background-color: #39fc;
	}

	& > .buttonIcon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: ${(props) => (props.hasContent ? '10px' : '0')};
	}

	& > .buttonContent {
		width: 100%;
	}

	&.primery.noHover {
		&:hover {
			background-color: #39f;
		}
	}

	&.transparent {
		background-color: transparent;
		color: #333;

		&:hover {
			background-color: #3333;
		}

		&.noHover {
			&:hover {
				background-color: transparent;
			}
		}
	}

	&.secondary {
		background-color: #333;
		color: #fff;

		&:hover {
			background-color: #444;
		}
	}

	&.alert {
		background-color: #ff1d1d;
		color: #fff;

		&:hover {
			background-color: #ff4f4f;
		}
	}
`

export default function Button({ disabled, icon, children, className, onClick }) {
	return (
		<ButtonStyle
			hasIcon={!!icon}
			hasContent={!!children}
			disabled={disabled}
			className={`button ${className}`}
			onClick={onClick}
		>
			{icon && <div className={'buttonIcon'}>{icon}</div>}
			{children && <div className={'buttonContent'}>{children}</div>}
		</ButtonStyle>
	)
}
