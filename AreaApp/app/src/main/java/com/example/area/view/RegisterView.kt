package com.example.area.view

interface RegisterView {
    fun onResult(isEmailSuccess: Boolean, isPasswordSuccess: Boolean, isConfirmPasswordSuccess: Boolean)
}