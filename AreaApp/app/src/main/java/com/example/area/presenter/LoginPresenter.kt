package com.example.area.presenter

import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.EditText
import androidx.core.content.ContextCompat
import androidx.preference.PreferenceManager
import com.android.volley.VolleyError
import com.example.area.HomeActivity
import com.example.area.model.UserLogin
import com.example.area.view.LoginView
import org.json.JSONObject

class LoginPresenter(private var loginView: LoginView, var context: Context) {

    private lateinit var user : UserLogin

    fun onLogin(email: String?, password: String?) {
        user = UserLogin(this, email!!, password!!)
        loginView.onResult(user.isValidEmail, user.isValidPassword)
    }

    fun signIn(emailLogin: EditText, passwordLogin: EditText) {
        user.signIn(context, emailLogin, passwordLogin)
    }

    fun onLoginSuccess(response: JSONObject) {

        val pref = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = pref.edit()
        editor.putString("token", response["token"].toString())
        editor.apply()

        val intent = Intent(context, HomeActivity::class.java)
        ContextCompat.startActivity(context, intent, null)
    }

    fun onLoginFail(error: VolleyError) {
        Log.d("Response", error.toString())
        loginView.displayMessage("Login fail")
    }
}