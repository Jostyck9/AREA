package com.example.area

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_profile.*
import kotlinx.android.synthetic.main.activity_sign_in.*
import org.json.JSONObject


class ProfileActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        //Init activity
        val sharedPreference = PreferenceManager.getDefaultSharedPreferences(applicationContext)

        var url = sharedPreference.getString("api", null)!! + "/me/"

        val queue = Volley.newRequestQueue(this)
        val request = object: StringRequest(
            Method.GET, url,
            Response.Listener { response ->

                val person = JSONObject(response)
                val username = person.getString("username")
                val email = person.getString("email")
                usernameProfile.text = Editable.Factory.getInstance().newEditable(username)
                emailProfile.text = email

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

        //Save changes
        saveButton.setOnClickListener {
            url = sharedPreference.getString("api", null)!! + "/me/password/"

            val jsonObjPassword = JSONObject()
            jsonObjPassword.put("password", passwordProfile.text)

            val savePasswordRequest = object: JsonObjectRequest(
                Method.POST, url, jsonObjPassword,
                Response.Listener {
                    Toast.makeText(applicationContext, "Save success", Toast.LENGTH_SHORT).show()

                },
                Response.ErrorListener {
                    Toast.makeText(applicationContext, "Save fail", Toast.LENGTH_SHORT).show()
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

            url = sharedPreference.getString("api", null)!! + "/me/username/"

            val jsonObjUsername = JSONObject()
            jsonObjUsername.put("username", usernameProfile.text)

            val saveUsernameRequest = object: JsonObjectRequest(
                Method.POST, url, jsonObjUsername,
                Response.Listener {
                    Toast.makeText(applicationContext, "Save success", Toast.LENGTH_SHORT).show()

                },
                Response.ErrorListener {
                    Toast.makeText(applicationContext, "Save fail", Toast.LENGTH_SHORT).show()
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
            queue.add(savePasswordRequest)
            queue.add(saveUsernameRequest)

        }

        //Back Button
        backProfile.setOnClickListener {
            finish()
        }

        //SignOut
        profileRedirection.setOnClickListener {

            url = sharedPreference.getString("api", null)!! + "/auth/logout/"

            val signOutRequest = object: StringRequest(
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
            queue.add(signOutRequest)
        }
    }
}
