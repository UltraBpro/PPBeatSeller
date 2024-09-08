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
                console.log('Selected album ID:', albumId);
                // Here you can add code to show album details or perform any other action
            });
        });
    }

    // Call the function to set up event listeners
    handleAlbumSelection();
});