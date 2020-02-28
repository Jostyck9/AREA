package com.example.area.presenter

import android.content.Context
import android.net.Uri
import android.util.Log
import androidx.preference.PreferenceManager
import com.example.area.model.HomeModel
import com.example.area.view.HomeView

class HomePresenter(var homeView: HomeView, var context: Context) {

    fun getAreas() {
        val home = HomeModel(this)
        home.getAreas(context)
    }

    fun getFail() {
        Log.d("Debug", "Get areas fail")
    }

    fun getSuccess(empty : Boolean) {
        if (empty)
            homeView.upVisibility()
        else
            homeView.downVisibility()
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