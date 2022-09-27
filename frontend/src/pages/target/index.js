import { faArrowsRotate, faCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import TargetStyle from './index.style'
import { ConfigContext } from '../../hook/Config.context'
import DisplayRowStyle from '../../components/DisplayRow.style'

export default function Targets() {
	const { getText } = useContext(LocalizationContext)
	const { updateField, find, remove, aditionalInformation } = useContext(TableContext)
	const { setShowForm } = useContext(ConfigContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)

	function deleteTarget(target) {
		choiceMessage({
			icon: <FontAwesomeIcon icon={faTrash} />,
			header: getText('pages.target.delete.header'),
			text: getText('pages.target.delete.text'),
			option1: {
				text: getText('commons.yes'),
				icon: faCheck,
				event: () => {
					remove('target', target.id, () => {
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

	return (
		<TargetStyle>
			<div className={'commands'}>
				<Button
					onClick={() =>
						setShowForm((sf) => {
							return { ...sf, target: true }
						})
					}
				>
					<FontAwesomeIcon icon={faPlus} /> {getText('commons.create')}
				</Button>
				<DisplayRowStyle className={'expand'}></DisplayRowStyle>
				<Button onClick={() => find({ entity: 'target' })} className={'noText transparent'}>
					<FontAwesomeIcon icon={faArrowsRotate} />
				</Button>
			</div>
			<Table
				entity={'target'}
				header={{
					targetDate: getText('pages.target.table.targetDate'),
					description: getText('pages.target.table.description'),
					account: getText('pages.target.table.account'),
					targetValue: getText('pages.target.table.targetValue'),
					commands: '',
				}}
				enableOrderBy={{
					commands: false,
				}}
				valueMapper={{
					id: (target) => {
						return target.id
					},
					targetDate: (target) => {
						return target.targetDate
					},
					description: (target) => {
						return target.description
					},
					account: (target) => {
						return target.account ? target.account.name : ''
					},
					targetValue: (target) => {
						return target.targetValue
					},
				}}
				valueModifier={{
					id: (value, target) => {
						return target.id
					},
					targetDate: (value, target) => {
						return target.targetDate
					},
					description: (value, target) => {
						return target.description
					},
					account: (value, target) => {
						return target.account ? target.account.name : ''
					},
					targetValue: (value, target) => {
						return CurrencyUtils.format(target.targetValue)
					},
					commands: (value, target) => {
						return (
							<button className="transparent" title="Remove" onClick={() => deleteTarget(target)}>
								<FontAwesomeIcon icon={faTrash} />
							</button>
						)
					},
				}}
				editModifier={{
					account: (target, field, event) => (
						<select
							defaultValue={target.account ? target.account.id : null}
							onChange={(ev) => {
								ev.code = 'Enter'
								event(ev, target, field)
							}}
							onKeyDown={(ev) => event(ev, target, field)}
						>
							<option value={null}></option>
							{aditionalInformation.account.map((account, accountIndex) => {
								return (
									<option key={accountIndex} value={account.id}>
										{account.name}
									</option>
								)
							})}
						</select>
					),
				}}
				columnAction={{
					targetDate: (target, value) => {
						updateField('target', target, 'targetDate', value)
					},
					description: (target, value) => {
						updateField('target', target, 'description', value)
					},
					account: (target, value) => {
						updateField(
							'target',
							target,
							'account',
							value === ''
								? null
								: {
										id: value,
								  }
						)
					},
					targetValue: (target, value) => {
						updateField('target', target, 'targetValue', value)
					},
				}}
			/>
		</TargetStyle>
	)
}
