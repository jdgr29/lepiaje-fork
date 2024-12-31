'use client'
<<<<<<< HEAD
=======

>>>>>>> main
import { useState } from 'react'

export function useSuccessAlert() {
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState('')

    const showAlert = (newMessage: string) => {
        setMessage(newMessage)
        setIsVisible(true)
    }

    const hideAlert = () => {
        setIsVisible(false)
    }

    return { isVisible, message, showAlert, hideAlert }
}

