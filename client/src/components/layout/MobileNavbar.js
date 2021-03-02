import { useState } from 'react'

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
					<div>link 1</div>
					<div>link 2</div>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default MobileNavbar
