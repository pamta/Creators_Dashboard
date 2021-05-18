import { useSelector } from 'react-redux'
import useWindowSize from '../../lib/useWindowSize'
import { Link } from 'react-router-dom'
import videoImage from '../../assets/img/play.png'
import SettingsField from '../settings/SettingsField'

const LandingPage = () => {
	const isTablet = useWindowSize().width <= 1080

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-4 w-full justify-center mt-4'
			: 'flex flex-row space-x-8 w-full justify-center mt-4'
	}
	const name = useSelector((state) => state.auth.user.name)
	const note = useSelector((state) => state.note.notes[0])
	const post = useSelector((state) => state.post.posts[0])
	const ytHandler = useSelector((state) => state.youtube.user.channelName) ?? ''
	const fbPageHandler =
		useSelector((state) => state.facebook.pages.selectedPageInfo) ?? ''

	const postCard =
		post == null ? null : (
			<div className=''>
				<Link key={post._id} to={`/post/${post._id}`}>
					<div
						className={
							'bg-gray-100 border border-gray-200 p-4 rounded-md cursor-pointer'
						}
					>
						<div className='flex flex-col md:flex-row'>
							<div className='self-center md:self-auto'>
								{post.images[0] && (
									<img
										className='w-32 rounded-md object-cover'
										src={post.images[0].URL}
									/>
								)}
								{!post.images[0] && post.video && (
									<img
										className='w-32 rounded-md object-cover'
										src={videoImage}
									/>
								)}
							</div>

							<div id='body' className='flex flex-col ml-5'>
								<h4
									id='title'
									className='text-center md:text-left text-lg md:text-xl font-semibold mb-2'
								>
									{post.name}
								</h4>
								{post.text && (
									<p
										id='content'
										className='text-gray-800 text-center mt-2 truncate'
									>
										{post.text}
									</p>
								)}
								<div className='self-center md:self-auto flex mt-5'>
									<p className='text-gray-400 text-sm md:text-base'>
										{post.creationDate.substring(0, 10)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</div>
		)

	const accounts = (
		<div className='space-y-4 p-4'>
			<SettingsField
				fieldName='Twitter'
				inputTag='twitter-handler'
				icon={
					<svg
						className='w-6 h-6'
						role='img'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
					>
						<title>Twitter icon</title>
						<path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
					</svg>
				}
			/>
			<SettingsField
				fieldName='Facebook'
				inputTag='facebook-handler'
				textValue={fbPageHandler}
				icon={
					<svg
						className='w-6 h-6'
						role='img'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
					>
						<title>Facebook icon</title>
						<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
					</svg>
				}
			/>
			<SettingsField
				fieldName='YouTube'
				inputTag='youtube-handler'
				textValue={ytHandler}
				icon={
					<svg
						className='w-6 h-6'
						role='img'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>YouTube icon</title>
						<path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
					</svg>
				}
			/>
		</div>
	)

	const noteCard =
		note == null ? null : (
			<div className='w-full bg-white rounded-md p-4'>
				<Link key={note._id} to={`/notes/${note._id}`}>
					<div className='flex flex-row justify-between border-0 border-solid border-b-2 border-red-500'>
						<p className='font-semibold'>{note.name}</p>
						<div className='flex-none text-yellow-900 text-opacity-90 text-sm '>
							{note.creationDate.substring(0, 10)}
						</div>
					</div>
					<p className='pt-2'>{note.text}</p>
				</Link>
			</div>
		)

	return (
		<div className='p-4 py-6'>
			<section className='p-4 rounded-lg w-full h-full bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 text-center'>
				<h1 className='font-semibold text-3xl my-2'>Welcome back, {name}!</h1>
			</section>
			<div className={getLayoutStyle()}>
				<div className='flex flex-col justify-center w-full bg-green-200 rounded-lg p-6'>
					<h2 className='font-semibold text-xl mb-4'>Your Latest Post</h2>
					{postCard}
				</div>
				<div className='w-full bg-blue-200 rounded-lg p-6'>
					<h2 className='font-semibold text-xl mb-4'>How you're doing</h2>
				</div>
			</div>
			<div className={getLayoutStyle()}>
				<div className='w-full bg-yellow-200 rounded-lg p-6'>
					<h2 className='font-semibold text-xl mb-4'>Your creative space</h2>
					{noteCard}
				</div>
				<div className='w-full bg-gray-200 rounded-lg p-6'>
					<h2 className='font-semibold text-xl mb-4'>
						Your connected accounts
					</h2>
					{accounts}
				</div>
			</div>
		</div>
	)
}

export default LandingPage
