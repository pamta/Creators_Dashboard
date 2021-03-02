import NavbarLink from './NavbarLink'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className='w-72 p-4 bg-gray-100'>
			<div className='flex flex-col justify-between h-full'>
				<div>
					<h1 className='font-semibold text-xl text-center mb-4'>
						<Link to='/'>Creator's Dashboard</Link>
					</h1>
					<NavbarLink
						name='Posts'
						link='/posts'
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
						color='green'
					/>
					<div>
						<a>
							<Link to='/analytics'>Analytics</Link>
						</a>
					</div>
					<div>
						<a>
							<Link to='/notes'>Notes</Link>
						</a>
					</div>
				</div>
				<div>
					<div>
						<a>
							<Link to='/settings'>Settings</Link>
						</a>
					</div>
					<div>Logout</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
