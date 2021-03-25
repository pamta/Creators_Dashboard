import useWindowSize from '../../lib/useWindowSize'
import UserSettingsFields from '../settings/UserSettingsFields'
import UserAuthSettingsFields from '../settings/UserAuthSettingsFields'

import React, { useEffect } from 'react'
//redux
// import { useDispatch, useSelector } from "react-redux";
// import { loadUser } from "../../actions/auth";

const SettingsPage = () => {
	const isTablet = useWindowSize().width <= 1080

	// const dispatch = useDispatch();

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full'
			: 'flex flex-row space-x-8'
	}
	const getComponentsStyle = () => {
		return (
			'flex flex-col justify-left rounded-md p-2 bg-gray-200 p-6' +
			(isTablet ? ' w-full' : ' w-1/2')
		)
	}

	return (
		<div className='p-4'>
			<h1 className='font-semibold text-3xl mb-4'>Settings</h1>
			<div className={getLayoutStyle() + ' justify-between'}>
				<div className={getComponentsStyle()}>
					<h2 className='font-semibold text-xl mb-4'>User Settings</h2>
					<UserSettingsFields />
				</div>
				<div className={getComponentsStyle()}>
					<h2 className='font-semibold text-xl mb-4'>User Authentication</h2>
					<UserAuthSettingsFields />
				</div>
			</div>
		</div>
	)
}

export default SettingsPage
