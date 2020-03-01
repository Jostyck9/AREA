package com.example.area

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.area.Adapter.HomeAdapter
import com.example.area.DataClass.AreasModel
import com.example.area.presenter.HomePresenter
import com.example.area.view.HomeView
import kotlinx.android.synthetic.main.activity_home.*
import android.view.View
import android.widget.Toast

class HomeActivity : AppCompatActivity(), HomeView {

    private lateinit var homePresenter: HomePresenter
    private var rvDiscoverList: RecyclerView? = null
    private var areasList = mutableListOf<AreasModel>()
    private var mLayoutManager: GridLayoutManager? = null
    private var homeAdapter: HomeAdapter? = null

    private var previousTotal = 0
    private var loading = true
    private val visibleThreshold = 5
    internal var firstVisibleItem: Int = 0
    internal var visibleItemCount: Int = 0
    internal var totalItemCount: Int = 0

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
        //Log.d("debug", "aftersetListeners")

        homePresenter.getServices()
        //Log.d("debug", "aftergetservices")

    }

    private fun initUI() {
        //Log.d("debug", "INIT UI")
        Log.d("REQUEST UPDATE", "init")
        rvDiscoverList = findViewById(R.id.rv_areas)
        homeAdapter = HomeAdapter(this, areasList)
        mLayoutManager = GridLayoutManager(this, 1)
        rvDiscoverList?.layoutManager = mLayoutManager
        rvDiscoverList?.itemAnimator = DefaultItemAnimator()
        rvDiscoverList?.adapter = homeAdapter
    }

    override fun setDataToRecyclerView(areasInfo: MutableList<AreasModel>) {
        Log.d("REQUEST HOME", areasInfo.size.toString())
        for (area in areasInfo) {
            //Log.d("debug", area.actionDescription)
            areasList.add(area)
        }
        //Log.d("debug", "SIZE AREASLIST" + areasList.size.toString())
        //Log.d("debug", "beforenotify")
        Log.d("REQUEST HOME end", areasList.size.toString())
        this.homeAdapter?.notifyDataSetChanged()
        //Log.d("debug", "afternotify")
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        Log.d("debug", "onCreateOptionsMenu")
        menuInflater.inflate(R.menu.menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        //Log.d("debug", "onOptionsItemSelected")

        val id = item.itemId

        if (id == R.id.profile) {
            val intentProfile = Intent(this, ProfileActivity::class.java)
            areasList.clear()
            startActivity(intentProfile)
        } else if (id == R.id.add) {
            val intentArea = Intent(this, AreaActivity::class.java)
            areasList.clear()
            startActivity(intentArea)
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
}