import React from 'react'
import Button from '../components/Button'
import { useNavigate } from "react-router-dom";
const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">404 - Page Not Found</h1>
                <p className="mt-4 text-muted-foreground">
                    The page you're looking for doesn't exist. Let's get you back on track.
                </p>
                <div className="mt-6">
                    <Button
                        type='submit'
                        label="Go Back Home"
                        className='w-full h-10 bg-blue-700 text-white rounded-full'
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Error
