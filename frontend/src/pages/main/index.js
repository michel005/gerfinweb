import {
	faBars,
	faCheck,
	faChevronLeft,
	faChevronRight,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import DataBasePicker from '../../components/DataBasePicker'
import { ConfigContext } from '../../hook/Config.context'
import { MessageContext } from '../../hook/Message.context'
import { PageContext } from '../../hook/Page.context'
import { UserContext } from '../../hook/User.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
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
import TopBar from './topbar'
import Button from '../../components/Button'

export default function Main() {
	const { currentPage, defineCurrentPage } = useContext(PageContext)
	const { user, clearCurrentUser } = useContext(UserContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { balance, dataBase, loadingDataBase } = useContext(ConfigContext)
	const { loadingMenuOptions } = useContext(TableContext)

	const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
	const [reduced, setReduced] = useState(isMobile)
	const [userOptions, setUserOptions] = useState(false)
	const { loc } = useLocalization('logout')
	const { loc: locPages } = useLocalization('pages')
	const { loc: locCommons } = useLocalization('commons')

	return (
		<MainStyle reduced={reduced}>
			<div className={'topBar'}>
				<div className={'title'}>
					<div className={'reduceButton'}>
						<button onClick={() => setReduced(!reduced)}>
							<FontAwesomeIcon icon={faBars} />
						</button>
					</div>
					<div className={'text'}>
						<div className={'textContainer'}>
							GerFin<span className={'highlight'}>WEB</span>
						</div>
					</div>
				</div>
				<div className={'user'}>
					<div className={'userContainer'}>
						<div className={'userImageContainer'} onClick={() => setUserOptions(!userOptions)}>
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
					{Object.keys(PageSettings).map((page, index) => {
						return (
							<div
								key={index}
								className={`optionContainer ${
									PageSettings[page].path === window.location.pathname ? 'active' : ''
								}`}
								onClick={() => {
									defineCurrentPage({ ...PageSettings[page] })
									if (!reduced && isMobile) {
										setReduced(true)
									}
								}}
							>
								<button>
									{reduced ? (
										loadingMenuOptions[page] ? (
											<FontAwesomeIcon icon={faSpinner} className={'fa-spin'} />
										) : (
											<FontAwesomeIcon icon={PageSettings[page].icon} />
										)
									) : (
										<>
											<FontAwesomeIcon icon={PageSettings[page].icon} />{' '}
											{loadingMenuOptions[page] ? (
												<FontAwesomeIcon icon={faSpinner} className={'fa-spin'} />
											) : (
												locPages[PageSettings[page].name].header.text
											)}
										</>
									)}
								</button>
							</div>
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
			</div>
		</MainStyle>
	)

	return (
		<MainStyle reduced={reduced}>
			<div className="reduceButton">
				<button onClick={() => setReduced(!reduced)}>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</div>
			<div className="menu">
				<div className={'userImageContainer'}>
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
				<div className={'userInfo'}>
					{!reduced && (
						<div className={'userDescription'}>
							<div className={'userFullName'}>{user.currentUser.fullName}</div>
							<div className={'userEmail'}>{user.currentUser.email}</div>
							<div className={'commands'}>
								<button
									onClick={() => {
										defineCurrentPage(PageSettings.user)
									}}
								>
									Meu Perfil
								</button>
							</div>
						</div>
					)}
				</div>
				<div className="options">
					{Object.keys(PageSettings).map((page, index) => {
						return (
							<div
								key={index}
								className={`optionContainer ${
									PageSettings[page].path === window.location.pathname ? 'active' : ''
								}`}
							>
								<button
									onClick={() => {
										defineCurrentPage({ ...PageSettings[page] })
									}}
								>
									{reduced ? (
										loadingMenuOptions[page] ? (
											<FontAwesomeIcon icon={faSpinner} className={'fa-spin'} />
										) : (
											<FontAwesomeIcon icon={PageSettings[page].icon} />
										)
									) : (
										<>
											<FontAwesomeIcon icon={PageSettings[page].icon} />{' '}
											{loadingMenuOptions[page] ? (
												<FontAwesomeIcon icon={faSpinner} className={'fa-spin'} />
											) : (
												locPages[PageSettings[page].name].header.text
											)}
										</>
									)}
								</button>
							</div>
						)
					})}
					<div className="fullHeight"></div>
					<div className="balances">
						{new Date(new Date().getFullYear(), new Date().getMonth(), 1) >=
							new Date(dataBase.getFullYear(), dataBase.getMonth(), 1) && (
							<div className="balance">
								<div className="title">
									{new Date(new Date().getFullYear(), new Date().getMonth(), 1) >
									new Date(dataBase.getFullYear(), dataBase.getMonth(), 1)
										? locCommons.last_balance
										: locCommons.current_balance}
								</div>
								<div className="value">
									<div className="currency">R$</div>
									<div
										className={
											'val ' +
											(balance?.current < 0 ? 'negative' : balance?.current === 0 ? 'zero' : '')
										}
									>
										{loadingDataBase ? (
											<div className={'loadingBalances'}>
												<FontAwesomeIcon icon={faSpinner} className={'fa-spin'} />
											</div>
										) : (
											CurrencyUtils.format(balance?.current)
										)}
									</div>
								</div>
							</div>
						)}
						{new Date(new Date().getFullYear(), new Date().getMonth(), 1) <=
							new Date(dataBase.getFullYear(), dataBase.getMonth(), 1) && (
							<div className="balance">
								<div className="title">{locCommons.future_balance}</div>
								<div className="value">
									<div className="currency">R$</div>
									<div
										className={
											'val ' +
											(balance?.future < 0 ? 'negative' : balance?.future === 0 ? 'zero' : '')
										}
									>
										{loadingDataBase ? (
											<div className={'loadingBalances'}>
												<FontAwesomeIcon icon={faSpinner} className={'fa-spin'} />
											</div>
										) : (
											CurrencyUtils.format(balance?.future)
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="content">
				{currentPage && (
					<div className="mainHeader">
						<div className="header">
							<h1>
								<FontAwesomeIcon icon={currentPage.icon} /> {locPages[currentPage.name].header.text}
							</h1>
							<h3>{locPages[currentPage.name].header.lead}</h3>
						</div>
					</div>
				)}
				<div className="centeredContent">
					{currentPage && currentPage.path === '/' && <Dashboard />}
					{currentPage && currentPage.path === '/account' && <Accounts />}
					{currentPage && currentPage.path === '/movement' && <Movements />}
					{currentPage && currentPage.path === '/template' && <Templates />}
					{currentPage && currentPage.path === '/target' && <Targets />}
					{currentPage && currentPage.path === '/user' && <User />}
				</div>
				<DataBasePicker reduced={reduced} />
			</div>
		</MainStyle>
	)
}
