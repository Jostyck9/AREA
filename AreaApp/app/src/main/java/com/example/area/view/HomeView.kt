package com.example.area.view

import com.example.area.dataClass.AreasModel

/**
 * Interface for the Home Activity
 */
interface HomeView {
    /**
     * Display image on the home page
     */
    fun upVisibility()

    /**
     * Make invisible image on the home page
     */
    fun downVisibility()

    /**
     * Add areas to the recycler view
     *
     * @param areasInfo: Areas to add to the recycler view
     */
    fun setDataToRecyclerView(areasInfo: MutableList<AreasModel>)

    /**
     * Display a message to the user
     *
     * @param message: Message to display
     */
    fun displayMessage(message: String)
}