package com.example.area

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_home.*

class HomeActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val toolbar : Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
    }

    override fun onStart() {
        super.onStart()

        val url = PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("api", null)!! + "/area/"

        val queue = Volley.newRequestQueue(this)
        val request = object: StringRequest(
            Method.GET, url,
            Response.Listener<String> {response ->

                if (response.toString() != "[]") {

                    Log.d("debug ", response.toString())
                    treeImage.visibility =  View.INVISIBLE
                    startConnecting.visibility = View.INVISIBLE


                } else {
                    treeImage.visibility =  View.VISIBLE
                    startConnecting.visibility = View.VISIBLE
                }

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

        queue.add(request)    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu,menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val id = item.itemId

        if (id == R.id.profile) {
            val intentProfile = Intent(this, ProfileActivity::class.java)
            startActivity(intentProfile)
        } else if (id == R.id.add) {
            Toast.makeText(applicationContext, "Add", Toast.LENGTH_SHORT).show()
        }
        return true
    }
}
