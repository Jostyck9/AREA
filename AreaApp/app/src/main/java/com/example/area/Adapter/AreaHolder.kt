package com.example.area.Adapter

import android.text.InputType.TYPE_CLASS_NUMBER
import android.text.InputType.TYPE_CLASS_TEXT
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.area.DataClass.ParameterModel
import kotlinx.android.synthetic.main.parameter_page.view.*

class AreaHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    fun index(item: ParameterModel) {
        itemView.paramText.text = item.name
        itemView.editParam.hint =  item.param
        if (item.param == "int")
            itemView.editParam.inputType = TYPE_CLASS_NUMBER
        else if (item.param == "string")
            itemView.editParam.inputType = TYPE_CLASS_TEXT
    }
}