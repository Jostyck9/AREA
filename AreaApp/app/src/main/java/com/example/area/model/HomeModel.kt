package com.example.area.model

import android.content.Context
import android.util.Log
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.HomePresenter
import org.json.JSONArray

class HomeModel(private var homePresenter: HomePresenter) {

    fun getAreas(context: Context) {
        val url = PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!! + "/area/"

        val queue = Volley.newRequestQueue(context)
        val getAreasRequest = object: StringRequest(
            Method.GET, url,
            Response.Listener<String> { response ->

                if (response.toString() != "[]") {

                    homePresenter.getSuccess(false)

                    val jsonArray = JSONArray(response)

                    for (i in 0 until jsonArray.length()) {
                        val jsonObject = jsonArray.getJSONObject(i)

                        if (jsonObject.has("id")) {
                            Log.d("debug", jsonObject.getString("id"))
                        }
                    }
                    //TODO manage areas

                } else
                    homePresenter.getSuccess(true)

            },
            Response.ErrorListener {
                homePresenter.getFail()
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

        queue.add(getAreasRequest)
    }
}