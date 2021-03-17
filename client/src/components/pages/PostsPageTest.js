const PostsPage = () => {
	return (
		<div>
			<div>Posts page</div>
			<form method="POST" enctype="multipart/form-data" action="/api/publication/upload/images">    
				<div>
					<label for="slide">Upload images (up tp 4): </label><br />
					<input name="file" type="file" multiple/><br />
					<input name="publication_id" type="text" /><br />
					<br />
					<input type="submit"  value="Upload images" />
				</div>        
			</form>
			<br />
			<form method="POST" enctype="multipart/form-data" action="/api/publication/upload/video">    
				<div>
					<label for="slide">Upload video: </label><br />
					<input name="file" type="file"/><br />
					<input name="publication_id" type="text" /><br />
					<br />
					<input type="submit"  value="Upload Video" />
				</div>        
			</form>
		</div>
	);
}

export default PostsPage
