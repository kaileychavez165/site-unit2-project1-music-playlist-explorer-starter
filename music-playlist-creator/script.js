
console.log("Script.js");

document.addEventListener("DOMContentLoaded", () => {
   // Get the data from data.js
   const playlistData = data;
   console.log(data);

   // Get the playlists from the data and render them on the screen
   const playlistContainer = document.getElementById("playlistCard");
   console.log(playlistContainer);

   playlistData.playlists.forEach((playlist) => {
      const card = createPlaylistCard(playlist);
      playlistContainer.appendChild(card);
   });

   // Create a playlist card element
   function createPlaylistCard(playlist) {
      const card = document.createElement("div");
      card.className = "playlist-tile"
      card.innerHTML = `
      <img src="${playlist.playlist_art}" alt="cover">
      <h3>${playlist.playlist_name}</h3>
      <p>${playlist.playlist_creator}</p>
      <span class="heart-icon">&#x2665;</span>
      <span class="like-count">${playlist.likeCount}</span>
      `;

      const heartIcon = card.querySelector(".heart-icon");
         heartIcon.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent the click event from propagating to the card
            const likeCountElement = heartIcon.nextElementSibling;
            let likeCount = parseInt(likeCountElement.textContent);

            if (likeCountElement.textContent == 1) {
               likeCount--;
               likeCountElement.textContent = likeCount;
               heartIcon.classList.remove("liked");
               return;
            }

            likeCount++; // Add 1 to the like
            heartIcon.classList.add("liked");
            likeCountElement.textContent = likeCount;
         });

      card.addEventListener("click", (event) => {
         // Check if the click is NOT on the heart icon
         if (!event.target.classList.contains(".heart-icon")) {
            openModal(playlist);
         }
      });

      function openModal(playlist) {
         console.log("Clicked card");

         // Populate song list in the modal
         const modal = document.getElementById("playlistModal");
         document.getElementById("modalCover").src = playlist.playlist_art;
         document.getElementById("modalName").textContent = playlist.playlist_name;
         document.getElementById("modalCreator").textContent = playlist.playlist_creator;
      
         const songList = document.getElementById("modalSongContainer");
         songList.innerHTML = "";

         playlist.songs.forEach((song) => {
            const songItem = document.createElement("div");
            songItem.innerHTML = `
            <div id="modalSongList">
               <div id="modalSong">
                  <div id="modalImageArea">
                     <img id="modalSongImage" src="${song.cover_art}" width=20px height=20px>
                  </div>
                  
                  <div id="modalSongInfo">
                     <p id="songTitle">${song.title}</p>
                     <p id="artistName">${song.artist}</p>
                     <p id="albumName">${song.album}</p>
                  </div>
                     
                  <div id="songDuration">
                     <p>${song.duration}</p>
                  </div>
               </div>
            </div>`;
            songList.appendChild(songItem);
         });

         modal.style.display = "block";
      }  

      // Event listener to close the modal
      document.querySelector(".close-button").addEventListener("click", () => {
         document.getElementById("playlistModal").style.display = "none";
      });

      // Event listener to shuffle songs in the modal
      document.getElementById("shuffleButton").addEventListener("click", () => {
         // Shuffle songs
         const songList = document.getElementById("modalSongContainer");
         const songs = Array.from(songList.children);  
         songs.sort(() => Math.random() - 0.5);
         songList.innerHTML = "";
         songs.forEach((song) => songList.appendChild(song)); // Appends shuffled songs
      });

      return card;
   }
});