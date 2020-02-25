package com.example.area.presenter

import com.example.area.model.UserRegister
import com.example.area.view.RegisterView

class RegisterPresenter(var registerView: RegisterView) {
    fun onRegister(email: String?, username: String?, password: String?, confirmPassword: String?) {
        val user = UserRegister(email!!, username!!, password!!, confirmPassword!!)
        registerView.onResult(user.isValidEmail, user.isValidUsername, user.isValidPassword, user.isValidConfirmPassword)
    }
}