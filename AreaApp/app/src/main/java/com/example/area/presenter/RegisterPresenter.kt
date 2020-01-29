package com.example.area.presenter

import com.example.area.model.UserRegister
import com.example.area.view.RegisterView

class RegisterPresenter(var registerView: RegisterView) {
    fun onLogin(email: String?, password: String?, confirmPassword: String?) {
        val user = UserRegister(email!!, password!!, confirmPassword!!)
        registerView.onResult(user.isValidEmail, user.isValidPassword, user.isValidConfirmPassword)
    }
}