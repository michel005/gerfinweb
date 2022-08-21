import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ConfigProvider from './hook/Config.context'
import LocalizationProvider from './hook/Localization.context'
import MessageProvider from './hook/Message.context'
import PageProvider from './hook/Page.context'
import TableProvider from './hook/Table.context'
import UserProvider from './hook/User.context'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<LocalizationProvider>
			<UserProvider>
				<PageProvider>
					<ConfigProvider>
						<MessageProvider>
							<TableProvider>
								<App />
							</TableProvider>
						</MessageProvider>
					</ConfigProvider>
				</PageProvider>
			</UserProvider>
		</LocalizationProvider>
	</React.StrictMode>
)

