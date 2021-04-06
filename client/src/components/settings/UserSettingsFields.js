import SimpleSettingsField from './SimpleSettingsField'
import { useState } from 'react'
import React, { useEffect } from 'react'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData } from '../../actions/auth'
import { deleteUser } from '../../actions/auth'

const UserFields = () => {
	const [userName, setUserName] = useState()
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const dispatch = useDispatch()

	const user = useSelector((state) => state.auth.user)
	const loading = useSelector((state) => state.auth.loading)

	useEffect(() => {
		setUserName(user.userName)
		setName(user.name)
		setEmail(user.email)
	}, [user]) //we need to update the component state when user is updated from the store

	const handleSubmit = (e) => {
		if (!loading) {
			dispatch(updateUserData(name, userName, email))
		}
	};

	const handleDeleteUser = (e) => {
		if(!loading){
			if (window.confirm 
					(`Are you shure you want to delete this account? :\n(There is no way to recover your account or your data)\n\nUser: ${user.userName}\nEmail: ${user.email}`)
				){
					dispatch(deleteUser());
				}
		}
	}

	return (
		<div className='space-y-4'>
			<SimpleSettingsField
				fieldName='Username'
				value={user.userName}
				inputTag='user-name'
				updateState={setUserName}
			/>
			<SimpleSettingsField
				fieldName='Full name'
				value={user.name}
				inputTag='full-name'
				updateState={setName}
			/>
			<SimpleSettingsField
				fieldName='Email'
				value={user.email}
				inputTag='e-mail'
				updateState={setEmail}
			/>
			<div className='flex flex-wrap'>
				<button
					className={
						'flex flex-row justify-left items-center space-x-1 rounded-md p-2 mt-2 mr-2 text-white' +
						` bg-red-700` +
						` hover:bg-red-800` +
						` text-sm`
					}
					onClick={handleDeleteUser}
				>
					{
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-exclamation-circle'
							viewBox='0 0 16 16'
						>
							<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
							<path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
						</svg>
					}
					<h2> Delete Account</h2>
				</button>
				<div className='flex-grow  ...'></div>
				<button
					className={
						'flex flex-row justify-left items-center space-x-1 rounded-md p-2 mt-2 text-white' +
						` bg-red-400` +
						` hover:bg-red-600`
					}
					onClick={handleSubmit}
				>
					<h2 className='w-16 md:w-24 text-center'>Save</h2>
				</button>
			</div>
		</div>
	)
}

export default UserFields
