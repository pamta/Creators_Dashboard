import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import PostsCards from '../posts/PostsCards'
import ConfirmModal from '../layout/ConfirmModal'
import AddSVG from '../layout/AddSVG'

//redux
import { useSelector, useDispatch } from 'react-redux'

import { createPost } from '../../actions/post'
import { setAlert } from '../../actions/alert'

const PostsPage = () => {
	const [open, setOpen] = useState(false)
	const [newTitle, setNewTitle] = useState()
	const [redirect, setRedirect] = useState()

	//const post = useSelector(state => state.post);
	const dispatch = useDispatch()

	const closeModal = () => {
		setOpen(false)
		setNewTitle('')
	}

	const newPost = (e) => {
		if (!newTitle) {
			dispatch(setAlert('A Post title is required', 'danger'))
			return
		}

		console.log('Creating post: ' + newTitle)
		dispatch(createPost(newTitle)).then(
			(newpost) => {
				setRedirect(`/editpost/${newpost._id}`) //TODO: in the new post page, redirect back to posts if post.currentPost is null
			},
			(error) => {
				//
			}
		)
	}

	const newPostModalBody = () => {
		return (
			<div>
				<h4>To begin, first give your new post a tite:</h4>
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

	if (redirect) {
		return <Redirect to={redirect} />
	}
	return (
		<div className='flex flex-col min-w-full h-full'>
			{open && (
				<ConfirmModal
					title={'New Post'}
					body={newPostModalBody()}
					closeFunction={closeModal}
					warning={false}
					acceptFunction={newPost}
					acceptText='Create Post'
					closeText='Cancel'
				></ConfirmModal>
			)}
			<div className='flex flex-row justify-between p-4'>
				<h1 className='font-semibold text-3xl mb-4'>Posts</h1>
				<div>
					<button
						className={
							'flex flex-row justify-center items-center space-x-1 rounded-md px-4 py-2 bg-green-500 text-white active:bg-green-400 text-base text-lg shadow hover:shadow-lg hover:bg-green-600 hover:text-white'
						}
						onClick={() => setOpen((o) => !o)}
					>
						<AddSVG></AddSVG>
						<p>New post</p>
					</button>
				</div>
			</div>
			<PostsCards />
		</div>
	)
}

export default PostsPage
