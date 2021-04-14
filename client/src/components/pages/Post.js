import EditPost from "../posts/EditPostPage";
import ViewPost from "../posts/ViewPost";
import PostAnaylitics from "../posts/PostAnalytics";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const Post = () => {
    const thisPost = useSelector(state => state.currentPost);
    const post = useSelector(state => state.post);

    const [activeTab, setActive] = useState('view');
    
    const [title, setTitle] = useState('');

    const activeStyle = "py-2 px-6 bg-white rounded-t-lg hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500";
    const defaultStyle = "py-2 px-6 bg-white rounded-t-lg text-gray-500 bg-gray-200 hover:text-blue-500 focus:outline-none"
    let history = useHistory();
    let {id} = useParams();
    console.log("id = " + id);

    useEffect(() => {
		//console.log(id + " : " + post.posts);
		const selected_post = post.posts.find( 
			(somePost) => { 
				return somePost._id == id;
			}
		);

		if(selected_post){
			setTitle(selected_post.name);
		}else{
			//setRedirect(`/posts`); //redirect to posts
		}
	}, [post.posts]);

    const tabContent = () => {
        switch(activeTab) {
  
            case "view":
                return <ViewPost/>;
            case "analytics":
                return <PostAnaylitics/>;
            case "edit":
                return <EditPost isEditing = 'true'/>;
            default: 
                <div></div>;
        }
      }

    return (
        <div className="max-h-full overflow-auto">
            <div className="flex flex-row w-full justify-between border-b-2 border-solid border-gray-300 m">
                <div className="pt-3 px-4 text-gray-900 text-2xl md:text-4xl capitalize">
                    {title}
                </div>
                <div >
                        <button className={activeTab == 'view' ? activeStyle : defaultStyle} onClick={() => setActive('view')}> 
                            <svg
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z'></path>
								<path d='M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z'></path>
							</svg>
                            {/* View */}
                        </button>
                        <button className={activeTab == 'analytics' ? activeStyle : defaultStyle} onClick={() => setActive('analytics')}>
                            <svg
                                    className='w-6 h-6'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z'></path>
                            </svg>
                            {/* Analytics */}
                        </button>
                        <button className={activeTab == 'edit' ? activeStyle : defaultStyle} onClick={() => setActive('edit')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                            {/* Edit */}
                        </button>
                </div>
            </div>
            <div>
                {tabContent()}
            </div>
            <div className="flex flex-row justify-end px-10 pb-10">
                <button onClick={() => history.goBack()} className="flex flex-row justify-center items-center space-x-2 p-2 text-sm font-bold uppercase rounded-lg bg-gray-400 text-black hover:shadow-lg hover:bg-gray-600 hover:text-white">
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path d='M19 12H6M12 5l-7 7 7 7' />
                </svg>
                    <p>Back</p>
                </button>
            </div>
        </div>
    );
}

export default Post