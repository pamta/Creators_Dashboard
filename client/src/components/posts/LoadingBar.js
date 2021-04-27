
import { useEffect, useState } from 'react'

const LoadingBar = ({ progress }) => {

    useEffect(() => {
        //progress = (progress == null || progress == "0") ? "1" : progress;

        console.log("progress: " + progress)
    });

    return (
		<div className='bg-black min-w-full h-7 p-1 m-1'>
            <div  className='bg-green-500 h-5'  style={{width: `${progress}%`}}>

            </div>
        </div>
    )
}

export default LoadingBar