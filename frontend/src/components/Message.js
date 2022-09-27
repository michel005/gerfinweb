import { useContext } from 'react'
import { MessageContext } from '../hook/Message.context'
import Button from './Button'
import MessageStyle from './Message.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function Message() {
	const { message, setMessage } = useContext(MessageContext)

	return (
		<MessageStyle>
			<div className={'content ' + message.config?.style}>
				<div className={'header'}>
					<div className={'headerText'}>{message.header}</div>{' '}
					<FontAwesomeIcon icon={faClose} onClick={() => setMessage(undefined)} />
				</div>
				<div className={'text'}>{message.text}</div>
				{message.commands && (
					<div className={'commands'}>
						{message.commands &&
							message.commands.map((command, index) => {
								return (
									<Button
										key={index}
										onClick={command.event}
										className={index > 0 ? 'transparent' : ''}
									>
										{command && <FontAwesomeIcon icon={command.icon} />} {command.text}
									</Button>
								)
							})}
					</div>
				)}
			</div>
		</MessageStyle>
	)
}
