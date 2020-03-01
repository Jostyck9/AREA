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

    fun addActionsAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>, serviceName: String) {
        areaView.addActionAdapter(actionAdapter, actionList, serviceName)
    }

    fun addReactionsAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>, serviceName: String) {
        areaView.addReactionAdapter(reactionAdapter, reactionList, serviceName)
    }

    fun getParamsActionLit(actionDescription: String, serviceName: String) {
        areaModel.getParamsActionLit(actionDescription, serviceName)
    }

    fun getParamsReactionLit(reactionDescription: String, serviceName: String) {
        areaModel.getParamsReactionLit(reactionDescription, serviceName)
    }

    fun displayParamActionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String, id: String) {
        areaView.displayParamActionLists(nameList, typeList, description, id)
    }

    fun displayParamReactionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String, id: String) {
        areaView.displayParamReactionLists(nameList, typeList, description, id)
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

    fun checkInfos(editText: String): Boolean {
        areaModel.checkInfos(editText)
        return areaView.onResultCheckInfos(areaModel.isEditTextValid)
    }

    fun createArea(actionId: Int, reactionId: Int, nameParametersAction: ArrayList<String>, resParametersAction: ArrayList<String>, nameParametersReaction: ArrayList<String>, resParametersReaction: ArrayList<String>) {
        areaModel.createArea(actionId, reactionId, nameParametersAction, resParametersAction, nameParametersReaction, resParametersReaction)
    }

    fun createSuccess() {
        areaView.createSuccess()
    }
}