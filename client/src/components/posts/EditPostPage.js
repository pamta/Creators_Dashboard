import { useEffect, useState } from "react";
import Switch from 'react-switch';
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import useWindowSize from '../../lib/useWindowSize';

import styles from './newPost.module.css'
//redux
import {useSelector, useDispatch} from "react-redux";
import {uploadImages, uploadVideo, deletePost, updateText, updateTitle} from "../../actions/post"
//publishPostToFb = (publicationId, useVideo)
import {publishPostToFb} from "../../actions/facebook"

const EditPostPage = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [statePost, setStatePost] = useState();
	const [fileNames, setFileNames] = useState([]);
	const [videoName, setVideoName] = useState('');
	const [isYoutubeSelected, setYoutubeSelected] = useState(false)
	const [isFacebookSelected, setFacebookSelected] = useState(false);
	const [isTwitterSelected, setTwitterSelected] = useState(false);
	const [isPublicYoutube, setIsPublicYoutube] = useState(false);

	const [redirect, setRedirect] = useState();


	const post = useSelector(state => state.post);
	let { id } = useParams(); //get the params from the url

	const dispatch = useDispatch();

	const isTablet = useWindowSize().width <= 1080

	//calls to actions

	const uploadVideoFromInput = (e) => {
		var videofile = document.querySelector('#video');
		dispatch(uploadVideo(videofile, post.currentPost));
	};

	const uploadImagesFromInput = (e) => {
		var imagesfile = document.querySelector('#images');
		const ammount = imagesfile.files.length;
		console.log(imagesfile.files);
		dispatch(uploadImages(imagesfile, post.currentPost, ammount));
	};

	const deleteCurrentPost = (e) => {
		dispatch(deletePost(id));
		setRedirect(`/posts`);
	}

	const updateTitleFromInput = (e) => {
		dispatch(updateTitle(title, id));
	}

	const updateTextFromInput = (e) => {
		dispatch(updateText(content, id));
	}

	const publishToFb = (e) => {
		let hasVideo = statePost && statePost.video && !statePost.video.isLoading
		dispatch(publishPostToFb(id, hasVideo));
	}

	//Style
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

	//console.log('is ? ' + (isYoutubeSelected ? 'yes' : 'no'))

	useEffect(() => {
		//console.log(id + " : " + post.posts);
		const selected_post = post.posts.find( 
			(somePost) => { 
				return somePost._id == id;
			}
		);

		if(selected_post){
			setStatePost(selected_post);
			setTitle(selected_post.name);
			setContent(selected_post.text);
		}else{
			//setRedirect(`/posts`); //redirect to posts
		}
	}, [post.posts]);

	if (redirect) {
		return <Redirect to={redirect}/>
	}
	return (
		<div className='p-4'>
			<h1 className='font-semibold text-3xl mb-4'>Edit post</h1>
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
								value={title}
							/>
							<div className='absolute flex items-left h-8 w-full'>
								<label htmlFor={'title'} className='sr-only'></label>
							</div>
						</div>
						<button
							onClick={updateTitleFromInput}
							className={
								" justify-center items-center space-x-1 rounded-md p-2  text-white" +
								` bg-red-400` +
								` hover:bg-red-600`
							}>
							Save
						</button>
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
						<button
							onClick={updateTextFromInput}
							className={
								" justify-center items-center space-x-1 rounded-md p-2  text-white" +
								` bg-red-400` +
								` hover:bg-red-600`
							}>
							Save
						</button>
					</div>

					<div className={getComponentStyle()}>
						<label
							htmlFor='slide'
							className={'cursor-pointer' + (isTablet ? ' w-full' : ' w-1/2')}
						>
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
									uploadImagesFromInput(e);
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
									<p key={index} >{file}</p>
								))}
							</div>
						</label>

						<label
							htmlFor='video'
							className={'cursor-pointer' + (isTablet ? ' w-full' : ' w-1/2')}
						>
							<input
								name='video'
								id='video'
								type='file'
								onChange={(e) => {
									setVideoName(e.target.value);
									uploadVideoFromInput(e);
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

					</div>
				</div>

				{/* Social auth component */}
				<div
					className={
						'flex flex-col space-y-4' + (isTablet ? ' w-full' : ' w-72')
					}
				>
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
						{isTwitterSelected ? <p>selected</p> : <></>}
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
						{isFacebookSelected ? <p>selected</p> : <></>}
					</div>
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
						{isYoutubeSelected ? (
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
						) : (
							<></>
						)}
					</div>
					<button
						onClick={publishToFb}
						className={
							" justify-center items-center space-x-1 rounded-md p-2  text-white" +
							` bg-red-400` +
							` hover:bg-red-600`
						}>
						Publish
					</button>
				</div>
			</div>

			<div className='py-5 float-left'>
				<button className="p-2 text-sm rounded-lg bg-red-900 text-white active:bg-red-700  font-bold uppercase shadow hover:shadow-lg outline-none focus:outline-none "
					 	onClick={(e) => {e.preventDefault(); deleteCurrentPost()} }>
					<p>Delete</p>
				</button>
			</div>
							
			<div className='py-5 float-right'>
				<button className='p-2 text-sm rounded-lg bg-gray-400 text-black flex flex-row justify-center items-center space-x-2 hover:bg-gray-600 hover:text-white'
						onClick={ () => {setRedirect(`/posts`)} }>
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

export default EditPostPage
