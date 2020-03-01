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

/**
 * Presenter for the home activity
 *
 * @param homeView: View of the area
 * @param context: Context of the application
 */
class HomePresenter(private var homeView: HomeView, var context: Context) {

    private var homeModel = HomeModel(this, context)

    /**
     * Get the services
     */
    fun getServices() {
        homeModel.getServices()
    }

    /**
     * Get the areas
     *
     * @param actionInfo: Infos about the action of the area
     * @param reactionInfo: Infos about the reaction of the area
     */
    fun getAreas(actionInfo: MutableList<ActionModel>, reactionInfo: MutableList<ReactionModel>) {
        homeModel.getAreas(actionInfo, reactionInfo)
    }

    /**
     * Call when finish the API call
     *
     * @param areasInfo: Info about the areas send to the view
     */
    fun onFinished(areasInfo: MutableList<AreasModel>) {
        homeView.setDataToRecyclerView(areasInfo)
    }

    /**
     * Delete an area
     *
     * @param areaId: Id of the area to delete
     */
    fun deleteAnArea(areaId: Int) {
        homeModel.deleteArea(areaId)
    }

    /**
     * On failure, display an error
     */
    fun getFail() {
        Log.d("Debug", "Get areas fail")
    }

    /**
     * On success, change display
     *
     * @param empty: Is the areas empty
     */
    fun getSuccess(empty : Boolean) {
        if (empty) {
            homeView.upVisibility()
        } else {
            homeView.downVisibility()
        }
    }

    /**
     * Add token to shared preferences
     */
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