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
import com.example.area.presenter.RegisterPresenter
import org.json.JSONObject

class UserRegister(private var registerPresenter: RegisterPresenter, private val email: String, private val username: String, private val password: String, private val confirmPassword: String) {
    val isValidEmail: Boolean
        get() = !TextUtils.isEmpty(email)&&
                Patterns.EMAIL_ADDRESS.matcher(email).matches()
    val isValidPassword: Boolean
        get() = password.length > 6
    val isValidConfirmPassword: Boolean
        get() = password == confirmPassword
    val isValidUsername: Boolean
        get() = username.length > 1

    fun register(context: Context, usernameRegister: EditText, emailRegister: EditText, passwordRegister: EditText) {

        val url = PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!! + "/auth/register/"

        val jsonObj = JSONObject()
        jsonObj.put("name", usernameRegister.text)
        jsonObj.put("email", emailRegister.text)
        jsonObj.put("password", passwordRegister.text)

        val queue = Volley.newRequestQueue(context)
        val request = JsonObjectRequest(Request.Method.POST, url, jsonObj,
            Response.Listener { response ->
                registerPresenter.onRegisterSuccess(response)
            },
            Response.ErrorListener { error ->
                registerPresenter.onRegisterFail(error)
            }
        )
        queue.add(request)
    }
}