import { faArrowsRotate, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import AccountsStyle from './index.style'

export default function Accounts() {
	const { getText } = useContext(LocalizationContext)
	const { updateField, find, create, remove } = useContext(TableContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)

	function deleteAccount(account) {
		choiceMessage({
			header: getText('pages.account.delete.header'),
			text: getText('pages.account.delete.text').replaceAll('@#NAME@#', account.name),
			option1: {
				text: getText('commons.yes'),
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
					onClick={() =>
						create('account', {
							name: getText('pages.account.new_account.name'),
							bank: getText('pages.account.new_account.bank'),
							type: 'DEBIT',
						})
					}
				>
					<FontAwesomeIcon icon={faPlus} /> {getText('commons.create')}
				</Button>
				<Button onClick={() => find({ entity: 'account' })}>
					<FontAwesomeIcon icon={faArrowsRotate} /> {getText('commons.refresh')}
				</Button>
			</div>
			<Table
				entity={'account'}
				header={{
					name: getText('pages.account.table.name'),
					bank: getText('pages.account.table.bank'),
					type: getText('pages.account.table.type'),
					balance: getText('pages.account.table.balance'),
					currentBalance: getText('pages.account.table.current_balance'),
					futureBalance: getText('pages.account.table.future_balance'),
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
						return getText('pages.account.types.' + account.account.type)
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
								title={getText('commons.delete')}
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
										{getText('pages.account.types.' + accountType)}
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
