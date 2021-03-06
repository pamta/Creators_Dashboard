// This class when added will render all the alerts within the state.alert
// To add an alert, the alert in actions folder must be used

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function getAlertFunctionByType(alertType) {
	let alertFunction = null
	switch (alertType) {
		case 'success':
			alertFunction = (message) => {
				return (
					<div
						className='relative m-2 md:ml-16 md:mr-16 lg:ml-80 lg:mr-80 bg-teal-100 border border-teal-400 text-teal-800 px-4 py-3 rounded shadow-md'
						role='alert'
					>
						<div className='flex'>
							<div className='py-1'>
								<svg
									className='fill-current h-6 w-6 text-teal-500 mr-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
								</svg>
							</div>
							<div>
								<p className='font-bold'>Success!</p>
								<p className='text-sm'>{message}</p>
							</div>
						</div>
					</div>
				)
			}
			break
		case 'danger':
			alertFunction = (message) => {
				return (
					<div
						className=' relative m-2 md:ml-16 md:mr-16 lg:ml-80 lg:mr-80 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md'
						role='alert'
					>
						<strong className='font-bold'>Oh no!{'  '}</strong>
						<span className='block sm:inline mr-9'>{message}</span>
						<span className='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
					</div>
				)
			}
			break
		default:
			alertFunction = (message) => {
				return (
					<div
						className='flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3'
						role='alert'
					>
						<svg
							className='fill-current w-4 h-4 mr-2'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
						>
							<path d='M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z' />
						</svg>
						<p>{message}</p>
					</div>
				)
			}
			break
	}
	return alertFunction
}

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map((alert) => (
		// Gotta have a unique key for a list of JSX here
		<div key={alert.id}>
			{getAlertFunctionByType(alert.alertType)(alert.msg)}
		</div>
	))

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
	// get the alert reducer
	alerts: state.alert,
})

// Connect to use redux in this component, it has to be exported like this
// First connect argument --> any state you wanna map, like alert, profile, etc
// Then the result of the map is passed as props to Alert
export default connect(mapStateToProps)(Alert)
