package com.example.area.model

import android.text.TextUtils
import android.util.Patterns

class User(override val email: String, override val password: String) : IUser {
    override val isValidData: Boolean
        get() = !TextUtils.isEmpty(email) &&
                Patterns.EMAIL_ADDRESS.matcher(email).matches() && password.length > 5

}