/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 500
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

    // Store project details in a dictionary

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".details-link").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent default navigation
                const projectId = this.getAttribute("data-id"); // Get project ID
                localStorage.setItem("selectedProject", projectId); // Store in localStorage
                window.location.href = "portfolio-details.html"; // Navigate manually
            });
        });
    });


    const projectData = {
        "app1": {
            title: "Project 1",
            image: "assets/img/portfolio/app-1.jpg",
            heading: "Bulky Book - Advanced ASP.NET Core E-Commerce Application",
            description: "This project is a full-featured e-commerce web application built using ASP.NET Core MVC, following industry-standard best practices such as the Repository Pattern and N-Tier Architecture. The application allows customers to browse products, add them to the cart, and complete transactions securely using Stripe payment integration. Admins can manage orders, process transactions, and oversee user authentication using Identity Framework, including Google and Facebook login. Additional features include email notifications, session management, data seeding, and deployment to Microsoft Azure. This project is perfect for developers looking to build a scalable and secure ASP.NET Core application with real-world functionalities.",
            category: "Online Shopping & Order Management System",
            date: "April, 2025",
            url: "https://github.com/Abanoub756/Bulky_MVC"
        },
        "app2": {
            title: "Project 2",
            image: "assets/img/portfolio/app-2.jpg",
            heading: "Student Registration System with Tkinter and SQL Server",
            description: "This is a Python-based student registration system using Tkinter for the graphical user interface (GUI) and SQL Server for database management. The system allows users to add, update, delete, and search student records efficiently. It features an intuitive interface with form inputs, control buttons, and a search functionality for easy student data management.",
            category: "Database Management System with GUI",
            date: "October, 2024",
            url: "https://github.com/Abanoub756/School-Administration"
        },
        "app3": {
            title: "Project 3",
            image: "assets/img/portfolio/app-3.jpg",
            heading: "LEON - Minimal & Creative Agency Website",
            description: "LEON is a modern and minimalistic web template designed for creative agencies, freelancers, and businesses. It features a sleek design with sections for services, portfolio, about, and contact. The website is fully responsive, ensuring a smooth user experience across all devices. With clean typography, well-structured content, and engaging visuals, LEON provides an excellent foundation for building a professional online presence.",
            category: "Web Development / Frontend Development / Portfolio Website",
            date: "January, 2024",
            url: "https://abanoub756.github.io/LEON/"
        }
    };


    // Load project details on the portfolio-details page
    if (window.location.pathname.includes("portfolio-details.html")) {
        document.addEventListener('DOMContentLoaded', () => {
            const projectId = localStorage.getItem('selectedProject');
            if (projectData[projectId]) {
                const project = projectData[projectId];
                document.getElementById('project-title').textContent = project.title;
                document.getElementById('project-image').src = project.image;
                document.getElementById('project-heading').textContent = project.heading;
                document.getElementById('project-description').textContent = project.description;
                document.getElementById('project-category').textContent = project.category;
                document.getElementById('project-date').textContent = project.date;
                document.getElementById('project-url').textContent = project.url;
                document.getElementById('project-url').href = project.url;
            } else {
                document.getElementById('project-title').textContent = "Project Not Found";
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        const serviceTitle = document.getElementById("service-title");
        const serviceDescription = document.getElementById("service-description");
        const serviceLinks = document.querySelectorAll(".services-list a");

        // Service descriptions
        const services = {
            "Service1": {
                title: "Custom Website Development",
                description: "We build high-quality, custom websites tailored to your business needs, ensuring a modern, scalable, and user-friendly experience."
            },
            "Service2": {
                title: "Frontend Development",
                description: "Crafting engaging user interfaces with the latest frontend technologies, ensuring speed, responsiveness, and a seamless user experience."
            },
            "Service3": {
                title: "Portfolio & Resume Websites",
                description: "Showcase your skills and achievements with a professionally designed portfolio or resume website, customized for your personal brand."
            },
            "Service4": {
                title: "Mobile & Responsive Design",
                description: "Optimizing websites for mobile and all screen sizes, ensuring a consistent and visually appealing experience across devices."
            },
            "Service5": {
                title: "Basic Database Integration",
                description: "Adding simple database functionalities to your website, enabling data storage, retrieval, and basic management solutions."
            }
        };

        // Function to update service details
        function updateServiceDetails(serviceKey) {
            if (services[serviceKey]) {
                serviceTitle.textContent = services[serviceKey].title;
                serviceDescription.textContent = services[serviceKey].description;
                // Update URL without reloading
                history.pushState(null, "", `?service=${serviceKey}`);
            }
        }

        // Get service from URL (if present)
        const params = new URLSearchParams(window.location.search);
        const serviceKey = params.get("service");
        if (serviceKey && services[serviceKey]) {
            updateServiceDetails(serviceKey);
        }

        // Add click event to each link
        serviceLinks.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent full page reload
                const serviceKey = this.getAttribute("data-service");
                updateServiceDetails(serviceKey);
            });
        });

        // Handle back/forward navigation
        window.addEventListener("popstate", function () {
            const params = new URLSearchParams(window.location.search);
            const serviceKey = params.get("service");
            if (serviceKey && services[serviceKey]) {
                updateServiceDetails(serviceKey);
            }
        });
    });

    //Mail service 


    //document.addEventListener("DOMContentLoaded", function () {
    //    const form = document.getElementById("contact-form");
    //    const loading = document.querySelector(".loading");
    //    const errorMessage = document.querySelector(".error-message");
    //    const sentMessage = document.querySelector(".sent-message");

    //    form.addEventListener("submit", function (event) {
    //        event.preventDefault(); // Prevent page reload

    //        // Show loading message and hide others
    //        loading.style.display = "block";
    //        errorMessage.style.display = "none";
    //        sentMessage.style.display = "none";

    //        emailjs.sendForm("service_bjk0blr", "template_vp1frte", this)
    //            .then(() => {
    //                loading.style.display = "none"; // Hide loading
    //                sentMessage.style.display = "block"; // Show success message
    //                form.reset(); // Reset the form after successful submission
    //            })
    //            .catch((error) => {
    //                loading.style.display = "none"; // Hide loading
    //                errorMessage.textContent = "Failed to send message. Please try again.";
    //                errorMessage.style.display = "block"; // Show error message
    //                console.error("EmailJS Error:", error);
    //            });
    //    });
    //});


    // emailjs.sendForm("service_bjk0blr", "template_vp1frte", this)


  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();