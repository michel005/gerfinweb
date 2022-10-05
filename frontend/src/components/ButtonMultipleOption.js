import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Button from './Button'
import styled from 'styled-components'

const ButtonMultipleOptionStyle = styled.div`
	background-color: #39f;
	border-radius: 7px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: ${(props) => (props.show ? 'auto' : '34px')};
	transition: all 0.25s;

	& > .firstButton {
		display: flex;
		flex-direction: row;
		height: 34px;
		width: 100%;

		& > .primary {
			border-radius: 0;
			min-width: calc(100% - 34px);
		}

		& > .noText {
			border-radius: 0;
			text-align: center;
			padding: 0;
			height: 34px;
			min-width: 34px;
			transition: all 0.25s;

			& > svg {
				margin-left: 10px;
				rotate: ${(props) => (props.show ? '0deg' : '180deg')};
				transition: all 0.25s;
			}
		}
	}

	& > .options {
		background-color: #333c;
		backdrop-filter: blur(10px);
		border-radius: 7px;
		display: flex;
		flex-direction: column;
		opacity: ${(props) => (props.show ? 1 : 0)};
		pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
		transition: all 0.25s;
		transform: translateY(${(props) => (props.show ? '38px' : '0px')});
		position: fixed;
		overflow: hidden;

		& > button {
			border-radius: 0;
			color: #fff;
			text-align: left;
			justify-content: flex-start;
			transition: all 0.25s;

			&:hover {
				background-color: #3339;
			}
		}
	}

	@media only screen and (max-width: 700px) {
		& > .options {
			border-radius: 0;
			transform: none;
			position: relative;
		}
	}
`

export default function ButtonMultipleOption({ icon, label, event, options = [] }) {
	const [show, setShow] = useState(false)

	return (
		<ButtonMultipleOptionStyle show={show}>
			<div className={'firstButton'}>
				{event ? (
					<Button onClick={event}>
						{icon} {label}
					</Button>
				) : (
					<Button className={'primary noHover'}>
						{icon} {label}
					</Button>
				)}
				<Button className={'noText'} onClick={() => setShow(!show)}>
					<FontAwesomeIcon icon={faArrowUp} />
				</Button>
			</div>
			<div className={'options'}>
				{options.map((option, index) => {
					return (
						<Button
							key={index}
							className={'transparent'}
							onClick={() => {
								option.event()
								setShow(false)
							}}
						>
							{option.icon} {option.label}
						</Button>
					)
				})}
			</div>
		</ButtonMultipleOptionStyle>
	)
}
