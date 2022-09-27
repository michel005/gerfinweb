import MessageStyle from './Message.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function Form({ icon, header, children, commands, onClose = () => {} }) {
	return (
		<MessageStyle style={{ zIndex: 50 }}>
			<div className={'content'}>
				<div className={'header'}>
					{icon}
					<div className={'headerText'}>{header}</div>{' '}
					<FontAwesomeIcon icon={faClose} onClick={onClose} />
				</div>
				<div className={'text'}>{children}</div>
				<div className={'commands'}>{commands}</div>
			</div>
		</MessageStyle>
	)
}
