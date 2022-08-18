import styled from 'styled-components'

const Button = styled.div`
	background-color: #39f;
	border: 0px solid transparent;
	border-radius: 7px;
	color: #fff;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	font-size: 14px;
	justify-content: center;
	padding: 10px 14px;
	transition: all 0.25s;

	&:hover {
		background-color: #3090f0;
	}

    svg {
        margin-top: 3px;
        margin-right: 7px;
    }

	&.transparent {
		background-color: transparent;
		color: #333;

		&:hover {
			background-color: #3331;
		}
	}
`

export default Button
