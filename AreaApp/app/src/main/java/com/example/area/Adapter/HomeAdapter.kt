package com.example.area.Adapter

import android.graphics.Color
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.area.HomeActivity
import com.example.area.DataClass.AreasModel
import com.example.area.R

class HomeAdapter (private val homeActivity: HomeActivity, private val areasList: MutableList<AreasModel>) : RecyclerView.Adapter<HomeAdapter.MyViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.area_card, parent, false)

        return MyViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {

        Log.d("REQUEST UPDATE", position.toString())
        //Log.d("debug", areasList[position].actionDescription)

        holder.actionService.text = areasList[position].actionService
        holder.reactionService.text = areasList[position].reactionService
        holder.actionService.setTextColor(Color.parseColor(areasList[position].actionColor))
        holder.reactionService.setTextColor(Color.parseColor(areasList[position].reactionColor))
        holder.actionLogo.setImageResource(R.drawable.discord_logo)
        holder.reactionLogo.setImageResource(R.drawable.discord_logo)
    }

    override fun getItemCount(): Int {
        Log.d("REQUEST UPDATE", "GETITEMCOUNT   " + areasList.size.toString())
        return areasList.size
    }

    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var actionLogo = itemView.findViewById(R.id.logo_action) as ImageView
        var reactionLogo = itemView.findViewById(R.id.logo_reaction) as ImageView
        var actionService = itemView.findViewById(R.id.Service_action) as TextView
        var reactionService = itemView.findViewById(R.id.service_reaction) as TextView
    }
}