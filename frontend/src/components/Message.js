import { useContext } from 'react'
import { MessageContext } from '../hook/Message.context'
import Button from './Button'
import MessageStyle from './Message.styled'

export default function Message() {
	const { message } = useContext(MessageContext)

	return (
		<MessageStyle>
			<div className={'content'}>
				<div className={'header'}>{message.header}</div>
				<div className={'text'}>{message.text}</div>
				<div className={'commands'}>
					{message.commands &&
						message.commands.map((command, index) => {
							return (
								<Button key={index} onClick={command.event} className={index > 0 ? 'transparent' : ''}>
									{command.text}
								</Button>
							)
						})}
				</div>
			</div>
		</MessageStyle>
	)
}
