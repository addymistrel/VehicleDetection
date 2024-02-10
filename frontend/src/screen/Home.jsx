import React from 'react'
import './home.css'; // Import your custom CSS file
import Img from '../Image/img.jpg'

export default function Home() {
    return (
        <>

            <div className='flex justify-between mb-4'>

                <div className='w-1/2 p-4 text-white'>

                    <img src={Img} alt="" />
                </div>

                <div className='w-1/4 p-4 text-white flex-row hello-hello-2 mx-10'>
                    <div className='p-2 hello-hello  mx-4'>

                        <div className='mx-auto mt-40 Hello-hello-hello'>
                            <h1 className='bg-white text-5xl py-3 px-3'>65</h1>
                        </div>
                    </div>
                    <div className='mx-auto m-1 border h-20 w-15 helo-helo-helo bg-white flex p-2'>
                        <div className='h-7 w-7 bg-red-500 m-2 rounded-full'></div>
                        <div className='h-7 w-7 bg-yellow-500 m-2 rounded-full'></div>
                        <div className='h-7 w-7 bg-green-500 m-2 rounded-full'></div>
                    </div>
                </div>

                <div className='w-1/2 p-4 text-white'>
                    <img src={Img} alt="" />
                </div>

            </div>


            <div className='flex justify-between'>

                <div className="w-1/2 p-4 text-white flex second-second mr-7">
                    <div className='Hello-hello-hello mx-auto my-10'>
                        <h1 className='bg-white text-5xl py-3 px-3'>65</h1>
                    </div>

                    <div className='my-auto m-1 border second-second-second bg-white flex-row justify-center p-1'>
                        <div className='h-7 w-7 bg-red-500 m-3 rounded-full'></div>
                        <div className='h-7 w-7 bg-yellow-500 m-3 rounded-full'></div>
                        <div className='h-7 w-7 bg-green-500 m-3 rounded-full'></div>
                    </div>

                </div>

                <div className="w-1/4 p-4">
                    <div className='flex justify-center items-center p-12'>
                        <button className='text-white bg-red-500 rounded-xl p-4'>Capture</button>
                    </div>
                </div>

                <div className="w-1/2 p-4 flex second-second mr-7">

                    <div className='my-auto m-1 border third-second-second bg-white flex-row justify-center p-1'>
                        <div className='h-7 w-7 bg-red-500 m-3 rounded-full'></div>
                        <div className='h-7 w-7 bg-yellow-500 m-3 rounded-full'></div>
                        <div className='h-7 w-7 bg-green-500 m-3 rounded-full'></div>
                    </div>
                    <div className='Hello-hello-hello mx-auto my-10'>
                        <h1 className='bg-white text-5xl py-3 px-3'>65</h1>
                    </div>

                </div>
            </div>

            <div className='flex justify-between mt-6'>

                <div className='w-1/2 p-4 text-white'>

                    <img src={Img} alt="" />
                </div>

                <div className='w-1/4 p-4 text-white flex-row hello-hello-2 mx-10'>
                    <div className='mx-auto m-1 border h-20 w-15 helo-helo-helo-helo bg-white flex p-2'>
                        <div className='h-7 w-7 bg-red-500 m-2 rounded-full'></div>
                        <div className='h-7 w-7 bg-yellow-500 m-2 rounded-full'></div>
                        <div className='h-7 w-7 bg-green-500 m-2 rounded-full'></div>
                    </div>
                    <div className='p-2 hello-hello  mx-4 mt-6'>
                        <div className='mx-auto mb-70 Hello-hello-hello'>
                            <h1 className='bg-white text-5xl py-3 px-3'>65</h1>
                        </div>
                    </div>

                </div>

                <div className='w-1/2 p-4 text-white'>
                    <img src={Img} alt="" />
                </div>

            </div>
        </>
    )
}
