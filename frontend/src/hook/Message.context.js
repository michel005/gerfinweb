import { createContext, useState } from 'react'
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons'
import useLocalization from './useLocalization'

const MessageContext = createContext({})

export default function MessageProvider({ children }) {
	const [message, setMessage] = useState(undefined)
	const { loc } = useLocalization('commons')
	const defaultConfig = {
		style: '',
	}

	function simpleMessage({ header, text, config = defaultConfig }) {
		setMessage({
			header,
			text,
			config,
		})
	}

	function choiceMessage({
		header,
		text,
		option1 = { text: loc.yes, icon: faCheck, event: () => setMessage(undefined) },
		option2 = { text: loc.no, icon: faClose, event: () => setMessage(undefined) },
		config = defaultConfig,
	}) {
		setMessage({
			header,
			text,
			commands: [option1, option2],
			config,
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
