package com.example.area.presenter

import android.content.Context
import android.util.Log
import androidx.preference.PreferenceManager
import com.example.area.model.MainModel
import com.example.area.view.MainView

/**
 * Presenter for the main activity
 *
 * @param mainView: View of the area
 * @param context: Context of the application
 */
class MainPresenter(private var mainView: MainView, var context: Context) {

    /**
     * Add default api to the shared preferences
     */
    fun addApi() {
        val pref = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = pref.edit()
        if (!pref.contains("api")) {
            editor.putString("api", "api")
        }
        editor.apply()
    }

    /**
     * Add api to the shared preferences
     *
     * @param api: Api enter by the user
     */
    fun addApi(api:String) {
        val pref = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = pref.edit()
        editor.putString("api", api)
        editor.apply()
    }

    /**
     * Check if the user is connected
     */
    fun checkUser() {
        val mainModel = MainModel(this)
        mainModel.checkUser(context)
    }

    /**
     * The user isn't connected
     */
    fun checkFail() {
        Log.d("Debug", "Token invalid")
    }

    /**
     * The user is connected
     */
    fun checkSuccess() {
        mainView.changeView()
    }
}