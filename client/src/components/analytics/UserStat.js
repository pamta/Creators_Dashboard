const UserStat = ({ isTablet, key, name, stat, isFirst }) => {
	const getLayoutStyle = () => {
		return isTablet ? 'flex flex-col space-y-2' : 'flex flex-row space-x-2'
	}

	return (
		<div
			key={key}
			className={
				getLayoutStyle() +
				' p-4 items-center justify-center' +
				(!isFirst && isTablet ? ' border-l border-gray-200' : '') +
				(!isFirst && !isTablet ? ' border-t border-gray-200' : '')
			}
		>
			<div className='w-full text-4xl justify-right'>{stat}</div>
			<p className='text-lg w-full'>{name}</p>

			{/* <dt class='text-sm font-medium text-gray-500'>Full name</dt>
			<dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
				Margot Foster
			</dd> */}
		</div>
	)
}

export default UserStat
