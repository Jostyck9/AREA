package com.example.area.view

import com.example.area.DataClass.AreasModel

interface HomeView {
    fun upVisibility()
    fun downVisibility()
    fun setDataToRecyclerView(areasInfo: MutableList<AreasModel>)
    fun displayMessage(message: String)
}