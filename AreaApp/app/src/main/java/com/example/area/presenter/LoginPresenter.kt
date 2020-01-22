package com.example.area.presenter

import com.example.area.model.User
import com.example.area.view.ILoginView

class LoginPresenter(var loginView: ILoginView) : ILoginPresenter {
    override fun onLogin(email: String?, password: String?) {
        val user = User(email!!, password!!)
        val isLoginSuccess = user.isValidData
        if (isLoginSuccess) loginView.onLoginResult("Login Success")
        else loginView.onLoginResult("Login error")
    }

}