package com.example.area

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.cardview.widget.CardView
import com.example.area.presenter.RegisterPresenter
import com.example.area.view.RegisterView

class RegisterActivity : AppCompatActivity(), RegisterView {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        supportActionBar?.hide();

        //Redirection
        val backButton: ImageView = findViewById(R.id.backRegister)
        backButton.setOnClickListener {
            finish()
        }

        //Check Register
        val emailRegister: EditText = findViewById(R.id.emailRegister)
        val passwordRegister: EditText = findViewById(R.id.passwordRegister)
        val confirmPasswordRegister: EditText = findViewById(R.id.confirmPasswordRegister)
        val registerButton: CardView = findViewById(R.id.registerButton)
        val loginPresenter: RegisterPresenter = RegisterPresenter(this)

        registerButton.setOnClickListener {
            loginPresenter.onLogin(emailRegister.text.toString(), passwordRegister.text.toString(), confirmPasswordRegister.text.toString())
        }
    }

    override fun onResult(message: String?) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
