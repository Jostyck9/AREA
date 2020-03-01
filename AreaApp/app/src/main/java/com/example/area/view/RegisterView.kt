package com.example.area.view

interface RegisterView {
    fun onResult(isEmailSuccess: Boolean, isUsernameSuccess: Boolean, isPasswordSuccess: Boolean, isConfirmPasswordSuccess: Boolean)

    fun displayMessage(message: String)

}