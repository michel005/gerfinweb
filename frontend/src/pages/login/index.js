import API from '../../config/API'
import { Buffer } from 'buffer'
import styles from './index.module.scss'
import { useContext, useState } from 'react'
import { MessageContext } from '../../hook/Message.context'
import { UserContext } from '../../hook/User.context'
import Field from '../../components/Field'

export default function LoginPage() {
	const [showCreateAccount, setShowCreateAccount] = useState(false)
	const { simpleMessage } = useContext(MessageContext)
	const { defineCurrentUser } = useContext(UserContext)

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
			})
			.catch((error) => {
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
		<>
			{showCreateAccount === true ? (
				<div className={styles.createAccountPage}>
					<div className={styles.header}>CREATE USER ACCOUNT</div>

					<Field id="fullName" label="Full name" type="text" />

					<Field id="email" label="Email" type="text" />

					<Field id="password" label="Password" type="password" />

					<Field id="passwordConfirm" label="Password Confirmation" type="password" />

					<div className={styles.commandBar}>
						<button onClick={onClick_CreateUser}>Create User</button>
						<button onClick={onClick_ShowLogin} className={styles.transparent}>
							Login
						</button>
					</div>
				</div>
			) : (
				<div className={styles.loginPage}>
					<div className={styles.header}>LOGIN</div>

					<Field id="email" label="Email" type="text" />

					<Field id="password" label="Password" type="password" />

					<div className={styles.commandBar}>
						<button onClick={onClick_Login}>Login</button>
						<button onClick={onClick_ShowCreateUser} className={styles.transparent}>
							Create user
						</button>
					</div>
				</div>
			)}
		</>
	)
}
