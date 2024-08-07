document.addEventListener('DOMContentLoaded', function () {
  const imageContainer = document.getElementById('imageContainer')
  const viewImgButton = document.getElementById('viewImg')

  const images = [
    './assets/images/WaterImg1.jpg',
    './assets/images/WaterImg3.png',
    './assets/images/WaterImg4.jpg',
    './assets/images/WaterImg5.png',
    './assets/images/WaterImg6.jpg',
    './assets/images/WaterImg2.jpg',
    './assets/images/WaterImg7.jpg',
    './assets/images/WaterImg8.jpg',
    './assets/images/WaterImg9.jpg',
    './assets/images/WaterImg10.jpg',
    './assets/images/WaterImg11.jpg',
    './assets/images/WaterImg12.jpg',
    './assets/images/WaterImg13.jpg',
  ]

  let initialCount = window.innerWidth >= 768 ? 8 : 4

  function createImageDiv(src) {
    const div = document.createElement('div')
    div.className =
      'group cursor-pointer hover:bg-gradient-to-b from-transparent to-black transition-all duration-200'
    const img = document.createElement('img')
    img.src = src
    img.className = 'object-cover group-hover:opacity-75 aspect-square'
    div.appendChild(img)
    return div
  }

  function loadImages(count) {
    imageContainer.innerHTML = '' // Clear current images
    for (let i = 0; i < count; i++) {
      if (i < images.length) {
        imageContainer.appendChild(createImageDiv(images[i]))
      }
    }
  }

  function loadAdditionalImages() {
    for (let i = initialCount; i < images.length; i++) {
      if (!document.querySelector(`img[src="${images[i]}"]`)) {
        // Avoid adding duplicates
        imageContainer.appendChild(createImageDiv(images[i]))
      }
    }
  }

  function hideAdditionalImages() {
    const children = Array.from(imageContainer.children)
    for (let i = initialCount; i < children.length; i++) {
      imageContainer.removeChild(children[i])
    }
  }

  function updateImages() {
    const newInitialCount = window.innerWidth >= 768 ? 8 : 4
    if (newInitialCount !== initialCount) {
      initialCount = newInitialCount
      loadImages(initialCount) // Reload initial set based on current screen size
      viewImgButton.textContent = 'View more' // Reset button text
    }
  }

  viewImgButton.addEventListener('click', function () {
    const isViewMore = this.textContent === 'View more'

    if (isViewMore) {
      loadAdditionalImages()
      this.textContent = 'View less'
    } else {
      hideAdditionalImages()
      this.textContent = 'View more'
    }
  })

  // Initial load
  loadImages(initialCount)

  // Handle resize event to adjust images and button text accordingly
  window.addEventListener('resize', function () {
    updateImages()
  })
})
