window.addEventListener('resize', function () {
  // const logo = document.querySelector('.logo-container')
  const header = document.querySelector('header')
  const menu = document.querySelector('.menu-container')
  // const background = document.querySelector('.background-position')
  const width = window.innerWidth
  // const height = window.innerHeight
  if (width < 900) { // Change 600 to your desired breakpoint
    menu.style.display = 'none'
    header.style.margin = '5vh 0 0 0'
  } else {
    // Reset styles for larger screens
    menu.style.display = 'block'
    header.style.margin = '3vh 0 0 0'
  }
})
