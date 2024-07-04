import React from 'react'
import { Rate } from 'antd';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const ResultFeedback = () => {
    return (
        <div>

            <div className="flex flex-col items-center justify-center h-auto ">
                <div className="flex items-center justify-center h-[300px]">
                    <DotLottieReact
                        src="/lottie-files/Animation.lottie"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                    >

                    </DotLottieReact>
                </div>
                <h1 className="text-2xl font-semibold">Successfully Completed Test!</h1>
                <div className="flex space-x-2">
                </div>
                <div className="flex space-x-1">
                    <p className="text-sm text-gray-500">
                        Test Experience:
                    </p>
                    <Rate />
                </div>
            </div>

        </div>
    )
}

export default ResultFeedback
