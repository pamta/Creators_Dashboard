import { useState } from 'react'
import useWindowSize from '../../lib/useWindowSize'
import UserStats from '../analytics/UserStats'

const AnalyticsPage = () => {
	const [fbStats, setFbStats] = useState({
		engaged_users: 650,
		post_engagements: 1005,
		page_consumptions: 803,
		page_negative_feedback: 113,
		page_impressions: 435,
	})
	const [ytStats, setYtStats] = useState({
		viewCount: 5450,
		subscriberCount: 1851,
		videoCount: 25,
		totalVideoViewCount: 5450,
		totalLikeCount: 5394,
		totalDislikeCount: 248,
		totalFavoriteCount: 1675,
		totalCommentCount: 315,
	})
	const [twStats, setTwStats] = useState()

	const isTablet = useWindowSize().width <= 1080

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full justify-center'
			: 'flex flex-row space-x-8 w-full justify-center'
	}

	const getComponentsStyle = () => {
		return 'flex flex-col justify-left rounded-md p-4 w-full'
	}

	const renderFbTableData = () => {
		if (!fbStats) return
		return (
			<tbody className='bg-gray-200'>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex capitalize justify-start'>
						Engaged Users
					</th>
					<td className='px-4 py-2 '>{fbStats.engaged_users}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>post engagements</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.post_engagements}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						{' '}
						<span>page consumptions</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_consumptions}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>page impressions</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_impressions}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>negative feedback</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_negative_feedback}</td>
				</tr>
			</tbody>
		)
	}

	const renderYtTableData = () => {
		if (!ytStats) return
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
		if (!twStats) return
		return (
			<tbody className='bg-gray-200'>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex capitalize justify-start'>
						Engaged Users
					</th>
					<td className='px-4 py-2 '>{fbStats.engaged_users}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>post engagements</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.post_engagements}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						{' '}
						<span>page consumptions</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_consumptions}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>page impressions</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_impressions}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start capitalize space-x-4'>
						<span>negative feedback</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.page_negative_feedback}</td>
				</tr>
			</tbody>
		)
	}

	return (
		<div className='p-4'>
			<h1 className='font-semibold text-3xl mb-4'>Analytics</h1>
			{/* Compounded User analytics */}

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
				<div className={getComponentsStyle() + ' bg-indigo-200'}>
					<h2 className='font-semibold text-xl mb-4'>Facebook</h2>
					<table id='fbPostStats' className='table-auto '>
						<thead className='justify-between'>
							<tr className='bg-gray-800'>
								<th className='px-4 py-2 text-left text-gray-300'>Analytic</th>
								<th className='px-4 py-2 text-left text-gray-300'>Value</th>
							</tr>
						</thead>
						{renderFbTableData()}
					</table>
				</div>
				<div className={getComponentsStyle() + ' bg-red-200'}>
					<h2 className='font-semibold text-xl mb-4'>YouTube</h2>
					<table id='ytPostStats' className='table-auto'>
						<thead className='justify-between'>
							<tr className='bg-gray-800'>
								<th className='px-4 py-2 text-left text-gray-300'>Analytic</th>
								<th className='px-4 py-2 text-left text-gray-300'>Value</th>
							</tr>
						</thead>
						{renderYtTableData()}
					</table>
				</div>
				<div className={getComponentsStyle() + ' bg-blue-200'}>
					<h2 className='font-semibold text-xl mb-4'>Twitter</h2>
				</div>
			</div>
		</div>
	)
}

export default AnalyticsPage
