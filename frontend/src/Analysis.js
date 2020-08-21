import React, { useState, useEffect } from 'react'
import "./Analysis.css"
import Footer from './Footer.js'

export default function Analysis() {
    
    const [exJson, setExJson] = useState([])

    useEffect(() => {
        setExJson(fetchText("/exdata"))
    })
    
    async function fetchText(url) {
        let response = await fetch(url)
        let data = await response.text()
        console.log(data)
        document.querySelector('#exData').textContent = data
    }
    
    
    
    
    return (
        <div id="Analysis">
            <div id="exData"></div>
            <Footer></Footer>
        </div>
    )
}
