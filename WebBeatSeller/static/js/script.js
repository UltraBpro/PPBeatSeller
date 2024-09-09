document.addEventListener('DOMContentLoaded', function() {
    const showProfileButton = document.getElementById('show-profile');
    const hideProfileButton = document.getElementById('hide-profile');
    const profileSidebar = document.querySelector('.profile-sidebar');
    const albumList = document.querySelector('.album-list');
    const overlay = document.querySelector('.overlay');
    const loadingScreen = document.getElementById('loading-screen');

    function showProfile() {
        profileSidebar.classList.add('show');
        albumList.classList.add('hide');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        showProfileButton.style.visibility = 'hidden'; // Ẩn nút show profile
    }

    function hideProfile() {
        profileSidebar.classList.remove('show');
        albumList.classList.remove('hide');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        showProfileButton.style.visibility = 'visible'; // Hiện nút show profile
    }

    function handleLoadingScreen() {
        setTimeout(() => {
            document.body.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000); // Adjust this delay as needed
    }

    showProfileButton.addEventListener('click', showProfile);
    hideProfileButton.addEventListener('click', hideProfile);
    overlay.addEventListener('click', hideProfile);

    handleLoadingScreen();

    const audio = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause');
    const prevTrackButton = document.getElementById('prev-track');
    const nextTrackButton = document.getElementById('next-track');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    let currentTrack = 0;
    const tracks = window.audioTracks || [];

    function loadTrack(trackIndex) {
        audio.src = tracks[trackIndex];
        audio.load();
        playPauseButton.querySelector('.play-icon').style.display = 'inline';
        playPauseButton.querySelector('.pause-icon').style.display = 'none';
        
    }

    function nextTrack() {
        currentTrack = (currentTrack + 1) % tracks.length;
        loadTrack(currentTrack);
    }

    function prevTrack() {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrack);
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseButton.querySelector('.play-icon').style.display = 'none';
            playPauseButton.querySelector('.pause-icon').style.display = 'inline';
        } else {
            audio.pause();
            playPauseButton.querySelector('.play-icon').style.display = 'inline';
            playPauseButton.querySelector('.pause-icon').style.display = 'none';
        }
    }

    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        durationDisplay.textContent = formatTime(audio.duration);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    playPauseButton.addEventListener('click', togglePlayPause);
    nextTrackButton.addEventListener('click', nextTrack);
    prevTrackButton.addEventListener('click', prevTrack);
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);

    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    // Ensure the loading screen is visible even before DOMContentLoaded
    window.addEventListener('load', function() {
        document.body.style.visibility = 'visible';
    });

    // Add this new function
    function handleAlbumSelection() {
        const albumTitles = document.querySelectorAll('.album-title a');
        albumTitles.forEach(title => {
            title.addEventListener('click', function(e) {
                e.preventDefault();
                const albumId = this.getAttribute('data-album-id');
                showAlbumDetails(albumId);
            });
        });
    }

    // Call the function to set up event listeners
    handleAlbumSelection();

    // Add new variables and functions for album details
    const albumDetails = document.querySelector('.album-details');
    const albumCover = document.getElementById('album-cover');
    const albumVideo = document.getElementById('album-video');
    const albumInfo = document.querySelector('.album-info');
    const albumDemos = document.querySelector('.album-demos');
    const homeButton = document.getElementById('home-button');
    const infoButton = document.getElementById('info-button');
    const soundsButton = document.getElementById('sounds-button');
    const buyButton = document.getElementById('buy-button');

    function showAlbumDetails(albumId) {
        albumList.style.display = 'none';
        albumDetails.style.display = 'flex';

        fetch(`/api/albums/${albumId}/`)
            .then(response => response.json())
            .then(data => {
                albumVideo.src = data.cover_video || '';

                albumInfo.innerHTML = `
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                    <h3>Features:</h3>
                    <ul>
                        ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                `;

                albumDemos.innerHTML = `
                    <h3>Demos:</h3>
                    ${data.demos.map(demo => `
                        <div>
                            <p>${demo.title}</p>
                            <audio controls>
                                <source src="${demo.audio_file}" type="audio/mpeg">
                            </audio>
                        </div>
                    `).join('')}
                `;

                showVideo();
            })
            .catch(error => console.error('Error:', error));
    }

    function showVideo() {
        albumVideo.style.display = 'block';
        albumInfo.style.display = 'none';
        albumDemos.style.display = 'none';
    }

    function showInfo() {
        albumVideo.style.display = 'none';
        albumInfo.style.display = 'block';
        albumDemos.style.display = 'none';
    }

    function showSounds() {
        albumVideo.style.display = 'none';
        albumInfo.style.display = 'none';
        albumDemos.style.display = 'block';
    }

    homeButton.addEventListener('click', function() {
        albumDetails.style.display = 'none';
        albumList.style.display = 'flex';
    });

    infoButton.addEventListener('click', showInfo);
    soundsButton.addEventListener('click', showSounds);

    buyButton.addEventListener('click', function() {
        window.open('https://www.facebook.com/', '_blank');
    });

    // Thêm event listener cho video để tự động phát khi hiển thị
    albumVideo.addEventListener('loadedmetadata', function() {
        if (albumVideo.style.display !== 'none') {
            albumVideo.play();
        }
    });

    // Call the function to set up event listeners
    handleAlbumSelection();

    // ... rest of the existing code ...
});