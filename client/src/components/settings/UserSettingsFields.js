import SimpleSettingsField from './SimpleSettingsField'
import { useState } from "react";
import React, { useEffect } from "react";
//redux
import {useSelector, useDispatch} from "react-redux";
import {updateUserData} from "../../actions/auth"

const UserFields = () => {
	const [userName, setUserName] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const dispatch = useDispatch();

	const user = useSelector(state => state.auth.user);
	const loading = useSelector(state => state.auth.loading);

	useEffect(() => {
		setUserName(user.userName);
		setName(user.name);
		setEmail(user.email);
	}, [user]); //we need to update the component state when user is updated from the store

	const handleSubmit = (e) => {
		if(!loading){
			dispatch(updateUserData(name, userName, email));
		}
		console.log(userName); 
		console.log(name); 
		console.log(email);
	  };

	return (
		<div className='space-y-4'>
			<SimpleSettingsField fieldName="User name" 	value={user.userName} 	inputTag='user-name' 	updateState={setUserName}/>
			<SimpleSettingsField fieldName="Full name" 	value={user.name} 		inputTag='full-name' 	updateState={setName}/>
			<SimpleSettingsField fieldName="e-mail" 	value={user.email} 		inputTag='e-mail' 		updateState={setEmail}/>
			<div className='flex justify-end'>
				<button
					className={
						'flex flex-row justify-left items-center space-x-1 rounded-md p-2 text-white' +
						` bg-red-400` +
						` hover:bg-red-600`
					}
					onClick={handleSubmit}
				>
					<h2 className='w-24 text-center'>Save</h2>
				</button>
			</div>
		</div>
	)
}


export default UserFields
