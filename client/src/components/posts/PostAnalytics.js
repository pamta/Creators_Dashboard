const PostAnalytics = () => {
	return (
        <div className="pt-10 pb-10">
            <p className="text-lg text-center font-bold">Analytics for this post (WIP)</p>
            <table className="table-auto rounded-t-lg m-5 w-5/6 mx-auto bg-gray-800 text-gray-200">
                <thead>
                    <tr className="text-left border-b border-gray-300">
                        <th className="px-4 py-3">Stat</th>
                        <th className="px-4 py-3">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-700 border-b border-gray-600">
                        <td className="px-4 py-3">Views</td>
                        <td className="px-4 py-3">1069</td>
                    </tr>
                    <tr className="bg-gray-700 border-b border-gray-600">
                        <td className="px-4 py-3">Likes</td>
                        <td className="px-4 py-3">589</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PostAnalytics