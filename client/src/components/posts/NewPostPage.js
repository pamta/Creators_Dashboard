import useWindowSize from '../../lib/useWindowSize'
import { useState } from 'react'
import styles from './newPost.module.css'

const NewPostPage = () => {
	const isTablet = useWindowSize().width <= 1080

	const getComponentStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full'
			: 'flex flex-row space-x-8'
	}

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full'
			: 'flex flex-row space-x-8'
	}

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [fileNames, setFileNames] = useState([])
	const [videoName, setVideoName] = useState('')
	const [isYoutubeSelected, setYoutubeSelected] = useState(false)

	console.log('is ? ' + (isYoutubeSelected ? 'yes' : 'no'))

	return (
		<div className='p-4'>
			<h1 className='font-semibold text-3xl mb-4'>New post</h1>
			<div className={getLayoutStyle()}>
				{/* Blog post component */}
				<div
					className={
						'w-full flex flex-col space-y-8 justify-between rounded-md bg-gray-200 p-6'
					}
				>
					<div className={'flex flex-col w-full space-y-2'}>
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
					<div className={'flex flex-col w-full space-y-2'}>
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

					<div className={getComponentStyle()}>
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

				{/* Social auth component */}
				<div
					className={
						'flex flex-col space-y-4' + (isTablet ? ' w-full' : ' w-72')
					}
				>
					{/* YouTube */}
					<div className='flex flex-col space-y-4 bg-gray-200 rounded-md p-6'>
						<div className='flex flex-row space-x-2 items-center'>
							<button
								className='w-5 h-5 bg-white flex items-center justify-center rounded-xl cursor-pointer'
								onClick={() => setYoutubeSelected(!isYoutubeSelected)}
							>
								{isYoutubeSelected ? (
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='green'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										></path>
									</svg>
								) : (
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='red'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
										></path>
									</svg>
								)}
							</button>
							<svg
								className='w-5 h-5'
								role='img'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<title>YouTube icon</title>
								<path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
							</svg>
							<p>YouTube</p>
						</div>
						{isYoutubeSelected ? <p>selected</p> : <></>}
					</div>
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
