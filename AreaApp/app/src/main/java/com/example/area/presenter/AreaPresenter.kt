package com.example.area.presenter

import android.content.Context
import android.util.Log
import android.widget.ArrayAdapter
import com.example.area.model.AreaModel
import com.example.area.view.AreaView

class AreaPresenter(var areaView: AreaView, var context: Context) {

    var areaModel = AreaModel(this, context)

    fun getServicesActionList() {
        areaModel.getServicesActionList()
    }

    fun getServicesReactionList() {
        areaModel.getServicesReactionList()
    }

    fun getActionList(serviceName: String) {
        areaModel.getActionList(serviceName)
    }

    fun getReactionList(serviceName: String) {
        areaModel.getReactionList(serviceName)
    }

    fun addActionsServicesAdapter(actionAdapter: ArrayAdapter<String>, actionServicesList: ArrayList<String>) {
        areaView.addActionServicesAdapter(actionAdapter, actionServicesList)
    }

    fun addReactionsServicesAdapter(reactionAdapter: ArrayAdapter<String>, reactionServicesList: ArrayList<String>) {
        areaView.addReactionServicesAdapter(reactionAdapter, reactionServicesList)
    }

    fun addActionsAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>) {
        areaView.addActionAdapter(actionAdapter, actionList)
    }

    fun addReactionsAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>) {
        areaView.addReactionAdapter(reactionAdapter, reactionList)
    }

    fun checkActionConnection(serviceName: String) {
        areaModel.checkActionConnection(serviceName)
    }

    fun showActionList(serviceName: String) {
        areaView.showActionList(serviceName)
    }

    fun checkReactionConnection(serviceName: String) {
        areaModel.checkReactionConnection(serviceName)
    }
    fun showReactionList(serviceName: String) {
        areaView.showReactionList(serviceName)
    }
}