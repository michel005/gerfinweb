import { useContext, useState } from 'react'
import ProfileImage from '../../assets/profile.jpg'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Group from '../../components/Group'
import API from '../../config/API'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { UserContext } from '../../hook/User.context'
import UserStyle from './index.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowRight,
	faClose,
	faImage,
	faPassport,
	faSave,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import Alert from '../../components/Alert'
import useLocalization from '../../hook/useLocalization'

export default function User() {
	const { user, defineCurrentUser, clearCurrentUser } = useContext(UserContext)
	const { simpleMessage, setMessage } = useContext(MessageContext)
	const { getText } = useContext(LocalizationContext)
	const [fullName, setFullName] = useState(user.currentUser.fullName)
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [inputProfilePicture, setInputProfilePicture] = useState(null)
	const { loc } = useLocalization('pages.user')

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
				if (inputProfilePicture) {
					changeProfilePicture()
				}
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

	function changeProfilePicture() {
		let data = new FormData()
		data.append(
			'image',
			document.getElementById('newPicture').files[0],
			document.getElementById('newPicture').value
		)
		API.post('/user/update/image', data, {
			headers: {
				Authorization: localStorage.getItem('authHeader'),
			},
		}).then((response) => {
			defineCurrentUser({
				currentUser: response.data,
				authHeader: localStorage.getItem('authHeader'),
			})
			document.getElementById('newPicture').value = ''
			setInputProfilePicture(null)
		})
	}

	function removeProfilePicture() {
		API.post(
			'/user/remove/image',
			{},
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		).then((response) => {
			defineCurrentUser({
				currentUser: response.data,
				authHeader: localStorage.getItem('authHeader'),
			})
			document.getElementById('newPicture').value = ''
			setInputProfilePicture(null)
		})
	}

	return (
		<UserStyle>
			<div className={'horizontalGroup'}>
				<div className={'verticalGroup profilePictureGroup'}>
					<Group header={'Informações do Perfil'}>
						<div className={'profile'}>
							<div className={'profPic'} style={{ opacity: inputProfilePicture ? 0.5 : 1 }}>
								<div className={'profilePicture'}>
									<img
										width={'150px'}
										height={'150px'}
										src={'data:image/png;base64,' + user.currentUser.profileImage}
									/>
								</div>
								<div className={'deleteImageButtonContainer'}>
									<div className={'deleteImageButton'} onClick={removeProfilePicture}>
										<FontAwesomeIcon icon={faClose} />
									</div>
								</div>
							</div>
							{inputProfilePicture && (
								<>
									<div className={'iconTransferContainer'}>
										<div className={'iconTransfer'}>
											<FontAwesomeIcon icon={faArrowRight} />
										</div>
									</div>
									<div className={'profPic'}>
										<div className={'profilePicture'}>
											<img
												width={'150px'}
												height={'150px'}
												src={URL.createObjectURL(inputProfilePicture.files[0])}
											/>
										</div>
										<div className={'deleteImageButtonContainer'}>
											<div
												className={'deleteImageButton'}
												onClick={() => {
													document.getElementById('newPicture').value = ''
													setInputProfilePicture(null)
												}}
											>
												<FontAwesomeIcon icon={faClose} />
											</div>
										</div>
									</div>
								</>
							)}
						</div>
						<Field
							id={'newPicture'}
							label={getText('pages.user.form.profilePicture')}
							type={'file'}
							defaultValue={inputProfilePicture}
							onChange={(e) => {
								setInputProfilePicture(document.getElementById('newPicture'))
							}}
						/>
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
							<Button onClick={changeFullName}>
								<FontAwesomeIcon icon={faSave} /> {getText('commons.save')}
							</Button>
						</div>
					</Group>
				</div>
				<div>
					<Group header={'Alteração de senha'}>
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
						<Alert alert={loc.update_password.tip} className={'passwordAlert'} />
						<div className={'commands'}>
							<Button onClick={changePassword}>
								<FontAwesomeIcon icon={faPassport} />{' '}
								{getText('pages.user.form.changePasswordButton')}
							</Button>
							<div className={'alert'}>{getText('pages.user.form.changePasswordHint')}</div>
						</div>
					</Group>
				</div>
			</div>
		</UserStyle>
	)
}
