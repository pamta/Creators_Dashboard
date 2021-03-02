const Content = ({ isMobile }) => {
	const getLayoutStyle = () => {
		return isMobile ? 'h-full' : 'h-full w-full'
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
