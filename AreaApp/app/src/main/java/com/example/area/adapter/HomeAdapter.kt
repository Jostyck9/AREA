package com.example.area.adapter

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.area.HomeActivity
import com.example.area.dataClass.AreasModel
import com.example.area.R

/**
 * Adapter of the recycler view for display Areas
 *
 * @param homeActivity: Instance of the activity who contains the recycler view
 * @param areasList: List of all the area to display in the recycler view
 */
class HomeAdapter (private val homeActivity: HomeActivity, private val areasList: MutableList<AreasModel>) : RecyclerView.Adapter<HomeAdapter.MyViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.area_card, parent, false)

        return MyViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder.actionService.text = areasList[position].actionService
        holder.reactionService.text = areasList[position].reactionService
        holder.actionService.setTextColor(Color.parseColor(areasList[position].actionColor))
        holder.reactionService.setTextColor(Color.parseColor(areasList[position].reactionColor))
        holder.actionLogo.setImageResource(areasList[position].actionImage)
        holder.reactionLogo.setImageResource(areasList[position].reactionImage)

        holder.deleteButton.setOnClickListener {
            homeActivity.onDeleteClick(areasList[position].areaId)
        }
    }

    override fun getItemCount(): Int {
        return areasList.size
    }

    /**
     * Holder for the recycler view of the areas
     *
     * @param itemView: View who contain the recycler view
     */
    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var actionLogo = itemView.findViewById(R.id.logo_action) as ImageView
        var reactionLogo = itemView.findViewById(R.id.logo_reaction) as ImageView
        var actionService = itemView.findViewById(R.id.Service_action) as TextView
        var reactionService = itemView.findViewById(R.id.service_reaction) as TextView
        val deleteButton = itemView.findViewById(R.id.delete_button) as Button
    }
}