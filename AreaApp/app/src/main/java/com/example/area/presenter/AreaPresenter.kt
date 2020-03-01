package com.example.area.presenter

import android.content.Context
import android.widget.ArrayAdapter
import com.example.area.model.AreaModel
import com.example.area.view.AreaView

/**
 * Presenter for the area activity
 *
 * @param areaView: View of the area
 * @param context: Context of the application
 */
class AreaPresenter(private var areaView: AreaView, var context: Context) {

    private var areaModel = AreaModel(this, context)

    /**
     * Get the services with actions
     */
    fun getServicesActionList() {
        areaModel.getServicesActionList()
    }

    /**
     * Get the services with reactions
     */
    fun getServicesReactionList() {
        areaModel.getServicesReactionList()
    }

    /**
     * Get the actions of a service
     *
     * @param serviceName: Name of the service
     */
    fun getActionList(serviceName: String) {
        areaModel.getActionList(serviceName)
    }

    /**
     * Get the reactions of a service
     *
     * @param serviceName: Name of the service
     */
    fun getReactionList(serviceName: String) {
        areaModel.getReactionList(serviceName)
    }

    /**
     * Add adapter to the recycler view of the services with actions
     *
     * @param actionAdapter: Adapter to add
     * @param actionServicesList: List of the services
     */
    fun addActionsServicesAdapter(actionAdapter: ArrayAdapter<String>, actionServicesList: ArrayList<String>) {
        areaView.addActionServicesAdapter(actionAdapter, actionServicesList)
    }

    /**
     * Add adapter to the recycler view of the services with reactions
     *
     * @param reactionAdapter: Adapter to add
     * @param reactionServicesList: List of the services
     */
    fun addReactionsServicesAdapter(reactionAdapter: ArrayAdapter<String>, reactionServicesList: ArrayList<String>) {
        areaView.addReactionServicesAdapter(reactionAdapter, reactionServicesList)
    }

    /**
     * Add adapter to the recycler view of the actions
     *
     * @param actionAdapter: Adapter to add
     * @param actionList: List of the actions
     * @param serviceName: Name of the service
     */
    fun addActionsAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>, serviceName: String) {
        areaView.addActionAdapter(actionAdapter, actionList, serviceName)
    }

    /**
     * Add adapter to the recycler view of the reactions
     *
     * @param reactionAdapter: Adapter to add
     * @param reactionList: List of the reactions
     * @param serviceName: Name of the service
     */
    fun addReactionsAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>, serviceName: String) {
        areaView.addReactionAdapter(reactionAdapter, reactionList, serviceName)
    }

    /**
     * Get the parameters of the action
     *
     * @param actionDescription: Description of the action
     * @param serviceName: Name of the service
     */
    fun getParamsActionLit(actionDescription: String, serviceName: String) {
        areaModel.getParamsActionLit(actionDescription, serviceName)
    }

    /**
     * Get the parameters of the reaction
     *
     * @param reactionDescription: Description of the reaction
     * @param serviceName: Name of the service
     */
    fun getParamsReactionLit(reactionDescription: String, serviceName: String) {
        areaModel.getParamsReactionLit(reactionDescription, serviceName)
    }

    /**
     * Display the parameters of the action
     *
     * @param description: Description of the action
     * @param id: Id of the action
     * @param nameList: Name of the parameters
     * @param typeList: Type of the parameters
     */
    fun displayParamActionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String, id: String) {
        areaView.displayParamActionLists(nameList, typeList, description, id)
    }

    /**
     * Display the parameters of the reaction
     *
     * @param description: Description of the reaction
     * @param id: Id of the reaction
     * @param nameList: Name of the parameters
     * @param typeList: Type of the parameters
     */
    fun displayParamReactionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String, id: String) {
        areaView.displayParamReactionLists(nameList, typeList, description, id)
    }

    /**
     * Check the connection to the action's service
     *
     * @param serviceName: Name of the service
     */
    fun checkActionConnection(serviceName: String) {
        areaModel.checkActionConnection(serviceName)
    }

    /**
     * Display the actions of a service
     *
     * @param serviceName: Name of the service
     */
    fun showActionList(serviceName: String) {
        areaView.showActionList(serviceName)
    }

    /**
     * Check the connection of the reaction's service
     *
     * @param serviceName: Name of the service
     */
    fun checkReactionConnection(serviceName: String) {
        areaModel.checkReactionConnection(serviceName)
    }

    /**
     * Display the reactions of a service
     *
     * @param serviceName: Name of the service
     */
    fun showReactionList(serviceName: String) {
        areaView.showReactionList(serviceName)
    }

    /**
     * Check the parameter enter by the user
     *
     * @param editText: Parameter enter by the user
     */
    fun checkInfos(editText: String): Boolean {
        areaModel.checkInfos(editText)
        return areaView.onResultCheckInfos(areaModel.isEditTextValid)
    }

    /**
     * Create an area
     *
     * @param actionId: Id of the action
     * @param nameParametersAction: Name of the parameters of the action
     * @param nameParametersReaction: Name of the parameters of the reaction
     * @param reactionId: Id of the reaction
     * @param resParametersAction: Parameters enter by the user for the action
     * @param resParametersReaction: Parameters enter by the user for the reaction
     */
    fun createArea(actionId: Int, reactionId: Int, nameParametersAction: ArrayList<String>, resParametersAction: ArrayList<String>, nameParametersReaction: ArrayList<String>, resParametersReaction: ArrayList<String>) {
        areaModel.createArea(actionId, reactionId, nameParametersAction, resParametersAction, nameParametersReaction, resParametersReaction)
    }

    /**
     * Create an area is successful
     */
    fun createSuccess() {
        areaView.createSuccess()
    }
}