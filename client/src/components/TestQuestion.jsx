import React  from 'react'
const TestQuestion = ({question}) => {
   return (
    <>
           <div className="border rounded-md shadow-sm">
               <div className="bg-[#ffffff] rounded-md p-4">
                   <div className="flex items-center space-x-2">
                       <div className="text-black font-medium">Question:</div>
                       <div>{question?.body}</div>
                   </div>
                   <div className="mt-2 space-y-1">
                       <div className="flex items-center space-x-2">
                           <div className='text-black font-medium'>Option A:</div>
                           <div>{question?.options[0]}</div>
                       </div>
                       <div className="flex items-center space-x-2">
                           <div className='text-black font-medium'>Option B:</div>
                           <div>{question?.options[1]}</div>
                       </div>
                       <div className="flex items-center space-x-2">
                           <div className='text-black font-medium '>Option C:</div>
                           <div>{question?.options[2]}</div>
                       </div>
                       <div className="flex items-center space-x-2">
                           <div className='text-black font-medium'>Option D:</div>
                           <div>{question?.options[3]}</div>
                       </div>
                   </div>
                   <div className="mt-2 flex items-center space-x-2">
                       <div className="text-black font-medium">Total Marks:</div>
                       <div>{question?.marks}</div>
                   </div>
                   <div className="mt-2 flex items-center space-x-2">
                       <div className="text-black font-medium">Answer:</div>
                       <div>{question?.answer}</div>
                   </div>
               </div>
           </div>
    </>
  )
}

export default TestQuestion
