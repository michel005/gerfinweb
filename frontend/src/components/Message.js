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
					{message.icon}
					<div className={'headerText'}>{message.header}</div>{' '}
					{!message.config?.withoutClose && (
						<FontAwesomeIcon icon={faClose} onClick={() => setMessage(undefined)} />
					)}
				</div>
				<div className={'text'}>
					<div className={'field'}>{message.text}</div>
				</div>
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
