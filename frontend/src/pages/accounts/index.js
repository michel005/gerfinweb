import {
	faArrowsRotate,
	faCheck,
	faDollar,
	faPlus,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { MessageContext } from '../../hook/Message.context'
import { TableContext } from '../../hook/Table.context'
import useLocalization from '../../hook/useLocalization'
import CurrencyUtils from '../../utils/CurrencyUtils'
import AccountsStyle from './index.style'
import { ConfigContext } from '../../hook/Config.context'
import ButtonChooser from '../../components/ButtonChooser'
import Alert from '../../components/Alert'

export default function Accounts() {
	const { updateField, find, remove, allExtraValues } = useContext(TableContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { setAdjustAccountBalance, setShowForm } = useContext(ConfigContext)
	const { loc } = useLocalization('pages.account')
	const { loc: locCommons } = useLocalization('commons')

	function deleteAccount(account) {
		choiceMessage({
			icon: <FontAwesomeIcon icon={faTrash} />,
			header: loc.delete.header,
			text: loc.delete.text.replaceAll('@#NAME@#', account.name),
			option1: {
				text: locCommons.yes,
				icon: faCheck,
				event: () => {
					remove('account', account.id, () => {
						setMessage(undefined)
					})
				},
			},
			config: {
				style: 'red',
			},
		})
	}

	function adjustAccountBalance(account) {
		setAdjustAccountBalance((x) => {
			return { ...account }
		})
		setShowForm((sf) => {
			return { ...sf, adjustBalance: true }
		})
	}

	return (
		<AccountsStyle>
			<div className={'commands'}>
				<Button
					onClick={() => {
						setShowForm((sf) => {
							return { ...sf, account: true }
						})
					}}
				>
					<FontAwesomeIcon icon={faPlus} /> {locCommons.create}
				</Button>
				<Button onClick={() => find({ entity: 'account' })}>
					<FontAwesomeIcon icon={faArrowsRotate} /> {locCommons.refresh}
				</Button>
				<ButtonChooser
					label={loc.filter_label_account_types}
					list={loc.types}
					defaultValue={allExtraValues.account?.type}
					nullable={true}
					nullableText={loc.filter_all_types}
					onChange={(value) => {
						find({
							entity: 'account',
							extraValues: {
								type: value,
							},
						})
					}}
				/>
			</div>
			<Table
				entity={'account'}
				enableOrderBy={{
					balance: false,
					currentBalance: false,
					futureBalance: false,
					commands: false,
				}}
				header={{
					name: loc.table.name,
					bank: loc.table.bank,
					type: loc.table.type,
					balance: loc.table.balance,
					currentBalance: loc.table.current_balance,
					futureBalance: loc.table.future_balance,
					commands: '',
				}}
				valueMapper={{
					id: (account) => {
						return account.account.id
					},
					name: (account) => {
						return account.account.name
					},
					bank: (account) => {
						return account.account.bank
					},
					type: (account) => {
						return account.account.type
					},
					balance: (account) => {
						return account.balance
					},
					currentBalance: (account) => {
						return account.currentBalance
					},
					futureBalance: (account) => {
						return account.futureBalance
					},
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
					commands: (value, account) => {
						return (
							<>
								<button
									className="transparent"
									title={loc.table.adjust_balance_command}
									onClick={() => adjustAccountBalance(account.account)}
								>
									<FontAwesomeIcon icon={faDollar} />
								</button>
								<button
									className="transparent"
									title={loc.table.delete_command}
									onClick={() => deleteAccount(account.account)}
								>
									<FontAwesomeIcon icon={faTrash} />
								</button>
							</>
						)
					},
				}}
				editModifier={{
					type: (account, field, event) => (
						<select
							defaultValue={account.account.type}
							onChange={(ev) => {
								ev.code = 'Enter'
								event(ev, account, field)
							}}
							onKeyDown={(ev) => event(ev, account, field)}
						>
							{Object.keys(loc.types).map((accountType, accountTypeIndex) => {
								return (
									<option key={accountTypeIndex} value={accountType}>
										{loc.types[accountType]}
									</option>
								)
							})}
						</select>
					),
				}}
				columnAction={{
					name: (account, value) => {
						updateField('account', account.account, 'name', value)
					},
					bank: (account, value) => {
						updateField('account', account.account, 'bank', value)
					},
					type: (account, value) => {
						updateField('account', account.account, 'type', value)
					},
				}}
			/>
		</AccountsStyle>
	)
}
