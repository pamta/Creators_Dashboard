import { useEffect } from 'react'
import useWindowSize from '../../lib/useWindowSize'
import UserStats from '../analytics/UserStats'
import { useDispatch } from 'react-redux'
import { updateUserAnalytics } from '../../actions/auth'
const AnalyticsPage = () => {
	const isTablet = useWindowSize().width <= 1080

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full justify-center'
			: 'flex flex-row space-x-8 w-full justify-center'
	}

	const getComponentsStyle = () => {
		return 'flex flex-col justify-left rounded-md p-4 w-full'
	}

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(updateUserAnalytics())
	}, [updateUserAnalytics])

	return (
		<div className='p-4'>
			<h1 className='font-semibold text-3xl mb-4'>Analytics</h1>
			{/* Compounded User analytics */}

			<div className={getLayoutStyle() + ' mb-8'}>
				<div
					className={
						'flex flex-col justify-left rounded-md p-4 ' +
						(isTablet ? ' w-full' : ' w-1/3')
					}
				>
					<UserStats isTablet={isTablet} />
				</div>
				<div
					className={
						'flex flex-col justify-left rounded-md p-4 bg-green-200' +
						(isTablet ? ' w-full' : ' w-2/3')
					}
				>
					<h2 className='font-semibold text-xl mb-4'>User Analytics</h2>
				</div>
			</div>
			{/* Social specific analytics */}
			<div className={getLayoutStyle()}>
				<div className={getComponentsStyle() + ' bg-indigo-200'}>
					<h2 className='font-semibold text-xl mb-4'>Facebook</h2>
				</div>
				<div className={getComponentsStyle() + ' bg-red-200'}>
					<h2 className='font-semibold text-xl mb-4'>YouTube</h2>
				</div>
				<div className={getComponentsStyle() + ' bg-blue-200'}>
					<h2 className='font-semibold text-xl mb-4'>Twitter</h2>
				</div>
			</div>
		</div>
	)
}

export default AnalyticsPage
