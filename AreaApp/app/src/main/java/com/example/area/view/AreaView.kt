package com.example.area.view

import android.widget.ArrayAdapter

interface AreaView {

    fun showArea()
    fun showList()
    fun showParameters()

    fun showActionServicesList()
    fun addActionServicesAdapter(actionAdapter: ArrayAdapter<String>, actionServicesList: ArrayList<String>)
    fun showReactionServicesList()
    fun addReactionServicesAdapter(reactionAdapter: ArrayAdapter<String>, reactionServicesList: ArrayList<String>)

    fun showActionList(serviceName: String)
    fun addActionAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>, serviceName: String)
    fun showReactionList(serviceName: String)
    fun addReactionAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>, serviceName: String)

    fun displayMessage(message: String)
    fun displayParamActionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String)
    fun displayParamReactionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String)

    fun onResultCheckInfos(isEditTextValid: Boolean): Boolean
}