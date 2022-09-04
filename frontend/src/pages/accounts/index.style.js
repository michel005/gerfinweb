import styled from 'styled-components'

const AccountsStyle = styled.div`
	display: flex;
	flex-direction: column;
    height: 100%;

    .column_type {
		max-width: 150px;
    }

	.column_currentBalance,
	.column_futureBalance,
	.column_balance {
        justify-content: flex-end;
        text-align: right;
		max-width: 200px;
	}

	.column_commands {
        text-align: right;
        justify-content: flex-end;
		max-width: 120px;

		button {
			background-color: transparent;
			border: none;
			cursor: pointer;
			margin: 0 0 0 14px;
			padding: 0;
            transition: all 0.25s;

            &:hover {
                color: #666;
                transform: scale(1.2);
            }
		}
	}

	.commands {
		display: flex;
		flex-direction: row;
		margin-bottom: 14px;

		& > * {
			margin-right: 14px;
		}
	}
`

export default AccountsStyle
