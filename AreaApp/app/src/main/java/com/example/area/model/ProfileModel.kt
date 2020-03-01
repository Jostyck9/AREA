package com.example.area.model

import android.content.Context
import android.util.Log
import android.widget.EditText
import androidx.preference.PreferenceManager
import com.android.volley.AuthFailureError
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.area.presenter.ProfilePresenter
import org.json.JSONObject

class ProfileModel(private var profilePresenter: ProfilePresenter, context: Context) {

    val sharedPreference = PreferenceManager.getDefaultSharedPreferences(context)!!
    lateinit var url: String
    private val queue: RequestQueue = Volley.newRequestQueue(context)

    var isValidPassword: Boolean = false
    var isValidConfirmPassword: Boolean = false
    var isValidUsername: Boolean = false

    fun checkInfos(password: String, confirmPassword: String, username: String) {

        isValidPassword = password.length > 6
        isValidConfirmPassword = password == confirmPassword
        isValidUsername = username.length > 1
    }

    fun getUserInfos() {

        url = sharedPreference.getString("api", null)!! + "/me/"

        val userRequest = object: StringRequest(
            Method.GET, url,
            Response.Listener { response ->
                profilePresenter.getInfosSuccess(response)
            },
            Response.ErrorListener {
                Log.d("Debug", "Fail to get user infos")
            })

        {
            @Throws(AuthFailureError::class)
            override fun getHeaders(): Map<String, String> {

                val params: MutableMap<String, String>
                params = HashMap()
                params["Content-Type"] = "application/json"
                params["Authorization"] = "Bearer " + sharedPreference.getString("token", null)!!
                return params

            }
        }
        queue.add(userRequest)
    }

    fun signOut() {

        url = sharedPreference.getString("api", null)!! + "/auth/logout/"

        val signOutRequest = object: StringRequest(
            Method.POST, url,
            Response.Listener<String> {

                val editor = sharedPreference.edit()
                editor.remove("token")
                editor.apply()

                profilePresenter.signOutSuccess()

            },
            Response.ErrorListener {
                profilePresenter.signOutFail()
            })

        {
            @Throws(AuthFailureError::class)
            override fun getHeaders(): Map<String, String> {

                val params: MutableMap<String, String>
                params = HashMap()
                params["Content-Type"] = "application/json"
                params["Authorization"] = "Bearer " + sharedPreference.getString("token", null)!!
                return params

            }
        }
        queue.add(signOutRequest)
    }

    fun changeUsername(usernameProfile: EditText) {

        url = sharedPreference.getString("api", null)!! + "/me/username/"

        val jsonObjUsername = JSONObject()
        jsonObjUsername.put("username", usernameProfile.text)

        val saveUsernameRequest = object: JsonObjectRequest(
            Method.POST, url, jsonObjUsername,
            Response.Listener {
                profilePresenter.changeSuccess()
            },
            Response.ErrorListener {
                profilePresenter.changeFail()
            })

        {
            @Throws(AuthFailureError::class)
            override fun getHeaders(): Map<String, String> {

                val params: MutableMap<String, String>
                params = HashMap()
                params["Content-Type"] = "application/json"
                params["Authorization"] = "Bearer " + sharedPreference.getString("token", null)!!
                return params

            }
        }
        queue.add(saveUsernameRequest)
    }

    fun changePassword(passwordProfile: EditText) {

        url = sharedPreference.getString("api", null)!! + "/me/password/"

        val jsonObjPassword = JSONObject()
        jsonObjPassword.put("password", passwordProfile.text)

        val savePasswordRequest = object: JsonObjectRequest(
            Method.POST, url, jsonObjPassword,
            Response.Listener {
                profilePresenter.changeSuccess()
            },
            Response.ErrorListener {
                profilePresenter.changeFail()
            })

        {
            @Throws(AuthFailureError::class)
            override fun getHeaders(): Map<String, String> {

                val params: MutableMap<String, String>
                params = HashMap()
                params["Content-Type"] = "application/json"
                params["Authorization"] = "Bearer " + sharedPreference.getString("token", null)!!
                return params

            }
        }
        queue.add(savePasswordRequest)
    }
}