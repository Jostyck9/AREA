package com.example.area.DataClass

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
    val reactionColor: String
)