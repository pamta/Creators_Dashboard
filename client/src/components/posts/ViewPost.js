import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const YoutubeSlide = ({ url, isSelected }) => (
    <ReactPlayer width="100%" url={url} />
);

const ViewPost = () => {
    const post = useSelector(state => state.post);
    const user = useSelector(state => state.auth.user);

    let {id} = useParams();
    const [creationDate, setDate] = useState();
    const [selectedPost, setSelectedPost] = useState();
    const [media, setMedia] = useState([]);
        
    const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;
    
    // Video stuff needs to be changed 
    const getVideoThumb = (videoId) => `https://img.youtube.com/vi/${videoId}/default.jpg`;
    const getVideoId = (url) => url.substr('https://www.youtube.com/watch?v='.length, url.length);
    // This might change to videos not having a thumbnail
    const customRenderThumb = (children) =>
        children.map((item, index) => {
            if (item.props.url) {
                const videoId = getVideoId(item.props.url);
                return <img key={index} src={getVideoThumb(videoId)} />;
            }
            else {
                return <img key={index} src={item.props.src}/>
            }
        });

    useEffect(() => {
        //console.log(id + " : " + post.posts);
        const selected_post = post.posts.find( 
            (somePost) => { 
                return somePost._id == id;
            }
        );
            
        if(selected_post){
            setSelectedPost(selected_post);
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            let cDate = new Date(selected_post.creationDate);
            cDate = cDate.toLocaleDateString('en-US', options);
            setDate(cDate);

            let pMedia = selected_post.images ? selected_post.images : selected_post.video;

            let tempMedia = [];
            pMedia.forEach(item => {
                tempMedia.push(
                    <img className="w-80" src={item.URL} />
                )
            })
            setMedia(tempMedia);
        }else{
            
        }
    }, [post.posts]);

    const mediaDisplay = () =>{
        if(selectedPost){
            if(selectedPost.images.length > 0){
                return( <Carousel
                            infiniteLoop="true"
                            dynamicHeight="true"
                            renderItem={customRenderItem}
                            renderThumbs={customRenderThumb}
                        >
                            {media}
                        </Carousel> 
                )
            }else if(selectedPost.video && selectedPost.video.URL){
                return( <div className={"w-full flex justify-center "} 
                            id={selectedPost.video.name}
                        >
                            <video width="full" height="full" controls>
                                <source src={selectedPost.video.URL} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                )
            }
        }
        <Carousel
            infiniteLoop="true"
            dynamicHeight="true"
            renderItem={customRenderItem}
            renderThumbs={customRenderThumb}
        >
            {media}
        </Carousel> 
    };
        
    return (
        <div className="pt-10 pb-10 flex flex-col max-h-full items-center">
            <div className="rounded  shadow-lg bg-white w-5/6">
                <div className="w-full">
                   {mediaDisplay()} 
                </div>
                <div className="px-5 py-2 space-y-2">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                        <div className="text-gray-800 leading-none capitalize text-xl font-bold">{user.name}</div>
                    </div>
                    <div className="text-gray-900 text-xl md:text-2xl">
                        {selectedPost && selectedPost.text}
                    </div>
                    <div className="flex items-center pb-5 float-right">
                        <div className="flex space-x-2 text-right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <div className="text-base font-thin text-gray-700">{creationDate}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPost