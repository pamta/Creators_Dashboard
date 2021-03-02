const Content = ({ isMobile }) => {
	console.log('is mobile inside content ? ' + (isMobile ? 'yes' : 'no'))

	const getLayoutStyle = () => {
		return isMobile ? 'h-screen' : 'flex-1 min-w-0'
	}

	return (
		<div
			className={
				getLayoutStyle() + ' bg-white rounded-tl-xl border shadow-xl p-4'
			}
		>
			content
		</div>
	)
}

export default Content
