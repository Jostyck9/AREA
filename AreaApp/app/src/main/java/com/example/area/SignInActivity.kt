package com.example.area

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Window
import android.view.WindowManager
import android.widget.Button
import android.widget.EditText

class SignInActivity : AppCompatActivity() {

    val edt_email: EditText? = null
    val edt_password: EditText? = null
    val btnLogin: Button? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)
        supportActionBar?.hide();

//        btnLogin = findViewById(R.id.login)
    }
}