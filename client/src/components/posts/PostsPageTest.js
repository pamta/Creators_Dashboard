import styles from './newPost.module.css'

const PostsPage = () => {
	return (
		<div>
			<div>Posts page</div>
			<form method="POST" enctype="multipart/form-data" action="/api/publication/upload/images">    
				<div>
					<label for="slide">Upload images (up tp 4): </label><br />
					<input name='file' type='file' multiple/>
					<div className='cursor-pointer flex flex-row px-3 py-3 justify-center items-center space-x-4 rounded-lg bg-green-400 text-black active:bg-green-600 text-md md:text-md shadow hover:shadow-lg hover:bg-green-600 hover:text-white'>
						<p className='text-center'>Image</p>
					</div>
					<br />
					<input className='bg-gray-200' placeholder="post ID" name="publication_id" type="text" /><br />
					<br />
					<input type="submit"  value="Upload images" />
				</div>        
			</form>
			<br />
			<form method="POST" enctype="multipart/form-data" action="/api/publication/upload/video">    
				<div>
					<label for="slide">Upload video: </label><br />
					<input className="bg-red-600 h-3 border-2 border-black " name="file" type="file"/>
					<div className='cursor-pointer flex flex-row px-3 py-3 justify-center items-center space-x-4 rounded-lg bg-green-400 text-black active:bg-green-600 text-md md:text-md shadow hover:shadow-lg hover:bg-green-600 hover:text-white'>
						<p className='text-center'>Video</p>
					</div>
					<br />
					<input className='bg-gray-200' placeholder="post ID" name="publication_id" type="text" /><br />
					<br />
					<input type="submit"  value="Upload Video" />
				</div>        
			</form>
		</div>
	);
}

export default PostsPage
