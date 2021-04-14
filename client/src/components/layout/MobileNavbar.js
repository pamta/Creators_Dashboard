import PropTypes from 'prop-types'
import { useState } from 'react'
import NavbarLink from './NavbarLink'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const MobileNavbar = ({ logout }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='flex flex-col'>
			<div className='py-2'>
				<button
					className='float-right bg-gray-400 cursor-pointer inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-gray-600 focus:outline-none mr-2'
					onClick={() => setIsOpen(!isOpen) /* toggles mobile menu */}
				>
					<span className='sr-only'>Open main menu</span>
					<svg
						className='block h-6 w-6'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'
					>
						<path d='M4 6h16M4 12h16M4 18h16' />
					</svg>
					<svg
						className='hidden h-6 w-6'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'
					>
						<path d='M6 18L18 6M6 6l12 12' />
					</svg>
				</button>
			</div>
			{isOpen ? (
				<div className='flex flex-col space-y-1 p-4'>
					<h1 className='font-semibold text-xl text-center mb-4'>
						<Link to='/'>Creator's Dashboard</Link>
					</h1>
					<NavbarLink
						name='Posts'
						link='/posts'
						icon={
							<svg
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z'></path>
								<path d='M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z'></path>
							</svg>
						}
						color='green'
					/>
					<NavbarLink
						name='Analytics'
						link='/analytics'
						icon={
							<svg
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z'></path>
							</svg>
						}
						color='blue'
					/>
					<NavbarLink
						name='Notes'
						link='/notes/new'
						icon={
							<svg
								className='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
							</svg>
						}
						color='yellow'
					/>
					<NavbarLink
						name='Settings'
						link='/settings'
						icon={
							<svg
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
									clipRule='evenodd'
								></path>
							</svg>
						}
						color='gray'
					/>
					<a onClick={logout} href='#!'>
						<div
							className={
								'flex flex-row justify-left items-center space-x-4 rounded-md p-2 bg-gray-800 text-gray-100'
							}
						>
							<svg
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
									clipRule='evenodd'
								></path>
							</svg>
							<h2>Logout</h2>
						</div>
					</a>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

MobileNavbar.propTypes = {
	logout: PropTypes.func,
}

export default connect(null, { logout })(MobileNavbar)
