package com.example.area.presenter

import com.example.area.model.UserLogin
import com.example.area.view.LoginView

class LoginPresenter(var loginView: LoginView) {
    fun onLogin(email: String?, password: String?) {
        val user = UserLogin(email!!, password!!)
        val isLoginSuccess = user.isValidData
        if (isLoginSuccess)
            loginView.onResult("Login Success")
        else
            loginView.onResult("Login error")
    }
}