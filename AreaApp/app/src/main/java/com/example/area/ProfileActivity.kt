package com.example.area

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.ProfilePresenter
import com.example.area.view.ProfileView
import kotlinx.android.synthetic.main.activity_profile.*
import kotlinx.android.synthetic.main.activity_sign_in.*
import org.json.JSONObject

class ProfileActivity : AppCompatActivity(), ProfileView {

    lateinit var profilePresenter: ProfilePresenter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        profilePresenter = ProfilePresenter(this, applicationContext)

        //Init activity
        profilePresenter.getUserInfos()

        //Save changes
        saveButton.setOnClickListener {
            profilePresenter.checkInfos(passwordProfile.text.toString(), confirmPasswordProfile.text.toString(), usernameProfile.text.toString())
        }

        //Back Button
        backProfile.setOnClickListener {
            finish()
        }

        //SignOut
        profileRedirection.setOnClickListener {
            profilePresenter.signOut()
        }
    }

    override fun displayMessage(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show()
    }

    override fun signOutSuccess() {
        val i = Intent(applicationContext, MainActivity::class.java)
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        i.putExtra("EXIT", true)
        startActivity(i)
        finish()
    }

    override fun changeUserInfos(response: String) {

        val person = JSONObject(response)
        val username = person.getString("username")
        val email = person.getString("email")
        usernameProfile.text = Editable.Factory.getInstance().newEditable(username)
        emailProfile.text = email

    }

    override fun onResult(isPasswordSuccess: Boolean, isConfirmPasswordSuccess: Boolean, isUsernameSuccess: Boolean) {
        if (isUsernameSuccess) {
            if (isPasswordSuccess) {
                if (isConfirmPasswordSuccess) {
                    errorTextLogin.text = ""
                    profilePresenter.changeUsername(usernameProfile)
                    profilePresenter.changePassword(passwordProfile)
                } else
                    errorTextProfile.text = getString(R.string.errorConfirmPassword)
            } else
                errorTextProfile.text = getString(R.string.errorPasswordRegister)
        } else
            errorTextProfile.text = getString(R.string.errorUsernameRegister)
    }
}
