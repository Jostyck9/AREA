package com.example.area

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.core.view.get
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.area.adapter.AreaAdapter
import com.example.area.adapter.ResumeAdapter
import com.example.area.dataClass.ParameterModel
import com.example.area.presenter.AreaPresenter
import com.example.area.view.AreaView
import kotlinx.android.synthetic.main.activity_area.*
import kotlinx.android.synthetic.main.parameter_page.view.*

/**
 * Area activity
 */
class AreaActivity : AppCompatActivity(), AreaView {

    private lateinit var areaPresenter: AreaPresenter
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

        //Create Area
        saveAreaButton.setOnClickListener {
            if (actionButton.text == getString(R.string.choose_an_action) || reactionButton.text == getString(R.string.choose_a_reaction))
                Toast.makeText(applicationContext, "Choose an action and a reaction", Toast.LENGTH_SHORT).show()
            else {
                val actionId = actionID.text.toString().toInt()
                val reactionId = reactionID.text.toString().toInt()
                val nameParametersAction = ArrayList<String>()
                val resParametersAction = ArrayList<String>()
                val nameParametersReaction = ArrayList<String>()
                val resParametersReaction = ArrayList<String>()

                var adapterAction: ResumeAdapter? = null
                if (actionParamsRView.adapter != null)
                    adapterAction = actionParamsRView.adapter as ResumeAdapter

                var adapterReaction: ResumeAdapter? = null
                if (reactionParamsRView.adapter != null)
                    adapterReaction = reactionParamsRView.adapter as ResumeAdapter

                if (adapterAction != null) {
                    for (i in 0 until actionParamsRView.adapter!!.itemCount) {
                        nameParametersAction.add(adapterAction.getItem(i).name!!)
                        resParametersAction.add(adapterAction.getItem(i).param!!)
                    }
                }
                if (adapterReaction != null) {
                    for (i in 0 until reactionParamsRView.adapter!!.itemCount) {
                        nameParametersReaction.add(adapterReaction.getItem(i).name!!)
                        resParametersReaction.add(adapterReaction.getItem(i).param!!)
                    }
                }
                areaPresenter.createArea(actionId, reactionId, nameParametersAction, resParametersAction, nameParametersReaction, resParametersReaction)
            }
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

    override fun addActionAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>, serviceName: String) {
        areaList.adapter = actionAdapter
        areaList.setOnItemClickListener { _, _, position, _ ->
            areaPresenter.getParamsActionLit(actionList[position], serviceName)
        }
    }

    override fun addReactionAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>, serviceName: String) {
        areaList.adapter = reactionAdapter
        areaList.setOnItemClickListener { _, _, position, _ ->
            areaPresenter.getParamsReactionLit(reactionList[position], serviceName)
        }
    }

    override fun displayParamActionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String, id: String) {
        val parameters: ArrayList<ParameterModel> = ArrayList()

        if (nameList.size == 0) {
            actionID.text = id
            actionButton.text = description
            showArea()
        }
        else
            for (i in 0 until nameList.size) {
                parameters.add(
                    ParameterModel(
                        nameList[i],
                        typeList[i]
                    )
                )
                val lManager = GridLayoutManager(applicationContext, 1, RecyclerView.VERTICAL, false)

                rview.adapter = AreaAdapter(
                    parameters,
                    applicationContext
                )
                rview.layoutManager = lManager
                showParameters()
        }

        //Change save button result
        saveParametersButton.setOnClickListener {
            var isValid = true
            val resumeParams: ArrayList<ParameterModel> = ArrayList()

            for (i in 0 until nameList.size) {
                isValid = isValid && areaPresenter.checkInfos(rview[i].editParam.text.toString())
            }
            if (isValid) {
                for (i in 0 until nameList.size) {
                    resumeParams.add(ParameterModel(nameList[i], rview[i].editParam.text.toString()))
                }

                val newManager = GridLayoutManager(applicationContext, 1, RecyclerView.VERTICAL, false)

                actionParamsRView.adapter = ResumeAdapter(
                    resumeParams,
                    applicationContext
                )
                actionParamsRView.layoutManager = newManager

                actionID.text = id
                actionButton.text = description
                showArea()
            } else
                displayMessage("Error in your parameters")
        }
    }

    override fun displayParamReactionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String, id: String) {
        val parameters: ArrayList<ParameterModel> = ArrayList()

        if (nameList.size == 0) {
            reactionID.text = id
            reactionButton.text = description
            showArea()
        }
        else {
            for (i in 0 until nameList.size) {
                parameters.add(
                    ParameterModel(
                        nameList[i],
                        typeList[i]
                    )
                )
                val lManager =
                    GridLayoutManager(applicationContext, 1, RecyclerView.VERTICAL, false)

                rview.adapter = AreaAdapter(
                    parameters,
                    applicationContext
                )
                rview.layoutManager = lManager
                showParameters()
            }

            //Change save button result
            saveParametersButton.setOnClickListener {
                var isValid = true
                val resumeParams: ArrayList<ParameterModel> = ArrayList()

                for (i in 0 until nameList.size) {
                    isValid = isValid && areaPresenter.checkInfos(rview[i].editParam.text.toString())
                }
                if (isValid) {
                    for (i in 0 until nameList.size) {
                        resumeParams.add(ParameterModel(nameList[i], rview[i].editParam.text.toString()))
                    }

                    val newManager = GridLayoutManager(applicationContext, 1, RecyclerView.VERTICAL, false)

                    reactionParamsRView.adapter = ResumeAdapter(
                        resumeParams,
                        applicationContext
                    )
                    reactionParamsRView.layoutManager = newManager

                    reactionID.text = id
                    reactionButton.text = description
                    showArea()
                } else
                    displayMessage("Error in your parameters")
            }
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
        actionParamsRView.visibility = View.VISIBLE
        reactionParamsRView.visibility = View.VISIBLE

        areaList.visibility = View.INVISIBLE

        rview.visibility = View.INVISIBLE
        saveParametersButton.visibility = View.INVISIBLE
    }

    override fun showList() {
        areaList.adapter = null

        actionText.visibility = View.INVISIBLE
        actionButton.visibility = View.INVISIBLE
        reactionText.visibility = View.INVISIBLE
        reactionButton.visibility = View.INVISIBLE
        saveAreaButton.visibility = View.INVISIBLE
        actionParamsRView.visibility = View.INVISIBLE
        reactionParamsRView.visibility = View.INVISIBLE

        areaList.visibility = View.VISIBLE

        rview.visibility = View.INVISIBLE
        saveParametersButton.visibility = View.INVISIBLE
    }

    override fun showParameters() {
        actionText.visibility = View.INVISIBLE
        actionButton.visibility = View.INVISIBLE
        reactionText.visibility = View.INVISIBLE
        reactionButton.visibility = View.INVISIBLE
        saveAreaButton.visibility = View.INVISIBLE
        actionParamsRView.visibility = View.INVISIBLE
        reactionParamsRView.visibility = View.INVISIBLE

        areaList.visibility = View.INVISIBLE

        rview.visibility = View.VISIBLE
        saveParametersButton.visibility = View.VISIBLE
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

    override fun onResultCheckInfos(isEditTextValid: Boolean): Boolean {
        return isEditTextValid
    }

    override fun createSuccess() {
        finish()
    }

}