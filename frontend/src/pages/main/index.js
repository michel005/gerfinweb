import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import PageSettings from '../../assets/page.settings'
import { ConfigContext } from '../../hook/Config.context'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { PageContext } from '../../hook/Page.context'
import { UserContext } from '../../hook/User.context'
import DateUtils from '../../utils/DateUtils'
import Accounts from '../accounts'
import Dashboard from '../dashboard'
import Movements from '../movements'
import Targets from '../target'
import Templates from '../templates'
import User from '../user'
import MainStyle from './index.style'

export default function Main() {
	const { clearCurrentUser, user } = useContext(UserContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { currentPage, defineCurrentPage } = useContext(PageContext)
	const { getText } = useContext(LocalizationContext)
	const { formatedDataBase, previewMonth, nextMonth, setDataBase, dataBase } =
		useContext(ConfigContext)
	const months = DateUtils.allMonthValues()

	return (
		<MainStyle>
			<div className="menu">
				<div className="centeredMenu">
					<div className="topDivision">
						<div className="appName">GerFinWEB</div>
						<div className="options">
							{Object.keys(PageSettings).map((page, index) => {
								return (
									<div className="optionContainer">
										<button
											key={index}
											className={
												PageSettings[page].path === window.location.pathname ? 'active' : ''
											}
											onClick={() => defineCurrentPage(PageSettings[page])}
										>
											{getText('pages.' + PageSettings[page].name + '.header.text')}
										</button>
									</div>
								)
							})}
						</div>
						<div className="userInfo">
							<div className="details">
								<div className="fullName">{user.currentUser.fullName}</div>
								<div className="commands">
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
						</div>
					</div>
				</div>
			</div>
			<div className="monthController">
                <div className="allMonths">
                    <div className='month dark'>DATA BASE</div>
                </div>
				<div className="allMonths">
					{Object.keys(months).map((month, index) => {
						return (
							<div
								key={index}
								className={
									'month ' + (dataBase.getMonth() + 1 === parseInt(month) ? 'currentMonth' : '')
								}
								onClick={() => {
									setDataBase(new Date(dataBase.getFullYear(), month - 1, 1))
								}}
							>
								{months[month].toUpperCase().substring(0, 3)}
							</div>
						)
					})}
				</div>
				<button
					onClick={() => {
						setDataBase(new Date(dataBase.getFullYear() - 1, dataBase.getMonth(), 1))
					}}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
				<div className="allMonths">
					<div className="month">{formatedDataBase().substr(6)}</div>
				</div>
				<button
					onClick={() => {
						setDataBase(new Date(dataBase.getFullYear() + 1, dataBase.getMonth(), 1))
					}}
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</button>
			</div>
			<div className="content">
				<div className="centeredContent">
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
