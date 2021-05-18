import { useEffect, useState } from 'react'
import Switch from 'react-switch'
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom'
import { useParams } from 'react-router'

import useWindowSize from '../../lib/useWindowSize'
import LoadingBar from './LoadingBar'
import ConfirmModal from '../layout/ConfirmModal'
import AddSVG from '../layout/AddSVG'

import { socket } from '../../service/socket'

import styles from './newPost.module.css'

//redux
import { useSelector, useDispatch } from 'react-redux'
import {
	uploadImages,
	uploadVideo,
	updateText,
	updateTitle,
	loadPosts,
	deletePost,
	removeText,
	deleteVideo,
	deleteImage,
	deleteImages,
	addNote,
} from '../../actions/post'
import { setAlert } from '../../actions/alert'
import { publishPostToFb } from '../../actions/facebook'
import { publishVideoToYT } from '../../actions/youtube'
import { createNote } from '../../actions/note'

const EditPostPage = ({ match }) => {
	const [selectedPost, setSelectedPost] = useState()
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [fileNames, setFileNames] = useState([])
	const [videoName, setVideoName] = useState('')
	const [isYoutubeSelected, setYoutubeSelected] = useState(false)
	const [isFacebookSelected, setFacebookSelected] = useState(false)
	const [isTwitterSelected, setTwitterSelected] = useState(false)
	const [isPublicYoutube, setIsPublicYoutube] = useState(false)
	const [isFbVideoUsed, setIsFbVideoUsed] = useState(false)

	const [videoUploadProgress, setVideoUploadProgress] = useState(null)

	const [open, setOpen] = useState(false)
	const [newTitle, setNewTitle] = useState()
	const [redirect, setRedirect] = useState()

	const dispatch = useDispatch()
	const post = useSelector((state) => state.post)
	const note = useSelector((state) => state.note)

	let history = useHistory()
	let { id } = useParams()

	const isTablet = useWindowSize().width <= 1080

	const closeModal = () => {
		setOpen(false)
		setNewTitle('')
	}

	const newNote = (e) => {
		if (!newTitle) {
			dispatch(setAlert('A Note title is required', 'danger'))
			return
		}

		console.log('Creating note: ' + newTitle)
		dispatch(createNote(newTitle, 'my text')).then(
			(newnote) => {
				dispatch(addNote(id, newnote._id)).then((post) => {
					setRedirect(`/notes/${newnote._id}`)
				})
			},
			(error) => {
				//
			}
		)
	}

	const newNoteModalBody = () => {
		return (
			<div>
				<h4>Give this Note a tite:</h4>
				<br></br>
				<input
					type='text'
					name='newTitle'
					id='newTitle'
					placeholder='Title'
					className='focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8 p-2 bg-gray-200'
					onChange={(e) => {
						setNewTitle(e.target.value)
					}}
				/>
			</div>
		)
	}

	//calls to actions

	const uploadVideoFromInput = (e) => {
		var videofile = document.querySelector('#video')
		dispatch(uploadVideo(videofile, id))
	}

	const uploadImagesFromInput = (e) => {
		var imagesfile = document.querySelector('#images')
		const ammount = imagesfile.files.length
		console.log(imagesfile.files)
		dispatch(uploadImages(imagesfile, id, ammount))
	}

	const deleteCurrentPost = (e) => {
		dispatch(deletePost(id))
		setRedirect(`/posts`)
	}

	const updateTitleFromInput = (e) => {
		dispatch(updateTitle(title, id))
	}

	const updateTextFromInput = (e) => {
		dispatch(updateText(content, id))
	}

	const publishToSN = (e) => {
		if (!(isFacebookSelected || isYoutubeSelected || isTwitterSelected)) {
			dispatch(
				setAlert(
					'Please select atleast one social network to publish to',
					'danger'
				)
			)
		}

		try {
			if (isFacebookSelected) {
				//let hasVideo = selectedPost && selectedPost?.video?.URL
				dispatch(publishPostToFb(id, isFbVideoUsed))
			}
			if (isYoutubeSelected) {
				const publicationID = id
				dispatch(
					publishVideoToYT(
						selectedPost.video.URL,
						title,
						content,
						isPublicYoutube,
						publicationID
					)
				)
			}
			if (isTwitterSelected) {
			}
			//TODO wait for async dispatchs
			dispatch(setAlert('Succesful publish', 'success'))
		} catch (err) {
			dispatch(setAlert('Unexpected error while publishing: ' + err, 'danger'))
		}
	}

	//Style
	const getComponentStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full'
			: 'flex flex-row space-x-8'
	}

	const getUploadsStyle = () => {
		return isTablet ? 'flex flex-col space-y-8 w-full' : 'flex flex-row'
	}

	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col space-y-8 w-full'
			: 'flex flex-row space-x-8'
	}

	useEffect(() => {
		const selected_post = post.posts.find((somePost) => {
			return somePost._id == id
		})

		if (selected_post) {
			setSelectedPost(selected_post)
			setTitle(selected_post.name)
			setContent(selected_post.text)
		} else {
			//setRedirect(`/posts`); //redirect to posts
		}

		//socket session connection
		socket.emit('connectInit', id)
		console.log('new socket Innit emition')

		socket.on('disconnect', () => {
			console.log('Client disconnected')
			// socket.emit('connectEnd', id);

			/* handle disconnect events - possibly reconnect? */
			if (
				socket?.socket?.connected === false &&
				socket?.socket?.connecting === false
			) {
				// use a connect() or reconnect() here if you want
				console.log('Client reconnecting')
				socket.socket.connect()
			}
		})

		socket.io.on('reconnect_attempt', () => {
			console.log('Attemping reconnection')
		})

		// socket.on('reconnect', function () {
		// 	/* handle reconnect events */
		// 	console.log("Client reconnected");
		// });

		socket.on('reload', (data) => {
			console.log('reloading because of: ' + data)

			if (data == 'video') {
				setVideoUploadProgress(null)
			}
			dispatch(loadPosts()) //TODO: crete a new action loadPost(id) to only reload the current post
		})

		socket.on('end', (data) => {
			console.log('Ended upload of: ' + data)
			// if (data == "video"){
			// 	setVideoUploadProgress(null);
			// }

			dispatch(setAlert(`Succesfullly added ${data}`, 'success'))
		})

		socket.on('delete', (data) => {
			console.log('Succesfully deleted ' + data)

			dispatch(setAlert(`Succesfully deleted ${data}`, 'success'))
		})

		socket.on('uploaderror', (data) => {
			console.log('Errror on: ' + data)

			dispatch(setAlert(`Eror on ${data} upload, please try again`, 'danger'))
		})

		socket.on('uploadProgress', (data) => {
			//console.log(data);
			setVideoUploadProgress(data)
		})

		return () => {
			socket.emit('connectEnd', id)
			socket.removeAllListeners()
		}
	}, [post.posts])

	if (redirect) {
		return <Redirect to={redirect} />
	}
	const backbtn = () => {
		if (match && match.path === '/editpost/:id') {
			return (
				<div className='py-5 float-left '>
					<button
						className='flex flex-row justify-center items-center space-x-2 p-2 text-sm font-bold uppercase rounded-lg bg-gray-400 text-black hover:shadow-lg hover:bg-gray-600 hover:text-white'
						onClick={() => {
							setRedirect(`/posts`)
						}}
					>
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
			)
		}
	}

	return (
		<div className='flex flex-col min-w-full h-full p-4'>
			{open && (
				<ConfirmModal
					title={'New Note'}
					body={newNoteModalBody()}
					closeFunction={closeModal}
					warning={false}
					acceptFunction={newNote}
					acceptText='Create Note'
					closeText='Cancel'
				></ConfirmModal>
			)}
			{backbtn()}
			<div>
				<div className={getLayoutStyle()}>
					{/* Blog post component */}
					<div className='w-full'>
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
										value={title}
									/>
									<div className='absolute flex items-left h-8 w-full'>
										<label htmlFor={'title'} className='sr-only'></label>
									</div>
								</div>
								{/* <button
								onClick={updateTitleFromInput}
								className={
									' justify-center items-center space-x-1 rounded-md p-2  text-white' +
									` bg-red-400` +
									` hover:bg-red-600`
								}
							>
								Save
							</button> */}
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
										value={content}
									/>
								</div>
								{/* <button
								onClick={updateTextFromInput}
								className={
									' justify-center items-center space-x-1 rounded-md p-2  text-white' +
									` bg-red-400` +
									` hover:bg-red-600`
								}
							>
								Save
							</button> */}
							</div>

							<div className={getComponentStyle()}>
								<div
									className={
										(isTablet ? ' w-full' : ' w-1/2') +
										' flex flex-row flex-wrap'
									}
								>
									<label htmlFor='images' className={'cursor-pointer w-full'}>
										<input
											name='images'
											id='images'
											type='file'
											multiple
											onChange={(e) => {
												for (let i = 0; i < e.target.files.length; i++) {
													setFileNames((prevFileNames) => [
														...prevFileNames,
														e.target.files[i].name,
													])
												}
												uploadImagesFromInput(e)
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
											{fileNames.map((file, index) => (
												<p key={index}>{file}</p>
											))}
										</div>
									</label>
								</div>
								<div
									className={
										(isTablet ? ' w-full' : ' w-1/2') +
										' flex flex-row flex-wrap'
									}
								>
									<label htmlFor='video' className={'cursor-pointer w-full'}>
										<input
											name='video'
											id='video'
											type='file'
											onChange={(e) => {
												setVideoName(e.target.value)
												uploadVideoFromInput(e)
											}}
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

									{videoUploadProgress && (
										<LoadingBar progress={videoUploadProgress}></LoadingBar>
									)}
								</div>
							</div>

							<div
								className={
									(isTablet
										? 'flex flex-col w-full space-y-2'
										: 'flex flex-row justify-between items-center') + ' mt-4'
								}
							>
								<button
									className={
										'flex flex-row justify-center items-center p-2 text-sm rounded-lg bg-red-900 text-white active:bg-red-700 font-bold outline-none focus:outline-none ' +
										(isTablet ? 'w-full' : '')
									}
									onClick={(e) => {
										e.preventDefault()
										deleteCurrentPost()
									}}
								>
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
										<polyline points='3 6 5 6 21 6'></polyline>
										<path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
										<line x1='10' y1='11' x2='10' y2='17'></line>
										<line x1='14' y1='11' x2='14' y2='17'></line>
									</svg>
								</button>

								<button
									onClick={() => {
										updateTextFromInput()
										updateTitleFromInput()
									}}
									className={
										'rounded-md p-2 text-white bg-red-400 hover:bg-red-600' +
										(isTablet ? ' w-full' : ' w-1/3')
									}
								>
									Save
								</button>
							</div>
						</div>
						{/* Images and video container */}
						<div className={'w-full py-4 rounded-md border my-4 '}>
							<p className={'italic mx-4 font-bold text-gray-600'}>Uploads</p>
							<div
								className={getUploadsStyle() + ' flex-wrap px-4 justify-center'}
							>
								{selectedPost &&
									selectedPost.images &&
									selectedPost.images.map((image, index) => {
										return (
											<div
												className={
													'relative m-4 flex flex-row ' +
													(isTablet ? 'w-full' : 'w-1/3')
												}
												key={image.name}
											>
												<div className='relative' style={{ left: '-15px' }}>
													<button
														className='bg-red-400 w-4 h-4 rounded-full my-4 cursor-pointer float-right'
														onClick={(e) => {
															console.log('delete image')
															dispatch(deleteImage(id, image.name))
														}}
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='16'
															height='16'
															fill='white'
															class='bi bi-x'
															viewBox='0 0 16 16'
														>
															<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
														</svg>
													</button>
													<img
														className={'w-full rounded object-contain'}
														src={image.URL}
														alt={image.name}
													></img>
												</div>
											</div>
										)
									})}
								{selectedPost?.video?.URL && (
									<div
										className={'relative ' + (isTablet ? 'w-full' : 'w-1/3')}
										id={selectedPost.video.name}
									>
										<div
											className='relative'
											style={{ top: '3px', left: '-3px' }}
										>
											<button
												className='bg-red-400 w-4 h-4 rounded-full my-4 cursor-pointer float-right'
												onClick={(e) => {
													console.log('delete video')
													dispatch(deleteVideo(id))
												}}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='16'
													height='16'
													fill='white'
													class='bi bi-x'
													viewBox='0 0 16 16'
												>
													<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
												</svg>
											</button>
										</div>
										<video
											className='rounded'
											src={selectedPost.video.URL}
											width='full'
											controls
										>
											Your browser does not support the video tag.
										</video>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Social auth component */}
					<div className={'flex flex-col space-y-4 w-1/2'}>
						{/*Notes*/}
						<div className='flex flex-col space-y-4'>
							<button
								className={
									'flex flex-row justify-center items-center space-x-1 rounded-md px-4 py-2 bg-green-500 text-white active:bg-green-400 text-base text-lg shadow hover:shadow-lg hover:bg-green-600 hover:text-white'
								}
								onClick={() => setOpen((o) => !o)}
							>
								<AddSVG></AddSVG>
								<p>Add Note</p>
							</button>

							{selectedPost?.notes.length > 0 &&
								note.notes
									.filter((note) => selectedPost.notes.includes(note._id))
									.map((note, index) => {
										return (
											<Link
												key={note._id}
												to={`/notes/${note._id}`}
												className='flex flex-row bg-yellow-200 rounded-md p-3 font-semibold'
											>
												<div className='flex-none'>{note.name}</div>
												<div className='flex-grow'></div>
												<button
													className='flex-none bg-red-400 w-4 h-4 mt-1 rounded-full cursor-pointer float-right'
													onClick={(e) => {}}
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														width='16'
														height='16'
														fill='white'
														class='bi bi-x'
														viewBox='0 0 16 16'
													>
														<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
													</svg>
												</button>
											</Link>
										)
									})}
						</div>

						<hr />

						{/* Twitter */}
						<div className='flex flex-col space-y-4 bg-gray-200 rounded-md p-6'>
							<div className='flex flex-row space-x-2 items-center'>
								<button
									className='w-5 h-5 bg-white flex items-center justify-center rounded-xl cursor-pointer'
									onClick={() => setTwitterSelected(!isTwitterSelected)}
								>
									{isTwitterSelected ? (
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
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
								>
									<title>Twitter icon</title>
									<path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
								</svg>
								<p>Twitter</p>
							</div>
							{isTwitterSelected ? <p></p> : <></>}
						</div>

						{/* Facebook */}
						<div className='flex flex-col space-y-4 bg-gray-200 rounded-md p-6'>
							<div className='flex flex-row space-x-2 items-center'>
								<button
									className='w-5 h-5 bg-white flex items-center justify-center rounded-xl cursor-pointer'
									onClick={() => setFacebookSelected(!isFacebookSelected)}
								>
									{isFacebookSelected ? (
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
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
								>
									<title>Facebook icon</title>
									<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
								</svg>
								<p>Facebook</p>
							</div>
							{isFacebookSelected ? (
								<>
									<div
										className={
											'bg-yellow-100 rounded-md text-gray-600 text-sm p-2 italic items-center'
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
											Only {isFbVideoUsed ? 'video' : 'images'} will be uploaded
										</span>
									</div>
									<div className='flex flex-row space-x-2 items-center'>
										<Switch
											onChange={() => setIsFbVideoUsed(!isFbVideoUsed)}
											checked={isFbVideoUsed}
											width={38}
											height={20}
											checkedIcon={false}
											uncheckedIcon={false}
										/>
										{isFbVideoUsed ? <p>Video</p> : <p>Images</p>}
									</div>
								</>
							) : (
								<></>
							)}
						</div>
						{/* YouTube */}
						<div className='flex flex-col space-y-4 bg-gray-200 rounded-md p-6'>
							<div className='flex flex-row space-x-2 items-center'>
								<button
									className='w-5 h-5 bg-white flex items-center justify-center rounded-xl'
									disabled={selectedPost?.video?.URL ? false : true}
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
							{isYoutubeSelected ? (
								<>
									<div
										className={
											'bg-yellow-100 rounded-md text-gray-600 text-sm p-2 italic items-center'
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
											Only the video will be uploaded
										</span>
									</div>
									<div className='flex flex-row space-x-2 items-center'>
										<Switch
											onChange={() => setIsPublicYoutube(!isPublicYoutube)}
											checked={isPublicYoutube}
											width={38}
											height={20}
											checkedIcon={false}
											uncheckedIcon={false}
										/>
										{isPublicYoutube ? <p>Public</p> : <p>Private</p>}
									</div>
								</>
							) : (
								<></>
							)}
						</div>
						<button
							onClick={publishToSN}
							className={
								'rounded-md p-2 text-white bg-red-400 hover:bg-red-600 w-full'
							}
						>
							Publish
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditPostPage
