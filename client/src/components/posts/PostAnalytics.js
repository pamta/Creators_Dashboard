import useWindowSize from '../../lib/useWindowSize'
import axios from 'axios'
import { FlexibleWidthXYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import haha from '../../assets/img/fbReactions/haha.svg'
import angry from '../../assets/img/fbReactions/angry.svg'
import like from '../../assets/img/fbReactions/like.svg'
import love from '../../assets/img/fbReactions/love.svg'
import sad from '../../assets/img/fbReactions/sad.svg'
import wow from '../../assets/img/fbReactions/wow.svg'
import ytLike from '../../assets/img/ytIcons/ytLike.png'
import dislike from '../../assets/img/ytIcons/dislike.svg'
import favorite from '../../assets/img/ytIcons/favorite.svg'
import comment from '../../assets/img/ytIcons/comment.png'
import views from '../../assets/img/ytIcons/views.png'
import quote from '../../assets/img/twtIcons/quote.png'
import reply from '../../assets/img/twtIcons/reply.svg'
import retweet from '../../assets/img/twtIcons/retweet.png'
import twFav from '../../assets/img/twtIcons/twFav.png'

const myDATA = [
	{ id: '00036', y: 200400, x: 1504121437 },
	{ id: '00036', y: 200350, x: 1504121156 },
	{ id: '00036', y: 200310, x: 1504120874 },
	{ id: '00036', y: 200260, x: 1504120590 },
	{ id: '00036', y: 200210, x: 1504120306 },
	{ id: '00036', y: 200160, x: 1504120024 },
	{ id: '00036', y: 200120, x: 1504119740 },
	{ id: '00036', y: 200070, x: 1504119458 },
	{ id: '00036', y: 200020, x: 1504119177 },
	{ id: '00036', y: 199980, x: 1504118893 },
	{ id: '00036', y: 199930, x: 1504118611 },
	{ id: '00036', y: 199880, x: 1504118330 },
	{ id: '00036', y: 199830, x: 1504118048 },
	{ id: '00036', y: 199790, x: 1504117763 },
	{ id: '00036', y: 199740, x: 1504117481 },
]

const yDomain = myDATA.reduce(
	(res, row) => {
		return {
			max: Math.max(res.max, row.y),
			min: Math.min(res.min, row.y),
		}
	},
	{ max: -Infinity, min: Infinity }
)

// const analytics = (postId) => async () => {
//     try {
//         const res = await axios.get("/api/publication/" + postId + "/analytics");
//         return res.data;
//     } catch (error) {
//         console.log(error.response.data.error);
//     }
// };

const PostAnalytics = () => {
	const facebook = useSelector((state) => state.facebook)

	const getPostAnalytics = async (postId) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
			const body = JSON.stringify({
				fbPageAccessToken: facebook.pages.selectedPageInfo.longLivedToken,
			})

			const requestLink = `/api/publication/${postId}/update/analytics`
			const res = await axios.put(requestLink, body, config)
			return res.data
		} catch (err) {
			const requestLink = `/api/publication/${postId}/analytics`
			const res = await axios.get(requestLink)
			return res.data
		}
	}

	const post = useSelector((state) => state.post)
	const [selectedPost, setSelectedPost] = useState()
	const [fbStats, setFbStats] = useState({
		engaged_users: 1050,
		likes: 569,
		love: 200,
		wow: 100,
		haha: 50,
		sorry: 50,
		anger: 50,
		totalReactions: 1019,
	})
	const [ytStats, setYtStats] = useState({
		view_count: 2500,
		like_count: 1350,
		dislike_count: 158,
		favorite_count: 101,
		comment_count: 1081,
	})
	const [twStats, setTwStats] = useState({
		quote_count: 106,
		reply_count: 22,
		retweet_count: 345,
		favorite_count: 407,
	})
	const [onFb, isOnFb] = useState(false)
	const [onTw, isOnTw] = useState(false)
	const [onYt, isOnYt] = useState(false)

	let { id } = useParams()

	useEffect(() => {
		//console.log(id + " : " + post.posts);
		const selected_post = post.posts.find((somePost) => {
			return somePost._id == id
		})

		if (selected_post) {
			setSelectedPost(selected_post)
		}
		;(async function () {
			try {
				let x = await getPostAnalytics(id)
				console.log(x)
				//const res = await axios.get('/api/publication/' + id + '/analytics')
				//console.log(res.data)
				//setAnalytics(res.data)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [post.posts])

	const setAnalytics = (postsInSN) => {
		postsInSN.forEach((elem) => {
			if (elem[0].socialNetwork == 'Facebook') {
				isOnFb(true)
				setFbStats({
					engaged_users: elem[0].data.post_engaged_users,
					likes: elem[0].data.post_reactions_like_total,
					love: elem[0].data.post_reactions_love_total,
					wow: elem[0].data.post_reactions_wow_total,
					haha: elem[0].data.post_reactions_haha_total,
					sorry: elem[0].data.post_reactions_sorry_total,
					anger: elem[0].data.post_reactions_anger_total,
					totalReactions:
						Number(elem[0].data.post_reactions_like_total) +
						Number(elem[0].data.post_reactions_love_total) +
						Number(elem[0].data.post_reactions_wow_total) +
						Number(elem[0].data.post_reactions_haha_total) +
						Number(elem[0].data.post_reactions_sorry_total) +
						Number(elem[0].data.post_reactions_anger_total),
				})
			} else if (elem[0].socialNetwork == 'Youtube') {
				isOnYt(true)
				setYtStats({
					view_count: elem[0].data.viewCount,
					like_count: elem[0].data.likeCount,
					dislike_count: elem[0].data.dislikeCount,
					favorite_count: elem[0].data.favoriteCount,
					comment_count: elem[0].data.commentCount,
				})
			} else if (elem[0].socialNetwork == 'Twitter') {
				isOnTw(true)
				setTwStats({
					quote_count: elem[0].data.quote_count,
					reply_count: elem[0].data.reply_count,
					retweet_count: elem[0].data.retweet_count,
					favorite_count: elem[0].data.favorite_count,
				})
			}
		})
	}

	const isTablet = useWindowSize().width <= 1080

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full justify-center'
			: 'flex flex-row w-full justify-center'
	}

	const getComponentsStyle = () => {
		return (
			'flex flex-col justify-left rounded-md p-4 w-full' +
			(isTablet ? '' : ' m-4 ')
		)
	}

	const renderFbTableData = () => {
		if (!fbStats) return
		return (
			<tbody className='bg-gray-200'>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start'>Engaged Users</th>
					<td className='px-4 py-2 '>{fbStats.engaged_users}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block' src={like} /> <span>Likes</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.likes}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block' src={love} />{' '}
						<span>Love Reaction</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.love}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block' src={wow} /> <span>Wow Reaction</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.wow}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block' src={sad} />{' '}
						<span>Sorry Reaction</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.sorry}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block' src={haha} />{' '}
						<span>Haha Reaction</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.haha}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block' src={angry} />{' '}
						<span>Anger Reaction</span>
					</th>
					<td className='px-4 py-2 '>{fbStats.anger}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start'>Total Reactions</th>
					<td className='px-4 py-2 '>{fbStats.totalReactions}</td>
				</tr>
			</tbody>
		)
	}

	const renderYtTableData = () => {
		return (
			<tbody className='bg-gray-200'>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block h-5' src={views} />{' '}
						<span>View Count</span>{' '}
					</th>
					<td className='px-4 py-2 '>{ytStats.view_count}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block' src={ytLike} /> <span>Likes</span>{' '}
					</th>
					<td className='px-4 py-2 '>{ytStats.like_count}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block w-5' src={dislike} />{' '}
						<span>Dislikes</span>{' '}
					</th>
					<td className='px-4 py-2 '>{ytStats.dislike_count}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block w-5' src={favorite} />{' '}
						<span>Favorite Count</span>{' '}
					</th>
					<td className='px-4 py-2 '>{ytStats.favorite_count}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block h-5' src={comment} />{' '}
						<span>Comments</span>{' '}
					</th>
					<td className='px-4 py-2 '>{ytStats.comment_count}</td>
				</tr>
			</tbody>
		)
	}

	const renderTwTableData = () => {
		return (
			<tbody className='bg-gray-200'>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block h-5' src={quote} /> <span>Quotes</span>{' '}
					</th>
					<td className='px-4 py-2 '>{twStats.quote_count}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block w-5' src={reply} />{' '}
						<span>Replies</span>{' '}
					</th>
					<td className='px-4 py-2 '>{twStats.reply_count}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block h-5' src={retweet} />{' '}
						<span>Retweets</span>{' '}
					</th>
					<td className='px-4 py-2 '>{twStats.retweet_count}</td>
				</tr>
				<tr className='bg-white border-4 border-gray-200'>
					<th className='px-4 py-2 flex justify-start space-x-4'>
						<img className='inline-block h-5' src={twFav} />{' '}
						<span>Favorites</span>{' '}
					</th>
					<td className='px-4 py-2 '>{twStats.favorite_count}</td>
				</tr>
			</tbody>
		)
	}

	const showStats = (check) => {
		if (check) {
			return ''
		} else {
			return 'hidden '
		}
	}

	const noSocialNwPost = () => {
		return (
			<div
				className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md m-4'
				role='alert'
			>
				<div className='flex'>
					<div className='py-1'>
						<svg
							className='fill-current h-6 w-6 text-teal-500 mr-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
						>
							<path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
						</svg>
					</div>
					<div>
						<p className='font-bold'>
							This post has not been published in any social network yet
						</p>
						<p className='text-sm'>
							Analytics will show up here once it's been published.
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col px-4 py-8'>
			{/* Compounded post analytics */}
			<div
				className={
					'rounded-md p-4 bg-green-200' + (isTablet ? ' mb-8' : ' m-4')
				}
			>
				<div className='flex flex-col justify-center'>
					<h2 className='font-semibold text-xl mb-4'>Analytics</h2>
					<div className='w-19/20 self-center'>
						<FlexibleWidthXYPlot
							margin={{ left: 75 }}
							xType='time'
							height={300}
							yDomain={[yDomain.min, yDomain.max]}
						>
							<VerticalBarSeries
								className='vertical-bar-series-example'
								data={myDATA}
							/>
							<XAxis />
							<YAxis />
						</FlexibleWidthXYPlot>
					</div>
				</div>
			</div>
			{/* Social specific analytics */}

			<div className={getLayoutStyle()}>
				<div
					className={showStats(onFb) + getComponentsStyle() + ' bg-indigo-200'}
				>
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
				<div className={showStats(onYt) + getComponentsStyle() + ' bg-red-200'}>
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
				<div
					className={showStats(onTw) + getComponentsStyle() + ' bg-blue-200'}
				>
					<h2 className='font-semibold text-xl mb-4'>Twitter</h2>
					<table id='ytPostStats' className='table-auto '>
						<thead className='justify-between'>
							<tr className='bg-gray-800'>
								<th className='px-4 py-2 text-left text-gray-300'>Analytic</th>
								<th className='px-4 py-2 text-left text-gray-300'>Value</th>
							</tr>
						</thead>
						{renderTwTableData()}
					</table>
				</div>
			</div>
			{!onFb && !onTw && !onYt && noSocialNwPost()}
		</div>
	)
}

export default PostAnalytics
