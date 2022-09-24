import { createContext, useState } from 'react'
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons'
import useLocalization from './useLocalization'

const MessageContext = createContext({})

export default function MessageProvider({ children }) {
	const [message, setMessage] = useState(undefined)
	const { loc } = useLocalization('commons')

	function simpleMessage({ header, text }) {
		setMessage({
			header,
			text,
		})
	}

	function choiceMessage({
		header,
		text,
		option1 = { text: loc.yes, icon: faCheck, event: () => setMessage(undefined) },
		option2 = { text: loc.no, icon: faClose, event: () => setMessage(undefined) },
	}) {
		setMessage({
			header,
			text,
			commands: [option1, option2],
		})
	}

	return (
		<MessageContext.Provider
			value={{
				message,
				setMessage,
				simpleMessage,
				choiceMessage,
			}}
		>
			{children}
		</MessageContext.Provider>
	)
}

export { MessageContext }
