package com.example.area.dataClass

/**
 * Data for the areas
 *
 * @param areaId: Id of the area
 * @param actionId: Id of the action
 * @param reactionId: Id of the reaction
 * @param actionParameters: Parameters of the action
 * @param reactionParameters: Parameters of the reaction
 * @param actionService: The service of the action
 * @param reactionService: The service of the reaction
 * @param actionName: Name of the action
 * @param reactionName: Name of the reaction
 * @param actionDescription: Description of the action
 * @param reactionDescription: Description of the reaction
 * @param actionColor: Color of the action
 * @param reactionColor: Color of the reaction
 * @param actionImage: Image of the action
 * @param reactionImage: Image of the reaction
 *
 */
data class AreasModel(
    val areaId: Int,
    val actionId: Int,
    val reactionId: Int,
    val actionParameters: MutableList<String>,
    val reactionParameters: MutableList<String>,
    val actionService: String,
    val reactionService: String,
    val actionName: String,
    val reactionName: String,
    val actionDescription: String,
    val reactionDescription: String,
    val actionColor: String,
    val reactionColor: String,
    val actionImage: Int,
    val reactionImage: Int
)