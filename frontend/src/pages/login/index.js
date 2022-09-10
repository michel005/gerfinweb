import API from '../../config/API'
import { Buffer } from 'buffer'
import { useContext, useState } from 'react'
import { MessageContext } from '../../hook/Message.context'
import { UserContext } from '../../hook/User.context'
import { PageContext } from '../../hook/Page.context'
import Field from '../../components/Field'
import Button from '../../components/Button'
import PageSettings from '../../assets/page.settings'
import LoginStyle from './index.style'

export default function LoginPage() {
	const [showCreateAccount, setShowCreateAccount] = useState(false)
	const { simpleMessage } = useContext(MessageContext)
	const { defineCurrentUser } = useContext(UserContext)
	const { defineCurrentPage } = useContext(PageContext)

	function onClick_Login() {
		let authHeader =
			'Basic ' +
			Buffer.from(
				document.getElementById('email').value + ':' + document.getElementById('password').value
			).toString('base64')
		API.get('/user/me', {
			headers: {
				Authorization: authHeader,
			},
		})
			.then((response) => {
				defineCurrentUser({
					currentUser: response.data,
					authHeader: authHeader,
				})
				defineCurrentPage(PageSettings.dashboard)
			})
			.catch(() => {
				simpleMessage({ header: 'Error on login!', text: 'User or password was not valid!' })
			})
	}

	function onClick_CreateUser() {
		API.post('/user/create', {
			fullName: document.getElementById('fullName').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
			passwordConfirm: document.getElementById('passwordConfirm').value,
		})
			.then((response) => {
				alert('User created with success!')
				onClick_ShowLogin()
			})
			.catch((error) => {
				simpleMessage({ header: 'Error on user creation!', text: error.response.data[0] })
			})
	}

	function onClick_ShowCreateUser() {
		setShowCreateAccount(true)
	}

	function onClick_ShowLogin() {
		setShowCreateAccount(false)
	}

	return (
		<LoginStyle>
			{showCreateAccount === true ? (
				<div className={'createAccountPage'}>
					<div className={'header'}>CREATE USER ACCOUNT</div>

					<div className={'fields'}>
						<Field id="fullName" label="Full name" type="text" />

						<Field id="email" label="Email" type="text" />

						<Field id="password" label="Password" type="password" />

						<Field id="passwordConfirm" label="Password Confirmation" type="password" />
					</div>

					<div className={'commandBar'}>
						<Button onClick={onClick_CreateUser}>Create User</Button>
						<Button onClick={onClick_ShowLogin} className={'transparent'}>
							Login
						</Button>
					</div>
				</div>
			) : (
				<div className={'loginPage'}>
					<div className={'header'}>LOGIN</div>

					<div className={'fields'}>
						<Field id="email" label="Email" type="text" />

						<Field id="password" label="Password" type="password" />
					</div>

					<div className={'commandBar'}>
						<Button onClick={onClick_Login}>Login</Button>
						<Button onClick={onClick_ShowCreateUser} className={'transparent'}>
							Create user
						</Button>
					</div>
				</div>
			)}
		</LoginStyle>
	)
}
