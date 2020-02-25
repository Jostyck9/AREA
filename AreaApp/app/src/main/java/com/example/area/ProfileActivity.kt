package com.example.area

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_profile.*

class ProfileActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        //TODO afficher username, email et password de l'utilisateur

        //Redirection
        backProfile.setOnClickListener {
            finish()
        }

        profileRedirection.setOnClickListener {

            val url = PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("api", null)!! + "/auth/logout/"

            Log.d("Debug", PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("token", null)!!)
            val queue = Volley.newRequestQueue(this)
            val request = object: StringRequest(
                Method.POST, url,
                Response.Listener<String> {

                    val pref = PreferenceManager.getDefaultSharedPreferences(applicationContext)
                    val editor = pref.edit()
                    editor.remove("token")
                    editor.apply()

                    val i = Intent(applicationContext, MainActivity::class.java)
                    i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
                    i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    i.putExtra("EXIT", true)
                    startActivity(i)
                    finish()

                },
                Response.ErrorListener { })

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
