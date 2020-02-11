package com.example.area.model

import android.text.TextUtils
import android.util.Patterns

class UserRegister(private val email: String, private val username: String, private val password: String, private val confirmPassword: String) {
    val isValidEmail: Boolean
        get() = !TextUtils.isEmpty(email)&&
                Patterns.EMAIL_ADDRESS.matcher(email).matches()
    val isValidPassword: Boolean
        get() = password.length > 6
    val isValidConfirmPassword: Boolean
        get() = password == confirmPassword
    val isValidUsername: Boolean
        get() = username.length > 1
}