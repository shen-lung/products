import * as React from 'react'
import * as ReactDOM from 'react-dom'

import AppContextProvider from './context/AppContext'

import App from './App'

ReactDOM.render(
	<AppContextProvider>
		<App />
	</AppContextProvider>,
	document.getElementById('root'),
)
