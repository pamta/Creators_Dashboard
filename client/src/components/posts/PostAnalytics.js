import useWindowSize from '../../lib/useWindowSize'

const PostAnalytics = () => {
	const isTablet = useWindowSize().width <= 1080

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full justify-center'
			: 'flex flex-row w-full justify-center'
	}

	const getComponentsStyle = () => {
		return (
			'flex flex-col justify-left rounded-md p-4 w-full' +
			(isTablet ? '' : ' m-4')
		)
	}

	return (
		<div className='py-8'>
			{/* Compounded post analytics */}
			<div
				className={
					'rounded-md p-4 bg-green-200' + (isTablet ? ' mb-8' : ' m-4')
				}
			>
				<h2 className='font-semibold text-xl mb-4'>Analytics</h2>
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

export default PostAnalytics
