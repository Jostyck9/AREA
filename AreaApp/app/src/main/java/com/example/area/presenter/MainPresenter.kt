package com.example.area.presenter

import android.content.Context
import android.util.Log
import androidx.preference.PreferenceManager
import com.example.area.model.MainModel
import com.example.area.view.MainView

class MainPresenter(private var mainView: MainView, var context: Context) {

    fun addApi() {
        val pref = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = pref.edit()
        if (!pref.contains("api")) {
            editor.putString("api", "api")
        }
        editor.apply()
    }

    fun addApi(api:String) {
        val pref = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = pref.edit()
        editor.putString("api", api)
        editor.apply()
    }

    fun checkUser() {
        val mainModel = MainModel(this)
        mainModel.checkUser(context)
    }

    fun checkFail() {
        Log.d("Debug", "Token invalid")
    }

    fun checkSuccess() {
        mainView.changeView()
    }
}