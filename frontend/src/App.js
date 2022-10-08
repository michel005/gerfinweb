import LoginPage from './pages/login/index'
import Message from './components/Message'
import { useContext } from 'react'
import { MessageContext } from './hook/Message.context'
import { UserContext } from './hook/User.context'
import Main from './pages/main'
import AccountForm from './pages/accounts/form'
import { ConfigContext } from './hook/Config.context'
import MovementForm from './pages/movements/form'
import { LocalizationContext } from './hook/Localization.context'
import TransferForm from './pages/movements/transferForm'
import TargetForm from './pages/target/form'
import TemplateForm from './pages/templates/form'
import AdjustBalanceForm from './pages/accounts/adjustBalanceForm'

function App() {
	const { message } = useContext(MessageContext)
	const { user } = useContext(UserContext)
	const { showForm } = useContext(ConfigContext)
	const { getText } = useContext(LocalizationContext)

	return (
		<>
			{!user && <LoginPage />}
			{user && <Main />}
			{user && showForm.account && <AccountForm />}
			{user && showForm.movement && <MovementForm />}
			{user && showForm.transfer && <TransferForm />}
			{user && showForm.target && <TargetForm />}
			{user && showForm.template && <TemplateForm />}
			{user && showForm.adjustBalance && <AdjustBalanceForm />}
			{message && <Message message={message} />}
		</>
	)
}

export default App
