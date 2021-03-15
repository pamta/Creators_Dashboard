const PostsPage = () => {
	return (
		<div>
			<div>Posts page</div>

			<form method="POST" enctype="multipart/form-data" action="/api/publication/upload">    
				<div class="form-group">
					<label for="slide">Sube tu contenido: </label><br />
					<input name="file" class="form-control-file" type="file" /><br />
					<br />
					<input type="submit" class="btn btn-primary" value="Agregar slide" />
				</div>        
			</form>
		</div>
	);
}

export default PostsPage
