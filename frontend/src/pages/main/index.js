import { faBars, faCheck, faClose, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import { ConfigContext } from '../../hook/Config.context'
import { MessageContext } from '../../hook/Message.context'
import { PageContext } from '../../hook/Page.context'
import { UserContext } from '../../hook/User.context'
import Accounts from '../accounts'
import Dashboard from '../dashboard'
import Movements from '../movements'
import Targets from '../target'
import Templates from '../templates'
import User from '../user'
import MainStyle from './index.style'
import useLocalization from '../../hook/useLocalization'
import UserFallbackImage from '../../assets/user_fallback_image.png'
import { TableContext } from '../../hook/Table.context'
import { useMediaQuery } from 'react-responsive'
import Button from '../../components/Button'
import DisplayColumnStyle from '../../components/DisplayColumn.style'

export default function Main() {
	const { currentPage, defineCurrentPage } = useContext(PageContext)
	const { user, clearCurrentUser } = useContext(UserContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { setDetail, detail, reduced, setReduced } = useContext(ConfigContext)
	const { loadingMenuOptions } = useContext(TableContext)

	const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
	const [userOptions, setUserOptions] = useState(false)
	const { loc } = useLocalization('logout')
	const { loc: locPages } = useLocalization('pages')
	const { loc: locCommons } = useLocalization('commons')

	return (
		<MainStyle reduced={reduced}>
			<div className={'topBar'}>
				<div className={'title'}>
					<div className={'reduceButton'}>
						<Button
							icon={<FontAwesomeIcon icon={faBars} />}
							onClick={() => setReduced(!reduced)}
							className={'transparent noHover'}
						>
							GerFin<span className={'highlight'}>WEB</span>
						</Button>
					</div>
				</div>
				<div className={'user'}>
					<div className={'userContainer'}>
						<div className={'userImageContainer'} onClick={() => setUserOptions(!userOptions)}>
							<div className={'userInfo'}>
								<div className={'fullName'}>{user.currentUser.fullName}</div>
								<div className={'email'}>{user.currentUser.email}</div>
							</div>
							<img
								className={'userImg'}
								alt={''}
								src={
									user.currentUser.profileImage
										? 'data:image/png;base64,' + user.currentUser.profileImage
										: UserFallbackImage
								}
							/>
						</div>
						<div
							className={'userOptions'}
							style={{ opacity: userOptions ? 1 : 0, pointerEvents: userOptions ? 'auto' : 'none' }}
						>
							<button
								onClick={() => {
									defineCurrentPage(PageSettings.user)
									setUserOptions(false)
								}}
							>
								Meu Perfil
							</button>
							<button
								onClick={() => {
									choiceMessage({
										header: loc.header,
										text: loc.text,
										option1: {
											text: locCommons.yes,
											icon: faCheck,
											event: () => {
												clearCurrentUser()
												setMessage(undefined)
											},
										},
									})
									setUserOptions(false)
								}}
							>
								Logoff
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={'content'}>
				<div className={'sideBar'}>
					<div className={'line'}></div>
					{Object.keys(PageSettings).map((page, index) => {
						return (
							<Button
								key={index}
								className={PageSettings[page].path === window.location.pathname ? 'active' : ''}
								icon={
									loadingMenuOptions[page] ? (
										<FontAwesomeIcon icon={faSpinner} className={'fa-spin'} />
									) : (
										<FontAwesomeIcon icon={PageSettings[page].icon} />
									)
								}
								onClick={() => {
									defineCurrentPage({ ...PageSettings[page] })
									if (!reduced && isMobile) {
										setReduced(true)
									}
								}}
							>
								{locPages[PageSettings[page].name].header.text}
							</Button>
						)
					})}
				</div>
				<div className={'stage'}>
					{currentPage && currentPage.path === '/' && <Dashboard />}
					{currentPage && currentPage.path === '/account' && <Accounts />}
					{currentPage && currentPage.path === '/movement' && <Movements />}
					{currentPage && currentPage.path === '/template' && <Templates />}
					{currentPage && currentPage.path === '/target' && <Targets />}
					{currentPage && currentPage.path === '/user' && <User />}
				</div>
				{detail && (
					<div className={'detailPane'}>
						<div className={'closeButton'}>
							<h3>{detail.header}</h3>
							<Button
								className={'transparent'}
								onClick={() => {
									setDetail(undefined)
								}}
								icon={<FontAwesomeIcon icon={faClose} />}
							/>
						</div>
						<div className={'content'}>{detail.content}</div>
					</div>
				)}
			</div>
		</MainStyle>
	)
}
