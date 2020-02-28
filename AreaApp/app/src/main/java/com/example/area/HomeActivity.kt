package com.example.area

import android.content.Intent
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.HomePresenter
import com.example.area.view.HomeView
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import kotlinx.android.synthetic.main.activity_home.*
import org.json.JSONArray


class HomeActivity : AppCompatActivity(), HomeView {

    private lateinit var homePresenter: HomePresenter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val toolbar : Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        homePresenter = HomePresenter(this, applicationContext)

        val data = intent.data
        if (data != null) {
            homePresenter.addToken(data)
        }
    }

    override fun onStart() {
        super.onStart()

        homePresenter.getAreas()
    }

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
            val intentArea = Intent(this, AreaActivity::class.java)
            startActivity(intentArea)
        }
        return true
    }

    override fun upVisibility() {
        treeImage.visibility =  View.VISIBLE
        startConnecting.visibility = View.VISIBLE
    }

    override fun downVisibility() {

        treeImage.visibility =  View.INVISIBLE
        startConnecting.visibility = View.INVISIBLE
    }

    override fun displayMessage(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show()
    }
}
