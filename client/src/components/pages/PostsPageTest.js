const PostsPage = () => {
	return (
		<div>
			<div>Posts page</div>

			<form method="POST" enctype="multipart/form-data" action="/api/publication/upload/video">    
				<div class="form-group">
					<label for="slide">Upload image or video: </label><br />
					<input name="file" class="form-control-file" type="file" /><br />
					<input name="publication_id" type="text" /><br />
					<br />
					<input type="submit" class="btn btn-primary" value="Upload Media File" />
				</div>        
			</form>
		</div>
	);
}

export default PostsPage
