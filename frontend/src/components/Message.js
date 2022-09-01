import { useContext } from 'react'
import { MessageContext } from '../hook/Message.context'
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
								<button key={index} onClick={command.event}>
									{command.text}
								</button>
							)
						})}
				</div>
			</div>
		</MessageStyle>
	)
}
