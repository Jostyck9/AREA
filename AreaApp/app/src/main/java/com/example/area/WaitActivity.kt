package com.example.area

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

/**
 * Wait activity
 */
class WaitActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_wait)

        finish()
    }
}
