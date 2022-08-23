import { useContext, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import Group from '../../components/Group'
import ProgressIndicator from '../../components/ProgressIndicator'
import VerticalProgressIndicator from '../../components/VerticalProgressIndicator'
import { ConfigContext } from '../../hook/Config.context'
import { PageContext } from '../../hook/Page.context'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import styles from './index.module.scss'

export default function Dashboard() {
	const { aditionalInformation } = useContext(TableContext)
	const { defineCurrentPage } = useContext(PageContext)
	const { balance, dataBase } = useContext(ConfigContext)

	const [showTargets, setShowTargets] = useState(true)
	const [showMovements, setShowMovements] = useState(true)
	const [showAccounts, setShowAccounts] = useState(true)
	const [showBalances, setShowBalances] = useState(true)

	return (
		<div className={styles.dashboard}>
			<Group header={'Unfinished Targets'} onClick={() => setShowTargets(!showTargets)}>
				{showTargets && (
					<>
						{aditionalInformation.target &&
							aditionalInformation.target.map((target) => {
								return (
									<ProgressIndicator
										key={target.id}
										label={
											target.description +
											' (' +
											(target.account ? target.account.name : 'All Accounts') +
											')'
										}
										value={
											target.account === null
												? balance.current
												: aditionalInformation.accountDashboard.filter(
														(value) => value.account.id === target.account.id
												  )[0].currentBalance
										}
										maximum={target.targetValue}
										formatter={(value) => {
											return CurrencyUtils.format(value)
										}}
									/>
								)
							})}
						{aditionalInformation.target && aditionalInformation.target.length === 0 && (
							<>
								<div className={styles.notFound}>You don't have targets</div>
							</>
						)}
					</>
				)}
			</Group>
			<div className={styles.group}>
				<div className={styles.pendentMovements}>
					<Group header={'Pendent Movements'} onClick={() => setShowMovements(!showMovements)}>
						{showMovements && (
							<>
								<div className={styles.movement + ' ' + styles.header}>
									<div className={styles.dueDate}>Due Date</div>
									<div className={styles.description}>Description</div>
									<div className={styles.value}>Value</div>
								</div>
								{aditionalInformation.pendentMovements &&
									aditionalInformation.pendentMovements.content.map((movement) => {
										return (
											<div className={styles.movement} key={movement.id}>
												<div className={styles.dueDate}>{movement.dueDate}</div>
												<div className={styles.description}>{movement.description}</div>
												<div className={styles.value}>{CurrencyUtils.format(movement.value)}</div>
											</div>
										)
									})}
								{aditionalInformation.pendentMovements &&
									aditionalInformation.pendentMovements.content.length === 0 && (
										<>
											<div className={styles.notFound}>You don't have pendent movements</div>
										</>
									)}
								{aditionalInformation.pendentMovements &&
									aditionalInformation.pendentMovements.totalElements > 5 && (
										<>
											<div
												className={styles.moreElements}
												onClick={() => {
													defineCurrentPage(PageSettings.movement)
												}}
											>
												And {aditionalInformation.pendentMovements.totalElements - 5} more...
											</div>
										</>
									)}
							</>
						)}
					</Group>
				</div>
				<div className={styles.accountBalance}>
					<Group header={'Account Balances'} onClick={() => setShowAccounts(!showAccounts)}>
						{showAccounts && (
							<>
								<div className={styles.account + ' ' + styles.header}>
									<div className={styles.accountColumn}>Account</div>
									<div className={styles.balance}>Balance</div>
									<div className={styles.current}>Current</div>
									<div className={styles.future}>Future</div>
								</div>
								{aditionalInformation.accountDashboard &&
									aditionalInformation.accountDashboard.map((account) => {
										return (
											<div className={styles.account} key={account.account.id}>
												<div className={styles.accountColumn}>{account.account.name}</div>
												<div className={styles.balance}>
													{CurrencyUtils.format(account.balance)}
												</div>
												<div className={styles.current}>
													{CurrencyUtils.format(account.currentBalance)}
												</div>
												<div className={styles.future}>
													{CurrencyUtils.format(account.futureBalance)}
												</div>
											</div>
										)
									})}
								{aditionalInformation.accountDashboard &&
									aditionalInformation.accountDashboard.length === 0 && (
										<>
											<div className={styles.notFound}>You don't have accounts</div>
										</>
									)}
							</>
						)}
					</Group>
				</div>
			</div>
			<div className={styles.group + ' ' + styles.fullHeight}>
				<Group header={'Balance per Day of Month'} onClick={() => setShowBalances(!showBalances)}>
					{showBalances && (
						<>
							<div className={styles.balances}>
								{aditionalInformation.balanceByDay &&
									Object.keys(aditionalInformation.balanceByDay.balances).map((balanceByDay) => {
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
												value={aditionalInformation.balanceByDay.balances[balanceByDay]}
												minimum={
													aditionalInformation.balanceByDay.minValue +
													aditionalInformation.balanceByDay.minValue * 0.2
												}
												maximum={
													aditionalInformation.balanceByDay.maxValue +
													aditionalInformation.balanceByDay.maxValue * 0.2
												}
												formatter={(value) => {
													return CurrencyUtils.format(value)
												}}
											/>
										)
									})}
							</div>
						</>
					)}
				</Group>
			</div>
		</div>
	)
}
