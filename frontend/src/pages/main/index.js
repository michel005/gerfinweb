import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import DataBasePicker from '../../components/DataBasePicker'
import { ConfigContext } from '../../hook/Config.context'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { PageContext } from '../../hook/Page.context'
import { UserContext } from '../../hook/User.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import DateUtils from '../../utils/DateUtils'
import Accounts from '../accounts'
import Dashboard from '../dashboard'
import Movements from '../movements'
import Targets from '../target'
import Templates from '../templates'
import User from '../user'
import MainStyle from './index.style'

export default function Main() {
	const { currentPage, defineCurrentPage } = useContext(PageContext)
	const { getText } = useContext(LocalizationContext)
	const { user, clearCurrentUser } = useContext(UserContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { balance, dataBase } = useContext(ConfigContext)
	const [reduced, setReduced] = useState(false)

	return (
		<MainStyle reduced={reduced}>
			<div className="menu">
				<div className="reduceButton">
					<button onClick={() => setReduced(!reduced)}>
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>
				<div className={'userInfo'}>
					<div className={'userImage'}>
						<div className={'userImageMocked'}></div>
					</div>
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
											header: getText('logout.header'),
											text: getText('logout.text'),
											option1: {
												text: getText('commons.yes'),
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
							<div className="optionContainer">
								<div className="spacer"></div>
								<button
									key={index}
									className={PageSettings[page].path === window.location.pathname ? 'active' : ''}
									onClick={() => defineCurrentPage(PageSettings[page])}
								>
									<FontAwesomeIcon icon={PageSettings[page].icon} />{' '}
									{!reduced && getText('pages.' + PageSettings[page].name + '.header.text')}
								</button>
							</div>
						)
					})}
					<div className="fullHeight"></div>
					<div className="balances">
						{new Date(new Date().getFullYear(), new Date().getMonth(), 1) >=
							new Date(dataBase.getFullYear(), dataBase.getMonth(), 1) && (
							<div className="balance">
								<div className="title">{getText('commons.current_balance')}</div>
								<div className="value">
									<div className="currency">R$</div>
									<div className="val">{CurrencyUtils.format(balance?.current).substring(3)}</div>
								</div>
							</div>
						)}
						{new Date(new Date().getFullYear(), new Date().getMonth(), 1) <=
							new Date(dataBase.getFullYear(), dataBase.getMonth(), 1) && (
							<div className="balance">
								<div className="title">{getText('commons.future_balance')}</div>
								<div className="value">
									<div className="currency">R$</div>
									<div className="val">{CurrencyUtils.format(balance?.future).substring(3)}</div>
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
									{getText('pages.' + currentPage.name + '.header.text')}
								</h1>
								<h3>{getText('pages.' + currentPage.name + '.header.lead')}</h3>
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
