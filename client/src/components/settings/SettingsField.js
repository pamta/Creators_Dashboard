import useWindowSize from '../../lib/useWindowSize'

const SettingsField = ({
	fieldName,
	inputTag,
	icon,
	textValue,
	authenticate,
}) => {
	const isTablet = useWindowSize().width <= 1080
	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col w-full'
			: 'flex flex-row space-x-8 justify-between'
	}

	// If it received the handler name, it means user is authenticated
	const isAuthenticated = true

	return (
		<div className={getLayoutStyle()}>
			<div className='flex flex-row items-center space-x-4'>
				{icon}
				<p>{fieldName}</p>
			</div>
			<div
				className={
					'flex flex-row space-x-4 items-center ' + (isTablet ? 'mt-2' : 'mr-2')
				}
			>
				<div
					className={
						'relative rounded-md shadow-sm h-8' +
						(isTablet ? ' w-full' : ' w-full')
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
						value={textValue ? textValue : ''}
						readOnly
					></input>
					<div className='absolute inset-y-0 right-0 flex items-center h-8'>
						<label htmlFor={inputTag} className='sr-only'>
							{fieldName}
						</label>
					</div>
				</div>
				<button onClick={authenticate}>
					<div className={'bg-red-400 p-2 rounded-md hover:bg-red-600'}>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='white'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
							></path>
						</svg>
					</div>
				</button>
			</div>
		</div>
	)
}

export default SettingsField
