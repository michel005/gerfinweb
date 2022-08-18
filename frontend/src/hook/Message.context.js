import { createContext, useContext, useState } from 'react'
import { LocalizationContext } from './Localization.context'

const MessageContext = createContext({})

export default function MessageProvider({ children }) {
	const [message, setMessage] = useState(undefined)
	const { getText } = useContext(LocalizationContext)

	function simpleMessage({ header, text, confirmEvent = () => setMessage(undefined) }) {
		setMessage({
			header,
			text,
			commands: [{ text: getText('commons.confirm'), event: confirmEvent }],
		})
	}

	function choiceMessage({
		header,
		text,
		option1 = { text: getText('commons.yes'), event: () => setMessage(undefined) },
		option2 = { text: getText('commons.no'), event: () => setMessage(undefined) },
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
