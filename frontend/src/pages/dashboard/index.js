import { useContext, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import Group from '../../components/Group'
import ProgressIndicator from '../../components/ProgressIndicator'
import VerticalProgressIndicator from '../../components/VerticalProgressIndicator'
import { ConfigContext } from '../../hook/Config.context'
import { PageContext } from '../../hook/Page.context'
import { TableContext } from '../../hook/Table.context'
import useLocalization from '../../hook/useLocalization'
import { UserContext } from '../../hook/User.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import DateUtils from '../../utils/DateUtils'
import styles from './index.module.scss'

export default function Dashboard() {
	const { aditionalInformation } = useContext(TableContext)
	const { user } = useContext(UserContext)
	const { defineCurrentPage } = useContext(PageContext)
	const { balance, dataBase } = useContext(ConfigContext)
	const { loc } = useLocalization('pages.dashboard')

	return (
		<div className={styles.dashboard}>
			<h1>Bem vindo, {user.currentUser.fullName}</h1>
			<div className={styles.scroll}>
				{aditionalInformation.dashboard && (
					<div className={styles.groups}>
						<Group header={loc.current_balance}>
							{balance && CurrencyUtils.format(balance.current)}
						</Group>
						<Group header={loc.future_balance}>
							{balance && CurrencyUtils.format(balance.future)}
						</Group>
						<Group header={loc.unfinished_targets}>
							{aditionalInformation.dashboard.targets.length}
						</Group>
						<Group header={loc.pendent_movements}>
							{aditionalInformation.dashboard &&
								aditionalInformation.dashboard.pendentMovements.totalElements}
						</Group>
					</div>
				)}
				<div className={styles.groups}>
					{aditionalInformation.dashboard.targets &&
						aditionalInformation.dashboard.targets
							.filter((v, index) => index <= 4)
							.map((target, index) => {
								let account =
									target.account === null
										? null
										: aditionalInformation.dashboard.accounts.filter(
												(value) => value.account.id === target.account.id
										  )[0]
								let lastDayOfCurrentDate = DateUtils.stringToDate(
									DateUtils.lastDayOfMonth(new Date()) +
										'/' +
										DateUtils.stringJustDate(new Date()).substring(3)
								)
								let lastDayDataBase = DateUtils.stringToDate(
									DateUtils.lastDayOfMonth(dataBase) +
										'/' +
										DateUtils.stringJustDate(dataBase).substring(3)
								)
								return (
									<Group key={index} header={target.description}>
										<ProgressIndicator
											key={target.id}
											label={
												(target.account ? target.account.name : loc.all_accounts) +
												' (' +
												(lastDayOfCurrentDate >= lastDayDataBase
													? loc.current_balance
													: loc.future_balance) +
												')'
											}
											value={
												target.account === null
													? balance.current
													: lastDayOfCurrentDate >= lastDayDataBase
													? account.currentBalance
													: account.futureBalance
											}
											maximum={target.targetValue}
											formatter={(value) => {
												return CurrencyUtils.format(value)
											}}
										/>
									</Group>
								)
							})}
				</div>
				<div className={styles.groups}>
					<div className={styles.pendentMovements}>
						<Group header={loc.pendent_movements}>
							{
								<>
									<div className={styles.movement + ' ' + styles.header}>
										<div className={styles.dueDate}>{loc.due_date}</div>
										<div className={styles.description}>{loc.description}</div>
										<div className={styles.value}>{loc.value}</div>
									</div>
									{aditionalInformation.dashboard.pendentMovements &&
										aditionalInformation.dashboard.pendentMovements.content.map((movement) => {
											return (
												<div className={styles.movement} key={movement.id}>
													<div className={styles.dueDate}>{movement.dueDate.substr(0, 2)}</div>
													<div className={styles.description}>{movement.description}</div>
													<div className={styles.value}>{CurrencyUtils.format(movement.value)}</div>
												</div>
											)
										})}
									{aditionalInformation.dashboard.pendentMovements &&
										aditionalInformation.dashboard.pendentMovements.content.length === 0 && (
											<>
												<div className={styles.notFound}>{loc.dont_have_movements}</div>
											</>
										)}
									{aditionalInformation.dashboard.pendentMovements &&
										aditionalInformation.dashboard.pendentMovements.totalElements > 5 && (
											<>
												<div
													className={styles.moreElements}
													onClick={() => {
														defineCurrentPage(PageSettings.movement)
													}}
												>
													{loc.total_pendent_movements.replaceAll(
														'@#TOTAL_ELEMENTS@#',
														aditionalInformation.dashboard.pendentMovements.totalElements - 5
													)}
												</div>
											</>
										)}
								</>
							}
						</Group>
					</div>
					<div className={styles.accountBalance}>
						<Group header={loc.account_balances}>
							{
								<>
									<div className={styles.account + ' ' + styles.header}>
										<div className={styles.accountColumn}>{loc.account}</div>
										<div className={styles.balance}>{loc.balance}</div>
									</div>
									{aditionalInformation.dashboard.accounts &&
										aditionalInformation.dashboard.accounts.map((account) => {
											return (
												<div className={styles.account} key={account.account.id}>
													<div className={styles.accountColumn}>{account.account.name}</div>
													<div className={styles.balance}>
														{CurrencyUtils.format(account.balance)}
													</div>
												</div>
											)
										})}
									{aditionalInformation.dashboard.accounts &&
										aditionalInformation.dashboard.accounts.length === 0 && (
											<>
												<div className={styles.notFound}>{loc.dont_have_accounts}</div>
											</>
										)}
								</>
							}
						</Group>
					</div>
				</div>
				<div className={styles.groups + ' ' + styles.fullHeight}>
					<Group header={loc.balance_by_day}>
						<div className={styles.balances}>
							{aditionalInformation.dashboard.balancePerDay &&
								Object.keys(aditionalInformation.dashboard.balancePerDay.balances).map(
									(balanceByDay) => {
										return (
											<VerticalProgressIndicator
												className={
													dataBase.getFullYear() === new Date().getFullYear() &&
													dataBase.getMonth() === new Date().getMonth() &&
													parseInt(balanceByDay) === new Date().getDate()
														? 'currentDay'
														: ''
												}
												label={balanceByDay}
												key={balanceByDay}
												value={aditionalInformation.dashboard.balancePerDay.balances[balanceByDay]}
												minimum={
													aditionalInformation.dashboard.balancePerDay.minValue +
													aditionalInformation.dashboard.balancePerDay.minValue * 0.2
												}
												maximum={
													aditionalInformation.dashboard.balancePerDay.maxValue +
													aditionalInformation.dashboard.balancePerDay.maxValue * 0.2
												}
												formatter={(value) => {
													return CurrencyUtils.format(value)
												}}
											/>
										)
									}
								)}
						</div>
					</Group>
				</div>
			</div>
		</div>
	)
}
