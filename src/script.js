document.addEventListener('DOMContentLoaded', () => {
  // Fade in elements when page loads
  const fadeInElements = () => {
    const header = document.querySelector('header');
    const gallery = document.querySelector('.gallery');
    const footer = document.querySelector('footer');
    
    setTimeout(() => header.classList.add('visible'), 100);
    setTimeout(() => gallery.classList.add('visible'), 300);
    setTimeout(() => footer.classList.add('visible'), 500);
  };
  
  // Handle iframe loading
  const handleIframes = () => {
    const iframes = document.querySelectorAll('iframe');
    const containers = document.querySelectorAll('.iframe-container');
    
    containers.forEach((container, index) => {
      // Add loading indicator
      const loader = document.createElement('div');
      loader.classList.add('loader');
      container.appendChild(loader);
      
      // Add small expand button in the corner
      const expandButton = document.createElement('a');
      expandButton.href = iframes[index].src;
      expandButton.target = '_blank';
      expandButton.rel = 'noopener noreferrer';
      expandButton.classList.add('expand-button');
      expandButton.title = 'Open in new window';
      expandButton.innerHTML = `
        <svg class="expand-icon" viewBox="0 0 24 24">
          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      `;
      container.appendChild(expandButton);
      
      // Set iframe attributes for better loading - just like in portfolio
      iframes[index].loading = 'lazy';
      iframes[index].allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      
      // Handle iframe load event
      iframes[index].addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
        iframes[index].style.opacity = '1';
      });
      
      // Handle iframe error
      iframes[index].addEventListener('error', () => {
        loader.innerHTML = 'Failed to load site preview';
        loader.classList.add('error');
      });
    });
  };
  
  // Initialize resizable functionality
  const initResizable = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      // Save original dimensions for reset
      const originalWidth = item.offsetWidth;
      const originalHeight = item.offsetHeight;
      
      // Add reset button
      const resetButton = document.createElement('button');
      resetButton.classList.add('reset-size-button');
      resetButton.title = 'Reset size';
      resetButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M4 4h16v16H4z" fill="none" stroke="white" stroke-width="2" />
        </svg>
      `;
      item.appendChild(resetButton);
      
      // Initially hide the reset button
      resetButton.style.display = 'none';
      
      // Reset size when clicked
      resetButton.addEventListener('click', (e) => {
        e.stopPropagation();
        item.style.width = originalWidth + 'px';
        item.style.height = originalHeight + 'px';
        updateIframeSize(item);
        // Hide the reset button after resetting
        resetButton.style.display = 'none';
      });
      
      // Function to update iframe size
      const updateIframeSize = (galleryItem) => {
        const iframe = galleryItem.querySelector('iframe');
        const container = galleryItem.querySelector('.iframe-container');
        const siteInfo = galleryItem.querySelector('.site-info');
        const resetBtn = galleryItem.querySelector('.reset-size-button');
        
        if (iframe && container) {
          // Calculate the available height for the iframe container
          // Total height minus the site info section height
          const availableHeight = galleryItem.offsetHeight - siteInfo.offsetHeight;
          
          // Set the container height
          container.style.height = Math.max(250, availableHeight) + 'px';
          
          // Show reset button only if dimensions changed from original
          if (resetBtn && (galleryItem.offsetWidth !== originalWidth || galleryItem.offsetHeight !== originalHeight)) {
            resetBtn.style.display = 'flex';
          } else if (resetBtn) {
            resetBtn.style.display = 'none';
          }
        }
      };
      
      // Add resize observer to adjust iframe content
      const resizeObserver = new ResizeObserver(() => {
        updateIframeSize(item);
      });
      
      resizeObserver.observe(item);
      
      // Initialize the iframe sizes
      updateIframeSize(item);
    });
  };
  
  // Initialize animations for gradient background
  const initGradientAnimation = () => {
    const gradientBg = document.querySelector('.gradient-bg');
    
    // Add slight movement on mouse move
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      gradientBg.style.backgroundPosition = `${mouseX * 100}% ${mouseY * 100}%`;
    });
  };
  
  // Add scroll reveal animations
  const initScrollReveal = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    galleryItems.forEach(item => {
      observer.observe(item);
    });
  };
  
  // Add styles dynamically
  const addStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      header, .gallery, footer {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      header.visible, .gallery.visible, footer.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .loader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        transition: opacity 0.5s ease;
        z-index: 1;
      }
      
      .loader::after {
        content: '';
        width: 30px;
        height: 30px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 0.8s ease infinite;
      }
      
      .loader.error {
        background: rgba(200, 0, 0, 0.7);
        padding: 20px;
        text-align: center;
      }
      
      .loader.error::after {
        display: none;
      }
      
      iframe {
        opacity: 0;
        transition: opacity 0.5s ease;
        border: none;
        width: 100%;
        height: 100%;
      }
      
      .expand-button {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 24px;
        height: 24px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: background 0.2s ease;
        cursor: pointer;
      }
      
      .expand-button:hover {
        background: var(--accent-color);
      }
      
      .expand-icon {
        width: 16px;
        height: 16px;
        stroke: white;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }
      
      .reset-size-button {
        position: absolute;
        top: 8px;
        right: 40px;
        width: 24px;
        height: 24px;
        background: rgba(0, 0, 0, 0.6);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: background 0.2s ease;
        cursor: pointer;
      }
      
      .reset-size-button:hover {
        background: var(--accent-color);
      }
      
      .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
      }
      
      .gallery-item.revealed {
        opacity: 1;
        transform: translateY(0);
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  };
  
  // Initialize everything
  addStyles();
  fadeInElements();
  handleIframes();
  initGradientAnimation();
  initScrollReveal();
  initResizable();
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Implement fullscreen functionality if needed
  }
}); 