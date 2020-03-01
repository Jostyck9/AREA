package com.example.area.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.area.dataClass.ParameterModel
import com.example.area.R

/**
 * Adapter of the recycler view for display parameters
 *
 * @param params: List of parameters to display
 * @param mContext: Context of the application
 */
class ResumeAdapter(private val params : ArrayList<ParameterModel>, private val mContext : Context) : RecyclerView.Adapter<ResumeHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ResumeHolder {
        val v =  LayoutInflater.from(parent.context).inflate(R.layout.resume_page, parent, false)
        return ResumeHolder(v)
    }

    override fun onBindViewHolder(holder: ResumeHolder, position: Int) {
        holder.index(params[position])
    }

    override fun getItemCount(): Int {
        return params.size
    }

    /**
     * Get an item of the recycler view
     *
     * @param position: Position of the item
     */
    fun getItem(position: Int): ParameterModel {
        return params[position]
    }
}
