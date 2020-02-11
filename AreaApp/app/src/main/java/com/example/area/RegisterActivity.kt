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
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.android.synthetic.main.activity_profile.*
import kotlinx.android.synthetic.main.activity_register.*

class RegisterActivity : AppCompatActivity(), RegisterView {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        //Redirection
        backRegister.setOnClickListener {
            finish()
        }

        val registerPresenter = RegisterPresenter(this)

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
                        val gson = GsonBuilder().setPrettyPrinting().create()
                        val tutMap: Map<String, String> =
                            mapOf(
                                "name" to usernameRegister.text.toString(),
                                "email" to emailRegister.text.toString(),
                                "password" to passwordRegister.text.toString()
                            )
                        val jsonTutMapPretty: String = gson.toJson(tutMap)
                        println(jsonTutMapPretty)
                        //TODO ajouter la personne a la DB
                    } else
                    errorTextRegister.text = getString(R.string.errorConfirmPassword)
                } else
                    errorTextRegister.text = getString(R.string.errorPasswordRegister)
            } else
                errorTextRegister.text = getString(R.string.errorUsernameRegister)
        } else
            errorTextRegister.text = getString(R.string.errorEmail)
    }
}
