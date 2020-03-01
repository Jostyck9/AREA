package com.example.area.adapter

import android.text.InputType.TYPE_CLASS_NUMBER
import android.text.InputType.TYPE_CLASS_TEXT
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.area.dataClass.ParameterModel
import kotlinx.android.synthetic.main.parameter_page.view.*
import kotlinx.android.synthetic.main.parameter_page.view.editParam
import kotlinx.android.synthetic.main.parameter_page.view.paramText
import kotlinx.android.synthetic.main.resume_page.view.*

class ResumeHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    fun index(item: ParameterModel) {
        itemView.paramTextResume.text = item.name
        itemView.editParamResume.text =  item.param
    }
}