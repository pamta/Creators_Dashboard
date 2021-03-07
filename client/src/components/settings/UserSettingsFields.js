import SimpleSettingsField from './SimpleSettingsField'

const UserFields = () => {
	return (
		<div className='space-y-2'>
			<SimpleSettingsField fieldName='Name' inputTag='name' />
			<SimpleSettingsField fieldName='Last Name' inputTag='last-name' />
		</div>
	)
}

export default UserFields
