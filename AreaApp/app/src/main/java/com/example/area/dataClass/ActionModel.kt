package com.example.area.dataClass

/**
 * Data for Actions
 *
 * @param aId: ID of the action
 * @param sName: Name of the service
 * @param aName: Name of the action
 * @param aDescription: Description of the action
 */
data class ActionModel(val aId: Int, val sName: String, val aName: String, val aDescription: String) {

    /**
     * ID of the action
     */
    val actionId : Int = aId
    /**
     * Name of the service
     */
    val serviceName : String = sName
    /**
     * Name of the action
     */
    val actionName : String = aName
    /**
     * Description of the action
     */
    val description : String = aDescription
}