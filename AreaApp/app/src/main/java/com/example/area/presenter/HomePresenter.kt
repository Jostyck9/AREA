package com.example.area.presenter

import android.content.Context
import android.util.Log
import com.example.area.DataClass.ActionModel
import com.example.area.DataClass.AreasModel
import com.example.area.DataClass.ReactionModel
import com.example.area.model.HomeModel
import com.example.area.view.HomeView

class HomePresenter(private var homeView: HomeView, var context: Context) {

    var homeModel = HomeModel(this, context)

    fun getServices() {
        Log.d("debug", "coucou")
        homeModel.getServices()
    }

    fun getAreas(actionInfo: MutableList<ActionModel>, reactionInfo: MutableList<ReactionModel>) {
        homeModel.getAreas(actionInfo, reactionInfo)
    }

    fun onFinished(areasInfo: MutableList<AreasModel>) {
        Log.d("REQUEST HOME", "DISPLAY")
        Log.d("REQUEST HOME", areasInfo.size.toString())
        homeView.setDataToRecyclerView(areasInfo)
    }

    fun getFail() {
        Log.d("Debug", "Get areas fail")
    }

    fun onDestroy() {
        homeView.downVisibility()
    }

    fun getSuccess(empty : Boolean) {
        if (empty) {
            homeView.upVisibility()
        } else {
            homeView.downVisibility()
        }
    }
}