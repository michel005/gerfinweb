import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import { TableContext } from '../../hook/Table.context'
import { ConfigContext } from '../../hook/Config.context'
import Form from '../../components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCheck,
	faClose,
	faDollar,
	faInfo,
	faSave,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import Alert from '../../components/Alert'
import { MessageContext } from '../../hook/Message.context'
import PageSettings from '../../assets/page.settings'
import CommandBar from '../../components/CommandBar'
import CurrencyUtils from '../../utils/CurrencyUtils'
import styled from 'styled-components'

const FormStyle = styled.div`
	#currentBalance,
	#futureBalance {
		text-align: right;
	}
`

export default function AccountForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.account')
	const { create, update, refresh, remove } = useContext(TableContext)
	const { setShowForm, showForm } = useContext(ConfigContext)
	const { errorMessage, choiceMessage, setMessage } = useContext(MessageContext)
	const [description, setDescription] = useState()

	function changeDescription(event) {
		setDescription(loc.types_description[event.target.value])
	}

	const account = showForm.account

	function adjustAccountBalance() {
		setShowForm((sf) => {
			return { ...sf, adjustBalance: account, account: false }
		})
	}

	function deleteAccount() {
		choiceMessage({
			icon: <FontAwesomeIcon icon={faTrash} />,
			header: loc.delete.header,
			text: loc.delete.text.replaceAll('@#NAME@#', account.name),
			option1: {
				text: locCommons.yes,
				icon: faCheck,
				event: () => {
					remove('account', account.id, () => {
						setShowForm((sf) => {
							return { ...sf, account: false }
						})
						setMessage(undefined)
					})
				},
			},
			config: {
				style: 'red',
				withoutClose: true,
			},
		})
	}

	function saveAccount() {
		if (account.id) {
			update(
				'account',
				account.id,
				{
					name: document.getElementById('accountName').value,
					bank: document.getElementById('accountBank').value,
					type: document.getElementById('accountType').value,
				},
				() => {
					setShowForm((sf) => {
						return { ...sf, account: false }
					})
					refresh({ entity: 'account' })
				},
				(error) => {
					errorMessage({
						header: loc.save_error,
						text: error,
					})
				}
			)
		} else {
			create(
				'account',
				{
					name: document.getElementById('accountName').value,
					bank: document.getElementById('accountBank').value,
					type: document.getElementById('accountType').value,
				},
				() => {
					setShowForm((sf) => {
						return { ...sf, account: false }
					})
				},
				(error) => {
					errorMessage({
						header: loc.save_error,
						text: error,
					})
				}
			)
		}
	}

	useEffect(() => {
		setDescription(loc.types_description[document.getElementById('accountType').value])
	}, [loc.types_description])

	return (
		<Form
			icon={<FontAwesomeIcon icon={PageSettings.account.icon} />}
			header={loc.form_header}
			commands={
				<CommandBar fixedInBottom={true}>
					<Button icon={<FontAwesomeIcon icon={faSave} />} onClick={saveAccount}>
						{locCommons.save}
					</Button>
					{account.id && (
						<Button
							className={'alert'}
							onClick={deleteAccount}
							icon={<FontAwesomeIcon icon={faClose} />}
						>
							{locCommons.delete}
						</Button>
					)}
				</CommandBar>
			}
			onClose={() => {
				setShowForm((sf) => {
					return { ...sf, account: false }
				})
			}}
		>
			<FormStyle>
				<DisplayRowStyle>
					<Field id={'accountName'} label={loc.table.name} defaultValue={account.name} />
					<Field id={'accountBank'} label={loc.table.bank} defaultValue={account.bank} />
				</DisplayRowStyle>
				<Field
					id={'accountType'}
					label={loc.table.type}
					type={'select'}
					list={loc.types}
					nullable={false}
					onChange={changeDescription}
					defaultValue={account.type}
				/>
				{description && <Alert alert={description} icon={faInfo} />}
				{account.id && (
					<Field
						id={'currentBalance'}
						label={loc.form_current_balance}
						disabled={true}
						defaultValue={CurrencyUtils.format(account.current)}
						command={{
							icon: <FontAwesomeIcon icon={faDollar} />,
							text: loc.table.adjust_balance_command,
							event: adjustAccountBalance,
						}}
					/>
				)}
				{account.id && (
					<Field
						id={'futureBalance'}
						label={loc.form_future_balance}
						disabled={true}
						defaultValue={CurrencyUtils.format(account.future)}
					/>
				)}
			</FormStyle>
		</Form>
	)
}
