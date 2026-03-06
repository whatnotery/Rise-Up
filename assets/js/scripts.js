const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const isHomepage = document.body.dataset.isHomepage === "true";

// Mobile header elements
const mobileHeader = document.getElementById("mobileHeader");
const mobileHeaderContainer = document.getElementById("mobileHeaderContainer");
const mobileHeaderImage = document.getElementById("mobileHeaderImage");
const mobilePageTitle = document.getElementById("mobilePageTitle");
const headerGradient = document.getElementById("headerGradient");

function openSidebar() {
  sidebar.classList.remove("-translate-x-full");
  sidebar.classList.remove("hidden");
  main.classList.add("hidden");
  if (overlay) overlay.classList.remove("hidden");
  if (menuButton) menuButton.classList.add("hidden");
  if (closeButton) closeButton.classList.remove("hidden");
}

function closeSidebar() {
  sidebar.classList.add("-translate-x-full");
  sidebar.classList.add("hidden");
  main.classList.remove("hidden");
  if (overlay) overlay.classList.add("hidden");
  if (menuButton) menuButton.classList.remove("hidden");
  if (closeButton) closeButton.classList.add("hidden");
}

// Calculate and set sticky title position
// Calculate and set sticky title position
function setStickyTitlePosition() {
  if (window.innerWidth >= 768 || !mobilePageTitle || !mobileHeader) return;

  // Calculate logo header height
  const logoHeaderHeight = mobileHeader.offsetHeight;

  // Ensure title has sticky positioning
  mobilePageTitle.style.position = 'sticky';
  mobilePageTitle.style.top = `${logoHeaderHeight}px`;
  mobilePageTitle.style.zIndex = '20';
  mobilePageTitle.style.backgroundColor = '#000';

  // Calculate title's initial position
  const titleRect = mobilePageTitle.getBoundingClientRect();
  const titleTopFromDocument = titleRect.top + window.scrollY;

  // Add small buffer to ensure title starts below sticky threshold
  const buffer = 10;
  if (titleTopFromDocument <= logoHeaderHeight + buffer) {
    // Title is too close to threshold - push it down initially
    const neededMargin = (logoHeaderHeight + buffer) - titleTopFromDocument;
    mobilePageTitle.style.marginTop = `${neededMargin}px`;
  } else {
    // Reset margin if previously set
    mobilePageTitle.style.marginTop = '';
  }
}

function handleMobileScroll() {
  if (window.innerWidth >= 768) return; // Only on mobile

  const scrollY = window.scrollY;
  const headerImageHeight = mobileHeaderImage ? mobileHeaderImage.offsetHeight : 0;

  // Slide up and fade out header image with gradient
  if (mobileHeaderContainer && mobileHeaderImage) {
    // Calculate how much to slide up (max 100% of image height)
    const slideAmount = Math.min(scrollY * 0.7, headerImageHeight);

    // Apply slide-up transform
    mobileHeaderContainer.style.transform = `translateY(-${slideAmount}px)`;

    // Calculate fade progress
    const fadeProgress = Math.min(scrollY / (headerImageHeight * 0.8), 1);

    // Apply opacity to image (fade out completely when scrolled 80% of image height)
    const imageOpacity = Math.max(0, 1 - (fadeProgress * 1.2));
    mobileHeaderImage.style.opacity = imageOpacity;

    // Apply opacity to gradient overlay (fade in as image fades out)
    if (headerGradient) {
      const gradientOpacity = Math.min(1, fadeProgress * 1.5);
      headerGradient.style.opacity = gradientOpacity;
    }
  }

  // Add shadow to sticky header when scrolled
  if (mobileHeader) {
    if (scrollY > 10) {
      mobileHeader.classList.add("shadow-lg");
    } else {
      mobileHeader.classList.remove("shadow-lg");
    }
  }
}
// Reset header position on resize
function resetHeaderPosition() {
  if (window.innerWidth >= 768) {
    // Reset mobile header effects on desktop
    if (mobileHeaderContainer) {
      mobileHeaderContainer.style.transform = 'translateY(0)';
    }
    if (mobileHeaderImage) {
      mobileHeaderImage.style.opacity = '1';
    }
    if (headerGradient) {
      headerGradient.style.opacity = '0';
    }
  } else {
    // On mobile, reset to initial state
    if (mobileHeaderContainer) {
      mobileHeaderContainer.style.transform = 'translateY(0)';
    }
    if (mobileHeaderImage) {
      mobileHeaderImage.style.opacity = '1';
    }
    if (headerGradient) {
      headerGradient.style.opacity = '0';
    }
  }
}

if (isHomepage && window.innerWidth < 768) openSidebar();
if (window.innerWidth > 768) closeSidebar();
if (closeButton) closeButton.classList.add("hidden");

if (menuButton) menuButton.addEventListener("click", openSidebar);
if (closeButton) closeButton.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeSidebar();
    resetHeaderPosition();
  }
  if (window.innerWidth <= 768 && isHomepage) {
    openSidebar();
  }
  // Recalculate on resize
  setTimeout(() => {
    setStickyTitlePosition();
    handleMobileScroll();
  }, 100);
});

// Add scroll event listener for mobile header effects
window.addEventListener("scroll", handleMobileScroll);

// Initialize on load
window.addEventListener("load", () => {
  // Wait for images to load before calculating heights
  setTimeout(() => {
    setStickyTitlePosition();
    handleMobileScroll();
    resetHeaderPosition();
  }, 300);
});

// Also run on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  setStickyTitlePosition();
  handleMobileScroll();
});
