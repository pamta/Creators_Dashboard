import useWindowSize from '../../lib/useWindowSize'

const SimpleSettingsField = ({ fieldName, inputTag }) => {
	const isTablet = useWindowSize().width <= 1080
	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col w-full'
			: 'flex flex-row space-x-8 justify-between'
	}

	return (
		<div className={getLayoutStyle()}>
			<p>{fieldName}</p>
			<div
				className={
					'relative rounded-md shadow-sm h-8' +
					(isTablet ? ' w-full mt-2' : ' w-64')
				}
			>
				<input
					type='text'
					name={inputTag}
					id={inputTag}
					className='focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8 p-2'
					placeholder='placeholder'
				/>
				<div className='absolute flex items-left h-8 w-full'>
					<label htmlFor={inputTag} className='sr-only'>
						Handler
					</label>
				</div>
			</div>
		</div>
	)
}

export default SimpleSettingsField
