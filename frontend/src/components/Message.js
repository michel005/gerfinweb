import { useContext } from 'react'
import { MessageContext } from '../hook/Message.context'
import styles from './Message.module.scss'

export default function Message() {
	const { message } = useContext(MessageContext)

	return (
		<div className={styles.message}>
			<div className={styles.content}>
				<div className={styles.header}>{message.header}</div>
				<div className={styles.text}>{message.text}</div>
				<div className={styles.commands}>
                    {message.commands && message.commands.map((command, index) => {
                        return (
                            <button key={index} onClick={command.event}>{command.text}</button>
                        )
                    })}
                </div>
			</div>
		</div>
	)
}
