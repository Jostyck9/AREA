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
import com.example.area.R
import org.json.JSONArray

class HomeModel(private var homePresenter: HomePresenter, private var context: Context) {

    private val queue = Volley.newRequestQueue(context)

    fun getAreas(actionInfo: MutableList<ActionModel>, reactionInfo: MutableList<ReactionModel>) {
        val url = PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!! + "/area/"

        val areasInfo: MutableList<AreasModel> = mutableListOf<AreasModel>()
        val colormap = mapOf("discord" to "#7289DA", "spotify" to "#1ED760", "twitter" to "#1DA1F2", "github" to "#24292E", "dropbox" to "#007CE4", "mail" to "#EB6464")
        val imagemap = mapOf("discord" to R.drawable.discord_img, "spotify" to R.drawable.spotify_img, "twitter" to R.drawable.twitter_img,
            "github" to R.drawable.github_img, "dropbox" to R.drawable.dropbox_img, "mail" to R.drawable.mail_img)
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
                            var actColor: String = ""
                            var reactColor: String = ""
                            var actImg: Int = 0
                            var reactImg: Int = 0
                            for (j in 0 until actionInfo.size) {
                                if (actionInfo[j].actionId == jsonObject.getInt("action_id")) {
                                    actService = actionInfo[j].serviceName
                                    actName = actionInfo[j].actionName
                                    actDescription = actionInfo[j].description
                                    actColor = colormap.get(actService).toString()
                                    actImg = imagemap.getValue(actService)
                                }
                            }
                            for (j in 0 until reactionInfo.size) {
                                if (reactionInfo[j].reactionId == jsonObject.getInt("reaction_id")) {
                                    reactService = reactionInfo[j].serviceName
                                    reactName = reactionInfo[j].reactionName
                                    reactDescription = reactionInfo[j].description
                                    reactColor = colormap.get(reactService).toString()
                                    reactImg = imagemap.getValue(actService)
                                }
                            }
                            areasInfo.add(AreasModel(jsonObject.getInt("id"), jsonObject.getInt("action_id"), jsonObject.getInt("reaction_id"),
                                paramsAction, paramsReaction, actService, reactService, actName, reactName, actDescription, reactDescription, actColor, reactColor, actImg, reactImg));

                        }
                    }
                    homePresenter.getSuccess(false)
                    homePresenter.onFinished(areasInfo)

                    //TODO manage areas

                } else {
                    homePresenter.getSuccess(true)
                }

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

    fun getServices() {
        val url = PreferenceManager.getDefaultSharedPreferences(context).getString("api", null)!! + "/services/"

        val actionsInfo: MutableList<ActionModel> = mutableListOf<ActionModel>()
        val reactionsInfo: MutableList<ReactionModel> = mutableListOf<ReactionModel>()
        val actionServicesRequest = StringRequest(
            Request.Method.GET, url,
            Response.Listener { response ->

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
    }
}