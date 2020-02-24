package com.example.area

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.preference.PreferenceManager
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val pref = PreferenceManager.getDefaultSharedPreferences(applicationContext)
        val editor = pref.edit()
        editor.putString("token", "")
        editor.apply()

        //Redirection
        val signInRedirection: Button = findViewById(R.id.signInRedirection)
        signInRedirection.setOnClickListener {
            val intent = Intent(this, SignInActivity::class.java)
            startActivity(intent)
        }

        api.addTextChangedListener(object : TextWatcher {

            override fun afterTextChanged(s: Editable) {}

            override fun beforeTextChanged(s: CharSequence, start: Int,
                                           count: Int, after: Int) {
            }

            override fun onTextChanged(s: CharSequence, start: Int,
                                       before: Int, count: Int) {
                val pref = PreferenceManager.getDefaultSharedPreferences(applicationContext)
                val editor = pref.edit()
                editor.putString("api", s.toString())
                editor.apply()
            }
        })
    }

    public override fun onStart() {
        super.onStart()

        api.setText(PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("api", null)!!)

        val token = PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("token", null)

        if (token != "") {
            val intent = Intent(this, HomeActivity::class.java)
            startActivity(intent)
        }

    }
}