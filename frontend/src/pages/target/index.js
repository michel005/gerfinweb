import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { LocalizationContext } from '../../hook/Localization.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import TargetStyle from './index.style'
import { ConfigContext } from '../../hook/Config.context'
import ProgressIndicator from '../../components/ProgressIndicator'
import DateUtils from '../../utils/DateUtils'
import CommandBar from '../../components/CommandBar'
import DataBasePicker from '../../components/DataBasePicker'

export default function Targets() {
	const { getText } = useContext(LocalizationContext)
	const { setShowForm } = useContext(ConfigContext)

	return (
		<TargetStyle>
			<CommandBar>
				<Button
					icon={<FontAwesomeIcon icon={faPlus} />}
					onClick={() =>
						setShowForm((sf) => {
							return {
								...sf,
								target: {
									targetDate: DateUtils.stringJustDate(new Date()),
									description: getText('pages.target.new_target.description'),
									targetValue: 0.0,
								},
							}
						})
					}
				>
					{getText('commons.create')}
				</Button>
				<div style={{ display: 'flex', flexGrow: 1 }}></div>
				<DataBasePicker />
			</CommandBar>
			<Table
				entity={'target'}
				header={{
					targetDate: getText('pages.target.table.targetDate'),
					description: getText('pages.target.table.description'),
					account: getText('pages.target.table.account'),
					targetValue: getText('pages.target.table.targetValue'),
				}}
				responsiveLayout={(target) => (
					<div className={'responsiveLayout'}>
						<ProgressIndicator
							label={target.description}
							value={target.targetValue}
							maximum={target.targetValue}
							formatter={(value) => 'R$ ' + CurrencyUtils.format(value).trim()}
						/>
					</div>
				)}
				responsiveAction={(target) => {
					setShowForm((sf) => {
						return {
							...sf,
							target: target,
						}
					})
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
				}}
			/>
		</TargetStyle>
	)
}
