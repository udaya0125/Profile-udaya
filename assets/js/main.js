(function() {
  "use strict";

  // Selectors helper
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  // Event listener helper
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  // Close mobile menu when clicking a link
  on('click', '.navbar .nav-link', function(e) {
    let navbar = select('#navbar')
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile')
      let navbarToggle = select('.mobile-nav-toggle')
      navbarToggle.classList.toggle('bi-list')
      navbarToggle.classList.toggle('bi-x')
    }
  })

  // Smooth scroll for navigation links
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()
      
      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      
      let element = select(this.hash)
      if (element) {
        let header = select('#header')
        let offset = header.offsetHeight
        let elementPosition = element.offsetTop - offset
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }
  })

  // Header scroll effect
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    window.addEventListener('scroll', headerScrolled)
  }

  // Back to top button
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    window.addEventListener('scroll', toggleBacktotop)
  }

  // Typed.js initialization
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    })
  }

  // Portfolio isotope and filter
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container')
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      })

      let portfolioFilters = select('#portfolio-filters li', true)

      on('click', '#portfolio-filters li', function(e) {
        e.preventDefault()
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active')
        })
        this.classList.add('filter-active')

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        })
      }, true)
    }
  })

  // Portfolio lightbox
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  })

  // Skills animation on scroll
  const skillItems = select('.skill-item', true)
  const animateSkills = () => {
    skillItems.forEach(skill => {
      const progressBar = skill.querySelector('.progress-bar')
      const width = progressBar.style.width
      progressBar.style.width = '0'
      
      setTimeout(() => {
        progressBar.style.width = width
      }, 300)
    })
  }

  // Initialize skills animation when in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills()
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  const skillsSection = select('#skills')
  if (skillsSection) {
    observer.observe(skillsSection)
  }

  // Form submission handling
  const contactForm = select('.php-email-form')
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault()
      
      // Simple validation
      const formData = new FormData(this)
      let valid = true
      
      // Check required fields
      for (let [key, value] of formData.entries()) {
        if (value.trim() === '') {
          valid = false
          break
        }
      }
      
      if (valid) {
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show a success message
        alert('Thank you! Your message has been sent. I will get back to you soon!')
        this.reset()
      } else {
        alert('Please fill in all required fields.')
      }
    })
  }
})()
