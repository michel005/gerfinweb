import VerticalProgressIndicatorStyle from './VerticalProgressIndicator.style'

export default function VerticalProgressIndicator({
	label,
	value,
	maximum = 1,
	minimum = 0,
	formatter,
	className,
}) {
	return (
		<VerticalProgressIndicatorStyle
			className={'progress ' + className}
			value={value}
			maximum={maximum}
			minimum={minimum}
            title={formatter ? formatter(value) : value.toFixed(2)}
		>
			<div className={'background'}>
				<div className={'progresso'}></div>
			</div>
			{label && <div className={'label'}>{label}</div>}
			{minimum < 0 && (
				<div className={'backgroundNegative'}>
					<div className={'progressoNegative'}></div>
				</div>
			)}
		</VerticalProgressIndicatorStyle>
	)
}
