package com.example.area.view

interface ProfileView {
    fun displayMessage(message: String)
    fun signOutSuccess()
    fun changeUserInfos(response: String)
    fun onResult(isPasswordSuccess: Boolean, isConfirmPasswordSuccess: Boolean, isUsernameSuccess: Boolean)
}