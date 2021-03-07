import SimpleSettingsField from './SimpleSettingsField'

const UserFields = () => {
	return (
		<div className='space-y-4'>
			<SimpleSettingsField fieldName='Name' inputTag='name' />
			<SimpleSettingsField fieldName='Last Name' inputTag='last-name' />
		</div>
	)
}

export default UserFields
