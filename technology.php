<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->

<head>
        <title>Supershyft BIO‑AI Technology | Reveal Your True Biological Age</title>
        <meta name="description" content="Discover Supershyft's clinically validated BIO AI Technology—analyzing metabolic risk profiles with 93.2% accuracy to reveal your true biological age and unlock longevity potential.">

        <!-- Open Graph -->
        <meta property="og:title" content="Supershyft BIO‑AI Technology | True Biological Age Revealed">
        <meta property="og:description" content="Unlock your biological age with Supershyft’s advanced, clinically validated BIO AI Technology analyzing health at 93.2% accuracy.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://www.supershyft.com/technology.php">
        <meta property="og:image" content="https://www.supershyft.com/assets/images/our-story/super-shyft.png">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="canonical" href="https://www.supershyft.com/technology.php">
    <!-- css group start -->
    <?php include_once 'view/include_css.html'; ?>
    <!-- css group end -->

    <script>
        window.addEventListener("load", function () {
            if (screen.width <= 992) {
                var deskVideos = document.querySelectorAll(
                    ".bs-banner .desk-video"
                );
                deskVideos.forEach(function (video) {
                    video.remove();
                });
            } else {
                var mobVideos = document.querySelectorAll(
                    ".bs-banner .mobile-video"
                );
                mobVideos.forEach(function (video) {
                    video.remove();
                });
            }
        });
    </script>
    
    <!-- Fix for Science Section boxes visibility -->
    <style>
        /* Force ALL boxes in science section to be visible - override global .box { opacity: 0 !important } */
        #scienceSection .boxes .box {
            opacity: 1 !important;
            display: flex !important;
            align-items: flex-start !important;
            gap: 16px !important;
            visibility: visible !important;
        }
        
        /* Make the top headings visible */
        #scienceSection .top-box-wrapper .box {
            opacity: 1 !important;
            display: block !important;
        }
        
        /* Progress bars: start hidden for GSAP height animation */
        #scienceSection .scroll-progress-bar.green,
        #scienceSection .scroll-progress-bar.red {
            height: 0%;
            border-radius: 100px !important;
        }

        #scienceSection .scroll-progress-bar.green {
            width: 56px !important;
        }

        /* Red bar - wider and aligned without top gap */
        #scienceSection .scroll-progress-bar.red {
            margin-top: 0;
            width: 90px !important;
        }

        /* Match font sizes between green and red sections */
        #scienceSection .red-boxes .bs-para {
            font-size: 18px !important;
        }

        #scienceSection .green-boxes .bs-para {
            font-size: 18px !important;
        }
        /* Ensure all points visible in "How Supershyft works" section ON TECHNOLOGY PAGE ONLY */
        .lyt-section.typ-marketing-section:not(.step-section) .left-box {
            height: auto !important;
        }

        .lyt-section.typ-marketing-section:not(.step-section) .right-box {
            height: auto !important;
            position: relative !important;
            top: auto !important;
        }    </style>
</head>

<body>
    <!--[if lt IE 7]>
      <p class="browsehappy">
        You are using an <strong>outdated</strong> browser. Please
        <a href="#">upgrade your browser</a> to improve your experience.
      </p>
    <![endif]-->
    <!-- header start -->
    <?php include_once 'view/header.html'; ?>
    <!-- header end -->

    <main>
        <div class="bs-banner typ-technology">
            <div class="banner-layer">

                <!-- <video class="desk-video" autoplay playsinline loop muted>
          <source src="assets/video/banner.mp4" type="video/mp4" />
        </video>

        <video class="mobile-video" autoplay playsinline loop muted>
          <source src="assets/video/banner.mp4" type="video/mp4" />
        </video> -->

                <picture>
                    <source srcset="assets/images/technology/hero/bg-hero.jpg">
                    <img src="assets/images/technology/hero/bg-hero.jpg" alt="Hero" class="img-fluid">
                </picture>
                <!-- <img src="assets/images/technology/hero/bg-hero.jpg" alt="Hero" class="img-fluid"> -->

                <div class="content">
                    <div class="container h-100">
                        <div class="box-wrapper">
                            <div class="left-box">
                                <div class="bs-swiper typ-technology">
                                    <!-- Slider main container -->
                                    <div class="swiper heroSlider">
                                        <!-- Additional required wrapper -->
                                        <div class="swiper-wrapper">
                                            <!-- Slides -->
                                            <div class="swiper-slide">
                                                <div class="content-wrapper mb-lg-5 mb-4" data-aos="fade"
                                                    data-aos-delay="200">
                                                    <div class="heading mb-0">
                                                        Over <span class="heading pink mb-0">
                                                            <i>153,384</i>
                                                        </span> Individuals Have Discovered Their True Biological Age!
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div class="content-wrapper mb-lg-5 mb-4" data-aos="fade"
                                                    data-aos-delay="200">
                                                    <div>
                                                        <div class="heading typ48">
                                                            Unlock Your Longevity Potential With Supershyft
                                                        </div>
                                                        <ul class="bs-para typ20 typwhite">
                                                            <li>
                                                                Clinically Validated
                                                            </li>
                                                            <li>
                                                                Over 93.2% accuracy
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="btn-wrapper d-lg-flex d-none">
                                                        <a href="https://rzp.io/rzp/xYw6pby" target="_blank"
                                                            target="_blank" class="bs-btn">Get Supershyft
                                                            Today</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="right-box">
                                <div class="img-box">
                                    <!-- <img src="assets/images/technology/hero/cube.png" class="img-fluid" alt=""> -->
                                    <?php include_once 'components/cube.html' ?>
                                    <!-- <iframe src="components/cube-1.html" width="300" height="300" style="border:none;" scrolling="no"></iframe> -->
                                </div>
                            </div>
                        </div>
                        <div class="btn-wrapper d-lg-none d-flex justify-content-center">
                            <a href="https://rzp.io/rzp/xYw6pby" target="_blank" target="_blank" class="bs-btn">Get
                                Supershyft
                                Today</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <section class="lyt-section typ-bio-technology-section">
            <div class="container">
                <div class="row text-center mb-lg-5 mb-4" id="animatedText">
                    <div class="col-12">
                        <h3 class="bs-sub-title mb-2" data-aos="fade" data-aos-delay="200">Introducing</h3>
                        <h2 class="bs-heading typ74 mb-3" data-aos="fade" data-aos-delay="300"> Our BIO AI Technology
                        </h2>
                        <p class="bs-para l-spacing2 maxw710 mx-auto" data-aos="fade" data-aos-delay="400">Our BIO AI
                            Technology analyzes your complete metabolic disease risk profiles to reveal how fast you're
                            truly aging.</p>
                    </div>
                </div>
                <div class="system-wrapper" data-aos="fade" data-aos-delay="500">
                    <div class="approach-box mx-auto">
                        Systems Biology Approach in MetSights
                    </div>
                    <div class="lottie-wrapper">
                        <div id="bioAiTechnologyDesktop">

                        </div>
                        <div id="bioAiTechnologyMobile">

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="lyt-section typ-science-age set-bg" id="scienceSection"
            data-img="./assets/images/technology/bg-1.webp" data-mob-img="./assets/images/technology/bg-mob-1.webp">
            <div class="container">
                <div class="row text-center mb-lg-5 mb-4">
                    <div class="col-12 mb-lg-5 mb-4">
                        <h2 class="bs-heading typwhite mb-3" data-aos="fade" data-aos-delay="200">The Science of Age
                            <span class="typ-gradient">Reversal</span>
                        </h2>
                        <p class="bs-para typgrey2 l-spacing2 px-4" data-aos="fade" data-aos-delay="300">Your biological
                            age often differs significantly from
                            your calendar age—many people appear healthy while their internal systems age
                            prematurely without visible signs.</p>
                    </div>
                    <div class="col-12">
                        <h3 class="bs-heading typ30 fst-italic typwhite text-center mb-lg-5 mb-4" data-aos="fade"
                            data-aos-delay="400">
                            How Biological Age Impacts Your Longevity
                        </h3>
                        <div class="box-wrapper" data-aos="fade" data-aos-delay="500">
                            <div class="top-box-wrapper">
                                <div class="box">
                                    When Your Body Is <span class="green">Younger</span> Than Your Age
                                </div>
                                <div class="d-lg-block d-none"></div>
                                <div class="box">
                                    When Your Body Is <span class="red">Older</span> Than Your Age
                                </div>
                            </div>
                            <div class="bottom-box-wrapper">
                                <div class="green-box-wrapper">
                                    <div class="refill">
                                        <div class="scroll-progress-bar green"></div>
                                    </div>
                                    <div class="boxes green-boxes" id="scienceSectionGreen">
                                        <div class="box box-1">
                                            <div class="icon-lottie lottie-1" id="lottieG1">
                                                <!-- <img src="assets/images/technology/g1.svg" class="img-fluid" alt=""> -->
                                            </div>
                                            <h3 class="bs-para typ18 typwhite text-start">
                                                Your cells repair themselves efficiently
                                            </h3>
                                        </div>
                                        <div class="box box-2">
                                            <div class="icon-lottie lottie-1" id="lottieG2">
                                                <!-- <img src="assets/images/technology/g1.svg" class="img-fluid" alt=""> -->
                                            </div>
                                            <h3 class="bs-para typ18 typwhite text-start">
                                                Significantly lower disease risks
                                            </h3>
                                        </div>
                                        <div class="box box-3">
                                            <div class="icon-lottie lottie-1" id="lottieG3">
                                                <!-- <img src="assets/images/technology/g1.svg" class="img-fluid" alt=""> -->
                                            </div>
                                            <h3 class="bs-para typ18 typwhite text-start">
                                                Better energy and cognitive function
                                            </h3>
                                        </div>
                                        <div class="box box-4">
                                            <div class="icon-lottie lottie-1" id="lottieG4">
                                                <!-- <img src="assets/images/technology/g1.svg" class="img-fluid" alt=""> -->
                                            </div>
                                            <h3 class="bs-para typ18 typwhite text-start">
                                                More quality years of active living
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="img-box body-img">
                                    <!-- Placeholder for spacing - video removed -->
                                </div>
                                <div class="red-box-wrapper">
                                    <div class="boxes red-boxes" id="scienceSectionRed">
                                        <div class="box box-1">
                                            <h3 class="bs-para typ18 typwhite text-end">
                                                Your cells age faster than normal
                                            </h3>
                                            <div class="icon-lottie lottie-1" id="lottieR1">
                                                <!-- <img src="assets/images/technology/g1.svg" class="img-fluid" alt=""> -->
                                            </div>
                                        </div>
                                        <div class="box box-2">
                                            <h3 class="bs-para typ18 typwhite text-end">
                                                Higher risk of age-related diseases
                                            </h3>
                                            <div class="icon-lottie lottie-1" id="lottieR2">
                                                <!-- <img src="assets/images/technology/g1.svg" class="img-fluid" alt=""> -->
                                            </div>
                                        </div>
                                        <div class="box box-3">
                                            <h3 class="bs-para typ18 typwhite text-end">
                                                Decreased energy and mental clarity
                                            </h3>
                                            <div class="icon-lottie lottie-1" id="lottieR3">
                                                <!-- <img src="assets/images/technology/g1.svg" class="img-fluid" alt=""> -->
                                            </div>
                                        </div>
                                        <div class="box box-4">
                                            <h3 class="bs-para typ18 typwhite text-end">
                                                Fewer healthy, active years ahead
                                            </h3>
                                            <div class="icon-lottie lottie-1" id="lottieR4">
                                                <!-- <img src="assets/images/technology/g1.svg" class="img-fluid" alt=""> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="refill">
                                        <div class="scroll-progress-bar red">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-lg-none d-block pt-lg-0 pt-4 mobile-box-wrapper">
                                <div class="bottom-box-wrapper typ-mobile-age px-0" id="mobileScienceAgeBox">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- <section class="lyt-section typ-cards-section set-bg" data-img="./assets/images/technology/bg-2.webp"
            data-mob-img="./assets/images/technology/bg-mob-2.webp">
            <div class="container">
                <div class="row text-center mb-lg-5 mb-4">
                    <div class="col-12">
                        <h2 class="bs-heading typwhite mb-3" data-aos="fade" data-aos-delay="200">Why SuperShyft's
                            BIO AI Stands Apart?</h2>
                        <p class="bs-para typgrey2 l-spacing2">Regular health AI simply matches your data to general
                            patterns. SuperShyft is fundamentally different:</p>
                    </div>
                    <div class="bio-tech-lottie-container">

                    </div>
                </div>
                <div class="bs-grid typ-cards typ-cards-1">
                    <button class="bs-btn typ-bio typ-red mx-auto d-md-none d-block mb-5">Regular AI</button>
                    <button class="bs-btn typ-bio typ-green mx-auto d-md-none d-block mb-5">Supershyft Biology
                        AI</button>
                </div>
                <div class="bs-grid typ-cards">
                    <div class="left-box">
                        <button class="bs-btn typ-bio typ-red mx-auto d-md-block d-none mb-5">Regular AI</button>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="col-one" id="leftColumn">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="middle-box" id="cardStack">
                        <div class="image-box d-flex justify-content-center align-items-center h-100">
                            <img src="assets/images/technology/cards/middle-card.svg" class="img-fluid mx-auto" alt="">
                        </div>
                    </div>
                    <div class="right-box">
                        <button class="bs-btn typ-bio typ-green mx-auto d-md-block d-none mb-5">Supershyft Biology
                            AI</button>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="col-two" id="rightColumn">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <section class="lyt-section typ-cards-section set-bg position-relative"
            data-img="./assets/images/technology/bg-2.webp" data-mob-img="./assets/images/technology/bg-mob-2.webp">
            <div class="container">
                <div class="row text-center mb-lg-5 mb-4">
                    <div class="col-12">
                        <h2 class="bs-heading typwhite mb-3" data-aos="fade" data-aos-delay="200">Why SuperShyft's
                            BIO AI Stands Apart?</h2>
                        <p class="bs-para typgrey2 l-spacing2">Regular health AI simply matches your data to general
                            patterns. SuperShyft is fundamentally different:</p>
                    </div>
                    <div class="bio-tech-lottie-container">

                    </div>
                </div>
                <div class="bs-grid typ-cards typ-cards-1">
                    <button class="bs-btn typ-bio typ-red mx-auto d-md-none d-block mb-5">Regular AI</button>
                    <button class="bs-btn typ-bio typ-green mx-auto d-md-none d-block mb-5">Supershyft Biology
                        AI</button>
                </div>
                <?php include_once 'components/card-animation.html' ?>
            </div>
        </section>

        <section class="lyt-section">
            <div class="container">
                <div class="row text-center mb-lg-5 mb-4">
                    <div class="col-12">
                        <h2 class="bs-heading mb-3" data-aos="fade" data-aos-delay="200">Our Unique Systems Biology
                            Driven Approach</h2>
                    </div>
                </div>
                <div class="col-12">
                    <div class="bs-swiper typ-driven-approach position-relative" data-aos="fade" data-aos-delay="200">
                        <div class="swiper drivenApproachSlider">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="bs-card typ-driven-approach">
                                        <div>
                                            <div class="img-box">
                                                <!-- <img src="assets/images/technology/driven-1.png" class="img-fluid" alt=""> -->
                                                <video playsinline="" loop="" muted="" autoplay="">
                                                    <source src="assets/video/approach/step-1.mp4" type="video/mp4">
                                                    <source src="assets/video/approach/step-1.mp4" type="video/mp4">
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                            <div
                                                class="content-box d-flex justify-content-start gap-lg-3 gap-2 maxw1194 mx-auto px-lg-0 px-3">
                                                <div class="number-box">
                                                    <h3 class="d-inline-block">1<span class="dot">.</span></h3>
                                                </div>
                                                <div class="text-box">
                                                    <p class="bs-para typ26 typ-fnt1 typ500">Our <strong>Bio AI</strong>
                                                        technology
                                                        goes beyond <strong>nutrition and body metrics—it</strong>
                                                        includes your
                                                        <strong>blood markers, lifestyle</strong>, and your
                                                        <strong>family
                                                            history</strong>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="bs-card typ-driven-approach">
                                        <div>
                                            <div class="img-box">
                                                <!-- <img src="assets/images/technology/driven-1.png" class="img-fluid" alt=""> -->
                                                <video playsinline="" loop="" muted="" autoplay="">
                                                    <source src="assets/video/approach/step-2.mp4" type="video/mp4">
                                                    <source src="assets/video/approach/step-2.mp4" type="video/mp4">
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                            <div
                                                class="content-box d-flex justify-content-start gap-lg-3 gap-2 maxw1194 mx-auto px-lg-0 px-3">
                                                <div class="number-box">
                                                    <h3 class="d-inline-block">2<span class="dot">.</span></h3>
                                                </div>
                                                <div class="text-box">
                                                    <p class="bs-para typ26 typ-fnt1 typ500">Using these inputs, it
                                                        predicts your risk for <strong>10+ metabolic disorders</strong>
                                                        by analyzing how your <strong>nutrition and lifestyle</strong>
                                                        impact them.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                <div class="bs-card typ-driven-approach">
                                        <div>
                                            <div class="img-box">
                                                <!-- <img src="assets/images/technology/driven-1.png" class="img-fluid" alt=""> -->
                                                <video playsinline loop muted autoplay class="responsive-video"
                                                    data-mobile="assets/video/approach/mob-33.mp4"
                                                    data-desktop="assets/video/approach/step-3.mp4">
                                                    <source type="video/mp4">
                                                    Your browser does not support the video tag.
                                                </video>

                                            </div>
                                            <div
                                                class="content-box d-flex justify-content-start gap-lg-3 gap-2 maxw1194 mx-auto px-lg-0 px-3">
                                                <div class="number-box">
                                                    <h3 class="d-inline-block">3<span class="dot">.</span></h3>
                                                </div>
                                                <div class="text-box">
                                                    <p class="bs-para typ26 typ-fnt1 typ500">
                                                        It compares your <strong>health score</strong> to peers to
                                                        identify the severity of potential <strong>lifestyle
                                                            diseases.</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="bs-card typ-driven-approach">
                                        <div>
                                            <div class="img-box">
                                                <!-- <img src="assets/images/technology/driven-1.png" class="img-fluid" alt=""> -->
                                                  <video playsinline loop muted autoplay class="responsive-video"
                                                    data-mobile="assets/video/approach/mob-4.mp4"
                                                    data-desktop="assets/video/approach/step-4.mp4">
                                                    <source type="video/mp4">
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                            <div
                                                class="content-box d-flex justify-content-start gap-lg-3 gap-2 maxw1194 mx-auto px-lg-0 px-3">
                                                <div class="number-box">
                                                    <h3 class="d-inline-block">4<span class="dot">.</span></h3>
                                                </div>
                                                <div class="text-box">
                                                    <p class="bs-para typ26 typ-fnt1 typ500">Early detection of the
                                                        potential <strong>disease risks</strong> enables
                                                        <strong>prevention</strong> and targeted intervention
                                                        <strong>reduces</strong> the overall <strong>healthcare
                                                            burden.</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Optional: Pagination, Navigation, etc. -->
                        <!-- <div class="swiper-pagination"></div> -->
                        <div class="button-wrapper">
                            <div class="swiper-button-prev driven-approach-prev">
                                <button class="bs-btn">PREV</button>
                            </div>
                            <div class="swiper-button-next driven-approach-next">
                                <button class="bs-btn">NEXT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- footer start -->
    <?php include_once 'view/footer.html' ?>
    <!-- footer end -->

    <!-- js group start -->
    <?php include_once 'view/include_js.html' ?>
    <!-- js group end -->
    <!-- <script src="https://assets.codepen.io/16327/ScrollTrigger.min.js"></script>
    <script src="https://assets.codepen.io/16327/gsap-latest-beta.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
        <script>
        const isMobileVideo = window.innerWidth <= 768;

        document.querySelectorAll('.responsive-video').forEach(video => {
            const source = video.querySelector('source');
            const mobileSrc = video.getAttribute('data-mobile');
            const desktopSrc = video.getAttribute('data-desktop');

            source.src = isMobileVideo ? mobileSrc : desktopSrc;
            video.load();
        });
    </script>
    <script>
        const cardData = [
            { img: "./assets/images/technology/cards/red-1.svg" }, // 0
            { img: "./assets/images/technology/cards/green-1.svg" }, // 1
            { img: "./assets/images/technology/cards/red-2.svg" }, // 2
            { img: "./assets/images/technology/cards/green-2.svg" }, // 3
            { img: "./assets/images/technology/cards/red-3.svg" }, // 4
            { img: "./assets/images/technology/cards/green-3.svg" }, // 5
            { img: "./assets/images/technology/cards/red-5.svg" }, // 6
            { img: "./assets/images/technology/cards/green-4.svg" }, // 7
            { img: "./assets/images/technology/cards/red-4.svg" }, // 8
            { img: "./assets/images/technology/cards/green-6.svg" }, // 9
            { img: "./assets/images/technology/cards/red-6.svg" }, // 10
            { img: "./assets/images/technology/cards/green-5.svg" }  // 11
        ];

        const pairs = [
            [0, 3],
            [2, 1],
            [4, 7],
            [8, 5],
            [6, 9],
            [10, 11]
        ];

        const stack = document.getElementById("cardStack");
        const leftCol = document.getElementById("leftColumn");
        const rightCol = document.getElementById("rightColumn");

        let isExpanded = false;

        stack.addEventListener("click", () => {
            if (isExpanded) return;

            pairs.forEach((pair, pairIndex) => {
                setTimeout(() => {
                    pair.forEach(idx => {
                        const card = cardData[idx];
                        const el = document.createElement("div");
                        el.className = "image-box";
                        el.dataset.index = idx;

                        const img = document.createElement("img");
                        img.src = card.img;
                        img.alt = "";
                        img.className = "img-fluid";
                        el.appendChild(img);

                        // Assign to column based on index
                        if (idx % 2 === 0) {
                            leftCol.appendChild(el);
                        } else {
                            rightCol.appendChild(el);
                        }

                        requestAnimationFrame(() => {
                            el.classList.add("show");
                        });
                    });
                }, pairIndex * 1000); // Each pair shows every 200ms
            });

            isExpanded = true;
        });

    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <!-- <script>
        document.addEventListener("DOMContentLoaded", function () {
            const middleBox = document.querySelector(".middle-box img");

            middleBox.addEventListener("click", function () {
                const imageBoxes = document.querySelectorAll(".left-box, .right-box");
                imageBoxes.forEach(box => {
                    box.classList.add("active");
                });
            });
        });
    </script> -->
    <script>
        // function heroBanner() {
        //     gsap.registerPlugin(ScrollTrigger);

        //     // Set z-index so boxes stack properly
        //     gsap.set(".boxes .box", {
        //         zIndex: (i, target, targets) => targets.length - i
        //     });

        //     const images = gsap.utils.toArray('.boxes.green-boxes .box:not(.box-4)');

        //     // Set initial opacity to 0 for all except box-4
        //     gsap.set(images, { opacity: 0 });
        //     gsap.set(".box-4", { opacity: 0 });

        //     const tl = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: "#scienceSection .box-wrapper",
        //             scrub: 1.25,
        //             // pin: true,
        //             start: "top top",
        //             // end: "+=300%",
        //             // anticipatePin: 1,
        //             markers: false,
        //             invalidateOnRefresh: true,
        //             immediateRender: false
        //         }
        //     });

        //     // Fade in each box one-by-one
        //     images.forEach((image, i) => {
        //         tl.to(image, {
        //             opacity: 1,
        //             duration: 1,
        //             ease: "power2.out"
        //         }, i); // Each gets a slot in the timeline
        //     });

        //     // Finally fade in .box-4
        //     tl.to(".box-4", {
        //         opacity: 1,
        //         duration: 1.5,
        //         ease: "power2.out"
        //     });

        //     // Refresh on resize
        //     window.addEventListener('resize', () => {
        //         ScrollTrigger.refresh();
        //     });

        //     gsap.registerPlugin(ScrollTrigger);

        //     // Animate scroll progress bar
        //     gsap.to(".scroll-progress-bar", {
        //         width: "100%",
        //         ease: "none",
        //         scrollTrigger: {
        //             trigger: "#scienceSection",
        //             start: "top top",
        //             end: "bottom bottom",
        //             scrub: true
        //         }
        //     });

        //     // Refresh ScrollTrigger on resize
        //     window.addEventListener("resize", () => {
        //         ScrollTrigger.refresh();
        //     });
        // }
        function initScienceSection() {
            gsap.registerPlugin(ScrollTrigger);
            
            const section = document.querySelector("#scienceSection");
            if (!section) return;

            // KILL ALL existing triggers on this section first
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section) {
                    trigger.kill();
                }
            });

            const greenProgressBar = section.querySelector('.scroll-progress-bar.green');
            const redProgressBar = section.querySelector('.scroll-progress-bar.red');

            // Initialize - Progress bars at 0
            gsap.set([greenProgressBar, redProgressBar], { height: "0%" });

            // Animate lines growing down when section enters viewport
            gsap.to(greenProgressBar, {
                height: "50%",
                duration: 3,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    toggleActions: "play none none none"
                }
            });

            gsap.to(redProgressBar, {
                height: "90%",
                duration: 3,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    toggleActions: "play none none none"
                }
            });

            // Force refresh after init
            ScrollTrigger.refresh();
        }

        // Wait for page to load before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initScienceSection);
        } else {
            initScienceSection();
        }
    </script>
    <script>
        const isMobile = window.innerWidth <= 767; // Adjust breakpoint as needed
        const targetSelector = isMobile ? '#bioAiTechnologyMobile' : '#bioAiTechnologyDesktop';
        const container = document.querySelector(targetSelector);

        if (container) {
            let hasLoaded = false;

            const observer = new IntersectionObserver((entries, observer) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasLoaded) {
                    lottie.loadAnimation({
                        container: entry.target,
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        path: isMobile
                            ? './assets/json/technology/ai-tech-mobile.json'
                            : './assets/json/technology/ai-tech-desktop.json'
                    });
                    hasLoaded = true;
                    observer.unobserve(entry.target);
                }
            }, {
                threshold: 0.5
            });

            observer.observe(container);
        }
    </script>
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            const boxDivs = document.querySelectorAll('.green-box-wrapper .boxes, .red-box-wrapper .boxes');
            const mobileContainer = document.querySelector('#mobileScienceAgeBox');

            const isMobile = window.innerWidth <= 768;

            if (isMobile && boxDivs.length && mobileContainer) {
                boxDivs.forEach(div => {
                    mobileContainer.appendChild(div); // Move each box into the mobile container
                });
            }
        });
    </script>
    <script>
        // List of Lottie paths for green boxes
        const greenLotties = [
            'assets/json/technology/G1.json',
            'assets/json/technology/G2.json',
            'assets/json/technology/G3.json',
            'assets/json/technology/G4.json'
        ];

        // List of Lottie paths for red boxes (or whatever "R" represents)
        const redLotties = [
            'assets/json/technology/R1.json',
            'assets/json/technology/R2.json',
            'assets/json/technology/R3.json',
            'assets/json/technology/R4.json'
        ];

        // Load green Lotties
        greenLotties.forEach((path, index) => {
            const el = document.getElementById(`lottieG${index + 1}`);
            if (el) {
                lottie.loadAnimation({
                    container: el,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: path
                });
            }
        });

        // Load red Lotties
        redLotties.forEach((path, index) => {
            const el = document.getElementById(`lottieR${index + 1}`);
            if (el) {
                lottie.loadAnimation({
                    container: el,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: path
                });
            }
        });
    </script>
</body>

</html>