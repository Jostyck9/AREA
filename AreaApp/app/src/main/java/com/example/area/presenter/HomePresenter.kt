package com.example.area.presenter

import android.content.Context
import android.util.Log
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
}