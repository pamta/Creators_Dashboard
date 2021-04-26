import { Link } from 'react-router-dom'

const NavbarLink = ({ name, link, icon, color, isSelected }) => {
	// Handle color changes
	const bgColor =
		color === 'gray'
			? isSelected
				? 'gray-600'
				: 'gray-400'
			: isSelected
			? `${color}-400`
			: `${color}-200`
	const hoverColor = color === 'gray' ? 'gray-600' : `${color}-400`
	const hoverTextColor = color === 'gray' ? 'white' : 'black'
	const textColor = color === 'gray' && isSelected ? 'white' : 'black'

	return (
		<Link to={link}>
			<div
				className={
					'flex flex-row justify-left items-center space-x-4 rounded-md p-2' +
					` bg-${bgColor} text-${textColor} hover:bg-${hoverColor} hover:text-${hoverTextColor}`
				}
			>
				{icon}
				<h2>{name}</h2>
			</div>
		</Link>
	)
}

export default NavbarLink
