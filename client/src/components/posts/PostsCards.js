import useWindowSize from '../../lib/useWindowSize'
import { Link } from 'react-router-dom'
//redux
import {useSelector, useDispatch} from "react-redux";
import {setCurrentPost} from "../../actions/post"

const PostsCards = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);

    const isMobile = useWindowSize().width <= 768

    return(
        <div className="overflow-x-hidden overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 pr-2">
            <div className="px-10 grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 ">
                {
                posts.map((post, index) => {
                    return  <Link key={post._id} to={`/post/${post._id}`}>
                                <div className={
                                        (isMobile && "max-w-xl ") + 
                                        " bg-white border-2 border-gray-300 p-5 rounded-lg tracking-wide shadow-lg cursor-pointer"
                                        }>
                                    <div className="flex flex-col md:flex-row">
                                        <div className=" self-center md:self-auto" >
                                        {
                                            post.images[0] && 
                                            <img className="w-80 md:h-44 rounded-lg border-2 border-gray-300" src={post.images[0].URL}/>
                                        }
                                        </div>
                                        
                                        <div id="body" className="flex flex-col ml-5 overflow-hidden">
                                            <h4 id="title" className="text-center md:text-left text-lg md:text-xl font-semibold mb-2">
                                                {post.name}
                                            </h4>
                                            {
                                                post.text && 
                                                <p id="content" className="text-gray-800 text-center mt-2 truncate">
                                                    {post.text}
                                                </p> 
                                            }
                                            <div className="self-center md:self-auto flex mt-5">
                                                <p className="text-gray-400 text-sm md:text-base">
                                                    {post.creationDate.substring(0,10)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                
                                </div>
                            </Link>

                })
                }
            </div>
        </div>
    );
}

export default PostsCards