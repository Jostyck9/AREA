package com.example.area.view

/**
 * Interface for the Profile Activity
 */
interface ProfileView {
    /**
     * Display a message to the user
     */
    fun displayMessage(message: String)

    /**
     * Change the activity if the sign out is successful
     */
    fun signOutSuccess()

    /**
     * Change the information display about the user
     */
    fun changeUserInfos(response: String)

    /**
     * Manage the informations enter by the user to change his password or his username
     */
    fun onResult(isPasswordSuccess: Boolean, isConfirmPasswordSuccess: Boolean, isUsernameSuccess: Boolean)
}