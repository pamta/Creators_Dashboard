import twitterIcon from "../../assets/img/twitter_icon.png";
import fbIcon from "../../assets/img/facebook_icon.png";
import ytIcon from "../../assets/img/youtube_icon.png";
import igIcon from "../../assets/img/instagram_icon.png";

const NewPostPage = () => {
    return (
            
            <div className="overflow-auto max-h-full flex flex-col mx-auto px-3">
                <div className="pt-3 pb-10 px-4 text-gray-900 text-2xl md:text-4xl">
                    New Post
                </div>
                <div className="flex-auto min-w-full shadow-lg rounded-lg px-5 py-5 bg-green-200">
                    <form className="form text-gray-900 ">
                        <div className="flex flex-col w-full">
                            <div className="flex py-2 justify-between">
                                <div className="flex flex-row">
                                    <div className="px-3 py-3 text-xl md:text-2xl font-bold">
                                        Title:
                                    </div>
                                    <input
                                        type="text"
                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-base md:text-xl shadow focus:outline-none focus:shadow-outline"
                                        placeholder="Post Title"
                                        style={{ transition: "all .15s ease" }}
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <div className="px-4 py-3 text-xl md:text-2xl font-bold">
                                        Platform:
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="twitter"
                                            className="w-4 h-4"
                                        />
                                        <img className="pl-2 pr-4 w-12 md:w-16 h-auto" src={twitterIcon} />
                                        <input
                                            type="checkbox"
                                            name="facebook"
                                            className="w-4 h-4"
                                        />
                                        <img className="pl-2 pr-4 w-12 md:w-16 h-auto" src={fbIcon} />
                                        <input
                                            type="checkbox"
                                            name="youtube"
                                            className="w-4 h-4"
                                        />
                                        <img className="pl-2 pr-4 w-12 md:w-16 h-auto" src={ytIcon} />
                                        <input
                                            type="checkbox"
                                            name="instagram"
                                            className="w-4 h-4"
                                        />
                                        <img className="pl-2 pr-4 w-12 md:w-16 h-auto" src={igIcon} />
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-3 text-xl md:text-2xl font-bold w-2/3">
                                Content:
                            </div>
                            <textarea
                                required
                                className="px-3 py-3 resize-none w-2/3 placeholder-gray-400 text-gray-700 bg-white rounded text-base md:text-xl"
                                rows="20"
                                placeholder="My new post"
                            />
                            <div className="flex flex-row py-3 items-center">
                                <button
                                    className="flex flex-row px-3 py-3 justify-start items-center space-x-4 rounded-lg bg-green-600 text-black active:bg-green-400 text-base md:text-2xl shadow hover:shadow-lg hover:bg-green-700 hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/></svg>
                                    <p>Upload</p>
                                </button>
                                <div className="px-4 text-base md:text-xl text-blue-500">
                                    file1.png
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className=" px-10 py-5 rounded-lg bg-green-600 text-black active:bg-green-400 text-2xl md:text-4xl font-bold shadow hover:shadow-lg hover:bg-green-700 hover:text-white"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="py-5">
                    <button
                        className="pl-3 pr-5 py-3 text-2xl md:text-4xl rounded-lg bg-gray-400 text-black flex flex-row justify-left items-center space-x-4 hover:bg-gray-600 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
                        <p>Back</p>
                    </button>

                </div>
            </div>
    );
};

export default NewPostPage