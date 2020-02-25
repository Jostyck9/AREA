package com.example.area

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val pref = PreferenceManager.getDefaultSharedPreferences(applicationContext)
        val editor = pref.edit()
        if (!pref.contains("api")) {
            editor.putString("api", "api")
        }
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

        if (PreferenceManager.getDefaultSharedPreferences(applicationContext).contains("token")) {

            val url = PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("api", null)!! + "/me/"

            val queue = Volley.newRequestQueue(this)
            val request = object: StringRequest(
                Method.GET, url,
                Response.Listener<String> {

                    val intent = Intent(this, HomeActivity::class.java)
                    startActivity(intent)

                },
                Response.ErrorListener {
                    Log.d("debug", "your token isn't valid")
                })

            {
                @Throws(AuthFailureError::class)
                override fun getHeaders(): Map<String, String> {

                    val params: MutableMap<String, String>
                    params = HashMap()
                    params["Content-Type"] = "application/json"
                    params["Authorization"] = "Bearer " + PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("token", null)!!
                    return params

                }
            }
            queue.add(request)
        }

    }
}