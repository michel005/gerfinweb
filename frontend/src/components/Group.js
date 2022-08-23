import GroupStyled from './Group.styled'

export default function Group({ ...props }) {
  const { children, header } = props
  return (
    <GroupStyled {...props}>
      <div className={'title'}>{header}</div> {children}
    </GroupStyled>
  )
}
