package com.example.area.adapter

import android.text.InputType.TYPE_CLASS_NUMBER
import android.text.InputType.TYPE_CLASS_TEXT
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.area.dataClass.ParameterModel
import kotlinx.android.synthetic.main.parameter_page.view.*

/**
 * Holder for the recycler view of the actions and the reactions of a service
 *
 * @param itemView: View who contain the recycler view
 */
class AreaHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    /**
     *  Update view with the model of the parameters
     *
     * @param item: Model of parameters to add on the recycler view
     */
    fun index(item: ParameterModel) {
        itemView.paramText.text = item.name
        itemView.editParam.hint =  item.param
        if (item.param == "int")
            itemView.editParam.inputType = TYPE_CLASS_NUMBER
        else if (item.param == "string")
            itemView.editParam.inputType = TYPE_CLASS_TEXT
    }
}