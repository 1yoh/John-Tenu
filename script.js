document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (mobileNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Music Player Functionality
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const playlistItems = document.querySelectorAll('.playlist ul li');

    // Sample music files (replace with your actual music files)
    const musicFiles = {
        'music1.mp3': 'Audio/11.ኢየሱስ ፍቅር Eyesus Fikir Hanna Tekle.mp3',
        'music2.mp3': 'Audio/የፍቅርስጦታዬነህYEFKERSETOTAYNEHBEREKETTESFAYERingtone.mp3',
        'music3.mp3': 'Audio/Fikerehen.m4a'
    };

    // Play button click handler
    playBtn.addEventListener('click', function() {
        if (audioPlayer.src) {
            audioPlayer.play();
        } else {
            // Play the first song if none is selected
            const firstSong = playlistItems[0].getAttribute('data-src');
            audioPlayer.src = musicFiles[firstSong];
            audioPlayer.play();
            playlistItems[0].classList.add('active');
        }
    });

    // Pause button click handler
    pauseBtn.addEventListener('click', function() {
        audioPlayer.pause();
    });

    // Stop button click handler
    stopBtn.addEventListener('click', function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });

    // Playlist item click handler
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            const songSrc = this.getAttribute('data-src');
            
            // Remove active class from all items
            playlistItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Play the selected song
            audioPlayer.src = musicFiles[songSrc];
            audioPlayer.play();
        });
    });

    // Update active playlist item when song ends
    audioPlayer.addEventListener('ended', function() {
        const currentItem = document.querySelector('.playlist ul li.active');
        if (currentItem) {
            currentItem.classList.remove('active');
            const nextItem = currentItem.nextElementSibling || playlistItems[0];
            nextItem.classList.add('active');
            const nextSong = nextItem.getAttribute('data-src');
            audioPlayer.src = musicFiles[nextSong];
            audioPlayer.play();
        }
    });

    // Memory carousel auto-scroll
    const memoryCarousel = document.querySelector('.memory-carousel');
    if (memoryCarousel) {
        let scrollAmount = 0;
        const scrollMax = memoryCarousel.scrollWidth - memoryCarousel.clientWidth;
        
        function autoScroll() {
            if (scrollAmount < scrollMax) {
                scrollAmount += 1;
                memoryCarousel.scrollLeft = scrollAmount;
            } else {
                scrollAmount = 0;
                memoryCarousel.scrollLeft = 0;
            }
        }
        
        // Scroll every 30ms
        setInterval(autoScroll, 30);
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .thanks-item, .memory-item, .gallery-item, .letter, .advice-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .thanks-item, .memory-item, .gallery-item, .letter, .advice-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

