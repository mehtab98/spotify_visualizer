// /*
// TODO:
//     https://stackoverflow.com/questions/47658765/objects-are-not-valid-as-a-react-child-found-object-promise
//     figure out how to pass reference of id="creator" into the fetch text function
//         in order to update it once the asynchronous load completes.
// */


import React, {useState, useEffect} from 'react'
import "./Footer.css"

function Footer() {

    const [message, setMessage] = useState([])

    useEffect(() => {
        setMessage(fetchText("/testing"))
    }, [])

    async function fetchText(url) {
        let response = await fetch(url)
        let data = await response.text()
        console.log(data)
        document.querySelector('#creator').textContent = data
    }

    return (
        <div id="Footer">
            <span id="creator"></span>
        </div>
    )
}

export default Footer