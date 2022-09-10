import MessageStyle from './Message.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect } from 'react'
import { MessageContext } from '../hook/Message.context'

export default function Form({ header, children, commands, onClose = () => {} }) {
	const { message, setMessage } = useContext(MessageContext)

	useEffect(() => {
		const close = (e) => {
			if (e.key === 'Escape') {
				setMessage(undefined)
				onClose()
			}
		}
		window.addEventListener('keydown', close)
		return () => window.removeEventListener('keydown', close)
	}, [])

	return (
		<MessageStyle style={{ zIndex: 50 }}>
			<div className={'content'}>
				<div className={'header'}>
					<div className={'headerText'}>{header}</div>{' '}
					<FontAwesomeIcon icon={faClose} onClick={onClose} />
				</div>
				<div className={'text'}>{children}</div>
				<div className={'commands'}>{commands}</div>
			</div>
		</MessageStyle>
	)
}
