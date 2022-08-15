import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import { ConfigContext } from '../../hook/Config.context'
import { MessageContext } from '../../hook/Message.context'
import { PageContext } from '../../hook/Page.context'
import { UserContext } from '../../hook/User.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import styles from './index.module.scss'

export default function Main() {
	const [reduced, setReduced] = useState(localStorage.getItem('reduced') === 'true')
	const { clearCurrentUser } = useContext(UserContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { user } = useContext(UserContext)
	const { currentPage, defineCurrentPage } = useContext(PageContext)
	const { balance, formatedDataBase, previewMonth, nextMonth } = useContext(ConfigContext)

	function onClick_ReduceButton() {
		setReduced(!reduced)
	}

	function MenuOption(
		{
			text,
			lead,
			path,
			icon,
			event = () => {
				defineCurrentPage({
					text,
					lead,
					path,
				})
			},
		},
		index
	) {
		let modifiedEvent = event
		if (text === 'Logout') {
			modifiedEvent = () => {
				choiceMessage({
					header: 'Do you realy want to leave?',
					text: 'You are gonna lose all your unsaved data!',
					option1: {
						text: 'Yes',
						event: () => {
							clearCurrentUser()
							setMessage(undefined)
						},
					},
				})
			}
		}

		return (
			<button
				key={index}
				onClick={modifiedEvent}
				className={window.location.pathname === path ? styles.active : ''}
			>
				<div className={styles.icon}>
					<FontAwesomeIcon icon={icon} />
				</div>
				<span className={styles.text}>{text}</span>
			</button>
		)
	}

	useEffect(() => {
		localStorage.setItem('reduced', reduced)
	}, [reduced])

	return (
		<div className={styles.main}>
			<div className={styles.menu + ' ' + (reduced && styles.reduced)}>
				<div className={styles.reduceButton}>
					<button onClick={onClick_ReduceButton}>
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>
				<div className={styles.userInfo}>
					<div className={styles.user}>
						<FontAwesomeIcon icon={faUser} />
					</div>
					<div className={styles.details}>
						<div className={styles.fullName}>{user.currentUser.fullName}</div>
						<div className={styles.email}>{user.currentUser.email}</div>
					</div>
				</div>
				<div className={styles.menuOptions}>
					{Object.keys(PageSettings).map((value, index) => {
						return MenuOption(PageSettings[value], index)
					})}
				</div>
				<div className={styles.space}></div>
				<div className={styles.month}>
					<button onClick={previewMonth}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</button>
					<div className={styles.dataBase}>{formatedDataBase().substr(3)}</div>
					<button onClick={nextMonth}>
						<FontAwesomeIcon icon={faAngleRight} />
					</button>
				</div>
				{balance && (
					<div className={styles.balances}>
						<div className={styles.group}>
							<div className={styles.title}>Current</div>
							<div className={styles.value}>
								<div className={styles.currency}>R$</div>
								<div className={styles.balance}>
									{CurrencyUtils.format(balance.current).replace('R$', '')}
								</div>
							</div>
						</div>
						<div className={styles.group}>
							<div className={styles.title}>Future</div>
							<div className={styles.value}>
								<div className={styles.currency}>R$</div>
								<div className={styles.balance}>
									{CurrencyUtils.format(balance.future).replace('R$', '')}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className={styles.content}>
				{currentPage && (
					<>
						<div>
							<h1>{currentPage.text}</h1>
							<h3>{currentPage.lead}</h3>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
