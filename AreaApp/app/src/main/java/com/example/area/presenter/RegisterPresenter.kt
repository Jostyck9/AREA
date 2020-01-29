package com.example.area.presenter

import com.example.area.model.UserRegister
import com.example.area.view.RegisterView

class RegisterPresenter(var loginView: RegisterView) {
    fun onLogin(email: String?, password: String?, confirmPassword: String?) {
        val user = UserRegister(email!!, password!!, confirmPassword!!)
        val isLoginSuccess = user.isValidData
        if (isLoginSuccess)
            loginView.onResult("Register Success")
        else
            loginView.onResult("Register error")
    }
}