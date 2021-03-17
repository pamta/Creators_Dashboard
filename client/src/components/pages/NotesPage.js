

const NotesPage = () => {
	return (
        <div className= "flex flex-row min-h-full">
            <div className="relative flex flex-col w-1/4 bg-yellow-100">
                <div className="py-10 px-10 text-gray-900 text-2xl md:text-5xl">
                    Notes
                </div>
            </div>
            <div className="relative flex flex-col bg-white w-full">
                <div className="pt-10 px-5 text-gray-900 h-full">
                    <form className="form h-full">
                        <div className="relative mb-3">
                            <input 
                                required 
                                type="text"
                                className="border-0 border-solid border-b-2 border-red-500 w-full text-2xl md:text-5xl"
                                placeholder="Title"
                            />
                        </div>
                        <div className="relative mb-3 h-4/5">
                            <textarea
                                required
                                className="resize-none h-full w-full text-xl md:text-2xl p-3"
                                rows="20"
                                cols="28"
                                placeholder="Note"
                            />
                        </div>
                        <div className="text-center mt-8">
                            <button
                            className="rounded-lg bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4"
                            type="submit"
                            style={{ transition: "all .15s ease" }}
                            >
                            Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NotesPage
