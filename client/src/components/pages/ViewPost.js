import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const YoutubeSlide = ({ url, isSelected }) => (
    <ReactPlayer width="100%" url={url} />
);
const ViewPost = ({title, content, postMedia, creationDate}) => {

    const user = useSelector(state => state.auth.user);
    const post = useSelector(state => state.post);

    let media = [];
    
    const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

    const getVideoThumb = (videoId) => `https://img.youtube.com/vi/${videoId}/default.jpg`;

    const getVideoId = (url) => url.substr('https://www.youtube.com/watch?v='.length, url.length);

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

    
    postMedia.forEach(item => {
        if (item.substr(12, 7) == "youtube") {
            media.push(
                <YoutubeSlide  url={item} />
            )
        }
        else {

            media.push(
                    <img className="w-80" src={item} />
            )
        }
    });
        
    return (
        <div className="flex flex-col max-h-full overflow-auto  items-center">
            <div className="flex flex-row w-full justify-between">
                <Link to="/posts">
                    <div className="px-10 py-10">
                        <button className="flex flex-row px-4 md:px-16 py-3 justify-start items-center space-x-4 rounded-lg bg-gray-400 text-black active:bg-gray-600 text-base md:text-2xl shadow hover:shadow-lg hover:bg-gray-600 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l-4 4 4 4M16 12H9"/></svg>
                            <p>Back</p>
                        </button>
                    </div>
                </Link>

                <Link to={ `/editpost/${post.currentPost}` }>
                <div className="px-10 py-10">
                    <button className="flex flex-row px-4 md:px-16 py-3 justify-start items-center space-x-4 rounded-lg bg-green-600 text-black active:bg-green-400 text-base md:text-2xl shadow hover:shadow-lg hover:bg-green-700 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                        <p>Edit</p>
                    </button>
                </div>
                </Link>
            </div>
            <div className="rounded  shadow-lg bg-white w-5/6">
                <div className="w-full">
                    <Carousel
                        infiniteLoop="true"
                        dynamicHeight="true"
                        renderItem={customRenderItem}
                        renderThumbs={customRenderThumb}
                    >
                        {media}
                    </Carousel>
                </div>
                <div className="px-5 py-2 space-y-2">
                    <h1 className="text-4xl justify-between font-bold">{title}</h1>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                        <div className="text-gray-800 leading-none capitalize text-xl font-bold">{user.name}</div>
                    </div>
                    <div className="text-gray-900 text-xl md:text-2xl">
                        {content}
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
}

ViewPost.defaultProps = {
    title: "Viaje a Cancún", 
    content: "Disfruté mucho de mis vacaciones con mi familia en las playas hermosas del caribe mexicano.", 
    postMedia: ["https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F02%2F24%2Fcancun-beach-hotels-CANCUNBREAK0221.jpg", 
    "https://www.tripsavvy.com/thmb/DozAQgsmHjmlSJXu8kYsqMA1y6A=/1887x1415/smart/filters:no_upscale()/family_fun_beach-56a3eab83df78cf7727fde11.jpg",
    "https://cfcdn1.allmexico365.com/wp-content/uploads/cancun-fun-facts-tours-aug-2016.jpg",
            "https://www.youtube.com/watch?v=wSyWwokJ2pM"], 
    creationDate: "Dec 19",
}

export default ViewPost