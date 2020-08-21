import React from 'react'
import "./Sidebar.css"
import Artwork from "./cudi.jpg"

export default function Sidebar() {
    return (
        <div id="sidebar">

            <div id="artist_search_box" className="well_box">
                <span>Search for an Artist</span>
                <input id="artist_text" type="text"></input>
                <button>Search</button>
            </div>

            <span>...</span>

            <div id="artist_selection_box" className="well_box">
                <span>Confirm the Artist you are looking for</span>
                <input id="artist_list" type="text"></input>
                <button>Search</button>
            </div>

            <span>...</span>

            <div id="album_selection_box" className="well_box">
                <span>Select the albums to Analyze</span>
                <input id="album_list" type="text"></input>
                <button>Analyze!</button>
            </div>

            <div id="artist_artwork">
                <img id="artist_art" src={Artwork} alt="Artwork"></img>
            </div>

        </div>
    )
}
