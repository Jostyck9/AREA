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

    lateinit var loginPresenter: LoginPresenter

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

        loginPresenter = LoginPresenter(this, applicationContext)
        signInButton.setOnClickListener {
            loginPresenter.onLogin(emailLogin.text.toString(), passwordLogin.text.toString())
        }
    }

    override fun onResult(isEmailSuccess: Boolean, isPasswordSuccess: Boolean) {
        if (isEmailSuccess) {
            if (isPasswordSuccess) {
                errorTextLogin.text = ""
                loginPresenter.signIn(emailLogin, passwordLogin)

            } else
                errorTextLogin.text = getString(R.string.errorPasswordLogin)
        } else
            errorTextLogin.text = getString(R.string.errorEmail)
    }

    override fun displayMessage(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show()
    }
}