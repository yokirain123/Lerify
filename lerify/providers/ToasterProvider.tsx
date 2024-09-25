"use client"

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
    return (
        <Toaster 
            toastOptions={{
                style: {
                    background: '#1a1a1a',
                    color: '#88b4fc',
                },
                iconTheme: {
                    primary: '#88b4fc',
                    secondary: 'white'
                }
            }}
        />
    )
}

export default ToasterProvider;