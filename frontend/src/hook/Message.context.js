import { createContext, useState } from 'react'

const MessageContext = createContext({})

export default function MessageProvider({ children }) {
	const [message, setMessage] = useState(undefined)

	function simpleMessage({ header, text, confirmEvent = () => setMessage(undefined) }) {
		setMessage({
			header,
			text,
			commands: [{ text: 'Ok', event: confirmEvent }],
		})
	}

	function choiceMessage({ header, text, option1 = { text: 'Yes', event: () => setMessage(undefined) }, option2 = { text: 'No', event: () => setMessage(undefined) }}) {
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
