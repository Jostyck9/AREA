package com.example.area

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import androidx.preference.PreferenceManager
import com.example.area.presenter.MainPresenter
import com.example.area.view.MainView
import kotlinx.android.synthetic.main.activity_main.*

/**
 * Main activity
 */
class MainActivity : AppCompatActivity(), MainView {

    private lateinit var mainPresenter : MainPresenter

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //Add api to preferences
        mainPresenter = MainPresenter(this, applicationContext)
        mainPresenter.addApi()

        //Redirection
        val signInRedirection: Button = findViewById(R.id.signInRedirection)
        signInRedirection.setOnClickListener {
            val intent = Intent(this, SignInActivity::class.java)
            startActivity(intent)
        }

        val githubButton: CardView = findViewById(R.id.githubButton)
        githubButton.setOnClickListener {
            val uriCb = "home://callback/github"
            val intent = Intent(Intent.ACTION_VIEW,
                Uri.parse(PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("api", null)!! + "/auth/github?cb=$uriCb"))
            startActivity(intent)
        }

        //Get address
        api.addTextChangedListener(object : TextWatcher {

            override fun afterTextChanged(s: Editable) {}

            override fun beforeTextChanged(s: CharSequence, start: Int,
                                           count: Int, after: Int) {
            }

            override fun onTextChanged(s: CharSequence, start: Int,
                                       before: Int, count: Int) {
                mainPresenter.addApi(s.toString())
            }
        })
    }

    public override fun onStart() {

        super.onStart()

        api.setText(PreferenceManager.getDefaultSharedPreferences(applicationContext).getString("api", null)!!)
        mainPresenter.checkUser()

    }

    override fun changeView() {

        val intent = Intent(applicationContext, HomeActivity::class.java)
        startActivity(intent)

    }
}