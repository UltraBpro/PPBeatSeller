document.addEventListener('DOMContentLoaded', function() {
    const showProfileButton = document.getElementById('show-profile');
    const hideProfileButton = document.getElementById('hide-profile');
    const profileSidebar = document.querySelector('.profile-sidebar');
    const albumList = document.querySelector('.album-list');
    const overlay = document.querySelector('.overlay');

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

    showProfileButton.addEventListener('click', showProfile);
    hideProfileButton.addEventListener('click', hideProfile);
    overlay.addEventListener('click', hideProfile);
});