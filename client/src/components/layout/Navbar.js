import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className='w-72 p-4 bg-gray-100'>
			<div className='flex flex-col justify-between h-full'>
				<div>
					<h1 className='font-semibold text-xl text-center mb-4'>
						<Link to='/'>Creator's Dashboard</Link>
					</h1>
					<div>
						<a>
							<Link to='/posts'>Posts</Link>
						</a>
					</div>
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
