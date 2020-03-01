package com.example.area.adapter

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.area.dataClass.ParameterModel
import kotlinx.android.synthetic.main.resume_page.view.*

/**
 * Holder for the recycler view of the parameters of a service
 *
 * @param itemView: View who contain the recycler view
 */
class ResumeHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    /**
     *  Update view with the model of the parameters
     *
     * @param item: Model of parameters to add on the recycler view
     */
    fun index(item: ParameterModel) {
        itemView.paramTextResume.text = item.name
        itemView.editParamResume.text =  item.param
    }
}