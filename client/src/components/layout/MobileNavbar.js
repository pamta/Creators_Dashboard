import { useState } from 'react'
import NavbarLink from './NavbarLink'
import { Link } from 'react-router-dom'

const MobileNavbar = () => {
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
								class='w-6 h-6'
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
								class='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z'></path>
							</svg>
						}
						color='red'
					/>
					<NavbarLink
						name='Notes'
						link='/notes'
						icon={
							<svg
								class='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
							</svg>
						}
						color='yellow'
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default MobileNavbar
