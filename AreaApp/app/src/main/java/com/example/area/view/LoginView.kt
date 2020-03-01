package com.example.area.view

/**
 * Interface for the Login Activity
 */
interface LoginView {
    /**
     * Manage the informations enter by the user to connect
     *
     * @param isEmailSuccess: Result of the email enter by the user
     * @param isPasswordSuccess: Result of the password enter by the user
     */
    fun onResult(isEmailSuccess: Boolean, isPasswordSuccess: Boolean)

    /**
     * Display a message to the user
     *
     * @param message: Message to display
     */
    fun displayMessage(message: String)
}