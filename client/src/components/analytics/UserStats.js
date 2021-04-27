import UserStat from './UserStat'

const UserStats = ({ isTablet }) => {
	const getLayoutStyle = () => {
		return isTablet ? 'flex flex-row space-x-8' : 'flex flex-col'
	}

	return (
		<div
			className={
				getLayoutStyle() +
				' w-full justify-center rounded-lg shadow-md bg-gray-100'
			}
		>
			<UserStat
				isTablet={isTablet}
				key={'followers'}
				name={'Followers'}
				stat={'500'}
				isFirst
			/>
			<UserStat
				isTablet={isTablet}
				key={'hearts'}
				name={'Hearts'}
				stat={'255'}
			/>
			<UserStat isTablet={isTablet} key={'likes'} name={'Likes'} stat={'386'} />
		</div>
	)
}

export default UserStats
