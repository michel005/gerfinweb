import styled from 'styled-components'

const UserStyle = styled.div`
	display: flex;
	flex-direction: column;

	.field {
		margin-top: 14px;
	}

	.group {
		margin-right: 14px;
	}

	.profilePictureGroup {
		.group {
			text-align: center;

			.title {
				text-align: left;
			}

			.profilePicture {
				background-color: #fff;
				background-image: ${(props) => `url(${props.userProfileImage})`};
				background-size: cover;
				background-position: center;
				box-shadow: #111 0 0 7px;
				border-radius: 100px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 100px;
				color: #fff;
				width: 150px;
				height: 150px;
				margin: 0 auto;
			}
		}
	}

	.verticalGroup {
		margin-bottom: 14px;
	}

	.horizontalGroup {
		display: flex;
		flex-direction: row;
	}

	.commands {
		display: flex;
		flex-direction: row;
		margin-top: 14px;

		button {
			margin-right: 14px;

			&:last-child {
				margin-right: 0;
			}
		}

		.alert {
			color: #ccc;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}
`

export default UserStyle
