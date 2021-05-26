import UserStat from './UserStat'
import { useSelector } from 'react-redux'

const UserStats = ({ isTablet }) => {
	const posts = useSelector((state) => state.post.posts)
	const analytics = useSelector((state) => state.auth.user.analytics)
	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-row space-x-8 overflow-x-auto'
			: 'flex flex-col'
	}
	console.log(analytics)
	return (
		<div
			className={getLayoutStyle() + ' w-full rounded-lg shadow-md bg-gray-100'}
		>
			<UserStat
				isTablet={isTablet}
				key={'posts'}
				name={'Posts Created'}
				stat={posts.length}
				isFirst
			/>
			<UserStat
				isTablet={isTablet}
				key={'fbFollowers'}
				icon={'facebook'}
				name={'Page Followers'}
				stat={
					analytics.fbUserAnalytics?.data != null
						? analytics.fbUserAnalytics?.data.page_fans
						: '0'
				}
			/>
			<UserStat
				isTablet={isTablet}
				key={'subscribers'}
				icon={'youtube'}
				name={'Subscribers'}
				stat={
					analytics.ytUserAnalytics?.data != null
						? analytics.ytUserAnalytics?.data?.subscriberCount
						: '0'
				}
			/>
			<UserStat
				isTablet={isTablet}
				key={'twFollowers'}
				icon={'twitter'}
				name={'Followers'}
				stat={'749 (placeholder)'}
			/>
		</div>
	)
}

export default UserStats
