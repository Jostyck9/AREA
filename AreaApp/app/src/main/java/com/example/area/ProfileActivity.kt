package com.example.area

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import com.google.firebase.auth.FirebaseAuth

class ProfileActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        //TODO afficher username, email et password de l'utilisateur

        //Redirection
        val backButton: ImageView = findViewById(R.id.backProfile)
        backButton.setOnClickListener {
            finish()
        }

        val profileRedirection: Button = findViewById(R.id.profileRedirection)
        profileRedirection.setOnClickListener {
            //TODO déconnecter l'utilisateur
            FirebaseAuth.getInstance().signOut()
            val i = Intent(applicationContext, MainActivity::class.java)
            i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            i.putExtra("EXIT", true)
            startActivity(i)
            finish()
        }
    }
}
