package com.example.area

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.cardview.widget.CardView
import com.example.area.presenter.LoginPresenter
import com.example.area.view.LoginView

class SignInActivity : AppCompatActivity(), LoginView {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)
        supportActionBar?.hide();

        //Redirection
        val backButton: ImageView = findViewById(R.id.backLogin)
        backButton.setOnClickListener {
            finish()
        }

        val registerRedirection: Button = findViewById(R.id.registerRedirection)
        registerRedirection.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

        //Check Register
        val emailLogin: EditText = findViewById(R.id.emailLogin)
        val passwordLogin: EditText = findViewById(R.id.passwordLogin)
        val loginPresenter: LoginPresenter = LoginPresenter(this)
        val signInButton: CardView = findViewById(R.id.signInButton)
        signInButton.setOnClickListener {
            loginPresenter.onLogin(emailLogin.text.toString(), passwordLogin.text.toString())
        }
    }

    override fun onResult(message: String?) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}