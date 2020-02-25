package com.example.area.model

import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.core.content.ContextCompat.startActivity
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.HomeActivity
import com.example.area.presenter.MainPresenter

class MainModel(private var mainPresenter: MainPresenter) {

    fun checkUser(context: Context) {
        if (PreferenceManager.getDefaultSharedPreferences(context).contains("token")) {

            val url = PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!! + "/me/"

            val queue = Volley.newRequestQueue(context)
            val userRequest = object: StringRequest(
                Method.GET, url,
                Response.Listener<String> {
                    mainPresenter.checkSuccess()
                },
                Response.ErrorListener {
                    mainPresenter.checkFail()
                })

            {
                @Throws(AuthFailureError::class)
                override fun getHeaders(): Map<String, String> {

                    val params: MutableMap<String, String>
                    params = HashMap()
                    params["Content-Type"] = "application/json"
                    params["Authorization"] = "Bearer " + PreferenceManager.getDefaultSharedPreferences(context).getString("token", null)!!
                    return params

                }
            }
            queue.add(userRequest)
        }
    }


}