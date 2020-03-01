package com.example.area.model

import android.content.Context
import android.text.TextUtils
import android.util.Patterns
import android.widget.EditText
import androidx.preference.PreferenceManager
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.LoginPresenter
import org.json.JSONObject

/**
 * Model for the Login activity
 *
 * @param email: Email enter by the user
 * @param password: Password enter by the user
 * @param loginPresenter: Presenter of the login activity
 */
class UserLogin(private var loginPresenter: LoginPresenter, private val email: String, private val password: String) {

    val isValidEmail: Boolean
        get() = !TextUtils.isEmpty(email)&&
                Patterns.EMAIL_ADDRESS.matcher(email).matches()
    val isValidPassword: Boolean
        get() = password.length > 6

    /**
     * Sign in
     *
     * @param context: Context of the application
     * @param emailLogin: Email enter by the user
     * @param passwordLogin: Password enter by the user
     */
    fun signIn(context: Context, emailLogin: EditText, passwordLogin: EditText) {

        val url = PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!! + "/auth/login/"

        //Create Json for request
        val jsonObj = JSONObject()
        jsonObj.put("email", emailLogin.text)
        jsonObj.put("password", passwordLogin.text)

        //Create request and add it to the queue
        val queue = Volley.newRequestQueue(context)
        val loginRequest = JsonObjectRequest(
            Request.Method.POST, url, jsonObj,
            Response.Listener { response ->
                loginPresenter.onLoginSuccess(response)
            },
            Response.ErrorListener { error ->
                loginPresenter.onLoginFail(error)
            }
        )
        queue.add(loginRequest)
    }
}