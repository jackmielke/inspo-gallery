document.addEventListener('DOMContentLoaded', () => {
  // Website preview data - screenshots and info
  const sitePreviewData = {
    'kino.ai': {
      image: 'https://i.imgur.com/EbTFrht.jpg',
      color: '#3da8e0'
    },
    'jzhao.xyz': {
      image: 'https://i.imgur.com/SLPpz90.jpg',
      color: '#eeeeee'
    },
    'roadtrip.guilhermelucas.com': {
      image: 'https://i.imgur.com/2rkhJ2w.jpg',
      color: '#ffd700'
    },
    'bruno-simon.com': {
      image: 'https://i.imgur.com/BX0Qcqm.jpg',
      color: '#222222'
    },
    'steventenholder.com': {
      image: 'https://i.imgur.com/zzb9M4x.jpg',
      color: '#ff4470'
    },
    'michaeldemar.co': {
      image: 'https://i.imgur.com/YTnkCZI.jpg',
      color: '#333333'
    },
    'ansonyu.me': {
      image: 'https://i.imgur.com/EHs3ULp.jpg',
      color: '#444444'
    },
    'hudzah.com': {
      image: 'https://i.imgur.com/Nxh0YPY.jpg',
      color: '#ff5900'
    },
    'patrickhuang.co': {
      image: 'https://i.imgur.com/ky1pMJ7.jpg',
      color: '#f5f5f5'
    },
    'eriktorenberg.com': {
      image: 'https://i.imgur.com/x7BdQQ7.jpg',
      color: '#f8f8f8'
    },
    'zoeloefstok.com': {
      image: 'https://i.imgur.com/fXR8OwS.jpg',
      color: '#d4c1b4'
    },
    'kelvinzhang.com': {
      image: 'https://i.imgur.com/m0PeHPt.jpg', 
      color: '#222222'
    },
    'socratica.info': {
      image: 'https://i.imgur.com/q1QqH1C.jpg',
      color: '#121212'
    },
    'donaldjewkes.com': {
      image: 'https://i.imgur.com/lY9i1eZ.jpg',
      color: '#eeeeee'
    }
  };

  // Theme toggle functionality
  const initThemeToggle = () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  };

  // Fade in elements when page loads
  const fadeInElements = () => {
    const header = document.querySelector('header');
    const gallery = document.querySelector('.gallery');
    const footer = document.querySelector('footer');
    
    setTimeout(() => header.classList.add('visible'), 100);
    setTimeout(() => gallery.classList.add('visible'), 300);
    setTimeout(() => footer.classList.add('visible'), 500);
  };
  
  // Handle load more button functionality
  const initLoadMore = () => {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenSites = document.querySelector('.hidden-sites');
    
    if (!loadMoreBtn || !hiddenSites) return;
    
    loadMoreBtn.addEventListener('click', () => {
      // Add loading state
      loadMoreBtn.classList.add('loading');
      loadMoreBtn.innerHTML = `
        <span>Loading...</span>
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      
      // Show the hidden sites with a fade-in effect
      setTimeout(() => {
        // Display the hidden container
        hiddenSites.style.display = 'grid';
        
        // Get all hidden iframes
        const hiddenIframes = hiddenSites.querySelectorAll('iframe[data-src]');
        
        // Load each iframe with a slight delay between them
        hiddenIframes.forEach((iframe, index) => {
          const container = iframe.closest('.iframe-container');
          
          // Add loading indicator
          const loader = document.createElement('div');
          loader.classList.add('loader');
          container.appendChild(loader);
          
          // Load iframe after a staggered delay
          setTimeout(() => {
            // Set the actual src from data-src
            iframe.src = iframe.getAttribute('data-src');
            
            // Set iframe attributes for better loading
            iframe.loading = 'lazy';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            
            // Handle iframe load event
            iframe.addEventListener('load', () => {
              loader.style.opacity = '0';
              iframe.style.opacity = '1';
              setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
              }, 500);
            });
            
            // Handle iframe error
            iframe.addEventListener('error', () => {
              loader.innerHTML = 'Failed to load site preview';
              loader.classList.add('error');
            });
            
            // Add expand button
            const expandButton = document.createElement('a');
            expandButton.href = iframe.getAttribute('data-src');
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
          }, index * 150); // Stagger loading
        });
        
        // Create a reveal effect for the gallery items
        const galleryItems = hiddenSites.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(30px)';
          
          setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100 + index * 100);
        });
        
        // Hide the button with a fade-out effect
        setTimeout(() => {
          loadMoreBtn.style.opacity = '0';
          loadMoreBtn.style.transform = 'translateY(20px)';
          setTimeout(() => {
            loadMoreBtn.parentNode.style.display = 'none';
          }, 500);
        }, 500);
      }, 800); // Add a delay for effect
    });
  };
  
  // Handle iframe loading - only for initial sites
  const handleIframes = () => {
    // Only handle the first 4 iframes that are initially visible
    const visibleIframes = document.querySelectorAll('.gallery > .gallery-item:not(.hidden-sites .gallery-item) iframe');
    const containers = document.querySelectorAll('.gallery > .gallery-item:not(.hidden-sites .gallery-item) .iframe-container');
    
    containers.forEach((container, index) => {
      if (index >= visibleIframes.length) return;
      
      // Add loading indicator
      const loader = document.createElement('div');
      loader.classList.add('loader');
      container.appendChild(loader);
      
      const iframe = visibleIframes[index];
      
      // Add small expand button in the corner
      const expandButton = document.createElement('a');
      expandButton.href = iframe.src;
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
      
      // Set iframe attributes for better loading
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      
      // Handle iframe load event
      iframe.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 500);
        iframe.style.opacity = '1';
      });
      
      // Handle iframe error
      iframe.addEventListener('error', () => {
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
    const galleryItems = document.querySelectorAll('.gallery > .gallery-item:not(.hidden-sites .gallery-item)');
    
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
  initThemeToggle();
  fadeInElements();
  handleIframes();
  initGradientAnimation();
  initScrollReveal();
  initResizable();
  initLoadMore();  // Initialize the load more functionality
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Implement fullscreen functionality if needed
  }
  
  // Toggle theme with 'T' key for accessibility
  if (e.key === 't' || e.key === 'T') {
    document.getElementById('theme-toggle-btn').click();
  }
  
  // Load more sites with 'L' key
  if (e.key === 'l' || e.key === 'L') {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn && window.getComputedStyle(loadMoreBtn).display !== 'none') {
      loadMoreBtn.click();
    }
  }
}); 