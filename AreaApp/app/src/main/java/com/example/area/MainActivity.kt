package com.example.area

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import androidx.core.widget.addTextChangedListener
import androidx.preference.PreferenceManager
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.OAuthProvider
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize Firebase Auth
        auth = FirebaseAuth.getInstance()

        //Microsoft button
        val microsoftButton: CardView = findViewById(R.id.microsoftButton)
        microsoftButton.setOnClickListener {
            microsoftAuthentication()
        }

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

        // Check if user is signed in (non-null) and update UI accordingly.
        val currentUser = auth.currentUser
        if (currentUser != null) {
            val intent = Intent(this, HomeActivity::class.java)
            startActivity(intent)
        }
    }

    private fun microsoftAuthentication() {
        val provider = OAuthProvider.newBuilder("microsoft.com")
        val pendingResultTask: Task<AuthResult>? = auth.pendingAuthResult

        if (pendingResultTask != null) {
            pendingResultTask.addOnSuccessListener {
                val intent = Intent(this, HomeActivity::class.java)
                startActivity(intent)

            }.addOnFailureListener {
                Toast.makeText(applicationContext, "Failure", Toast.LENGTH_SHORT).show()
            }
        } else {
            auth.startActivityForSignInWithProvider(this, provider.build())
                .addOnSuccessListener {
                    val intent = Intent(this, HomeActivity::class.java)
                    startActivity(intent)
                }
                .addOnFailureListener {
                    Toast.makeText(applicationContext, "Failure", Toast.LENGTH_SHORT).show()
                }
        }
    }
}