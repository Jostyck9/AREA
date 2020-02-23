package com.example.area

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthCredential
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.OAuthProvider


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
    }

    public override fun onStart() {
        super.onStart()
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

        Log.d("debug", "test")
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