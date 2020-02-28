package com.example.area

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.preference.PreferenceManager
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.AreaPresenter
import com.example.area.view.AreaView
import kotlinx.android.synthetic.main.activity_area.*
import org.json.JSONArray

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

    override fun showArea() {

        actualScene = 0

        actionText.visibility = View.VISIBLE
        actionButton.visibility = View.VISIBLE
        reactionText.visibility = View.VISIBLE
        reactionButton.visibility = View.VISIBLE
        saveAreaButton.visibility = View.VISIBLE

        servicesActionList.visibility = View.INVISIBLE
        servicesReactionList.visibility = View.INVISIBLE

        actionsList.visibility = View.INVISIBLE
        reactionsList.visibility = View.INVISIBLE

    }

    override fun showActionServicesList() {

        actualScene = 1
        servicesActionList.adapter = null
        areaPresenter.getServicesActionList()

        actionText.visibility = View.INVISIBLE
        actionButton.visibility = View.INVISIBLE
        reactionText.visibility = View.INVISIBLE
        reactionButton.visibility = View.INVISIBLE
        saveAreaButton.visibility = View.INVISIBLE

        servicesActionList.visibility = View.VISIBLE
        servicesReactionList.visibility = View.INVISIBLE

        actionsList.visibility = View.INVISIBLE
        reactionsList.visibility = View.INVISIBLE

    }

    override fun addActionServicesAdapter(actionAdapter: ArrayAdapter<String>, actionServicesList: ArrayList<String>) {
        servicesActionList.adapter = actionAdapter
        servicesActionList.setOnItemClickListener { parent, view, position, id ->
            showActionList(actionServicesList[position])
        }
    }

    override fun showReactionServicesList() {

        actualScene = 3
        servicesReactionList.adapter = null
        areaPresenter.getServicesReactionList()

        actionText.visibility = View.INVISIBLE
        actionButton.visibility = View.INVISIBLE
        reactionText.visibility = View.INVISIBLE
        reactionButton.visibility = View.INVISIBLE
        saveAreaButton.visibility = View.INVISIBLE

        servicesActionList.visibility = View.INVISIBLE
        servicesReactionList.visibility = View.VISIBLE

        actionsList.visibility = View.INVISIBLE
        reactionsList.visibility = View.INVISIBLE
    }

    override fun addReactionServicesAdapter(reactionAdapter: ArrayAdapter<String>, reactionServicesList: ArrayList<String>) {
        servicesReactionList.adapter = reactionAdapter
        servicesReactionList.setOnItemClickListener { parent, view, position, id ->
            showReactionList(reactionServicesList[position])
        }
    }

    override fun showActionList(serviceName: String) {

        actualScene = 2
        actionsList.adapter = null
        areaPresenter.getActionList(serviceName)

        actionText.visibility = View.INVISIBLE
        actionButton.visibility = View.INVISIBLE
        reactionText.visibility = View.INVISIBLE
        reactionButton.visibility = View.INVISIBLE
        saveAreaButton.visibility = View.INVISIBLE

        servicesActionList.visibility = View.INVISIBLE
        servicesReactionList.visibility = View.INVISIBLE

        actionsList.visibility = View.VISIBLE
        reactionsList.visibility = View.INVISIBLE
    }

    override fun addActionAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>) {

        actionsList.adapter = actionAdapter
        actionsList.setOnItemClickListener { parent, view, position, id ->
            actionButton.text = actionList[position]
            showArea()
        }

    }

    override fun showReactionList(serviceName: String) {

        actualScene = 4
        reactionsList.adapter = null
        areaPresenter.getReactionList(serviceName)

        actionText.visibility = View.INVISIBLE
        actionButton.visibility = View.INVISIBLE
        reactionText.visibility = View.INVISIBLE
        reactionButton.visibility = View.INVISIBLE
        saveAreaButton.visibility = View.INVISIBLE

        servicesActionList.visibility = View.INVISIBLE
        servicesReactionList.visibility = View.INVISIBLE

        actionsList.visibility = View.INVISIBLE
        reactionsList.visibility = View.VISIBLE
    }

    override fun addReactionAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>) {

        reactionsList.adapter = reactionAdapter
        reactionsList.setOnItemClickListener { parent, view, position, id ->
            reactionButton.text = reactionList[position]
            showArea()
        }

    }

}