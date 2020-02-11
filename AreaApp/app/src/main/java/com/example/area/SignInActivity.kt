package com.example.area

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.*
import androidx.cardview.widget.CardView
import com.example.area.presenter.LoginPresenter
import com.example.area.view.LoginView
import kotlinx.android.synthetic.main.activity_sign_in.*

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
                    //TODO check personne dans DB
                    Toast.makeText(this, "Login Success", Toast.LENGTH_SHORT).show()
            } else
                errorTextLogin.text = getString(R.string.errorPasswordLogin)
        } else
            errorTextLogin.text = getString(R.string.errorEmail)
    }
}