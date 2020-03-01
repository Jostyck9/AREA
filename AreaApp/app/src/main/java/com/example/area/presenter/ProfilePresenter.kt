package com.example.area.presenter

import android.content.Context
import android.security.ConfirmationAlreadyPresentingException
import android.util.Log
import android.widget.EditText
import com.example.area.model.ProfileModel
import com.example.area.model.UserLogin
import com.example.area.view.ProfileView

class ProfilePresenter(private var profileView: ProfileView, var context: Context) {

    private val profileModel = ProfileModel(this, context)

    fun getUserInfos() {
        profileModel.getUserInfos()
    }

    fun checkInfos(password: String, confirmPassword: String, username: String) {
        profileModel.checkInfos(password, confirmPassword, username)
        profileView.onResult(profileModel.isValidPassword, profileModel.isValidConfirmPassword, profileModel.isValidUsername)
    }

    fun getInfosSuccess(response: String) {
        profileView.changeUserInfos(response)
    }

    fun signOut() {
        profileModel.signOut()
    }

    fun signOutSuccess() {
        profileView.signOutSuccess()
    }

    fun signOutFail() {
        Log.d("Debug", "Sign out fail")
        profileView.displayMessage("Sign out fail")
    }

    fun changeUsername(usernameProfile: EditText) {
        profileModel.changeUsername(usernameProfile)
    }

    fun changePassword(passwordProfile: EditText) {
        profileModel.changePassword(passwordProfile)
    }

    fun changeSuccess() {
        profileView.displayMessage("Save success")
    }

    fun changeFail() {
        profileView.displayMessage("Save fail")
    }
}