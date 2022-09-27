import {
	faBank,
	faHome,
	faIdCard,
	faMoneyBillTrendUp,
	faTarp,
	faUser,
} from '@fortawesome/free-solid-svg-icons'

const PageSettings = {
	dashboard: {
		name: 'dashboard',
		path: '/',
		icon: faHome,
	},
	account: {
		name: 'account',
		path: '/account',
		icon: faBank,
	},
	movement: {
		name: 'movement',
		path: '/movement',
		icon: faMoneyBillTrendUp,
	},
	template: {
		name: 'template',
		path: '/template',
		icon: faIdCard,
	},
	target: {
		name: 'target',
		path: '/target',
		icon: faTarp,
	},
	user: {
		name: 'user',
		path: '/user',
		icon: faUser,
	},
}

export default PageSettings
