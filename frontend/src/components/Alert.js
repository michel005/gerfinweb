import AlertStyle from './Alert.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

export default function Alert({ alert, convertHtml = false, className, icon = faExclamation }) {
	return (
		<AlertStyle className={className + ' alert'}>
			<div className={'icon'}>
				<FontAwesomeIcon icon={icon} />
			</div>{' '}
			{convertHtml ? (
				<div className={'alertText'} dangerouslySetInnerHTML={{ __html: alert }}></div>
			) : (
				<div className={'alertText'}>{alert}</div>
			)}
		</AlertStyle>
	)
}
