package com.example.area.view

/**
 * Interface for the Register Activity
 */
interface RegisterView {
    /**
     * Manage the informations enter by the user to register
     *
     * @param isConfirmPasswordSuccess: Result of the confirm password enter by the user
     * @param isEmailSuccess: Result of the email enter by the user
     * @param isPasswordSuccess: Result of the password enter by the user
     * @param isUsernameSuccess: Result of the username enter by the user
     */
    fun onResult(isEmailSuccess: Boolean, isUsernameSuccess: Boolean, isPasswordSuccess: Boolean, isConfirmPasswordSuccess: Boolean)

    /**
     * Display a message to the user
     *
     * @param message: Message to display
     */
    fun displayMessage(message: String)

}