package com.example.area

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.preference.PreferenceManager
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.RegisterPresenter
import com.example.area.view.RegisterView
import kotlinx.android.synthetic.main.activity_register.*
import org.json.JSONObject


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

                        val url = PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("api", null)!! + "/auth/register/"

                        val jsonObj = JSONObject()
                        jsonObj.put("name", usernameRegister.text)
                        jsonObj.put("email", emailRegister.text)
                        jsonObj.put("password", passwordRegister.text)

                        val queue = Volley.newRequestQueue(this)
                        val request = JsonObjectRequest(Request.Method.POST, url, jsonObj,
                            Response.Listener { response ->

                                val pref = PreferenceManager.getDefaultSharedPreferences(applicationContext)
                                val editor = pref.edit()
                                editor.putString("token", response["token"].toString())
                                editor.apply()

                                val intent = Intent(this, HomeActivity::class.java)
                                startActivity(intent)

                            },
                            Response.ErrorListener { error ->
                                Log.d("Response", error.toString())
                                Toast.makeText(applicationContext, "Register fail", Toast.LENGTH_SHORT).show()
                            }
                        )
                        queue.add(request)

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
