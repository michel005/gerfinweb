import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { ConfigContext } from '../hook/Config.context'
import Button from './Button'
import DataBasePickerStyle from './DataBasePicker.style'

export default function DataBasePicker({ reduced }) {
	const { formatedForUX, nextMonth, previewMonth } = useContext(ConfigContext)

	return (
		<DataBasePickerStyle reduced={reduced}>
			<div>
				<Button onClick={previewMonth} className="transparent">
					<FontAwesomeIcon icon={faArrowLeft} />
				</Button>
			</div>
			<div className="label">{formatedForUX()}</div>
			<div>
				<Button onClick={nextMonth} className="transparent">
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</div>
		</DataBasePickerStyle>
	)
}
