import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Button from './Button'
import styled from 'styled-components'

const ButtonMultipleOptionStyle = styled.div`
	background-color: #39f;
	border-radius: 7px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	transition: all 0.25s;

	& > .firstButton {
		display: flex;
		flex-direction: row;
		width: 100%;

		& > .primary {
			border-radius: 0;
			min-width: calc(100% - 34px);

			& > .buttonContent {
				display: flex;
				width: 100%;
				flex-grow: 1;
			}
		}

		& > .noText {
			border-radius: 0;
			text-align: center;
			padding: 0;
			min-width: 34px;
			transition: all 0.25s;

			svg {
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
		overflow-x: hidden;
		overflow-y: auto;
		max-height: 200px;

		::-webkit-scrollbar {
			width: 10px;
		}

		::-webkit-scrollbar-track {
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
			background: #3333;
		}

		::-webkit-scrollbar-thumb {
			border-radius: 5px;
			background: #888;

			&:hover {
				background: #fff3;
			}
		}

		& > .button {
			pointer-events: ${(props) => (props.show ? 'auto' : 'none')};

			.buttonIcon,
			.buttonContent {
				color: #fff;
			}
			.buttonContent {
				text-align: left;
			}
		}
	}

	@media only screen and (max-width: 700px) {
		& > .options {
			border-radius: 0;
			transform: none;
			position: relative;
			display: ${(props) => (props.show ? 'flex' : 'none')};
		}
	}
`

export default function ButtonMultipleOption({ icon, label, event, options = [] }) {
	const [show, setShow] = useState(false)

	return (
		<ButtonMultipleOptionStyle show={show}>
			<div className={'firstButton'}>
				{event ? (
					<Button className={'primary'} onClick={event} icon={icon}>
						{label}
					</Button>
				) : (
					<Button className={'primary noHover'} icon={icon}>
						{label}
					</Button>
				)}
				<Button
					className={'noText'}
					onClick={() => setShow(!show)}
					icon={<FontAwesomeIcon icon={faChevronUp} />}
				/>
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
							icon={option.icon}
						>
							{option.label}
						</Button>
					)
				})}
			</div>
		</ButtonMultipleOptionStyle>
	)
}
