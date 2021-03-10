import useWindowSize from '../../lib/useWindowSize'

const SimpleSettingsField = ({type, fieldName, value, inputTag, updateState}) => { 

	const isTablet = useWindowSize().width <= 1080
	const getLayoutStyle = () => {
		return isTablet
			? 'flex flex-col w-full'
			: 'flex flex-row space-x-8 justify-between'
	}

	return (
		<div className={getLayoutStyle()}>
			<p>{fieldName}</p>
			<div
				className={
					'relative rounded-md shadow-sm h-8' +
					(isTablet ? ' w-full mt-2' : ' w-64')
				}
			>
				<input
					type={type}
					name={inputTag}
					id={inputTag}
					defaultValue={value}
					className='focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8 p-2'
					onChange={(e) => updateState(e.target.value)}
				/>
				<div className='absolute flex items-left h-8 w-full'>
					<label htmlFor={inputTag} className='sr-only'>
						Handler
					</label>
				</div>
			</div>
		</div>
	)
}

SimpleSettingsField.defaultProps = {
	type: "text",
	value: ""
};

export default SimpleSettingsField
