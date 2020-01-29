package com.example.area.model

import android.text.TextUtils
import android.util.Patterns

class UserLogin(private val email: String, private val password: String) {
    val isValidData: Boolean
        get() = !TextUtils.isEmpty(email) &&
                Patterns.EMAIL_ADDRESS.matcher(email).matches() &&
                password.length > 5

}