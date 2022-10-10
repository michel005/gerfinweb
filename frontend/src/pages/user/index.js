import { useContext, useState } from 'react'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Group from '../../components/Group'
import API from '../../config/API'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { UserContext } from '../../hook/User.context'
import UserStyle from './index.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClose, faPassport, faSave } from '@fortawesome/free-solid-svg-icons'
import Alert from '../../components/Alert'
import useLocalization from '../../hook/useLocalization'
import UserFallbackImage from '../../assets/user_fallback_image.png'
import url from '../../assets/url_settings.json'
import DisplayRowStyle from '../../components/DisplayRow.style'
import CommandBar from '../../components/CommandBar'

export default function User() {
	const { user, defineCurrentUser, clearCurrentUser } = useContext(UserContext)
	const { simpleMessage, setMessage, errorMessage } = useContext(MessageContext)
	const { getText } = useContext(LocalizationContext)
	const [fullName, setFullName] = useState(user.currentUser.fullName)
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [inputProfilePicture, setInputProfilePicture] = useState(null)
	const { loc } = useLocalization('pages.user')

	function changeFullName() {
		API.post(
			`${url.user.updateFullName} ${fullName}`,
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
				errorMessage({
					header: getText('componnents.table.update_field.header'),
					text: error,
				})
			})
	}

	function changePassword() {
		API.post(
			url.user.updatePassword,
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
				errorMessage({
					header: getText('pages.user.update_password.header'),
					text: error,
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
		API.post(url.user.updateImage, data, {
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
			url.user.removeImage,
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

	function ProfilePicture(image, cancelEvent, diusabled) {
		return (
			<div className={'profPic ' + (diusabled && 'disabled')}>
				<div className={'deleteImageButtonContainer'}>
					{!diusabled && (
						<div className={'innerButtonContainer'}>
							<Button
								icon={<FontAwesomeIcon icon={faClose} />}
								onClick={cancelEvent}
								className={'secondary'}
							/>
						</div>
					)}
				</div>
				<img alt={''} src={image} />
			</div>
		)
	}

	return (
		<UserStyle>
			<div className={'profilePictureGroup'}>
				<Group header={'Informações do Perfil'}>
					<div className={'profile'}>
						{ProfilePicture(
							user.currentUser.profileImage
								? 'data:image/png;base64,' + user.currentUser.profileImage
								: UserFallbackImage,
							removeProfilePicture,
							!!inputProfilePicture
						)}
						{inputProfilePicture && (
							<>
								<div className={'iconTransferContainer'}>
									<div className={'iconTransfer'}>
										<FontAwesomeIcon icon={faArrowRight} />
									</div>
								</div>
								{ProfilePicture(URL.createObjectURL(inputProfilePicture.files[0]), () => {
									document.getElementById('newPicture').value = ''
									setInputProfilePicture(null)
								})}
							</>
						)}
					</div>
					<Field
						id={'newPicture'}
						label={loc.form.profilePicture}
						type={'file'}
						defaultValue={inputProfilePicture}
						onChange={(e) => {
							setInputProfilePicture(document.getElementById('newPicture'))
						}}
					/>
					<Field
						id={'fullName'}
						label={loc.form.fullName}
						type={'text'}
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
					/>
					<Field
						id={'email'}
						label={loc.form.email}
						type={'text'}
						disabled={true}
						defaultValue={user.currentUser.email}
					/>
					<CommandBar padding={'14px 0 0 0'}>
						<Button icon={<FontAwesomeIcon icon={faSave} />} onClick={changeFullName}>
							{getText('commons.save')}
						</Button>
					</CommandBar>
				</Group>
			</div>
			<div>
				<Group header={'Alteração de senha'}>
					<Field
						label={loc.form.oldPassword}
						type={'password'}
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
					<Field
						label={loc.form.newPassword}
						type={'password'}
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<Field
						label={loc.form.newPasswordConfirm}
						type={'password'}
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
					<Alert alert={loc.update_password.tip} className={'passwordAlert'} />
					<CommandBar padding={'14px 0 0 0'}>
						<Button icon={<FontAwesomeIcon icon={faPassport} />} onClick={changePassword}>
							{loc.form.changePasswordButton}
						</Button>
						<div className={'passwordWarning'}>{loc.form.changePasswordHint}</div>
					</CommandBar>
				</Group>
			</div>
		</UserStyle>
	)
}
