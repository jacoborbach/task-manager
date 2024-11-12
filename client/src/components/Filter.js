import React from 'react'

// Filter view = all/complete/incomplete
function Filter({ filter, setFilter }) {
    return (

        <div className="filter-buttons">
            <button onClick={() => setFilter("all")} className={`btn btn-outline-primary me-2 ${filter === "all" ? "active" : ""}`}>All</button>
            <button onClick={() => setFilter("completed")} className={`btn btn-outline-success me-2 ${filter === "completed" ? "active" : ""}`}>Completed</button>
            <button onClick={() => setFilter("incomplete")} className={`btn btn-outline-danger me-2 ${filter === "incomplete" ? "active" : ""}`}>Incomplete</button>
        </div>

    )
}

export default Filter;