package com.example.area

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.area.adapter.HomeAdapter
import com.example.area.dataClass.AreasModel
import com.example.area.presenter.HomePresenter
import com.example.area.view.HomeView
import kotlinx.android.synthetic.main.activity_home.*
import android.view.View
import android.widget.Toast

/**
 * Home activity
 */
class HomeActivity : AppCompatActivity(), HomeView {

    private lateinit var homePresenter: HomePresenter
    private var rvDiscoverList: RecyclerView? = null
    private var areasList = mutableListOf<AreasModel>()
    private var mLayoutManager: GridLayoutManager? = null
    private var homeAdapter: HomeAdapter? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        initUI()
        homePresenter = HomePresenter(this, applicationContext)

        val data = intent.data
        if (data != null) {
            homePresenter.addToken(data)
        }
    }

    override fun onStart() {
        super.onStart()

        homePresenter.getServices()
    }

    private fun initUI() {
        rvDiscoverList = findViewById(R.id.rv_areas)
        homeAdapter = HomeAdapter(this, areasList)
        mLayoutManager = GridLayoutManager(this, 1)
        rvDiscoverList?.layoutManager = mLayoutManager
        rvDiscoverList?.itemAnimator = DefaultItemAnimator()
        rvDiscoverList?.adapter = homeAdapter
    }

    override fun setDataToRecyclerView(areasInfo: MutableList<AreasModel>) {
        rvDiscoverList?.adapter = homeAdapter
        for (area in areasInfo) {
            areasList.add(area)
        }
        this.homeAdapter?.notifyDataSetChanged()
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val id = item.itemId

        if (id == R.id.profile) {
            val intentProfile = Intent(this, ProfileActivity::class.java)
            startActivity(intentProfile)
            areasList.clear()
        } else if (id == R.id.add) {
            val intentArea = Intent(this, AreaActivity::class.java)
            startActivity(intentArea)
            areasList.clear()
        }
        return true
    }

    override fun upVisibility() {
        treeImage.visibility = View.VISIBLE
        startConnecting.visibility = View.VISIBLE
    }

    override fun downVisibility() {

        treeImage.visibility = View.INVISIBLE
        startConnecting.visibility = View.INVISIBLE
    }

    override fun displayMessage(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show()
    }

    fun onDeleteClick(areaId : Int) {
        rvDiscoverList?.adapter = null
        areasList.clear()
        homePresenter.deleteAnArea(areaId)
    }

}