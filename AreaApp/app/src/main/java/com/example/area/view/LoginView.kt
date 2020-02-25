package com.example.area.view

interface LoginView {
    fun onResult(isEmailSuccess: Boolean, isPasswordSuccess: Boolean)

    fun displayMessage(message: String)
}