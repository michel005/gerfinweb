import LoginPage from './pages/login/index'
import styles from './App.module.scss'
import Message from './components/Message'
import { useContext } from 'react'
import { MessageContext } from './hook/Message.context'
import { UserContext } from './hook/User.context'
import Main from './pages/main'

function App() {
	const { message } = useContext(MessageContext)
	const { user } = useContext(UserContext)

	return (
		<>
			<div className={styles.background}></div>
			{!user && <LoginPage />}
			{user && <Main />}
			{message && <Message message={message} />}
		</>
	)
}

export default App

