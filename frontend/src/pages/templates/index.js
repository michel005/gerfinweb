import { faArrowsRotate, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { ConfigContext } from '../../hook/Config.context'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import DateUtils from '../../utils/DateUtils'
import TemplateStyle from './index.style'

export default function Templates() {
	const { getText } = useContext(LocalizationContext)
	const { updateField, find, create, remove, aditionalInformation } = useContext(TableContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { dataBase } = useContext(ConfigContext)

	function deleteTemplate(movement) {
		choiceMessage({
			header: getText('pages.template.delete.header'),
			text: getText('pages.template.delete.text'),
			option1: {
				text: getText('commons.yes'),
				event: () => {
					remove('template', movement.id, () => {
						setMessage(undefined)
					})
				},
			},
		})
	}

	return (
		<TemplateStyle>
			<div className={'commands'}>
				<Button
					onClick={() =>
						create('template', {
							dueDay: new Date().getDate(),
							description: getText('pages.template.new_template.description'),
							recurrency: 'MANY_PER_MONTH',
							account: aditionalInformation.account[0],
							value: 1.0,
						})
					}
				>
					<FontAwesomeIcon icon={faPlus} /> {getText('commons.create')}
				</Button>
				<Button onClick={() => find({ entity: 'movement' })}>
					<FontAwesomeIcon icon={faArrowsRotate} /> {getText('commons.refresh')}
				</Button>
			</div>
			<Table
				entity={'template'}
				header={{
					dueDay: getText('pages.template.table.dueDay'),
					description: getText('pages.template.table.description'),
					account: getText('pages.template.table.account'),
					value: getText('pages.template.table.value'),
					recurrency: getText('pages.template.table.recurrency'),
					commands: '',
				}}
				enableOrderBy={{
					commands: false,
				}}
				valueMapper={{
					id: (template) => {
						return template.id
					},
					dueDay: (template) => {
						return template.dueDay
					},
					description: (template) => {
						return template.description
					},
					account: (template) => {
						return template.account ? template.account.name : ''
					},
					value: (template) => {
						return template.value
					},
					recurrency: (template) => {
						return template.recurrency
					},
				}}
				valueModifier={{
					id: (value, template) => {
						return template.id
					},
					dueDate: (value, template) => {
						return template.dueDay
					},
					description: (value, template) => {
						return template.description
					},
					account: (value, template) => {
						return template.account ? template.account.name : ''
					},
					value: (value, template) => {
						return CurrencyUtils.format(template.value)
					},
					recurrency: (value, template) => {
						return getText('pages.template.recurrency.' + template.recurrency)
					},
					commands: (value, template) => {
						return (
							<button
								className="transparent"
								title="Remove"
								onClick={() => deleteTemplate(template)}
							>
								<FontAwesomeIcon icon={faTrash} />
							</button>
						)
					},
				}}
				editModifier={{
					recurrency: (template, field, event) => (
						<select
							defaultValue={template.recurrency}
							onChange={(ev) => {
								ev.code = 'Enter'
								event(ev, template, field)
							}}
							onKeyDown={(ev) => event(ev, template, field)}
						>
							{['ONE_PER_MONTH', 'MANY_PER_MONTH'].map((recurrencyType, recurrencyTypeIndex) => {
								return (
									<option key={recurrencyTypeIndex} value={recurrencyType}>
										{getText('pages.template.recurrency.' + recurrencyType)}
									</option>
								)
							})}
						</select>
					),
					account: (template, field, event) => (
						<select
							defaultValue={template.account ? template.account.id : null}
							onChange={(ev) => {
								ev.code = 'Enter'
								event(ev, template, field)
							}}
							onKeyDown={(ev) => event(ev, template, field)}
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
					dueDay: (template, value) => {
						updateField('template', template, 'dueDay', value)
					},
					description: (template, value) => {
						updateField('template', template, 'description', value)
					},
					account: (template, value) => {
						updateField('template', template, 'account', value === '' ? null : {
							id: value,
						})
					},
					value: (template, value) => {
						updateField('template', template, 'value', value)
					},
					recurrency: (template, value) => {
						updateField('template', template, 'recurrency', value)
					},
				}}
			/>
		</TemplateStyle>
	)
}
