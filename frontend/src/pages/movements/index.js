import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faExclamation, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import Table from '../../components/Table'
import API from '../../config/API'
import { ConfigContext } from '../../hook/Config.context'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import MovementStyle from './index.style'
import useLocalization from '../../hook/useLocalization'
import DateUtils from '../../utils/DateUtils'
import DataBasePicker from '../../components/DataBasePicker'
import CommandBar from '../../components/CommandBar'
import ButtonMultipleOption from '../../components/ButtonMultipleOption'
import url from '../../assets/url_settings.json'

export default function Movements() {
	const { aditionalInformation } = useContext(TableContext)
	const { formatedDataBaseForURL, setShowForm } = useContext(ConfigContext)
	const [showTemplates, setShowTemplates] = useState(false)
	const { loc } = useLocalization('pages.movement')
	const { loc: locTemplate } = useLocalization('pages.template')
	const { loc: locCommons } = useLocalization('commons')

	function addMovementBasedOnTemplate(template) {
		setShowTemplates(false)
		API.get(
			url.movement.templateBased
				.replaceAll('@#ID@#', template.id)
				.replaceAll('@#DATABASE@#', formatedDataBaseForURL()),
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		).then((response) => {
			setShowTemplates(false)
			setShowForm((sf) => {
				return {
					...sf,
					movement: response.data,
				}
			})
		})
	}

	function createMovementEvent() {
		setShowTemplates(false)
		setShowForm((sf) => {
			return {
				...sf,
				movement: {
					dueDate: DateUtils.stringJustDate(new Date()),
					description: loc.new_movement.description,
					status: 'PENDENT',
					value: 0.0,
				},
			}
		})
	}

	return (
		<MovementStyle showTemplates={showTemplates}>
			<CommandBar padding={'0 0 14px 0'}>
				<ButtonMultipleOption
					icon={<FontAwesomeIcon icon={faPlus} />}
					label={locCommons.create}
					event={createMovementEvent}
					options={[
						{
							icon: <FontAwesomeIcon icon={faArrowAltCircleDown} />,
							label: locCommons.transfer,
							event: () => {
								setShowTemplates(false)
								setShowForm((sf) => {
									return { ...sf, transfer: true }
								})
							},
						},
					]}
				/>
				<ButtonMultipleOption
					icon={<FontAwesomeIcon icon={PageSettings.template.icon} />}
					label={locTemplate.header.text}
					options={aditionalInformation.template.map((template) => {
						return {
							label: template.description,
							event: () => addMovementBasedOnTemplate(template),
						}
					})}
				/>
				<div style={{ display: 'flex', flexGrow: 1 }}></div>
				<DataBasePicker />
			</CommandBar>
			<Table
				entity={'movement'}
				header={{
					dueDate: loc.table.dueDate,
					description: loc.table.description,
					account: loc.table.account,
					value: loc.table.value,
					status: loc.table.status,
					movementDate: loc.table.movementDate,
				}}
				responsiveColumns={{
					account: true,
					status: true,
					movementDate: true,
				}}
				responsiveLayout={(movement) => (
					<div className={'responsiveLayout'}>
						<div className={'layoutDate'}>
							{movement.date}
							<div className={`statusLabel ${movement.status}`}>
								{loc.types[movement.status]}{' '}
								<FontAwesomeIcon icon={movement.status === 'PENDENT' ? faExclamation : faCheck} />
							</div>
							{movement.template && (
								<div className={`statusLabel template`}>
									{loc.label.template} <FontAwesomeIcon icon={PageSettings.template.icon} />
								</div>
							)}
						</div>
						<div className={'descriptionAccountGroup'}>
							<div className={'layoutDescription'}>{movement.description}</div>
							<div className={'layoutAccountName'}>{movement.account.name}</div>
						</div>
						<div className={'layoutValue'}>
							<div className={'mainValue'}>
								<div className={'currency'}>R$</div>
								<div className={'value'}>{CurrencyUtils.format(movement.value)}</div>
							</div>
						</div>
					</div>
				)}
				responsiveAction={(movement) => {
					setShowTemplates(false)
					setShowForm((sf) => {
						return {
							...sf,
							movement: movement,
						}
					})
				}}
				enableOrderBy={{
					commands: false,
				}}
				valueModifier={{
					id: (value, movement) => {
						return movement.id
					},
					dueDate: (value, movement) => {
						return movement.dueDate
					},
					description: (value, movement) => {
						return movement.description
					},
					account: (value, movement) => {
						return movement.account.name
					},
					value: (value, movement) => {
						return CurrencyUtils.format(movement.value)
					},
					status: (value, movement) => {
						return loc.types[movement.status]
					},
					movementDate: (value, movement) => {
						return movement.movementDate
					},
				}}
			/>
		</MovementStyle>
	)
}
