import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import useLocalization from '../../hook/useLocalization'
import CurrencyUtils from '../../utils/CurrencyUtils'
import AccountsStyle from './index.style'
import { ConfigContext } from '../../hook/Config.context'
import CommandBar from '../../components/CommandBar'
import DataBasePicker from '../../components/DataBasePicker'

export default function Accounts() {
	const { setShowForm } = useContext(ConfigContext)
	const { loc } = useLocalization('pages.account')
	const { loc: locCommons } = useLocalization('commons')

	return (
		<AccountsStyle>
			<CommandBar>
				<Button
					onClick={() => {
						setShowForm((sf) => {
							return {
								...sf,
								account: {
									name: 'Nova Conta',
									type: 'DEBIT',
									bank: 'Novo Banco',
								},
							}
						})
					}}
					icon={<FontAwesomeIcon icon={faPlus} />}
				>
					{locCommons.create}
				</Button>
				<div style={{ display: 'flex', flexGrow: 1 }}></div>
				<DataBasePicker />
			</CommandBar>
			<Table
				entity={'account'}
				enableOrderBy={{
					balance: false,
					currentBalance: false,
					futureBalance: false,
					commands: false,
				}}
				responsiveColumns={{
					bank: true,
					type: true,
					currentBalance: true,
					futureBalance: true,
				}}
				responsiveAction={(account) => {
					setShowForm((sf) => {
						return {
							...sf,
							account: account.account,
						}
					})
				}}
				responsiveLayout={(account) => {
					return (
						<div className={'responsiveLayout'}>
							<div className={'layoutName'}>{account.account.name}</div>
							<div className={'layoutBank'}>
								{account.account.bank} (
								<span className={'layoutType'}>{loc.types[account.account.type]}</span>)
							</div>
							{account.selected && (
								<>
									<div className={'layoutBalance balance'}>
										<div className={'balanceDescription'}>{loc.table.balance}</div>
										<div className={'mainValue'}>
											<div className={'currency'}>R$</div>
											<div className={'value'}>{CurrencyUtils.format(account.balance)}</div>
										</div>
									</div>
									<div className={'layoutBalance current'}>
										<div className={'balanceDescription'}>{locCommons.current_balance}</div>
										<div className={'mainValue'}>
											<div className={'currency'}>R$</div>
											<div className={'value'}>{CurrencyUtils.format(account.currentBalance)}</div>
										</div>
									</div>
									<div className={'layoutBalance future'}>
										<div className={'balanceDescription'}>{locCommons.future_balance}</div>
										<div className={'mainValue'}>
											<div className={'currency'}>R$</div>
											<div className={'value'}>{CurrencyUtils.format(account.futureBalance)}</div>
										</div>
									</div>
								</>
							)}
						</div>
					)
				}}
				header={{
					name: loc.table.name,
					bank: loc.table.bank,
					type: loc.table.type,
					balance: loc.table.balance,
					currentBalance: loc.table.current_balance,
					futureBalance: loc.table.future_balance,
				}}
				valueModifier={{
					id: (value, account) => {
						return account.account.id
					},
					name: (value, account) => {
						return account.account.name
					},
					bank: (value, account) => {
						return account.account.bank
					},
					type: (value, account) => {
						return loc.types[account.account.type]
					},
					balance: (value, account) => {
						return CurrencyUtils.format(account.balance)
					},
					currentBalance: (value, account) => {
						return CurrencyUtils.format(account.currentBalance)
					},
					futureBalance: (value, account) => {
						return CurrencyUtils.format(account.futureBalance)
					},
				}}
			/>
		</AccountsStyle>
	)
}
