window.addEventListener('resize', function() {
    const logo = document.querySelector('.imagenLogo');
    const logoImg = document.querySelector('.imagenLogo img');
    const form = document.querySelector('.form');
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < 1100) { // Change 600 to your desired breakpoint
        logo.style.position = 'absolute';
        logo.style.top = '10px'; // Adjust as needed
        logo.style.left = '50%';
        logo.style.transform = 'translateX(-50%)';
        logoImg.style.width = '40vw';
    } else {
        // Reset styles for larger screens
        logo.style.position = '';
        logo.style.top = '';
        logo.style.left = '5vw';
        logo.style.transform = '';
        logoImg.style.width = '10vw';
    }
    if (height > 1080) { // Change 600 to your desired breakpoint
        form.style.height = '40vh';

    }else {
        form.style.height = '50vh';
    }
    if (width < 1100) { // Change 600 to your desired breakpoint
        form.style.width = '70vw';
    }else {
        form.style.width = '20vw';
    }
})
