const container = document.querySelector('.animate-container');
const servicesSection = document.querySelector('.sale_section');
const aboutSection = document.querySelector('.about_section');

const options = {
    threshold: 0.2, // Trigger when 20% of the section is visible
    rootMargin: '0px' // No margin
};

// Create observer for the services section
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animate class when services section is visible
            container.classList.add('animate');
        } else {
            // Check if about section is not in view before removing
            const aboutRect = aboutSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Only remove animate class if about section is completely out of view
            if (aboutRect.bottom < 0 || aboutRect.top > windowHeight) {
                container.classList.remove('animate');
            }
        }
    });
}, options);

// Create observer for the about section
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Keep animation active while about section is in view
        if (!entry.isIntersecting) {
            // Remove animate class only when about section is completely out of view
            container.classList.remove('animate');
        }
    });
}, {
    threshold: 0, // Trigger as soon as section enters/exits view
    rootMargin: '0px'
});

// Observe sections
if (servicesSection) {
    servicesObserver.observe(servicesSection);
}
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Optional: Add animate class on load if section is already in view
document.addEventListener('DOMContentLoaded', () => {
    const rect = servicesSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top >= 0 && rect.bottom <= windowHeight) {
        container.classList.add('animate');
    }
});





// document.addEventListener('DOMContentLoaded', () => {
//     const track = document.querySelector('.carousel-track');
//     const slides = Array.from(document.querySelectorAll('.carousel-slide'));
//     const prevBtn = document.querySelector('.carousel-btn.prev');
//     const nextBtn = document.querySelector('.carousel-btn.next');
//     const slideCount = slides.length;
//     let currentIndex = 0;
//     let autoScrollInterval;
    
//     const updateCarousel = () => {
//       const offset = -currentIndex * 100; // Each slide takes 100% width
//       track.style.transform = `translateX(${offset}%)`;
//     };
  
//     const goToSlide = (index) => {
//       currentIndex = index;
//       if (currentIndex < 0) currentIndex = slideCount - 1;
//       if (currentIndex >= slideCount) currentIndex = 0;
//       updateCarousel();
//     };
  
//     const startAutoScroll = () => {
//       autoScrollInterval = setInterval(() => {
//         goToSlide(currentIndex + 1);
//       }, 3000);
//     };
  
//     const stopAutoScroll = () => {
//       clearInterval(autoScrollInterval);
//     };
  
//     nextBtn.addEventListener('click', () => {
//       stopAutoScroll();
//       goToSlide(currentIndex + 1);
//       startAutoScroll();
//     });
  
//     prevBtn.addEventListener('click', () => {
//       stopAutoScroll();
//       goToSlide(currentIndex - 1);
//       startAutoScroll();
//     });
  
//     // Pause auto-scroll on hover over the carousel container
//     document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoScroll);
//     document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoScroll);
  
//     startAutoScroll();
//   });
  

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoScrollInterval;
    
    // Duplicate slides to create a seamless infinite effect
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    const updateCarousel = () => {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    const moveToNext = () => {
        currentIndex++;
        updateCarousel();

        setTimeout(() => {
            if (currentIndex >= totalSlides) {
                track.style.transition = 'none';
                currentIndex = 0;
                updateCarousel();
            }
        }, 500);
    };

    const moveToPrev = () => {
        if (currentIndex === 0) {
            track.style.transition = 'none';
            currentIndex = totalSlides - 1;
            updateCarousel();
        }
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
            currentIndex--;
            updateCarousel();
        }, 10);
    };

    // Auto-scroll functionality
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(moveToNext, 3000);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    document.querySelector('.carousel-btn.next').addEventListener('click', () => {
        stopAutoScroll();
        moveToNext();
        startAutoScroll();
    });

    document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
        stopAutoScroll();
        moveToPrev();
        startAutoScroll();
    });

    document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoScroll);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoScroll);

    updateCarousel();
    startAutoScroll();
});


function getSlidesPerView() {
    if (window.innerWidth >= 1200) return 3.7;
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2.5;
    if (window.innerWidth >= 576) return 2;
    if (window.innerWidth >= 360) return 3.3;
    return 1;
  }





(function () {
    emailjs.init("iWGLpZZsAj-s6VMuc"); // Replace with your EmailJS Public Key
})();

document.addEventListener("DOMContentLoaded", function () {
    let selectedServices = []; // Store selected services

    // Handle multiple service selection
    document.querySelectorAll(".service-option").forEach(option => {
        option.addEventListener("click", function () {
            const service = this.getAttribute("data-service");

            // Toggle selection
            if (selectedServices.includes(service)) {
                selectedServices = selectedServices.filter(s => s !== service);
                this.classList.remove("selected");
            } else {
                selectedServices.push(service);
                this.classList.add("selected");
            }
        });
    });

    // Handle form submission
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form refresh

        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var message = document.getElementById("message").value;

        if (selectedServices.length === 0) {
            alert("Please select at least one service before submitting.");
            return;
        }

        var templateParams = {
            subject: "New Service Inquiry",
            name: name,
            phone: phone,
            service: selectedServices.join(", "), // Convert array to a string
            message: message
        };

        emailjs.send("service_3fl3pzq", "template_uzq8iyp", templateParams) // Replace template_xxxxxxx
            .then(function (response) {
                alert("Message Sent Successfully ✅");
                document.getElementById("contact-form").reset();
                selectedServices = [];
                document.querySelectorAll(".service-option").forEach(opt => opt.classList.remove("selected"));
            }, function (error) {
                alert("Error Sending Message ❌: " + error.text);
            });
    });
});
