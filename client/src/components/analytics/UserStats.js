import UserStat from './UserStat'
import { useSelector } from 'react-redux'

const UserStats = ({ isTablet }) => {
	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-row space-x-8 overflow-x-auto'
			: 'flex flex-col'
	}

	return (
		<div
			className={getLayoutStyle() + ' w-full rounded-lg shadow-md bg-gray-100'}
		>
			<UserStat
				isTablet={isTablet}
				key={'posts'}
				name={'Posts Created'}
				stat={'15'}
				isFirst
			/>
			<UserStat
				isTablet={isTablet}
				key={'fbFollowers'}
				icon={'facebook'}
				name={'Page Followers'}
				stat={'586'}
			/>
			<UserStat
				isTablet={isTablet}
				key={'subscribers'}
				icon={'youtube'}
				name={'Subscribers'}
				stat={'1851'}
			/>
			<UserStat
				isTablet={isTablet}
				key={'twFollowers'}
				icon={'twitter'}
				name={'Followers'}
				stat={'749'}
			/>
		</div>
	)
}

export default UserStats
