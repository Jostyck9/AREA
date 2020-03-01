package com.example.area.presenter

import android.content.Context
import android.net.Uri
import android.util.Log
import com.example.area.dataClass.ActionModel
import com.example.area.dataClass.AreasModel
import com.example.area.dataClass.ReactionModel
import androidx.preference.PreferenceManager
import com.example.area.model.HomeModel
import com.example.area.view.HomeView

class HomePresenter(private var homeView: HomeView, var context: Context) {

    private var homeModel = HomeModel(this, context)

    fun getServices() {
        homeModel.getServices()
    }

    fun getAreas(actionInfo: MutableList<ActionModel>, reactionInfo: MutableList<ReactionModel>) {
        homeModel.getAreas(actionInfo, reactionInfo)
    }

    fun onFinished(areasInfo: MutableList<AreasModel>) {
        homeView.setDataToRecyclerView(areasInfo)
    }

    fun deleteAnArea(areaId: Int) {
        homeModel.deleteArea(areaId)
    }

    fun getFail() {
        Log.d("Debug", "Get areas fail")
    }

    fun getSuccess(empty : Boolean) {
        if (empty) {
            homeView.upVisibility()
        } else {
            homeView.downVisibility()
        }
    }

    fun addToken(data : Uri) {

        val status = data.getQueryParameter("status")
        if (status == "OK") {
            val token = data.getQueryParameter("token")

            val pref = PreferenceManager.getDefaultSharedPreferences(context)
            val editor = pref.edit()
            editor.putString("token", token)
            editor.apply()
        } else
            homeView.displayMessage("Authentification fail")

    }
}