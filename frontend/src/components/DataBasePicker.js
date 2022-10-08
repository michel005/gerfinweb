import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { ConfigContext } from '../hook/Config.context'
import DataBasePickerStyle from './DataBasePicker.style'
import Button from './Button'

export default function DataBasePicker({ reduced }) {
	const { formatedForUX, nextMonth, previewMonth } = useContext(ConfigContext)

	return (
		<DataBasePickerStyle reduced={reduced}>
			<div>
				<Button
					icon={<FontAwesomeIcon icon={faChevronLeft} />}
					onClick={previewMonth}
					className="transparent left"
				/>
			</div>
			<div className="label">{formatedForUX()}</div>
			<div>
				<Button
					icon={<FontAwesomeIcon icon={faChevronRight} />}
					onClick={nextMonth}
					className="transparent right"
				/>
			</div>
		</DataBasePickerStyle>
	)
}
