package com.example.area.model

import android.content.Context
import android.util.Log
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.HomePresenter
import com.example.area.DataClass.ActionModel
import com.example.area.DataClass.ReactionModel
import com.example.area.DataClass.AreasModel
import org.json.JSONArray

class HomeModel(private var homePresenter: HomePresenter, private var context: Context) {

    private val queue = Volley.newRequestQueue(context)

    fun getAreas(actionInfo: MutableList<ActionModel>, reactionInfo: MutableList<ReactionModel>) {
        Log.d("REQUEST HOME", "Start getAreas")
        val url = PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!! + "/area/"

        val areasInfo: MutableList<AreasModel> = mutableListOf<AreasModel>()
        val colormap = mapOf("discord" to "#7289DA", "spotify" to "#1ED760", "twitter" to "#1DA1F2", "github" to "#24292E", "dropbox" to "#007CE4", "mail" to "#EB6464")
        val getAreasRequest = object: StringRequest(
            Method.GET, url,
            Response.Listener<String> { response ->

                if (response.toString() != "[]") {

                    val jsonArray = JSONArray(response)

                    for (i in 0 until jsonArray.length()) {
                        val jsonObject = jsonArray.getJSONObject(i)

                        if (jsonObject.has("id")) {

                            val paramsAction : MutableList<String> = mutableListOf()
                                paramsAction.add(jsonObject.get("parameters_action").toString())
                            val paramsReaction : MutableList<String> = mutableListOf()
                                paramsReaction.add(jsonObject.get("parameters_reaction").toString())
                            var actService: String = ""
                            var reactService: String = ""
                            var actName: String = ""
                            var reactName: String = ""
                            var actDescription: String = ""
                            var reactDescription: String = ""
                            var actcolor: String = ""
                            var reactcolor: String = ""
                            for (j in 0 until actionInfo.size) {
                                if (actionInfo[j].actionId == jsonObject.getInt("action_id")) {
                                    actService = actionInfo[j].serviceName
                                    actName = actionInfo[j].actionName
                                    actDescription = actionInfo[j].description
                                    actcolor = colormap.get(actService).toString()
                                }
                            }
                            for (j in 0 until reactionInfo.size) {
                                if (reactionInfo[j].reactionId == jsonObject.getInt("reaction_id")) {
                                    reactService = reactionInfo[j].serviceName
                                    reactName = reactionInfo[j].reactionName
                                    reactDescription = reactionInfo[j].description
                                    reactcolor = colormap.get(reactService).toString()
                                }
                            }
//                            val imagemap = mapOf("discord" to "x", "spotify" to "y", "twitter" to "zz", "github" to "x", "dropbox" to "y", "mail" to "zz")
//                            var actcolor: String = ""
//                            var reactcolor: String = ""
                            areasInfo.add(AreasModel(jsonObject.getInt("id"), jsonObject.getInt("action_id"), jsonObject.getInt("reaction_id"),
                                paramsAction, paramsReaction, actService, reactService, actName, reactName, actDescription, reactDescription, actcolor, reactcolor));

                        }
                    }
                    Log.d("REQUEST HOME", "END getAreas")
                    homePresenter.getSuccess(false)
                    homePresenter.onFinished(areasInfo)

                    //TODO manage areas

                } else {
                    homePresenter.getSuccess(true)
                }

            },
            Response.ErrorListener {
                Log.d("debug", "ERRROR Home model request")
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

    fun getServices() {
        val url = PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!! + "/services/"
        Log.d("debug", "coucou")

        val actionsInfo: MutableList<ActionModel> = mutableListOf<ActionModel>()
        val reactionsInfo: MutableList<ReactionModel> = mutableListOf<ReactionModel>()
        val actionServicesRequest = StringRequest(
            Request.Method.GET, url,
            Response.Listener { response ->

                Log.d("debug", "coucou50")

                val jsonArray = JSONArray(response)

                for (i in 0 until jsonArray.length()) {

                    val jsonObject = jsonArray.getJSONObject(i)
                    if (jsonObject.has("name")) {
                        if (jsonObject.has("actions")) {

                            val actionsJsonArray = jsonObject.getJSONArray("actions")
                            if (actionsJsonArray.toString() != "[]") {
                                for (y in 0 until actionsJsonArray.length()) {
                                    val newJsonObject = actionsJsonArray.getJSONObject(y)
                                    actionsInfo.add(ActionModel(newJsonObject.getInt("id"), jsonObject.getString("name"), newJsonObject.getString("name"), newJsonObject.getString("description")))
                                }
                            }

                            val reactionsJsonArray = jsonObject.getJSONArray("reactions")
                            if (reactionsJsonArray.toString() != "[]") {
                                for (y in 0 until reactionsJsonArray.length()) {
                                    val newJsonObject = reactionsJsonArray.getJSONObject(y)
                                    reactionsInfo.add(ReactionModel(newJsonObject.getInt("id"), jsonObject.getString("name"), newJsonObject.getString("name"), newJsonObject.getString("description")))
                                }
                            }
                        }
                    }
                }
                homePresenter.getAreas(actionsInfo, reactionsInfo)
            },
            Response.ErrorListener {
                Log.d("Debug", "Fail to get the services")
            })
        queue.add(actionServicesRequest)
        Log.d("debug", "end")
    }
}