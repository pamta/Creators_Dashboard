import useWindowSize from '../../lib/useWindowSize'

const SettingsField = ({ fieldName, inputTag, icon }) => {
	const isTablet = useWindowSize().width <= 1080
	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col w-full'
			: 'flex flex-row space-x-8 justify-between'
	}

	return (
		<div className={getLayoutStyle()}>
			<div className='flex flex-row items-center space-x-4'>
				{icon}
				<p>{fieldName}</p>
			</div>
			<div
				className={
					'relative rounded-md shadow-sm h-8' +
					(isTablet ? ' w-full mt-2' : ' w-64')
				}
			>
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					<span className='text-gray-500 sm:text-sm'>@</span>
				</div>
				<input
					type='text'
					name={inputTag}
					id={inputTag}
					className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md h-8'
					placeholder={fieldName + ' handler'}
				></input>
				<div className='absolute inset-y-0 right-0 flex items-center h-8'>
					<label htmlFor={inputTag} className='sr-only'>
						{fieldName}
					</label>
				</div>
			</div>
		</div>
	)
}

export default SettingsField
