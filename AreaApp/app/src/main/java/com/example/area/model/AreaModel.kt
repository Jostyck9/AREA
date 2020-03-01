package com.example.area.model

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Log
import android.widget.ArrayAdapter
import androidx.core.content.ContextCompat.startActivity
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.AreaPresenter
import org.json.JSONArray
import org.json.JSONObject

class AreaModel(private var areaPresenter: AreaPresenter, private var context: Context) {

    private var prefSharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
    private lateinit var url: String
    private val queue = Volley.newRequestQueue(context)

    fun getServicesActionList() {

        url = prefSharedPreferences.getString("api", null)!! + "/services/"

        val actionServicesRequest = StringRequest(
            Request.Method.GET, url,
            Response.Listener { response ->

                val jsonArray = JSONArray(response)
                val actionServicesList = ArrayList<String>()

                for (i in 0 until jsonArray.length()) {

                    val jsonObject = jsonArray.getJSONObject(i)
                    if (jsonObject.has("name")) {
                        if (jsonObject.has("actions")) {

                            val actionsJsonArray = jsonObject.getJSONArray("actions")
                            if (actionsJsonArray.toString() != "[]") {
                                actionServicesList.add(jsonObject.getString("name"))
                            }
                        }
                    }
                }

                //create actions adapter
                val actionAdapter = ArrayAdapter<String>(context, android.R.layout.simple_expandable_list_item_1, actionServicesList)
                areaPresenter.addActionsServicesAdapter(actionAdapter, actionServicesList)
            },
            Response.ErrorListener {
                Log.d("Debug", "Fail to get the services")
            })
        queue.add(actionServicesRequest)
    }

    fun getServicesReactionList() {

        url = prefSharedPreferences.getString("api", null)!! + "/services/"

        val reactionServicesRequest = StringRequest(
            Request.Method.GET, url,
            Response.Listener { response ->

                val jsonArray = JSONArray(response)
                val reactionServicesList = ArrayList<String>()

                for (i in 0 until jsonArray.length()) {

                    val jsonObject = jsonArray.getJSONObject(i)
                    if (jsonObject.has("name")) {
                        if (jsonObject.has("reactions")) {

                            val reactionsJsonArray = jsonObject.getJSONArray("reactions")
                            if (reactionsJsonArray.toString() != "[]") {
                                reactionServicesList.add(jsonObject.getString("name"))
                            }
                        }
                    }
                }
                //create reactions adapter
                val reactionAdapter = ArrayAdapter<String>(context, android.R.layout.simple_expandable_list_item_1, reactionServicesList)
                areaPresenter.addReactionsServicesAdapter(reactionAdapter, reactionServicesList)
            },
            Response.ErrorListener {
                Log.d("Debug", "Fail to get the services")
            })
        queue.add(reactionServicesRequest)
    }

    fun getActionList(serviceName: String) {

        url = prefSharedPreferences.getString("api", null)!! + "/services/"

        val actionsRequest = StringRequest(
            Request.Method.GET, url,
            Response.Listener { response ->

                val jsonArray = JSONArray(response)
                val actionsList = ArrayList<String>()

                for (i in 0 until jsonArray.length()) {

                    val jsonObject = jsonArray.getJSONObject(i)
                    if (jsonObject.has("name") && jsonObject.get("name") == serviceName) {
                        if (jsonObject.has("actions")) {

                            val actionsJsonArray = jsonObject.getJSONArray("actions")
                            if (actionsJsonArray.toString() != "[]") {
                                for (y in 0 until actionsJsonArray.length()) {
                                    val newJsonObject = actionsJsonArray.getJSONObject(y)
                                    if (newJsonObject.has("description"))
                                        actionsList.add(newJsonObject.getString("description"))
                                }
                            }
                        }
                    }
                }

                //create actions adapter
                val actionAdapter = ArrayAdapter<String>(context, android.R.layout.simple_expandable_list_item_1, actionsList)
                areaPresenter.addActionsAdapter(actionAdapter, actionsList)
            }, Response.ErrorListener {
                Log.d("Debug", "Fail to get the actions")
            })
        queue.add(actionsRequest)
    }

    fun getReactionList(serviceName: String) {

        url = prefSharedPreferences.getString("api", null)!! + "/services/"

        val reactionsRequest = StringRequest(
            Request.Method.GET, url,
            Response.Listener { response ->

                val jsonArray = JSONArray(response)
                val reactionsList = ArrayList<String>()

                for (i in 0 until jsonArray.length()) {

                    val jsonObject = jsonArray.getJSONObject(i)
                    if (jsonObject.has("name") && jsonObject.get("name") == serviceName) {
                        if (jsonObject.has("reactions")) {

                            val reactionsJsonArray = jsonObject.getJSONArray("reactions")
                            if (reactionsJsonArray.toString() != "[]") {
                                for (y in 0 until reactionsJsonArray.length()) {

                                    val newJsonObject = reactionsJsonArray.getJSONObject(y)
                                    if (newJsonObject.has("description"))
                                        reactionsList.add(newJsonObject.getString("description"))
                                }
                            }
                        }
                    }
                }

                //create actions adapter
                val reactionAdapter = ArrayAdapter<String>(context, android.R.layout.simple_expandable_list_item_1, reactionsList)
                areaPresenter.addReactionsAdapter(reactionAdapter, reactionsList)
            },
            Response.ErrorListener {
                Log.d("Debug", "Fail to get the actions")
            })
        queue.add(reactionsRequest)
    }

    fun checkActionConnection(serviceName: String) {

        url = prefSharedPreferences.getString("api", null)!! + "/me/auth/$serviceName"

        val connectionRequest = object: StringRequest(
            Method.GET, url,
            Response.Listener { response ->

                val jsonObject = JSONObject(response)
                if (jsonObject.has("isConnected")) {
                    if (jsonObject.get("isConnected") == true) {
                        areaPresenter.showActionList(serviceName)
                    } else {
                        val uriCb = "wait://callback/$serviceName"
                        val token = PreferenceManager.getDefaultSharedPreferences(context).getString("token", null)
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!!
                                + "/auth/$serviceName?token=$token&cb=$uriCb"))
                        startActivity(context, intent, null)
                    }
                }
            },
            Response.ErrorListener {
                Log.d("Debug", "Connection check fail")
            })

        {
            @Throws(AuthFailureError::class)
            override fun getHeaders(): Map<String, String> {

                val params: MutableMap<String, String>
                params = HashMap()
                params["Content-Type"] = "application/json"
                params["Authorization"] = "Bearer " + prefSharedPreferences.getString("token", null)!!
                return params

            }
        }
        queue.add(connectionRequest)
    }

    fun checkReactionConnection(serviceName: String) {

        url = prefSharedPreferences.getString("api", null)!! + "/me/auth/$serviceName"

        val connectionRequest = object: StringRequest(
            Method.GET, url,
            Response.Listener { response ->

                val jsonObject = JSONObject(response)
                if (jsonObject.has("isConnected")) {
                    if (jsonObject.get("isConnected") == true) {
                        areaPresenter.showReactionList(serviceName)
                    } else {
                        val uriCb = "wait://callback/$serviceName"
                        val token = PreferenceManager.getDefaultSharedPreferences(context).getString("token", null)
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!!
                                + "/auth/$serviceName?token=$token&cb=$uriCb"))
                        startActivity(context, intent, null)
                    }
                }
            },
            Response.ErrorListener {
                Log.d("Debug", "Connection check fail")
            })

        {
            @Throws(AuthFailureError::class)
            override fun getHeaders(): Map<String, String> {

                val params: MutableMap<String, String>
                params = HashMap()
                params["Content-Type"] = "application/json"
                params["Authorization"] = "Bearer " + prefSharedPreferences.getString("token", null)!!
                return params

            }
        }
        queue.add(connectionRequest)
    }
}