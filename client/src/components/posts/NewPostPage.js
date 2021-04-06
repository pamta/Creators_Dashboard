import twitterIcon from '../../assets/img/twitter_icon.png'
import fbIcon from '../../assets/img/facebook_icon.png'
import ytIcon from '../../assets/img/youtube_icon.png'
import igIcon from '../../assets/img/instagram_icon.png'
import useWindowSize from '../../lib/useWindowSize'
import { useState } from 'react'
import styles from './newPost.module.css'

const NewPostPage = () => {
	const isTablet = useWindowSize().width <= 1080

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full'
			: 'flex flex-row space-x-8'
	}

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [fileNames, setFileNames] = useState([])
	const [videoName, setVideoName] = useState('')

	console.log('title')
	console.log(title)

	const getFieldStyle = () => {
		return isTablet
			? 'flex flex-col w-full space-y-2'
			: 'flex flex-col w-full space-y-2'
	}

	return (
		<div className='p-4'>
			<h1 className='font-semibold text-3xl mb-4'>New post</h1>
			<div
				className={
					'w-full flex flex-col space-y-8 justify-between rounded-md bg-gray-200 p-6'
				}
			>
				<div className={getFieldStyle()}>
					<p>Title</p>
					<div className={'relative rounded-md shadow-sm h-8 w-full'}>
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
					<div className={'relative rounded-md shadow-sm w-full'}>
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

				<div className={getLayoutStyle()}>
					<label
						htmlFor='slide'
						className={'cursor-pointer' + (isTablet ? ' w-full' : ' w-1/2')}
					>
						<input
							name='file'
							type='file'
							multiple
							onChange={(e) => {
								for (let i = 0; i < e.target.files.length; i++) {
									setFileNames((prevFileNames) => [
										...prevFileNames,
										e.target.files[i].name,
									])
								}
							}}
						/>
						<div className='flex flex-row px-3 py-3 justify-center items-center space-x-4 rounded-lg bg-green-200 text-black active:bg-green-400 text-md md:text-md shadow hover:shadow-lg hover:bg-green-400 hover:text-white'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3' />
							</svg>
							<p className='text-center'>Upload images</p>
						</div>
						<div className='flex flex-col w-1/2 text-sm text-gray-500 italic'>
							{fileNames.map((file) => (
								<p>{file}</p>
							))}
						</div>
					</label>

					<label
						htmlFor='video'
						className={'cursor-pointer' + (isTablet ? ' w-full' : ' w-1/2')}
					>
						<input
							name='file'
							type='file'
							onChange={(e) => setVideoName(e.target.value)}
						/>
						<div className='flex flex-row px-3 py-3 justify-center items-center space-x-4 rounded-lg bg-green-400 text-black active:bg-green-600 text-md md:text-md shadow hover:shadow-lg hover:bg-green-600 hover:text-white'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3' />
							</svg>
							<p className='text-center'>Upload video</p>
						</div>
						<div className='flex flex-col w-1/2 text-sm text-gray-500 italic'>
							<p>{videoName.split('\\')[2]}</p>
						</div>
					</label>
				</div>
			</div>
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
