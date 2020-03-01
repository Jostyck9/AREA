package com.example.area.presenter

import android.content.Context
import android.util.Log
import android.widget.EditText
import com.example.area.model.ProfileModel
import com.example.area.view.ProfileView

/**
 * Presenter for the area activity
 *
 * @param profileView: View of the area
 * @param context: Context of the application
 */
class ProfilePresenter(private var profileView: ProfileView, var context: Context) {

    private val profileModel = ProfileModel(this, context)

    /**
     * Get the informations about the user
     */
    fun getUserInfos() {
        profileModel.getUserInfos()
    }

    /**
     * Check the informations enter by the user
     *
     * @param confirmPassword: Confirm password enter by the user
     * @param password: Password enter by the user
     * @param username: Username enter by the user
     */
    fun checkInfos(password: String, confirmPassword: String, username: String) {
        profileModel.checkInfos(password, confirmPassword, username)
        profileView.onResult(profileModel.isValidPassword, profileModel.isValidConfirmPassword, profileModel.isValidUsername)
    }

    /**
     * Get the informations is successful
     *
     * @param response: Response of the API
     */
    fun getInfosSuccess(response: String) {
        profileView.changeUserInfos(response)
    }

    /**
     * Sign out
     */
    fun signOut() {
        profileModel.signOut()
    }

    /**
     * Sign out success
     */
    fun signOutSuccess() {
        profileView.signOutSuccess()
    }

    /**
     * Sign out fail
     */
    fun signOutFail() {
        Log.d("Debug", "Sign out fail")
        profileView.displayMessage("Sign out fail")
    }

    /**
     * Change the username
     *
     * @param usernameProfile: Username enter by the user
     */
    fun changeUsername(usernameProfile: EditText) {
        profileModel.changeUsername(usernameProfile)
    }

    /**
     * Change the password
     *
     * @param passwordProfile: Password enter by the user
     */
    fun changePassword(passwordProfile: EditText) {
        profileModel.changePassword(passwordProfile)
    }

    /**
     * Change is successful
     */
    fun changeSuccess() {
        profileView.displayMessage("Save success")
    }

    /**
     * Change fail
     */
    fun changeFail() {
        profileView.displayMessage("Save fail")
    }
}