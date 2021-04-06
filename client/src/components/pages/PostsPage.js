import PostsCards from './PostsCards'

const PostsPage = () => {
	return (
		<div className="flex flex-col min-w-full">
			
			<div className="flex flex-row justify-between">
				<div className="px-10 py-10 text-gray-900 text-2xl md:text-5xl">
					Posts
				</div>
				<div className="px-10 py-10">
					<button className="flex flex-row px-16 py-3 justify-start items-center space-x-4 rounded-lg bg-green-600 text-black active:bg-green-400 text-base md:text-2xl shadow hover:shadow-lg hover:bg-green-700 hover:text-white">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
						<p>Add</p>
					</button>
				</div>
			</div>
			<PostsCards/>
		</div>
	);
}

export default PostsPage
