console.log("Script-featured.js");

document.addEventListener("DOMContentLoaded", () => {
    // Get the data from data.js
    const playlist = data.playlist;

    function getRandomPlaylist(playlist) {
        const randomNum = Math.floor(Math.random() * data.playlists.length);
        return data.playlists[randomNum];
    }

    const randomPlaylist = getRandomPlaylist(playlist);

    // Populate song list in the modal
    document.getElementById("featuredCover").src = randomPlaylist.playlist_art;
    document.getElementById("featuredPlaylistName").textContent = randomPlaylist.playlist_name;
    document.getElementById("featuredCreator").textContent = randomPlaylist.playlist_creator;

    const featureSongList = document.getElementById("featuredSongList");
    featureSongList.innerHTML = "";

    randomPlaylist.songs.forEach((song) => {
        const songItem = document.createElement("div");
        songItem.innerHTML = `
        <div id="featuredSongsSection">
            <div id="featuredSongs">
                <div id="featuredSongImageArea">
                    <img id="featuredSongImage" src="${song.cover_art}" width=20px height=20px>
                </div>
                
                <div id="featuredSongInfo">
                    <p id="featuredSongTitle">${song.title}</p>
                    <p id="featuredArtistName">${song.artist}</p>
                    <p id="featuredAlbumName">${song.album}</p>
                </div>
                    
                <div id="featuredSongDuration">
                    <p>${song.duration}</p>
                </div>
            </div>
        </div>`;
        featureSongList.appendChild(songItem);
    });

    featureSongList.style.display = "block";

    // Event listener to shuffle songs in the modal
    document.getElementById("featuredShuffleButton").addEventListener("click", () => {
        // Shuffle songs
        const songList = document.getElementById("featuredSongList");
        const songs = Array.from(songList.children);  
        songs.sort(() => Math.random() - 0.5);
        songList.innerHTML = "";
        songs.forEach((song) => songList.appendChild(song)); // Appends shuffled songs
    });
});