import twitterIcon from '../../assets/img/twitter_icon.png'
import fbIcon from '../../assets/img/facebook_icon.png'
import ytIcon from '../../assets/img/youtube_icon.png'
import igIcon from '../../assets/img/instagram_icon.png'
import useWindowSize from '../../lib/useWindowSize'
import { useState } from 'react'

const NewPostPage = () => {
	const isTablet = useWindowSize().width <= 1080

	// const getLayoutStyle = () => {
	// 	return isTablet
	// 		? 'flex flex-col space-y-8 w-full'
	// 		: 'flex flex-row space-x-8'
	// }
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	console.log('title')
	console.log(title)
	console.log(content)

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full'
			: 'flex flex-col space-y-8 justify-between'
	}

	const getFieldStyle = () => {
		return isTablet
			? 'flex flex-col w-full space-y-2'
			: 'flex flex-row justify-between space-x-8'
	}

	return (
		<div className='p-4'>
			<h1 className='font-semibold text-3xl mb-4'>New post</h1>
			<div
				className={
					'w-full flex flex-col space-y-8 justify-between rounded-md bg-gray-200 p-6'
				}
			>
				<div className={getFieldStyle() + ' items-center '}>
					<p>Title</p>
					<div className={'relative rounded-md shadow-sm h-8 w-2/3'}>
						<input
							name={'Title'}
							id={'title'}
							placeholder={'Title'}
							className='focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8 p-2'
							onChange={(e) => setTitle(e.target.value)}
						/>
						<div className='absolute flex items-left h-8 w-full'>
							<label htmlFor={'title'} className='sr-only'></label>
						</div>
					</div>
				</div>
				<div className={getFieldStyle()}>
					<p>Content</p>
					<div className={'relative rounded-md shadow-sm w-2/3 bg-white'}>
						<textarea
							name={'Content'}
							id={'content'}
							placeholder={'Content'}
							className='focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2'
							onChange={(e) => setContent(e.target.value)}
							rows='5'
						/>
					</div>
				</div>
			</div>
			{/* <div className='flex-auto min-w-full shadow-lg rounded-lg px-5 py-5 bg-green-200'>
				<form className='form text-gray-900 '>
					<div className='flex flex-col w-full'>
						<div className='flex py-2 justify-between'>
							<div className='flex flex-row'>
								<div className='px-3 py-3 text-xl md:text-2xl font-bold'>
									Title:
								</div>
								<input
									type='text'
									className='px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-base md:text-xl shadow focus:outline-none focus:shadow-outline'
									placeholder='Post Title'
									style={{ transition: 'all .15s ease' }}
								/>
							</div>
							<div className='flex flex-row'>
								<div className='px-4 py-3 text-xl md:text-2xl font-bold'>
									Platform:
								</div>
								<div className='flex items-center'>
									<input type='checkbox' name='twitter' className='w-4 h-4' />
									<img
										className='pl-2 pr-4 w-12 md:w-16 h-auto'
										src={twitterIcon}
									/>
									<input type='checkbox' name='facebook' className='w-4 h-4' />
									<img className='pl-2 pr-4 w-12 md:w-16 h-auto' src={fbIcon} />
									<input type='checkbox' name='youtube' className='w-4 h-4' />
									<img className='pl-2 pr-4 w-12 md:w-16 h-auto' src={ytIcon} />
									<input type='checkbox' name='instagram' className='w-4 h-4' />
									<img className='pl-2 pr-4 w-12 md:w-16 h-auto' src={igIcon} />
								</div>
							</div>
						</div>
						<div className='px-3 py-3 text-xl md:text-2xl font-bold w-2/3'>
							Content:
						</div>
						<textarea
							required
							className='px-3 py-3 resize-none w-2/3 placeholder-gray-400 text-gray-700 bg-white rounded text-base md:text-xl'
							rows='20'
							placeholder='My new post'
						/>
						<div className='flex flex-row py-3 items-center'>
							<button className='flex flex-row px-3 py-3 justify-start items-center space-x-4 rounded-lg bg-green-600 text-black active:bg-green-400 text-base md:text-2xl shadow hover:shadow-lg hover:bg-green-700 hover:text-white'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3' />
								</svg>
								<p>Upload</p>
							</button>
							<div className='px-4 text-base md:text-xl text-blue-500'>
								file1.png
							</div>
						</div>
						<div className='flex justify-end'>
							<button className=' px-10 py-5 rounded-lg bg-green-600 text-black active:bg-green-400 text-2xl md:text-4xl font-bold shadow hover:shadow-lg hover:bg-green-700 hover:text-white'>
								Done
							</button>
						</div>
					</div>
				</form>
			</div> */}
			<div className='py-5 float-right'>
				<button className='p-2 text-sm md:text-sm rounded-lg bg-gray-400 text-black flex flex-row justify-center items-center space-x-2 hover:bg-gray-600 hover:text-white'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M19 12H6M12 5l-7 7 7 7' />
					</svg>
					<p>Back</p>
				</button>
			</div>
		</div>
	)
}

export default NewPostPage
