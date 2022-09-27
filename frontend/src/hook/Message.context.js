import { createContext, useState } from 'react'
import { faCheck, faClose, faExclamation } from '@fortawesome/free-solid-svg-icons'
import useLocalization from './useLocalization'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
		icon,
		header,
		text,
		option1 = { text: loc.yes, icon: faCheck, event: () => setMessage(undefined) },
		option2 = { text: loc.no, icon: faClose, event: () => setMessage(undefined) },
		config = defaultConfig,
	}) {
		setMessage({
			icon,
			header,
			text,
			commands: [option1, option2],
			config,
		})
	}

	function errorMessage({ header, text }) {
		setMessage({
			icon: <FontAwesomeIcon icon={faExclamation} />,
			header,
			text,
			config: {
				style: 'red',
			},
		})
	}

	return (
		<MessageContext.Provider
			value={{
				message,
				setMessage,
				simpleMessage,
				choiceMessage,
				errorMessage,
			}}
		>
			{children}
		</MessageContext.Provider>
	)
}

export { MessageContext }
