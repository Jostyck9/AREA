package com.example.area.dataClass

/**
 * Data for Reactions
 *
 * @param rId: ID of the reaction
 * @param sName: Name of the service
 * @param rName: Name of the reaction
 * @param rDescription: Description of the reaction
 */
data class ReactionModel(val rId: Int, val sName: String, val rName: String, val rDescription: String) {

    /**
     * Id of the reaction
     */
    val reactionId : Int = rId
    /**
     * Name of the service
     */
    val serviceName : String = sName
    /**
     * Name of the reaction
     */
    val reactionName : String = rName
    /**
     * Description of the reaction
     */
    val description : String = rDescription
}