package com.example.area.presenter

import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.EditText
import androidx.core.content.ContextCompat
import androidx.preference.PreferenceManager
import com.android.volley.VolleyError
import com.example.area.HomeActivity
import com.example.area.model.UserRegister
import com.example.area.view.RegisterView
import org.json.JSONObject

/**
 * Presenter for the register activity
 *
 * @param registerView: View of the area
 * @param context: Context of the application
 */
class RegisterPresenter(private var registerView: RegisterView, var context: Context) {

    private lateinit var user : UserRegister

    /**
     * Check the informations of the user for register
     *
     * @param confirmPassword: Confirm password enter by the user
     * @param email: Email enter by the user
     * @param password: Password enter by the user
     * @param username: Username enter by the user
     */
    fun onRegister(email: String?, username: String?, password: String?, confirmPassword: String?) {
        user = UserRegister(this, email!!, username!!, password!!, confirmPassword!!)
        registerView.onResult(user.isValidEmail, user.isValidUsername, user.isValidPassword, user.isValidConfirmPassword)
    }

    /**
     * Register
     *
     * @param emailRegister: Email enter by the user
     * @param passwordRegister: Password enter by the user
     * @param usernameRegister: Username enter by the user
     */
    fun register(usernameRegister: EditText, emailRegister: EditText, passwordRegister: EditText) {
        user.register(context,usernameRegister, emailRegister, passwordRegister)
    }

    /**
     * Register is successful
     *
     * @param response: Response of the API
     */
    fun onRegisterSuccess(response: JSONObject) {

        val pref = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = pref.edit()
        editor.putString("token", response["token"].toString())
        editor.apply()

        val intent = Intent(context, HomeActivity::class.java)
        ContextCompat.startActivity(context, intent, null)
    }

    /**
     * Register fail
     *
     * @param error: Error send by the API
     */
    fun onRegisterFail(error: VolleyError) {
        Log.d("Response", error.toString())
        registerView.displayMessage("Register fail")
    }
}