/*
  TODO: 
    - learn how to synchronously process certain requests (like getting authentication code)
    - learn middlewares (how to minimize junk code and reuse segments)

  API FLOW: 
    - user searches an artist name, server return list of artists
    - user confirms the artist selection, server returns a list of albums
    - user selects a list of albums, server returns each track from those albums.
*/

///////////////////////////////////////////////////////////////
//                   SERVER VARS                             //
///////////////////////////////////////////////////////////////

const express = require("express")
const SpotifyWebApi = require('spotify-web-api-node')
const app = express() // create express app
const port = 8080

const spotifyAPI = new SpotifyWebApi({
  clientId: '7d4e98d5926f47fd887b33c0db094c72',
  clientSecret: '5274969d76bb4006964b92076acc6194',
})

const search_session = {}

///////////////////////////////////////////////////////////////
//               SPOTIFY API WRAPPERS                        //
///////////////////////////////////////////////////////////////

// Authorization allows usage of Spotify's API
async function authorize() {
  try {
    let res = await spotifyAPI.clientCredentialsGrant()
    let token = res.body['access_token']
    spotifyAPI.setAccessToken(token)
    console.log("New Token: " + token)
  } catch {
    console.error("Error in authorization")
  }
}

// Given a search string, returns a list of artists that 
async function get_artist_list(artist_name) {
  try {
    let res = await spotifyAPI.searchArtists(artist_name)
    return res.body.artists.items
  } catch {
    console.error("Error getting artist list")
  }
}

// Given an artist id, returns a list of albums they have recorded
async function get_album_list(artist_id) {
  try {
    let res = await spotifyAPI.getArtistAlbums(artist_id)
    return res.body.items
  } catch {
    console.error("Error getting artist albums")
  }
}

// Get all of the tracks that were on the specified album
async function get_album_tracks(album_id_list) {
  try {
    let res = await spotifyAPI.getAlbumTracks(album_id_list)
    return res.body
  } catch {
    console.error("Error getting album tracks")
  }
}

// Given a list of track ids, returns the audio features for each track
async function get_features_for_tracks(track_ids) {
  try {
    let res = await spotifyAPI.getAudioFeaturesForTracks(track_ids)
    return res.body
  } catch {
    console.error("error getting track features")
  }
}

async function example_pipeline() {
  try {
    // Authorize communication with Spotify
    await authorize()

    // Make a search request for ASAP Rocky
    search_session.search_query = "Asap Rocky"
    search_session.artist_list = await get_artist_list(search_session.search_query)

    // Select A$ap Rocky from the group of returned artists
    search_session.artist = search_session.artist_list[0]

    // Get all albums recorded by ASAP, and isolate their album IDs
    search_session.artist_albums = await get_album_list(search_session.artist.id)
    search_session.album_id_list = search_session.artist_albums.map((album) => {return album.id})

    // Get evry song belonging to each album on the list, and get the id of each song
    search_session.album_tracks = await Promise.all(search_session.album_id_list.map(async (album_id) => {
      return (await get_album_tracks(album_id))
    }))

    // Finally, get the analysis features for each song
    search_session.album_tracks_ids = search_session.album_tracks.map((album) => {
      return album.items.map((track) => {
        return track.id
      })
    })

    search_session.album_track_features = await Promise.all(search_session.album_tracks_ids.map(async (album) => {
      return (await get_features_for_tracks(album))
    }))

    console.log("neuh" + search_session.album_tracks)
    console.log("end of pipeline")
  
  } catch {
    console.error("Pipeline Failed.")
  }
}

///////////////////////////////////////////////////////////////
//                     TEST BED                              //
///////////////////////////////////////////////////////////////

example_pipeline()
console.log("done")

///////////////////////////////////////////////////////////////
//                      ROUTING                              //
///////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("This is from express.js");
});

app.get('/testing', (req, res) => {
  res.send("Frontend is now connected to backend.")
})

app.get("/exdata", (req, res) => {
  res.send(JSON.stringify(search_session))
})

// start express server on port 5000
app.listen(port, () => {
  console.log("server started on port 8080");
});
