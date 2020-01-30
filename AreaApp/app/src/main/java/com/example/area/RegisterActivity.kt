package com.example.area

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.cardview.widget.CardView
import com.example.area.presenter.RegisterPresenter
import com.example.area.view.RegisterView

class RegisterActivity : AppCompatActivity(), RegisterView {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

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
        val loginPresenter = RegisterPresenter(this)

        registerButton.setOnClickListener {
            loginPresenter.onLogin(emailRegister.text.toString(), passwordRegister.text.toString(), confirmPasswordRegister.text.toString())
        }
    }

    override fun onResult(isEmailSuccess: Boolean, isPasswordSuccess: Boolean, isConfirmPasswordSuccess: Boolean) {
        val errorText: TextView = findViewById(R.id.errorTextRegister)
        if (isEmailSuccess) {
            if (isPasswordSuccess) {
                if (isConfirmPasswordSuccess) {
                    errorText.text = ""
                    //TODO ajouter la personne a la DB
                    Toast.makeText(this, "Register Success", Toast.LENGTH_SHORT).show()
                } else
                    errorText.text = getString(R.string.errorConfirmPassword)
            } else
                errorText.text = getString(R.string.errorPasswordRegister)
        } else
            errorText.text = getString(R.string.errorEmail)
    }
}
