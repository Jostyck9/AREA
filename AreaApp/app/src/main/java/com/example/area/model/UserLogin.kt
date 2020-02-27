package com.example.area.model

import android.text.TextUtils
import android.util.Patterns

class UserLogin(private val email: String, private val password: String) {
    //TODO changer par vérification DB
    val isValidEmail: Boolean
        get() = !TextUtils.isEmpty(email)&&
                Patterns.EMAIL_ADDRESS.matcher(email).matches()
    val isValidPassword: Boolean
        get() = password.length > 6
}