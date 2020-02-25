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
import org.json.JSONObject

class ProfileActivity : AppCompatActivity(), ProfileView {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val profilePresenter = ProfilePresenter(this, applicationContext)

        //Init activity
        profilePresenter.getUserInfos()

        //Save changes
        saveButton.setOnClickListener {
            profilePresenter.changeUsername(usernameProfile)
            profilePresenter.changePassword(passwordProfile)
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
}
