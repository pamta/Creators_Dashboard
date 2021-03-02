import { Link } from 'react-router-dom'

const NavbarLink = ({ name, link, icon, color }) => {
	return (
		<Link to={link}>
			<div
				className={
					'flex flex-row justify-left items-center space-x-4 rounded-md p-2' +
					` bg-${color}`
				}
			>
				{icon}
				<h2>{name}</h2>
			</div>
		</Link>
	)
}

export default NavbarLink
