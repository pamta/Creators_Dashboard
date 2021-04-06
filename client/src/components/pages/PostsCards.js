import useWindowSize from '../../lib/useWindowSize'
import { Link } from 'react-router-dom'

const PostsCards = ({posts}) => {
    const isMobile = useWindowSize().width <= 768

    let cards = [];
    posts.forEach(post => { // The way this is done will probably change when data is dinamically obtained, design iteration
        isMobile ? cards.push (
            <Link to='/view'>
                <div className="max-w-xl bg-white border-2 border-gray-300 p-5 rounded-lg tracking-wide shadow-lg cursor-pointer" >
                    <div className="flex flex-col">
                        <div className=" self-center">
                            <img className="w-80 rounded-lg border-2 border-gray-300" src={post.img}/>
                        </div>
                        <div id="body" className="flex flex-col ml-5 overflow-hidden">
                            <h4 id="title" className="text-lg text-center font-semibold mb-2">
                                {post.name}
                            </h4>
                            <p id="content" className="text-gray-800 text-center mt-2 truncate">
                                {post.text}
                            </p>
                            <div className="flex self-center mt-5">
                                <p className="text-gray-400 text-sm">
                                    {post.creationDate}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        )
        : cards.push (
            <Link to='/view'>
                <div className=" bg-white border-2 border-gray-300 p-5 rounded-lg tracking-wide shadow-lg cursor-pointer">
                    <div className="flex flex-row">
                        <img className="w-80 h-44 rounded-lg border-2 border-gray-300" src={post.img}/>
                        <div id="body" className="flex flex-col ml-5 overflow-hidden">
                            <h4 id="title" className="text-xl font-semibold mb-2">
                                {post.name}
                            </h4>
                            <p id="content" className="text-gray-800 mt-2 truncate">
                                {post.text}
                            </p>
                            <div className="flex mt-5">
                                <p className="text-gray-400 text-base">
                                    {post.creationDate}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        )
    });
    return (
        
			<div className="px-10 grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4">
                {cards}
            </div>
    )
}

PostsCards.defaultProps = {
    posts: [
            {img: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F02%2F24%2Fcancun-beach-hotels-CANCUNBREAK0221.jpg",
            name: "Viaje a Cancún",
            text: "Disfruté mucho de mis vacaciones con mi familia en las playas hermosas del caribe mexicano.",
            creationDate: "19/12/2020"},
            {img: "https://tec.mx/sites/default/files/styles/16_9_campus/public/repositorio/universidad-en-monterrey.jpg?itok=onwlzsla",
            name: "Primer día de clases",
            text: "Empezando un nuevo semestre en el campus!",
            creationDate: "20/08/2019"}
        ]
}

export default PostsCards