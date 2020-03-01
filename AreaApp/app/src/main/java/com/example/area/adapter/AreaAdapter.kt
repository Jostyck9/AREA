package com.example.area.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.area.R
import com.example.area.dataClass.ParameterModel

class AreaAdapter(private val params : ArrayList<ParameterModel>, private val mContext : Context) : RecyclerView.Adapter<AreaHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AreaHolder {
        val v =  LayoutInflater.from(parent.context).inflate(R.layout.parameter_page, parent, false)
        return AreaHolder(v)
    }

    override fun onBindViewHolder(holder: AreaHolder, position: Int) {
        holder.index(params[position])
    }

    override fun getItemCount(): Int {
        return params.size
    }
}
