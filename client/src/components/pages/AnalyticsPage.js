import { useEffect, useState } from 'react'
import useWindowSize from '../../lib/useWindowSize'
import UserStats from '../analytics/UserStats'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserAnalytics } from '../../actions/auth'
import Tooltip from '@material-ui/core/Tooltip'

const AnalyticsPage = () => {
	const analytics = useSelector((state) => state.auth.user.analytics)
	const twAnalytics = useSelector((state) => state.twitter.analytics)
	const [fbStats, setFbStats] = useState(
		analytics?.fbUserAnalytics?.data
			? {
					engaged_users: analytics.fbUserAnalytics.data.page_engaged_users,
					post_engagements:
						analytics.fbUserAnalytics.data.page_post_engagements,
					page_consumptions: analytics.fbUserAnalytics.data.page_consumptions,
					page_negative_feedback:
						analytics.fbUserAnalytics.data.page_negative_feedback,
					page_impressions: analytics.fbUserAnalytics.data.page_impressions,
			  }
			: false
	)
	const [ytStats, setYtStats] = useState(
		analytics?.ytUserAnalytics?.data
			? {
					viewCount: analytics.ytUserAnalytics.data.viewCount,
					subscriberCount: analytics.ytUserAnalytics.data.subscriberCount,
					videoCount: analytics.ytUserAnalytics.data.videoCount,
					totalVideoViewCount:
						analytics.ytUserAnalytics.data.totalVideoViewCount,
					totalLikeCount: analytics.ytUserAnalytics.data.totalLikeCount,
					totalDislikeCount: analytics.ytUserAnalytics.data.totalDislikeCount,
					totalFavoriteCount: analytics.ytUserAnalytics.data.totalFavoriteCount,
					totalCommentCount: analytics.ytUserAnalytics.data.totalCommentCount,
			  }
			: false
	)
	const [twStats, setTwStats] = useState(
		twAnalytics
			? {
					followers: twAnalytics?.followers_count
						? twAnalytics.followers_count
						: '0',
					likeCount: twAnalytics?.favourites_count
						? twAnalytics.favourites_count
						: '0',
					friendsCount: twAnalytics?.friends_count
						? twAnalytics.friends_count
						: '0',
					statusesCount: twAnalytics?.statuses_count
						? twAnalytics.statuses_count
						: '0',
			  }
			: false
	)

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

	// Check if user is authenticated in each social network
	const fbUser = useSelector((store) => store.facebook?.user?.id) !== null
	const ytUser =
		useSelector((store) => store.youtube?.user?.accessToken) !== null
	const twUser =
		useSelector((store) => store.twitter?.user?.request_token) !== null

	useEffect(() => {
		dispatch(updateUserAnalytics())
		const fbAnalytics = analytics?.fbUserAnalytics?.data
			? {
					engaged_users: analytics.fbUserAnalytics.data.page_engaged_users,
					post_engagements:
						analytics.fbUserAnalytics.data.page_post_engagements,
					page_consumptions: analytics.fbUserAnalytics.data.page_consumptions,
					page_negative_feedback:
						analytics.fbUserAnalytics.data.page_negative_feedback,
					page_impressions: analytics.fbUserAnalytics.data.page_impressions,
			  }
			: false

		const ytAnalytics = analytics?.ytUserAnalytics?.data
			? {
					viewCount: analytics.ytUserAnalytics.data.viewCount,
					subscriberCount: analytics.ytUserAnalytics.data.subscriberCount,
					videoCount: analytics.ytUserAnalytics.data.videoCount,
					totalVideoViewCount:
						analytics.ytUserAnalytics.data.totalVideoViewCount,
					totalLikeCount: analytics.ytUserAnalytics.data.totalLikeCount,
					totalDislikeCount: analytics.ytUserAnalytics.data.totalDislikeCount,
					totalFavoriteCount: analytics.ytUserAnalytics.data.totalFavoriteCount,
					totalCommentCount: analytics.ytUserAnalytics.data.totalCommentCount,
			  }
			: false
		const twAn = twAnalytics
			? {
					followers: twAnalytics?.followers_count
						? twAnalytics.followers_count
						: '0',
					likeCount: twAnalytics?.favourites_count
						? twAnalytics.favourites_count
						: '0',
					friendsCount: twAnalytics?.friends_count
						? twAnalytics.friends_count
						: '0',
					statusesCount: twAnalytics?.statuses_count
						? twAnalytics.statuses_count
						: '0',
			  }
			: false

		setYtStats(ytAnalytics)
		setFbStats(fbAnalytics)
		setTwStats(twAn)
	}, [updateUserAnalytics])

	const renderFbTableData = () => {
		if (!fbStats) {
			fbUser = true
			return
		}
		return (
			<tbody className='bg-gray-200'>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex capitalize justify-start'>
						Engaged Users
					</th>
					<td className='px-4 py-2 '>{fbStats.engaged_users}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize'>
						<span>post engagements</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.post_engagements}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize'>
						{' '}
						<span>page consumptions</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_consumptions}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize'>
						<span>page impressions</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_impressions}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex items-center space-x-1 justify-start capitalize'>
						<div>negative feedback</div>
						<div>
							<Tooltip
								title='Number of times people took a negative action (for example, indicating that they no longer like a post or hide it).'
								arrow
							>
								<svg
									className='w-5 h-5 text-gray-400'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path
										fill-rule='evenodd'
										d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
										clip-rule='evenodd'
									/>
								</svg>
							</Tooltip>
						</div>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_negative_feedback}</td>
				</tr>
			</tbody>
		)
	}

	const renderYtTableData = () => {
		if (!ytStats) {
			ytUser = true
			return
		}
		return (
			<tbody className='bg-gray-200'>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex capitalize justify-start'>
						view count
					</th>
					<td className='px-4 py-2 '>{ytStats.viewCount}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>total videos</span>
					</th>
					<td className='px-4 py-2 '>{ytStats.videoCount}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						{' '}
						<span>total likes</span>
					</th>
					<td className='px-4 py-2 '>{ytStats.totalLikeCount}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>total dislikes</span>
					</th>
					<td className='px-4 py-2 '>{ytStats.totalDislikeCount}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>total favorites</span>
					</th>
					<td className='px-4 py-2 '>{ytStats.totalFavoriteCount}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>total comments</span>
					</th>
					<td className='px-4 py-2 '>{ytStats.totalCommentCount}</td>
				</tr>
			</tbody>
		)
	}

	const renderTwTableData = () => {
		if (!twStats) {
			twUser = true
			return
		}
		return (
			<tbody className='bg-gray-200'>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex capitalize justify-start'>
						Total Likes
					</th>
					<td className='px-4 py-2 '>{twStats.likeCount}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex items-center space-x-1 capitalize justify-start'>
						<div>Total friends{'  '}</div>
						<div>
							<Tooltip title='Accounts you follow' arrow>
								<svg
									className='w-5 h-5 text-gray-400'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path
										fill-rule='evenodd'
										d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
										clip-rule='evenodd'
									/>
								</svg>
							</Tooltip>
						</div>
					</th>
					<td className='px-4 py-2 '>{twStats.friendsCount}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex capitalize justify-start'>
						Total statuses
					</th>
					<td className='px-4 py-2 '>{twStats.statusesCount}</td>
				</tr>
			</tbody>
		)
	}

	const isUserAuthenticated = fbUser && ytUser && twUser

	return (
		<div className='p-4'>
			<h1 className='font-semibold text-3xl mb-4'>Analytics</h1>
			{/* Compounded User analytics */}
			{isUserAuthenticated ? null : (
				<div
					className={
						'bg-yellow-100 rounded-md text-gray-600 text-sm p-2 items-center mb-4 text-center'
					}
				>
					<span>
						<svg
							className='w-5 h-5 relative inline-block mr-1'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
							></path>
						</svg>
						Please authenticate in your accounts to see updated analytics!
					</span>
				</div>
			)}

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
				{fbStats && (
					<div className={getComponentsStyle() + ' bg-indigo-200'}>
						<h2 className='font-semibold text-xl mb-4'>Facebook</h2>
						<table id='fbPostStats' className='table-auto '>
							<thead className='justify-between'>
								<tr className='bg-gray-800'>
									<th className='px-4 py-2 text-left text-gray-300'>
										Analytic
									</th>
									<th className='px-4 py-2 text-left text-gray-300'>Value</th>
								</tr>
							</thead>
							{renderFbTableData()}
						</table>
					</div>
				)}
				{ytStats && (
					<div className={getComponentsStyle() + ' bg-red-200'}>
						<h2 className='font-semibold text-xl mb-4'>YouTube</h2>
						<table id='ytPostStats' className='table-auto'>
							<thead className='justify-between'>
								<tr className='bg-gray-800'>
									<th className='px-4 py-2 text-left text-gray-300'>
										Analytic
									</th>
									<th className='px-4 py-2 text-left text-gray-300'>Value</th>
								</tr>
							</thead>
							{renderYtTableData()}
						</table>
					</div>
				)}
				{twStats && (
					<div className={getComponentsStyle() + ' bg-blue-200'}>
						<h2 className='font-semibold text-xl mb-4'>Twitter</h2>
						<table id='twPostStats' className='table-auto'>
							<thead className='justify-between'>
								<tr className='bg-gray-800'>
									<th className='px-4 py-2 text-left text-gray-300'>
										Analytic
									</th>
									<th className='px-4 py-2 text-left text-gray-300'>Value</th>
								</tr>
							</thead>
							{renderTwTableData()}
						</table>
					</div>
				)}
			</div>
		</div>
	)
}

export default AnalyticsPage
