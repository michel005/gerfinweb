import { faBars, faCheck } from '@fortawesome/free-solid-svg-icons'
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

export default function Main() {
	const { currentPage, defineCurrentPage } = useContext(PageContext)
	const { user, clearCurrentUser } = useContext(UserContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { balance, dataBase } = useContext(ConfigContext)
	const [reduced, setReduced] = useState(false)
	const { loc } = useLocalization('logout')
	const { loc: locPages } = useLocalization('pages')
	const { loc: locCommons } = useLocalization('commons')

	return (
		<MainStyle reduced={reduced}>
			<div className="menu">
				<div className="reduceButton">
					<button onClick={() => setReduced(!reduced)}>
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>
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
									}}
								>
									Logoff
								</button>
							</div>
						</div>
					)}
				</div>
				<div className="options">
					{Object.keys(PageSettings).map((page, index) => {
						return (
							<div key={index} className="optionContainer">
								<button
									className={PageSettings[page].path === window.location.pathname ? 'active' : ''}
									onClick={() => defineCurrentPage(PageSettings[page])}
								>
									<FontAwesomeIcon icon={PageSettings[page].icon} />{' '}
									{!reduced && locPages[PageSettings[page].name].header.text}
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
										{(balance?.current < 0 ? '-' : '') +
											CurrencyUtils.format(balance?.current).substring(3)}
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
										{(balance?.future < 0 ? '-' : '') +
											CurrencyUtils.format(balance?.future).substring(3)}
									</div>
								</div>
							</div>
						)}
					</div>
					<DataBasePicker reduced={reduced} />
				</div>
			</div>
			<div className="content">
				<div className="centeredContent">
					{currentPage && (
						<div className="mainHeader">
							<div className="header">
								<h1>
									<FontAwesomeIcon icon={currentPage.icon} />{' '}
									{locPages[currentPage.name].header.text}
								</h1>
								<h3>{locPages[currentPage.name].header.lead}</h3>
							</div>
						</div>
					)}
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
}
