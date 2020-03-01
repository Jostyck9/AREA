package com.example.area

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.AreaPresenter
import com.example.area.view.AreaView
import kotlinx.android.synthetic.main.activity_area.*
import org.json.JSONArray
import org.json.JSONObject

class AreaActivity : AppCompatActivity(), AreaView {

    lateinit var areaPresenter: AreaPresenter
    private var actualScene: Int = 0

    /*
        0-> Area
        1-> Action Services
        2-> Actions
        3-> ReactionsServices
        4-> Reactions
     */

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_area)

        areaPresenter = AreaPresenter(this, this.applicationContext)
        showArea()

        //Redirection
        backArea.setOnClickListener {
            if (actualScene == 1 || actualScene == 3)
                showArea()
            else if (actualScene == 2)
                showActionServicesList()
            else if (actualScene == 4)
                showReactionServicesList()
            else if (actualScene == 0)
                finish()
        }

        //Action button
        actionButton.setOnClickListener {
            showActionServicesList()
        }

        //Reaction button
        reactionButton.setOnClickListener {
            showReactionServicesList()
        }
    }

    override fun onBackPressed() {
        if (actualScene == 1 || actualScene == 3)
            showArea()
        else if (actualScene == 2)
            showActionServicesList()
        else if (actualScene == 4)
            showReactionServicesList()
        else if (actualScene == 0)
            finish()
    }

    override fun addActionServicesAdapter(actionAdapter: ArrayAdapter<String>, actionServicesList: ArrayList<String>) {
        areaList.adapter = actionAdapter
        areaList.setOnItemClickListener { _, _, position, _ ->
            areaPresenter.checkActionConnection(actionServicesList[position])
        }
    }

    override fun addReactionServicesAdapter(reactionAdapter: ArrayAdapter<String>, reactionServicesList: ArrayList<String>) {
        areaList.adapter = reactionAdapter
        areaList.setOnItemClickListener { _, _, position, _ ->
            areaPresenter.checkReactionConnection(reactionServicesList[position])
        }
    }

    override fun addActionAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>) {
        areaList.adapter = actionAdapter
        areaList.setOnItemClickListener { _, _, position, _ ->
            actionButton.text = actionList[position]
            showArea()

        }
    }

    override fun addReactionAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>) {
        areaList.adapter = reactionAdapter
        areaList.setOnItemClickListener { _, _, position, _ ->
            reactionButton.text = reactionList[position]
            showArea()
        }
    }

    override fun showArea() {
        actualScene = 0
        areaList.adapter = null

        actionText.visibility = View.VISIBLE
        actionButton.visibility = View.VISIBLE
        reactionText.visibility = View.VISIBLE
        reactionButton.visibility = View.VISIBLE
        saveAreaButton.visibility = View.VISIBLE

        areaList.visibility = View.INVISIBLE
    }

    override fun showList() {
        areaList.adapter = null

        actionText.visibility = View.INVISIBLE
        actionButton.visibility = View.INVISIBLE
        reactionText.visibility = View.INVISIBLE
        reactionButton.visibility = View.INVISIBLE
        saveAreaButton.visibility = View.INVISIBLE

        areaList.visibility = View.VISIBLE
    }

    override fun showActionServicesList() {
        actualScene = 1
        areaPresenter.getServicesActionList()
        showList()
    }

    override fun showReactionServicesList() {
        actualScene = 3
        areaPresenter.getServicesReactionList()
        showList()
    }

    override fun showActionList(serviceName: String) {
        actualScene = 2
        areaPresenter.getActionList(serviceName)
        showList()
    }

    override fun showReactionList(serviceName: String) {
        actualScene = 4
        areaPresenter.getReactionList(serviceName)
        showList()
    }

    override fun displayMessage(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show()
    }
}