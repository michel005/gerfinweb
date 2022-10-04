import styled from 'styled-components'

const ButtonStyle = styled.button`
	background-color: #39f;
	border: 0 solid transparent;
	border-radius: 7px;
	color: #fff;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	font-size: 14px;
	justify-content: center;
	padding: 7px 14px 8px;
	transition: all 0.25s;

	&:hover {
		background-color: #3090f0;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.3;

		&:hover {
			background-color: #39f;
		}
	}

	svg {
		margin-top: 2.5px;
		margin-right: 7px;
	}

	&.noPadding {
		padding: 4px 7px;
	}

	&.noText {
		display: flex;
		flex-direction: column;
		justify-content: center;

		svg {
			margin: 0;
		}
	}

	&.transparent {
		background-color: transparent;
		color: #333;

		&:hover {
			background-color: #fffc;
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

export default function Button(props) {
	return (
		<ButtonStyle {...props} className={props.className ? props.className : 'primary'}></ButtonStyle>
	)
}
