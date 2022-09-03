import { useContext, useState } from 'react'
import Button from '../../components/Button'
import Field from '../../components/Field'
import API from '../../config/API'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { UserContext } from '../../hook/User.context'
import UserStyle from './index.style'

export default function User() {
	const { user, defineCurrentUser, clearCurrentUser } = useContext(UserContext)
	const { simpleMessage, setMessage } = useContext(MessageContext)
	const { getText } = useContext(LocalizationContext)
	const [fullName, setFullName] = useState(user.currentUser.fullName)
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')

	function changeFullName() {
		API.post(
			'/user/update/fullName?fullName=' + fullName,
			{},
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		)
			.then((response) => {
				defineCurrentUser({
					currentUser: response.data,
					authHeader: localStorage.getItem('authHeader'),
				})
			})
			.catch((error) => {
				simpleMessage({
					header: getText('componnents.table.update_field.header'),
					text: error.response.data[0]
						? error.response.data[0]
						: JSON.stringify(error.response.data),
				})
			})
	}

	function changePassword() {
		API.post(
			'/user/update/password',
			{
				oldPassword: oldPassword,
				newPassword: newPassword,
				passwordConfirm: passwordConfirm,
			},
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		)
			.then(() => {
				simpleMessage({
					header: 'Password change successfully!',
					text: 'You need to made login with your new password!',
					confirmEvent: () => {
						clearCurrentUser()
						setMessage(undefined)
					},
				})
			})
			.catch((error) => {
				simpleMessage({
					header: getText('pages.user.update_password.header'),
					text: error.response.data[0]
						? error.response.data[0]
						: JSON.stringify(error.response.data),
				})
			})
	}

	return (
		<UserStyle>
			<Field
				id={'fullName'}
				label={getText('pages.user.form.fullName')}
				type={'text'}
				value={fullName}
				onChange={(e) => setFullName(e.target.value)}
			/>
			<Field
				id={'email'}
				label={getText('pages.user.form.email')}
				type={'text'}
				disabled={true}
				defaultValue={user.currentUser.email}
			/>
			<div className={'commands'}>
				<Button onClick={changeFullName}>{getText('pages.user.form.changeFullNameButton')}</Button>
			</div>
			<Field
				label={getText('pages.user.form.oldPassword')}
				type={'password'}
				value={oldPassword}
				onChange={(e) => setOldPassword(e.target.value)}
			/>
			<Field
				label={getText('pages.user.form.newPassword')}
				type={'password'}
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
			/>
			<Field
				label={getText('pages.user.form.newPasswordConfirm')}
				type={'password'}
				value={passwordConfirm}
				onChange={(e) => setPasswordConfirm(e.target.value)}
			/>
			<div className={'commands'}>
				<Button onClick={changePassword}>{getText('pages.user.form.changePasswordButton')}</Button>
				<div className={'alert'}>{getText('pages.user.form.changePasswordHint')}</div>
			</div>
		</UserStyle>
	)
}
