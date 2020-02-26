package com.example.area

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.area.presenter.AreaPresenter
import com.example.area.view.AreaView
import kotlinx.android.synthetic.main.activity_area.*

class AreaActivity : AppCompatActivity(), AreaView {

    lateinit var areaPresenter: AreaPresenter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_area)

        areaPresenter = AreaPresenter(this, this.applicationContext)
        //Redirection
        backArea.setOnClickListener {
            finish()
        }
    }
}