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

    const tabStyle = (tab) => {
        switch(tab) {
            case "view":
                return activeTab == 'view' ? "py-2 px-6 bg-green-500 rounded-t-lg hover:bg-green-300 focus:outline-none text-black border-b-2 font-medium border-red-600" : "py-2 px-6 rounded-t-lg text-gray-500 bg-green-300 hover:text-black hover:bg-green-500 focus:outline-none";
            case "analytics":
                return activeTab == 'analytics' ? "py-2 px-6 bg-blue-400 rounded-t-lg hover:bg-blue-300 focus:outline-none text-black border-b-2 font-medium border-red-600" : "py-2 px-6 rounded-t-lg text-gray-500 bg-blue-300 hover:text-black hover:bg-blue-400 focus:outline-none";
            case "edit":
                return activeTab == 'edit' ? "py-2 px-6 bg-pink-400 rounded-t-lg hover:bg-pink-300 focus:outline-none text-black border-b-2 font-medium border-red-600" : "py-2 px-6 rounded-t-lg text-gray-500 bg-pink-300 hover:text-black hover:bg-pink-400 focus:outline-none";
        }
    } 

    const tabContent = () => {
        switch(activeTab) {
  
            case "view":
                return <ViewPost/>;
            case "analytics":
                return <PostAnaylitics/>;
            case "edit":
                return <EditPost/>;
            default: 
                <div></div>;
        }
      }

    return (
        <div className="flex flex-col min-w-full h-full">
            <div className="flex flex-row w-full justify-between border-b-2 border-solid border-gray-300 m">
                <div className="flex flex-row  px-4 text-gray-900 text-2xl md:text-4xl capitalize">
                    <div>{title}</div>

                    
                </div>

                <div >
                    <button className={tabStyle("view")} onClick={() => setActive('view')}> 
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
                    <button className={tabStyle("analytics")} onClick={() => setActive('analytics')}>
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
                    <button className={tabStyle("edit")} onClick={() => setActive('edit')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                        {/* Edit */}
                    </button>
                </div>
            </div>
            <div className={"overflow-x-hidden overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 pr-2"}>
                {tabContent()}
            </div>
            <div className="ml-8 flex flex-row justify-start">
                <button onClick={() => history.goBack()} className="flex  justify-center items-center space-x-2 p-2 text-sm font-bold uppercase rounded-lg bg-gray-400 text-black hover:shadow-lg hover:bg-gray-600 hover:text-white">
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