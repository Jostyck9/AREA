package com.example.area.view

import android.widget.ArrayAdapter

interface AreaView {

    fun showArea()

    fun showActionServicesList()
    fun addActionServicesAdapter(actionAdapter: ArrayAdapter<String>, actionServicesList: ArrayList<String>)
    fun showReactionServicesList()
    fun addReactionServicesAdapter(reactionAdapter: ArrayAdapter<String>, reactionServicesList: ArrayList<String>)

    fun showActionList(serviceName: String)
    fun addActionAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>)
    fun showReactionList(serviceName: String)
    fun addReactionAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>)
}