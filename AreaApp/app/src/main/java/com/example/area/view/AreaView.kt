package com.example.area.view

import android.widget.ArrayAdapter

/**
 * Interface for the Area Activity
 */
interface AreaView {

    /**
     * Display the first page of the creation of an area
     */
    fun showArea()

    /**
     * Display list of services and his actions and reactions
     */
    fun showList()

    /**
     * Display the parameters of an action or a reaction
     */
    fun showParameters()

    /**
     * Display the services with actions
     */
    fun showActionServicesList()

    /**
     * Add adapter to the recycler view of the service with actions
     *
     * @param actionAdapter: Adapter to add
     * @param actionServicesList: List of the services
     */
    fun addActionServicesAdapter(actionAdapter: ArrayAdapter<String>, actionServicesList: ArrayList<String>)

    /**
     * Display the services with reactions
     */
    fun showReactionServicesList()

    /**
     * Add adapter to the recycler view of the service with reactions
     *
     * @param reactionAdapter: Adapter to add
     * @param reactionServicesList: List of the services
     */
    fun addReactionServicesAdapter(reactionAdapter: ArrayAdapter<String>, reactionServicesList: ArrayList<String>)

    /**
     * Display the actions of a service
     *
     * @param serviceName: Name of the service
     */
    fun showActionList(serviceName: String)

    /**
     * Add adapter to the recycler view of the actions of a service
     *
     * @param actionAdapter: Adapter to add
     * @param actionList: List of the actions
     * @param serviceName: Name of the service
     */
    fun addActionAdapter(actionAdapter: ArrayAdapter<String>, actionList: ArrayList<String>, serviceName: String)

    /**
     * Display the reactions of a service
     *
     * @param serviceName: name of the service
     */
    fun showReactionList(serviceName: String)

    /**
     * Add adapter to the recycler view of the reactions of a service
     *
     * @param reactionAdapter: Adapter to add
     * @param reactionList: List of the reaction
     * @param serviceName: Name of the service
     */
    fun addReactionAdapter(reactionAdapter: ArrayAdapter<String>, reactionList: ArrayList<String>, serviceName: String)

    /**
     * Display a message to the user
     *
     * @param message: Message to display
     */
    fun displayMessage(message: String)

    /**
     * Display the parameters choose by the user for the action choose
     *
     * @param description: Description of the action
     * @param id: ID of the action
     * @param nameList: Name of the parameters
     * @param typeList: Type of the parameters
     */
    fun displayParamActionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String, id: String)

    /**
     * Display the parameters choose by the user for the reaction choose
     *
     * @param nameList: Name of the parameters
     * @param description: Description of the reaction
     * @param id: ID of the reaction
     * @param typeList: Type of the parameters
     */
    fun displayParamReactionLists(nameList: ArrayList<String>, typeList: ArrayList<String>, description: String, id: String)

    /**
     * Check if the parameter enter is valid
     *
     * @param isEditTextValid: Result of the parameter enter by the user
     */
    fun onResultCheckInfos(isEditTextValid: Boolean): Boolean

    /**
     * Display when the creation of an area is successful
     */
    fun createSuccess()
}