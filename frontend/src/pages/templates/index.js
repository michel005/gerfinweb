import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import CurrencyUtils from '../../utils/CurrencyUtils'
import TemplateStyle from './index.style'
import { ConfigContext } from '../../hook/Config.context'
import useLocalization from '../../hook/useLocalization'
import CommandBar from '../../components/CommandBar'
import DataBasePicker from '../../components/DataBasePicker'

export default function Templates() {
	const { setShowForm } = useContext(ConfigContext)
	const { loc } = useLocalization('pages.template')
	const { loc: locCommons } = useLocalization('commons')

	return (
		<TemplateStyle>
			<CommandBar>
				<Button
					icon={<FontAwesomeIcon icon={faPlus} />}
					onClick={() => {
						setShowForm((sf) => {
							return {
								...sf,
								template: {
									dueDay: new Date().getDate(),
									description: loc.new_template.description,
									value: 0.0,
								},
							}
						})
					}}
				>
					{locCommons.create}
				</Button>
				<div style={{ display: 'flex', flexGrow: 1 }}></div>
				<DataBasePicker />
			</CommandBar>
			<Table
				entity={'template'}
				header={{
					dueDay: loc.table.dueDay,
					description: loc.table.description,
					account: loc.table.account,
					value: loc.table.value,
					recurrency: loc.table.recurrency,
				}}
				responsiveLayout={(template) => (
					<div className={'responsiveLayout'}>
						<div className={'layoutDate'}>
							{template.dueDay ? template.dueDay : 'Dia atual'}
							<div className={`statusLabel ${template.recurrency}`}>
								{loc.recurrency[template.recurrency]}{' '}
							</div>
						</div>
						<div className={'descriptionAccountGroup'}>
							<div className={'layoutDescription'}>{template.description}</div>
							<div className={'layoutAccountName'}>{template.account?.name}</div>
						</div>
						<div className={'layoutValue'}>
							<div className={'mainValue'}>
								<div className={'currency'}>R$</div>
								<div className={'value'}>{CurrencyUtils.format(template.value)}</div>
							</div>
						</div>
					</div>
				)}
				responsiveAction={(template) => {
					setShowForm((sf) => {
						return {
							...sf,
							template: template,
						}
					})
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
						return loc.recurrency[template.recurrency]
					},
				}}
			/>
		</TemplateStyle>
	)
}
