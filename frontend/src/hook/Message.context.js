import { createContext, useContext, useState } from 'react'
import { LocalizationContext } from './Localization.context'
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons'

const MessageContext = createContext({})

export default function MessageProvider({ children }) {
	const [message, setMessage] = useState(undefined)
	const { getText } = useContext(LocalizationContext)

	function simpleMessage({ header, text }) {
		setMessage({
			header,
			text,
		})
	}

	function choiceMessage({
		header,
		text,
		option1 = { text: getText('commons.yes'), icon: faCheck, event: () => setMessage(undefined) },
		option2 = { text: getText('commons.no'), icon: faClose, event: () => setMessage(undefined) },
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
