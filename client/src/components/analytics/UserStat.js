const UserStat = ({ isTablet, key, icon, name, stat, isFirst }) => {
	const getLayoutStyle = () => {
		return isTablet ? 'flex flex-col space-y-2' : 'grid grid-cols-2 gap-2'
	}

	const getIcon = (sn) => {
		if (sn == 'facebook') {
			return (
				<svg
					className='w-10 h-10'
					role='img'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
				>
					<title>Facebook icon</title>
					<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
				</svg>
			)
		} else if (sn == 'youtube') {
			return (
				<svg
					className='w-10 h-10'
					role='img'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>YouTube icon</title>
					<path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
				</svg>
			)
		} else if (sn == 'twitter') {
			return (
				<svg
					className='w-10 h-10 '
					role='img'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
				>
					<title>Twitter icon</title>
					<path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
				</svg>
			)
		}
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
			<div className='w-full text-2xl lg:text-4xl justify-right'>{stat}</div>
			<div className='flex items-center space-x-4'>
				{getIcon(icon)}
				<p className='text-lg w-full'>{name}</p>
			</div>

			{/* <dt class='text-sm font-medium text-gray-500'>Full name</dt>
			<dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
				Margot Foster
			</dd> */}
		</div>
	)
}

export default UserStat
