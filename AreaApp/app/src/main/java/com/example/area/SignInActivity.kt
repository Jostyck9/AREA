package com.example.area

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.*
import com.example.area.presenter.LoginPresenter
import com.example.area.view.LoginView
import kotlinx.android.synthetic.main.activity_sign_in.*

/**
 * Sign in activity
 */
class SignInActivity : AppCompatActivity(), LoginView {

    private lateinit var loginPresenter: LoginPresenter

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