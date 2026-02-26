window.onload = function() {
    window.scrollTo(0, 0);
}

$(document).ready(function () {
    //Owl
    $('.hero-slider').owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        navText: ['PREV', 'NEXT'],
        smartSpeed: 1000,
        autoplay: true,
        autoplayTimeout: 7000,
        responsive: {
            0: {
                nav: false,
            },
            768: {
                nav: true,
            }
        }
    })

    $('#projects-slider').owlCarousel({
        loop: true,
        nav: false,
        items: 2,
        dots: true,
        smartSpeed: 600,
        center: true,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2,
                margin: 8,
            }
        }
    })

    $('.reviews-slider').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        smartSpeed: 900,
        items: 1,
        margin: 24,
        autoplay: true,
        autoplayTimeout: 9000,
    });

    // Highlight active nav link based on current path
    var path = window.location.pathname.split("/").pop() || "index.php";
    $('.navbar-nav .nav-link').each(function () {
        var href = $(this).attr('href');
        if (href === path) {
            $(this).addClass('active');
        }
    });

    // Smooth in-page scroll for same-page anchors
    $('.navbar-nav .nav-link[href^="#"], a.btn[href^="#"]').on('click', function (e) {
        var targetId = $(this).attr('href');
        var target = $(targetId);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 600);
        }
    });
});

document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const firstname = document.getElementById("first-name").value;
    const lastname = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, message })
    });

    const result = await response.json();
    alert(result.message);
});

