package com.example.area.presenter

import com.example.area.model.UserLogin
import com.example.area.view.LoginView

class LoginPresenter(var loginView: LoginView) {
    fun onLogin(email: String?, password: String?) {
        val user = UserLogin(email!!, password!!)
        loginView.onResult(user.isValidEmail, user.isValidPassword)
    }
}