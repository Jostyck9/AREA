package com.example.area

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.*
import androidx.preference.PreferenceManager
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.LoginPresenter
import com.example.area.view.LoginView
import kotlinx.android.synthetic.main.activity_sign_in.*
import org.json.JSONObject

class SignInActivity : AppCompatActivity(), LoginView {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)

        //Redirection
        backLogin.setOnClickListener {
            finish()
        }

        registerRedirection.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

        val loginPresenter = LoginPresenter(this)
        signInButton.setOnClickListener {
            loginPresenter.onLogin(emailLogin.text.toString(), passwordLogin.text.toString())
        }
    }

    override fun onResult(isEmailSuccess: Boolean, isPasswordSuccess: Boolean) {
        if (isEmailSuccess) {
            if (isPasswordSuccess) {

                errorTextLogin.text = ""

                val url = PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("api", null)!! + "/auth/login/"

                val jsonObj = JSONObject()
                jsonObj.put("email", emailLogin.text)
                jsonObj.put("password", passwordLogin.text)

                val queue = Volley.newRequestQueue(this)
                val request = JsonObjectRequest(
                    Request.Method.POST, url, jsonObj,
                    Response.Listener { response ->

                        Log.d("Response", response["token"].toString())

                        val pref = PreferenceManager.getDefaultSharedPreferences(applicationContext)
                        val editor = pref.edit()
                        editor.putString("token", response["token"].toString())
                        editor.apply()

                        val intent = Intent(this, HomeActivity::class.java)
                        startActivity(intent)
                    },
                    Response.ErrorListener { error ->
                        Log.d("Response", error.toString())
                        Toast.makeText(applicationContext, "Login fail", Toast.LENGTH_SHORT).show()
                    }
                )
                queue.add(request)

            } else
                errorTextLogin.text = getString(R.string.errorPasswordLogin)
        } else
            errorTextLogin.text = getString(R.string.errorEmail)
    }
}