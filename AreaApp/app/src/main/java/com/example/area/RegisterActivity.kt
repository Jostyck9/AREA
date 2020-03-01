package com.example.area

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.area.presenter.RegisterPresenter
import com.example.area.view.RegisterView
import kotlinx.android.synthetic.main.activity_register.*

/**
 * Register activity
 */
class RegisterActivity : AppCompatActivity(), RegisterView {

    lateinit var registerPresenter: RegisterPresenter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        //Redirection
        backRegister.setOnClickListener {
            finish()
        }

        registerPresenter = RegisterPresenter(this, applicationContext)
        registerButton.setOnClickListener {
            registerPresenter.onRegister(emailRegister.text.toString(), usernameRegister.text.toString(), passwordRegister.text.toString(), confirmPasswordRegister.text.toString())
        }
    }

    override fun onResult(isEmailSuccess: Boolean, isUsernameSuccess: Boolean, isPasswordSuccess: Boolean, isConfirmPasswordSuccess: Boolean) {
        if (isEmailSuccess) {
            if (isUsernameSuccess) {
                if (isPasswordSuccess) {
                    if (isConfirmPasswordSuccess) {

                        errorTextRegister.text = ""
                        registerPresenter.register(usernameRegister, emailRegister, passwordRegister)

                    } else
                    errorTextRegister.text = getString(R.string.errorConfirmPassword)
                } else
                    errorTextRegister.text = getString(R.string.errorPasswordRegister)
            } else
                errorTextRegister.text = getString(R.string.errorUsernameRegister)
        } else
            errorTextRegister.text = getString(R.string.errorEmail)
    }

    override fun displayMessage(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show()
    }
}
