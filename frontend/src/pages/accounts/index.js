import { faArrowsRotate, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { MessageContext } from '../../hook/Message.context'
import { TableContext } from '../../hook/Table.context'
import useLocalization from '../../hook/useLocalization'
import CurrencyUtils from '../../utils/CurrencyUtils'
import AccountsStyle from './index.style'

export default function Accounts() {
	const { updateField, find, create, remove } = useContext(TableContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { loc } = useLocalization('pages.account')
	const { loc: locCom } = useLocalization('commons')

	function deleteAccount(account) {
		choiceMessage({
			header: loc.delete.header,
			text: loc.delete.text.replaceAll('@#NAME@#', account.name),
			option1: {
				text: locCom.yes,
				event: () => {
					remove('account', account.id, () => {
						setMessage(undefined)
					})
				},
			},
		})
	}

	return (
		<AccountsStyle>
			<div className={'commands'}>
				<Button
					onClick={() => {
						create('account', {
							name: loc.new_account.name,
							bank: loc.new_account.bank,
							type: 'DEBIT',
						})
					}}
				>
					<FontAwesomeIcon icon={faPlus} /> {locCom.create}
				</Button>
				<Button onClick={() => find({ entity: 'account' })}>
					<FontAwesomeIcon icon={faArrowsRotate} /> {locCom.refresh}
				</Button>
			</div>
			<Table
				entity={'account'}
                enableOrderBy={{
                    name: true,
                    bank: true,
                    type: true
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
							<button
								className="transparent"
								title={loc.delete}
								onClick={() => deleteAccount(account.account)}
							>
								<FontAwesomeIcon icon={faTrash} />
							</button>
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
							{['DEBIT', 'CREDIT', 'SAVINGS', 'INVESTMENT'].map((accountType, accountTypeIndex) => {
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
