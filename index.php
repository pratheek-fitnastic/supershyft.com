<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->

<head>
    <title> Supershyft | Precision Health Solutions with Data‑Driven Insights </title>
    <!-- Meta Description -->
    <meta name="description" content="Supershyft brings precision health solutions using advanced systems trusted by health leaders. Transforming 10,000+ lives through data-driven insights." />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!-- Open Graph / Facebook Tags -->
    <meta property="og:title" content="Supershyft | Precision Health Solutions" />
    <meta property="og:description" content="Trusted by health leaders, Supershyft delivers precision health solutions with advanced systems, data‑driven insights, and proven results." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.supershyft.com/" />
    <meta property="og:image" content="https://www.supershyft.com/assets/images/our-story/super-shyft.png" />
    <!-- Canonical Tag -->
    <link rel="canonical" href="https://www.supershyft.com/" />
    <!-- css group start -->
    <?php include_once 'view/include_css.html'; ?>
    <!-- css group end -->

    <!-- Custom vertical animation for content-box -->
    <style>
        /* PC VERSION: Show all 4 points - Override default animations */
        .step-section .boxes-wrapper {
            display: flex !important;
            gap: 30px !important;
            align-items: flex-start !important;
            height: auto !important;
        }

        .step-section .left-box {
            height: auto !important;
            display: block !important;
            width: 100% !important;
        }

        .step-section .right-box {
            height: auto !important;
            width: 100% !important;
        }

        .step-section .left-box .content-box {
            opacity: 1 !important;
            transform: none !important;
            transition: all 0.6s ease;
            display: flex !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 20px !important;
        }

        .step-section .left-box .content-box .number {
            flex-shrink: 0 !important;
            margin-top: 0 !important;
        }

        .step-section .left-box .content-box .content {
            flex: 1 !important;
        }

        .step-section .left-box .content-box.active {
            opacity: 1;
            transform: translateY(0);
        }

        /* Mobile: Stack panels vertically instead of horizontally */
        @media (max-width: 1024px) {
            .mobile-step-section .mobile-content-wrapper {
                position: relative;
                height: auto;
                min-height: 180px;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .mobile-step-section {
                padding-bottom: 20px !important;
            }
            
            .mobile-step-section .panel {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                transform: translateY(100%);
                width: 100% !important;
                min-width: 100% !important;
                padding: 20px;
                opacity: 0;
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .mobile-step-section .panel.active-panel {
                opacity: 1;
                transform: translateY(0);
            }
            
            .mobile-step-section .panel:first-child {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>

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

    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W8GMX6J7');</script>
    <!-- End Google Tag Manager -->
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W8GMX6J7"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
    <div id="loader">
  <div class="loader-content">
    <img src="assets/images/supershyft-loader.gif" alt="Loading..." class="loader-logo img-fluid" />
  </div>
</div>
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
        <div class="bs-banner">
            <div class="banner-layer">

                <video class="desk-video" autoplay playsinline loop muted>
                    <source src="assets/video/banner.mp4" type="video/mp4" />
                </video>

                <video class="mobile-video" autoplay playsinline loop muted>
                    <source src="assets/video/banner.mp4" type="video/mp4" />
                </video>

                <div class="content container-left-space-target">
                    <div class="content-inner-wrapper" data-aos="fade" data-aos-delay="200">
                        <div class="heading">
                            Introducing <br>
                            <span class="pink">Supershyft</span><br>
                            For
                            <h2 class="heading mb-0">
                                <span class="word-slider">
                                    <span class="word-list">
                                        <span class="word">Prevention</span>
                                        <span class="word">Precision Nutrition</span>
                                        <span class="word">Age Reversal</span>
                                        <span class="word">Longevity</span>
                                    </span>
                                </span>
                            </h2>
                        </div>

                        <div class="text-lg-start text-center">
                            <a href="https://longevity-bio-ai.supershyft.com/" target="_blank" target="_blank" class="bs-btn">Get
                                Supershyft
                                Today</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <section class="lyt-section typ-drag-section section2">
            <div class="container">

                <div id="dragableSection" class="section-inner">

                    <div class="text-wrap">
                        <div class="row text-center mb-lg-5 mb-4 align-items-center" id="animatedText">
                            <div class="col-12">
                                <h3 class="bs-sub-title typ28 mb-2">Introducing</h3>
                                <h2 class="bs-heading typ100 mb-3">Supershyft</h2>
                                <p class="bs-para typ20 maxw600 mx-auto">A Bio AI-powered solution that
                                    predicts health risks early and helps you
                                    achieve better health with simple, science-backed changes.</p>
                            </div>
                        </div>


                    </div>

                    <div class="bs-after-befor-box diagram" id="dragableContainer">
                        <div>
                            <div class="row text-center mb-4">
                                <div class="col-12">
                                    <p class="bs-para typitalic typgrey typ-mobhide">Drag bar to see the difference </p>
                                </div>
                            </div>
                            <div class="container mobile-padding-remove">
                                <div class="image-container">
                                    <img class="image-before slider-image" src="assets/images/drag/1.jpg"
                                        alt="color photo" />
                                    <img class="image-after slider-image" src="assets/images/drag/2.jpg"
                                        alt="black and white" />
                                    <div class="typ-input-hide">
                                        <input type="range" min="0" max="100" value="100"
                                            aria-label="Percentage of before photo shown" class="slider" />
                                    </div>
                                    <div class="typ-video-show">
                                        <video autoplay playsinline loop muted>
                                            <source src="assets/images/mob-video-body.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                    <div class="slider-line" aria-hidden="true"></div>
                                    <div class="slider-button" aria-hidden="true">
                                        <img src="assets/images/drag/button.png" class="img-fluid" alt="button">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>


        <section class="lyt-section typ-science-section">
            <div class="container">
                <div class="text-end">
                    <div class="object-img object-img-1">
                        <svg width="454" height="172" viewBox="0 0 454 172" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.75"
                                d="M361.349 1C366.021 1.00017 370.687 1.00422 375.379 1.07422C375.393 1.08463 375.406 1.09649 375.42 1.10645C375.541 1.19178 375.737 1.31343 375.997 1.36816L376.112 1.38672C377.181 1.51684 378.144 1.6103 379.141 1.72363L380.154 1.8457C384.856 2.44999 389.459 3.52233 393.979 4.96387L394.883 5.25684C401.165 7.33319 407.115 10.121 412.736 13.5977L413.855 14.3027C420.433 18.511 426.323 23.5134 431.498 29.3281L432.523 30.502C437.443 36.2391 441.53 42.5134 444.765 49.3301L445.399 50.7002C448.33 57.168 450.429 63.8789 451.64 70.8545L451.87 72.2529C451.957 72.8127 452.031 73.3623 452.103 73.918L452.326 75.6201C452.326 75.6209 452.327 75.6241 452.327 75.6299C452.328 75.6378 452.329 75.6474 452.33 75.6621C452.332 75.6866 452.337 75.7344 452.343 75.7832C452.352 75.8562 452.38 76.0786 452.504 76.2998C452.558 76.3956 452.63 76.487 452.716 76.5693C452.716 82.7219 452.712 88.8696 452.642 95.0439C452.357 95.5152 452.251 95.9922 452.205 96.4033C452.178 96.6437 452.17 96.8832 452.161 97.0693C452.157 97.1696 452.152 97.2577 452.146 97.3379L452.123 97.5605C451.465 102.093 450.456 106.539 449.085 110.9L448.806 111.771C447.299 116.389 445.392 120.835 443.122 125.131L442.663 125.988C439.209 132.36 434.98 138.168 430.06 143.469L429.066 144.521C425.851 147.879 422.352 150.928 418.62 153.713L417.871 154.267C413.415 157.523 408.691 160.32 403.697 162.645L402.695 163.104C397.139 165.602 391.378 167.469 385.419 168.709L384.225 168.948C381.195 169.534 378.142 169.955 375.075 170.188L373.761 170.276C371.961 170.382 370.179 170.368 368.349 170.365L366.5 170.372C363.625 170.404 360.756 170.16 357.883 169.784L356.651 169.615C351.376 168.861 346.214 167.627 341.173 165.899L340.166 165.547C334.515 163.529 329.157 160.932 324.075 157.763L323.062 157.121C318.259 154.031 313.94 150.327 309.84 146.316L309.022 145.511C305.731 142.237 302.559 139.003 299.323 135.741L296.06 132.468C294.567 130.979 293.061 129.503 291.551 128.034L287.019 123.641C284.192 120.901 281.239 118.307 278.167 115.852L276.844 114.809C272.144 111.152 267.149 107.94 261.755 105.367L260.671 104.86C250.899 100.4 240.598 98.4887 230.012 98.1562L228.986 98.1289C226.874 98.0828 224.624 98.2058 222.545 98.2441L221.665 98.2539C218.497 98.2683 215.352 98.4908 212.228 98.7939L210.89 98.9287C206.209 99.4147 201.579 100.211 197.019 101.409L196.107 101.654C190.543 103.185 185.233 105.334 180.236 108.249L179.241 108.843C174.767 111.569 170.767 114.868 167.051 118.461L166.312 119.183C163.772 121.689 161.312 124.278 158.913 126.913L157.889 128.046C153.73 132.668 149.783 137.295 145.674 141.874L143.901 143.833C141.554 146.406 139.088 148.889 136.54 151.274L135.442 152.291C130.187 157.111 124.285 160.992 117.833 164.028L116.535 164.624C110.971 167.118 105.214 168.934 99.2275 169.962L98.0273 170.157C97.4578 170.245 96.9116 170.316 96.3594 170.388L94.6543 170.614C94.6505 170.615 94.6438 170.615 94.6328 170.616C94.614 170.618 94.5658 170.621 94.5205 170.626C94.4462 170.634 94.2407 170.656 94.0293 170.759C93.9174 170.813 93.8022 170.893 93.6992 170.999C88.7156 170.999 83.7378 170.995 78.7344 170.926C78.5781 170.826 78.3812 170.716 78.1543 170.652L77.9795 170.613C75.6673 170.238 73.4583 169.981 71.2559 169.563L70.3125 169.374C62.9701 167.809 55.9764 165.268 49.3193 161.813L47.9932 161.11C38.4506 155.95 30.0867 149.329 22.9043 141.228L22.2129 140.439C15.6544 132.874 10.4696 124.492 6.7998 115.2L6.44922 114.298C4.15289 108.286 2.55384 102.112 1.7666 95.7451L1.62012 94.4697C1.57621 94.056 1.52661 93.6288 1.46191 93.1982L1.3916 92.7666L1.36719 92.6494C1.3367 92.5253 1.28659 92.3815 1.20117 92.2412C1.17357 92.1959 1.13845 92.1469 1.09668 92.0967C1.3925 91.3223 1.35094 90.4246 1 89.7217C1.00006 86.4927 1.0033 83.2753 1.08496 79.999C1.12151 79.9375 1.16027 79.8743 1.19238 79.8115C1.26613 79.6674 1.35408 79.4638 1.38574 79.2148L1.39551 79.1055C1.57773 75.7531 2.06712 72.4322 2.74219 69.1299L3.04297 67.7158C5.21026 57.8668 9.02819 48.7017 14.4688 40.2334L15 39.416C19.06 33.2488 23.8216 27.6939 29.3096 22.7656L30.417 21.7881C35.4509 17.4216 40.9027 13.6933 46.7783 10.5908L47.959 9.97949C51.9148 7.96612 56.0183 6.30356 60.252 4.95605L61.1006 4.69043C65.5427 3.32604 70.0547 2.32202 74.6514 1.73633L75.5723 1.625C75.9594 1.58052 76.3497 1.54437 76.7539 1.50781L77.9834 1.38672C77.9791 1.38721 77.9817 1.3867 78.0127 1.38477C78.0351 1.38337 78.0826 1.3805 78.1309 1.37598C78.2092 1.36861 78.4173 1.34824 78.6318 1.24512C78.7463 1.1901 78.8631 1.10795 78.9678 1C83.4398 1.0002 87.9054 1.00508 92.4053 1.0791C92.5729 1.18102 92.7832 1.29196 93.0244 1.35352L93.1973 1.3877C95.5675 1.73048 97.8516 1.97743 100.135 2.35547L101.114 2.52637C109.918 4.14631 118.2 7.23293 126.049 11.5352L126.807 11.9551C134.354 16.1823 141.012 21.5233 146.819 27.9043L147.379 28.5244C149.74 31.1705 152.017 33.8852 154.305 36.6133L156.6 39.3447C160.82 44.3445 165.058 49.4444 169.964 53.9453L170.954 54.8369C173.365 56.9681 175.895 58.9776 178.626 60.7324L179.175 61.0801C186.065 65.3783 193.552 68.0343 201.408 69.6113L202.984 69.9121C208.409 70.8974 213.876 71.3887 219.345 71.5977L220.439 71.6357C224.111 71.7514 227.874 71.9007 231.64 71.5889L232.393 71.5205C234.423 71.318 236.555 71.1669 238.646 70.9395L239.539 70.8369C243.937 70.3028 248.226 69.293 252.416 67.9375L253.253 67.6621C260.792 65.1336 267.693 61.4177 274.141 56.8828L275.424 55.9648C281.331 51.6713 286.745 46.8255 291.995 41.8428L294.235 39.7002C296.224 37.787 298.202 35.8037 300.169 33.8574L302.131 31.9268C305.217 28.918 308.238 25.8947 311.356 22.9756L312.699 21.7314C316.162 18.558 319.991 15.8239 324.035 13.3789L324.847 12.8936C330.186 9.73678 335.781 7.15536 341.667 5.23242L342.848 4.85645C347.452 3.43066 352.129 2.38025 356.895 1.74902L357.849 1.62793C358.249 1.57975 358.654 1.54419 359.075 1.50781C359.283 1.48984 359.496 1.47177 359.711 1.45215L360.361 1.38672C360.365 1.38648 360.373 1.38587 360.392 1.38477C360.415 1.38338 360.463 1.38149 360.512 1.37695C360.591 1.36959 360.798 1.3482 361.013 1.24512C361.127 1.19008 361.244 1.10785 361.349 1Z"
                                fill="#F3F3F3" stroke="transperent" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                <div class="row text-center position-relative mb-lg-5 mb-4">
                    <div class="col-12">
                        <h2 class="bs-heading" style="position: relative;z-index: 1;" data-aos="fade"
                            data-aos-delay="200">Science
                            at it’s <span class="typ-gradient">core</span></h2>

                        <div class="object-img object-img-2">
                            <svg width="454" height="172" viewBox="0 0 454 172" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.75"
                                    d="M361.349 1C366.021 1.00017 370.687 1.00422 375.379 1.07422C375.393 1.08463 375.406 1.09649 375.42 1.10645C375.541 1.19178 375.737 1.31343 375.997 1.36816L376.112 1.38672C377.181 1.51684 378.144 1.6103 379.141 1.72363L380.154 1.8457C384.856 2.44999 389.459 3.52233 393.979 4.96387L394.883 5.25684C401.165 7.33319 407.115 10.121 412.736 13.5977L413.855 14.3027C420.433 18.511 426.323 23.5134 431.498 29.3281L432.523 30.502C437.443 36.2391 441.53 42.5134 444.765 49.3301L445.399 50.7002C448.33 57.168 450.429 63.8789 451.64 70.8545L451.87 72.2529C451.957 72.8127 452.031 73.3623 452.103 73.918L452.326 75.6201C452.326 75.6209 452.327 75.6241 452.327 75.6299C452.328 75.6378 452.329 75.6474 452.33 75.6621C452.332 75.6866 452.337 75.7344 452.343 75.7832C452.352 75.8562 452.38 76.0786 452.504 76.2998C452.558 76.3956 452.63 76.487 452.716 76.5693C452.716 82.7219 452.712 88.8696 452.642 95.0439C452.357 95.5152 452.251 95.9922 452.205 96.4033C452.178 96.6437 452.17 96.8832 452.161 97.0693C452.157 97.1696 452.152 97.2577 452.146 97.3379L452.123 97.5605C451.465 102.093 450.456 106.539 449.085 110.9L448.806 111.771C447.299 116.389 445.392 120.835 443.122 125.131L442.663 125.988C439.209 132.36 434.98 138.168 430.06 143.469L429.066 144.521C425.851 147.879 422.352 150.928 418.62 153.713L417.871 154.267C413.415 157.523 408.691 160.32 403.697 162.645L402.695 163.104C397.139 165.602 391.378 167.469 385.419 168.709L384.225 168.948C381.195 169.534 378.142 169.955 375.075 170.188L373.761 170.276C371.961 170.382 370.179 170.368 368.349 170.365L366.5 170.372C363.625 170.404 360.756 170.16 357.883 169.784L356.651 169.615C351.376 168.861 346.214 167.627 341.173 165.899L340.166 165.547C334.515 163.529 329.157 160.932 324.075 157.763L323.062 157.121C318.259 154.031 313.94 150.327 309.84 146.316L309.022 145.511C305.731 142.237 302.559 139.003 299.323 135.741L296.06 132.468C294.567 130.979 293.061 129.503 291.551 128.034L287.019 123.641C284.192 120.901 281.239 118.307 278.167 115.852L276.844 114.809C272.144 111.152 267.149 107.94 261.755 105.367L260.671 104.86C250.899 100.4 240.598 98.4887 230.012 98.1562L228.986 98.1289C226.874 98.0828 224.624 98.2058 222.545 98.2441L221.665 98.2539C218.497 98.2683 215.352 98.4908 212.228 98.7939L210.89 98.9287C206.209 99.4147 201.579 100.211 197.019 101.409L196.107 101.654C190.543 103.185 185.233 105.334 180.236 108.249L179.241 108.843C174.767 111.569 170.767 114.868 167.051 118.461L166.312 119.183C163.772 121.689 161.312 124.278 158.913 126.913L157.889 128.046C153.73 132.668 149.783 137.295 145.674 141.874L143.901 143.833C141.554 146.406 139.088 148.889 136.54 151.274L135.442 152.291C130.187 157.111 124.285 160.992 117.833 164.028L116.535 164.624C110.971 167.118 105.214 168.934 99.2275 169.962L98.0273 170.157C97.4578 170.245 96.9116 170.316 96.3594 170.388L94.6543 170.614C94.6505 170.615 94.6438 170.615 94.6328 170.616C94.614 170.618 94.5658 170.621 94.5205 170.626C94.4462 170.634 94.2407 170.656 94.0293 170.759C93.9174 170.813 93.8022 170.893 93.6992 170.999C88.7156 170.999 83.7378 170.995 78.7344 170.926C78.5781 170.826 78.3812 170.716 78.1543 170.652L77.9795 170.613C75.6673 170.238 73.4583 169.981 71.2559 169.563L70.3125 169.374C62.9701 167.809 55.9764 165.268 49.3193 161.813L47.9932 161.11C38.4506 155.95 30.0867 149.329 22.9043 141.228L22.2129 140.439C15.6544 132.874 10.4696 124.492 6.7998 115.2L6.44922 114.298C4.15289 108.286 2.55384 102.112 1.7666 95.7451L1.62012 94.4697C1.57621 94.056 1.52661 93.6288 1.46191 93.1982L1.3916 92.7666L1.36719 92.6494C1.3367 92.5253 1.28659 92.3815 1.20117 92.2412C1.17357 92.1959 1.13845 92.1469 1.09668 92.0967C1.3925 91.3223 1.35094 90.4246 1 89.7217C1.00006 86.4927 1.0033 83.2753 1.08496 79.999C1.12151 79.9375 1.16027 79.8743 1.19238 79.8115C1.26613 79.6674 1.35408 79.4638 1.38574 79.2148L1.39551 79.1055C1.57773 75.7531 2.06712 72.4322 2.74219 69.1299L3.04297 67.7158C5.21026 57.8668 9.02819 48.7017 14.4688 40.2334L15 39.416C19.06 33.2488 23.8216 27.6939 29.3096 22.7656L30.417 21.7881C35.4509 17.4216 40.9027 13.6933 46.7783 10.5908L47.959 9.97949C51.9148 7.96612 56.0183 6.30356 60.252 4.95605L61.1006 4.69043C65.5427 3.32604 70.0547 2.32202 74.6514 1.73633L75.5723 1.625C75.9594 1.58052 76.3497 1.54437 76.7539 1.50781L77.9834 1.38672C77.9791 1.38721 77.9817 1.3867 78.0127 1.38477C78.0351 1.38337 78.0826 1.3805 78.1309 1.37598C78.2092 1.36861 78.4173 1.34824 78.6318 1.24512C78.7463 1.1901 78.8631 1.10795 78.9678 1C83.4398 1.0002 87.9054 1.00508 92.4053 1.0791C92.5729 1.18102 92.7832 1.29196 93.0244 1.35352L93.1973 1.3877C95.5675 1.73048 97.8516 1.97743 100.135 2.35547L101.114 2.52637C109.918 4.14631 118.2 7.23293 126.049 11.5352L126.807 11.9551C134.354 16.1823 141.012 21.5233 146.819 27.9043L147.379 28.5244C149.74 31.1705 152.017 33.8852 154.305 36.6133L156.6 39.3447C160.82 44.3445 165.058 49.4444 169.964 53.9453L170.954 54.8369C173.365 56.9681 175.895 58.9776 178.626 60.7324L179.175 61.0801C186.065 65.3783 193.552 68.0343 201.408 69.6113L202.984 69.9121C208.409 70.8974 213.876 71.3887 219.345 71.5977L220.439 71.6357C224.111 71.7514 227.874 71.9007 231.64 71.5889L232.393 71.5205C234.423 71.318 236.555 71.1669 238.646 70.9395L239.539 70.8369C243.937 70.3028 248.226 69.293 252.416 67.9375L253.253 67.6621C260.792 65.1336 267.693 61.4177 274.141 56.8828L275.424 55.9648C281.331 51.6713 286.745 46.8255 291.995 41.8428L294.235 39.7002C296.224 37.787 298.202 35.8037 300.169 33.8574L302.131 31.9268C305.217 28.918 308.238 25.8947 311.356 22.9756L312.699 21.7314C316.162 18.558 319.991 15.8239 324.035 13.3789L324.847 12.8936C330.186 9.73678 335.781 7.15536 341.667 5.23242L342.848 4.85645C347.452 3.43066 352.129 2.38025 356.895 1.74902L357.849 1.62793C358.249 1.57975 358.654 1.54419 359.075 1.50781C359.283 1.48984 359.496 1.47177 359.711 1.45215L360.361 1.38672C360.365 1.38648 360.373 1.38587 360.392 1.38477C360.415 1.38338 360.463 1.38149 360.512 1.37695C360.591 1.36959 360.798 1.3482 361.013 1.24512C361.127 1.19008 361.244 1.10785 361.349 1Z"
                                    fill="#F3F3F3" stroke="transperent" stroke-width="2" />
                            </svg>
                        </div>

                    </div>
                </div>

                <div class="bs-core-wrapper mart80 mb-lg-5 mb-md-5 mb-4" data-aos="fade" data-aos-delay="300">
                    <div class="title d-lg-none d-md-none d-block">Trusted By <span
                            class="gradient">Healthleaders</span></div>
                    <div class="bs-core-box">
                        <div class="content-box">
                            <div class="title d-lg-block d-md-block d-none">Trusted By <span>Healthleaders</span></div>
                            <p class="bs-para typgrey1 mb-3">
                                Our advanced systems work with leading tech firms and doctors to deliver
                                <strong>precision
                                    health</strong> solutions.

                            </p>
                            <p class="bs-para typgrey1">
                                With <strong>20+ corporate partnerships</strong> and <strong>10,000+ lives</strong>
                                transformed,
                                <strong>Supershyft</strong> helps you take control of your health with <strong>data
                                    driven
                                    insights</strong> and proven results.
                            </p>
                        </div>
                        <div class="box-img">
                            <!-- <img src="assets/images/core/1.jpg" class="img-fluid" alt="core-img"> -->
                            <video src="assets/video/trusted.mp4" playsinline="" loop muted autoplay></video>
                        </div>
                    </div>
                </div>
                <div class="bs-core-wrapper mb-lg-5 mb-md-5 mb-4" data-aos="fade" data-aos-delay="400">
                    <div class="title d-lg-none d-md-none d-block">Precision <span class="gradient">Beyond</span>
                        Numbers</div>
                    <div class="bs-core-box typ-direction">
                        <div class="content-box">
                            <div class="title d-lg-block d-md-block d-none">Precision <span>Beyond</span> Numbers</div>
                            <p class="bs-para typgrey1">
                                Supershyft uses <strong>Bio AI to deliver over 92% accurate</strong> metabolic
                                assessments,
                                <strong>analyzing 88+ biomarkers to predict risks for 12+ conditions,</strong> including
                                PCOS/PCOD,
                                <strong>Oxidative Stress,</strong> Cardiac Risk, <strong>Dyslipidemia</strong> etc.
                            </p>
                            <!-- <p class="bs-para typgrey1 typ600">
                With 20+ corporate partnerships and 10,000+ lives transformed, Supershyft helps you take control of your
                health with data driven insights and proven results.
              </p> -->
                        </div>
                        <div class="box-img">
                            <img src="assets/images/core/2.jpg" class="img-fluid" alt="core-img">
                        </div>
                    </div>
                </div>
                <div class="bs-core-wrapper" data-aos="fade" data-aos-delay="500">
                    <div class="title d-lg-none d-md-none d-block">Fixing What the <span class="gradient">Mirror Can’t
                            Show</span>
                    </div>
                    <div class="bs-core-box">
                        <div class="content-box">
                            <div class="title d-lg-block d-md-block d-none">Fixing What the <span>Mirror Can’t
                                    Show</span></div>
                            <p class="bs-para typgrey1 mb-3">
                                Your metabolism impacts <strong>98% of all lifestyle diseases, your overall health and
                                    longevity.</strong>
                            </p>
                            <p class="bs-para typgrey1">
                                Supershyft uses <strong>advanced Bio AI technology</strong> to analyze <strong>blood
                                    health and
                                    metabolic markers, delivering
                                    expert-driven lifestyle plans.</strong>
                            </p>
                        </div>
                        <div class="box-img">
                            <!-- <img src="assets/images/core/3.jpg" class="img-fluid" alt="core-img"> -->
                            <video src="assets/video/mirror.mp4" playsinline="" loop muted autoplay></video>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="lyt-section typ-btn-section">
            <div class="container">
                <div class="row text-center mb-lg-5 mb-4">
                    <div class="col-12">
                        <h2 class="bs-heading typwhite" data-aos="fade" data-aos-delay="200">Track vital signs for
                            health risks</h2>
                    </div>
                </div>
            </div>
            <div class="bs-btn-logo mb-4" data-aos="fade" data-aos-delay="300">
                <div class="btn-design">Diabetes</div>
                <div class="btn-design">Stroke</div>
                <div class="btn-design">Cardiac Health</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/1.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">Thyroid</div>
                <div class="btn-design">PCOD</div>
                <div class="btn-design">Diabetes</div>
                <div class="btn-design">Stroke</div>
                <div class="btn-design">Cardiac Health</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/1.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">Thyroid</div>
                <div class="btn-design">PCOD</div>
                <div class="btn-design">Diabetes</div>
                <div class="btn-design">Stroke</div>
                <div class="btn-design">Cardiac Health</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/1.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">Thyroid</div>
                <div class="btn-design">PCOD</div>
                <div class="btn-design">Diabetes</div>
                <div class="btn-design">Stroke</div>
                <div class="btn-design">Cardiac Health</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/1.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">Thyroid</div>
                <div class="btn-design">PCOD</div>
            </div>
            <div class="bs-btn-logo mb-4 typrevrse" data-aos="fade" data-aos-delay="400">
                <div class="btn-design">Cardiac Health</div>
                <div class="btn-design">Obesity</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/2.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">NAFLD</div>
                <div class="btn-design">Dyslipidemia</div>
                <div class="btn-design">Stress</div>
                <div class="btn-design">Cardiac Health</div>
                <div class="btn-design">Obesity</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/2.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">NAFLD</div>
                <div class="btn-design">Dyslipidemia</div>
                <div class="btn-design">Stress</div>
                <div class="btn-design">Cardiac Health</div>
                <div class="btn-design">Obesity</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/2.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">NAFLD</div>
                <div class="btn-design">Dyslipidemia</div>
                <div class="btn-design">Stress</div>
                <div class="btn-design">Cardiac Health</div>
                <div class="btn-design">Obesity</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/2.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">NAFLD</div>
                <div class="btn-design">Dyslipidemia</div>
                <div class="btn-design">Stress</div>
            </div>
            <div class="bs-btn-logo" data-aos="fade" data-aos-delay="500">
                <div class="btn-design">Diabetes</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/3.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">Stroke</div>
                <div class="btn-design">Cardiac Health</div>

                <div class="btn-design">Thyroid</div>
                <div class="btn-design">PCOD</div>
                <div class="btn-design">Diabetes</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/3.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">Stroke</div>
                <div class="btn-design">Cardiac Health</div>

                <div class="btn-design">Thyroid</div>
                <div class="btn-design">PCOD</div>
                <div class="btn-design">Diabetes</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/3.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">Stroke</div>
                <div class="btn-design">Cardiac Health</div>

                <div class="btn-design">Thyroid</div>
                <div class="btn-design">PCOD</div>
                <div class="btn-design">Diabetes</div>
                <div class="btn-design typ-logo">
                    <img src="assets/images/button/3.jpg" class="img-fluid" alt="button-design">
                </div>
                <div class="btn-design">Stroke</div>
                <div class="btn-design">Cardiac Health</div>

                <div class="btn-design">Thyroid</div>
                <div class="btn-design">PCOD</div>

            </div>
        </section>

        <section class="lyt-section typ-marketing-section step-section">
            <div class="container">
                <div class="row text-center mb-lg-5 mb-4">
                    <div class="col-12">
                        <h2 class="bs-heading typblack" data-aos="fade" data-aos-delay="200">How Supershyft works?</h2>
                    </div>
                </div>

                <div class="boxes-wrapper">
                    <div class="left-box">
                        <div class="content-box">
                            <div class="number">1.</div>
                            <div class="content">
                                <div class="title">Schedule Your Bio AI Tests</div>
                                <div class="discription">Instantly schedule blood tests on our platform and answer your
                                    lifestyle
                                    questions.</div>
                            </div>
                        </div>
                        <div class="content-box">
                            <div class="number">2.</div>
                            <div class="content">
                                <div class="title">Get Your Supershyft Report</div>
                                <div class="discription">Our advanced algorithms predict risks for 12+ metabolic
                                    diseases</div>
                            </div>
                        </div>
                        <div class="content-box">
                            <div class="number">3.</div>
                            <div class="content">
                                <div class="title">Lifestyle Assessment</div>
                                <div class="discription">Get a completely personalized lifestyle plan including your
                                    nutrition plan and
                                    workouts based on your Supershft report.</div>
                            </div>
                        </div>
                        <div class="content-box mb-5">
                            <div class="number">4.</div>
                            <div class="content">
                                <div class="title">Take Action. Test Again.</div>
                                <div class="discription">Test every few months to watch your health progress over time
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <a href="https://longevity-bio-ai.supershyft.com/" target="_blank" target="_blank" class="bs-btn">Get
                                Supershyft
                                Today</a>
                        </div>
                    </div>

                    <div class="right-box">
                        <div class="step"><video muted playsinline>
                                <source src="assets/video/works/new3.mp4" type="video/mp4" />
                            </video></div>
                        <div class="step"><video muted playsinline>
                                <source src="assets/video/works/new1.mp4" type="video/mp4" />
                            </video></div>
                        <div class="step"><video muted playsinline>
                                <source src="assets/video/works/new2.mp4" type="video/mp4" />
                            </video></div>
                        <div class="step"><video muted playsinline>
                                <source src="assets/video/works/new4.mp4" type="video/mp4" />
                            </video></div>
                    </div>
                </div>
            </div>
        </section>

        <div class="step-section-spacer d-none"></div>

        <section class="lyt-section mobile-step-section">
            <div class="container" id="howSuperShftSection">
                <div class="row text-center mb-lg-5 mb-4">
                    <div class="col-12">
                        <h2 class="bs-heading typblack">How Supershyft works?</h2>
                    </div>
                </div>
                <div class="box-wrapper">
                    <div class="mobile-content-wrapper">
                        <div class="mobile-content panel">
                            <div class="list-number">1.</div>
                            <div>
                                <h3> Schedule Your Bio AI Test</h3>
                                <p class="bs-para">Instantly schedule blood tests on our platform and answer your
                                    lifestyle questions.
                                </p>
                            </div>
                        </div>
                        <div class="mobile-content panel">
                            <div class="list-number">2.</div>
                            <div>
                                <h3>Get Your Supershyft Report</h3>
                                <p class="bs-para">Our advanced algorithms predict risks for 12+ metabolic diseases</p>
                            </div>
                        </div>
                        <div class="mobile-content panel">
                            <div class="list-number">3.</div>
                            <div>
                                <h3>Lifestyle Assessment</h3>
                                <p class="bs-para">Get a completely personalized lifestyle plan including your nutrition
                                    plan and
                                    workouts based on your Supershft report.</p>
                            </div>
                        </div>
                        <div class="mobile-content panel">
                            <div class="list-number">4.</div>
                            <div>
                                <h3>Take Action. Test Again.</h3>
                                <p class="bs-para">Test every few months to watch your health progress over time</p>
                            </div>
                        </div>
                    </div>
                    <div class="pagination-dots text-center">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <div class="mobile-video-wrapper">
                        <div class="mobile-video">
                            <video src="assets/video/works/new3.mp4" muted autoplay loop playsinline></video>
                        </div>
                        <div class="mobile-video">
                            <video src="assets/video/works/new1.mp4" muted autoplay loop playsinline></video>
                        </div>
                        <div class="mobile-video">
                            <video src="assets/video/works/new2.mp4" muted autoplay loop playsinline></video>
                        </div>
                        <div class="mobile-video">
                            <video src="assets/video/works/new4.mp4" muted autoplay loop playsinline></video>
                        </div>
                    </div>
                </div>
                <!-- CTA Button -->
                <div class="cta-wrapper text-center pt-4">
                    <button class="bs-btn">Get Supershyft Today</button>
                </div>
            </div>
        </section>

        <div class="bg-group">
            <section class="lyt-section typ-table-section">
                <div class="container">
                    <div class="row text-center mb-lg-5 mb-4">
                        <div class="col-12">
                            <h2 class="bs-heading typwhite" data-aos="fade" data-aos-delay="200">Why People Choose
                                SuperShyft ?</h2>
                        </div>
                    </div>

                    <div class="bs-table" data-aos="fade" data-aos-delay="300">
                        <div class="thead">
                            <div class="title"> Brands</div>
                            <div class="title">
                                <img src="assets/images/table-logo.svg" class="img-fluid" alt="table-logo">
                            </div>
                            <div class="title pb-0"> Others <br> Brands</div>
                        </div>

                        <div class="tbody">

                            <div class="inner-body">
                                <div class="discription">Affordability</div>
                                <div class="discription"><span class="icon icon-right"></span></div>
                                <div class="discription"><span class="icon icon-wrong"></span></div>
                            </div>
                            <div class="inner-body">
                                <div class="discription">Compliance</div>
                                <div class="discription"><span class="icon icon-right"></span></div>
                                <div class="discription"><span class="icon icon-right"></span></div>
                            </div>
                            <div class="inner-body">
                                <div class="discription">Disease Risk Predictions</div>
                                <div class="discription"><span class="icon icon-right"></span></div>
                                <div class="discription"><span class="icon icon-wrong"></span></div>
                            </div>
                            <div class="inner-body">
                                <div class="discription">Metabolic Insights</div>
                                <div class="discription"><span class="icon icon-right"></span></div>
                                <div class="discription"><span class="icon icon-wrong"></span></div>
                            </div>
                            <div class="inner-body">
                                <div class="discription">Bio-Marker Analysis</div>
                                <div class="discription"><span class="icon icon-right"></span></div>
                                <div class="discription"><span class="icon icon-wrong"></span></div>
                            </div>
                            <div class="inner-body">
                                <div class="discription">Doctor Recommended</div>
                                <div class="discription"><span class="icon icon-right"></span></div>
                                <div class="discription"><span class="icon icon-wrong"></span></div>
                            </div>


                        </div>


                    </div>
                </div>
            </section>

            <section class="lyt-section typ-cost-section">
                <div class="container">
                    <div class="row text-center mb-lg-5 mb-4">
                        <div class="col-12">
                            <h2 class="bs-heading typwhite mb-3" data-aos="fade" data-aos-delay="200">What Costs You
                                <span class="discounted-price">₹9,999</span> is ₹1,999/-
                            </h2>
                            <p class="bs-para typgrey2" data-aos="fade" data-aos-delay="300">Start tracking and improve
                                your health
                            </p>
                        </div>
                    </div>

                    <div class="bs-grid-box typthree mb-lg-5 mb-4" data-aos="fade" data-aos-delay="300">
                        <div class="bs-cost-box">
                            <div class="content-wrapper">
                                <div class="icon">
                                    <img src="assets/images/cost-icon/1.svg" class="img-fluid" alt="icon">
                                </div>

                                <div class="content">
                                    <h3 class="title">Full Body Blood Test</h3>
                                    <p class="bs-para typgrey2">
                                        Covers 88+ blood markers including Vitals, Lipid Profile, Liver Profile, Kidney,
                                        Thyroid and a lot
                                        more.
                                    </p>
                                    <div class="price">Market Price: ₹4,499/-</div>
                                </div>

                            </div>
                            <div class="price">Market Price: ₹4,499/-</div>
                        </div>

                        <div class="bs-cost-box">
                            <div class="content-wrapper">
                                <div class="icon">
                                    <img src="assets/images/cost-icon/2.svg" class="img-fluid" alt="icon">
                                </div>

                                <div class="content">
                                    <h3 class="title">SuperShyft Report</h3>
                                    <p class="bs-para typgrey2">
                                        Analyzing and tracking results for 12+ metabolic diseases. This is a proprietary
                                        technology with
                                        over
                                        90% accuracy recommended by doctors
                                    </p>
                                    <div class="price">Value: ₹2,499/-</div>
                                </div>

                            </div>
                            <div class="price">Value: ₹2,499/-</div>
                        </div>

                        <div class="bs-cost-box">
                            <div class="content-wrapper">
                                <div class="icon">
                                    <img src="assets/images/cost-icon/3.svg" class="img-fluid" alt="icon">
                                </div>

                                <div class="content">
                                    <h3 class="title">Lifestyle Recommendations</h3>
                                    <p class="bs-para typgrey2">
                                        Personalized nutrition & live workout sessions.
                                    </p>
                                    <div class="price">Value: ₹1,999/-</div>
                                </div>

                            </div>
                            <div class="price">Value: ₹1,999/-</div>
                        </div>

                    </div>

                    <div class="row text-center">
                        <div class="col-12">
                            <h2 class="bs-heading typ40 typwhite typ-mob-20 mb-4" data-aos="fade" data-aos-delay="300">
                                Yours Today For
                                Only <span class="green">₹1,999/-</span>
                            </h2>

                            <div data-aos="fade" data-aos-delay="300">
                                <a href="https://longevity-bio-ai.supershyft.com/" target="_blank" class="bs-btn">Get Supershyft
                                    Today</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="lyt-section typ-logo-sec">
                <div class="container">
                    <div class="text-center mb-lg-5 mb-4">
                        <h2 class="bs-heading typwhite" data-aos="fade" data-aos-delay="200">Let the Brands speak for
                            us.</h2>
                    </div>

                    <div class="bs-grid-box typ-logo">
                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/1.png" class="img-fluid" alt="logo">
                            </div>
                        </div>
                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/2.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/3.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/4.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/5.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/6.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/7.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/8.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/9.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/10.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/11.png" class="img-fluid" alt="logo">
                            </div>
                        </div>

                        <div class="bs-logo-box" data-aos="fade" data-aos-delay="300">
                            <div class="logo-wrapper">
                                <img src="assets/images/logos/12.png" class="img-fluid" alt="logo">
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>

        <section class="lyt-section typ-testimonial-slider">
            <div class="container">
                <div class="row text-center mb-lg-5 mb-4">
                    <div class="col-12">
                        <h2 class="bs-heading typblack" data-aos="fade" data-aos-delay="200">What Our Clients Say About
                            Us</h2>
                    </div>
                </div>
            </div>

            <div class="swiper testimonial-swiper" data-aos="fade" data-aos-delay="300">
                <div class="swiper-wrapper" data-aos="fade" data-aos-delay="300">
                    <!-- Slide 1 -->
                    <div class="swiper-slide">
                        <div class="bs-testimonial-box">
                            <div class="leftBox">
                                <div class="profile-img">
                                    <div class="lottie-container">
                                        <div class="lottie-container-inner">

                                        </div>
                                        <img src="assets/images/profile/testimonial-img-2.png" class="img-fluid"
                                            alt="person-img">
                                    </div>
                                    <!-- <img src="assets/images/profile/1.png" class="img-fluid" alt="person-img"> -->
                                </div>
                                <div class="profile-content">
                                    <div class="name">Nayan Ratandhayara</div>
                                    <div class="designation">CEO- Shipyaari</div>
                                </div>
                            </div>
                            <div class="rightBox">
                                <div class="quote-img">
                                    <img src="assets/images/quote.svg" class="img-fluid" alt="quote-img">
                                </div>
                                <div class="title">
                                    Lost 7kg & Transformed My Health in Just 45 Days with Supershyft Report!
                                </div>
                                <p class="bs-para">
                                    Fitnastic’s wellness program delivered incredible results-my triglycerides dropped
                                    from 257.3 to 136,
                                    glucose levels improved significantly, and my Vitamin B12 levels doubled. Their
                                    tailored approach
                                    truly revolutionized my health journey!
                                </p>
                            </div>

                            <div class="pattern-img">
                                <img src="assets/images/pattern-1.svg" class="img-fluid" alt="pattern">
                            </div>
                            <div class="pattern-img pattern-img-1">
                                <img src="assets/images/Patterns-2.svg" class="img-fluid" alt="pattern">
                            </div>
                        </div>
                    </div>

                    <!-- Slide 1 -->
                    <div class="swiper-slide">
                        <div class="bs-testimonial-box">
                            <div class="leftBox">
                                <div class="profile-img">
                                    <!-- <img src="assets/images/profile/1.png" class="img-fluid" alt="person-img"> -->
                                    <div class="lottie-container">
                                        <div class="lottie-container-inner">

                                        </div>
                                        <img src="assets/images/profile/testimonial-img-1.png" class="img-fluid"
                                            alt="person-img">
                                    </div>
                                </div>
                                <div class="profile-content">
                                    <div class="name">Viraj Sheth</div>
                                    <div class="designation">CEO - Monk Entertainment</div>
                                </div>
                            </div>
                            <div class="rightBox">
                                <div class="quote-img">
                                    <img src="assets/images/quote.svg" class="img-fluid" alt="quote-img">
                                </div>
                                <div class="title">
                                    Personalized recommendations have helped me make informed lifestyle choices.
                                </div>
                                <p class="bs-para">
                                    I recently did my Bio AI health analysis and was impressed by the clear, in-depth
                                    insights. The report
                                    is easy to understand and a great tool for anyone serious about their health.
                                </p>
                            </div>

                            <div class="pattern-img">
                                <img src="assets/images/pattern-1.svg" class="img-fluid" alt="pattern">
                            </div>
                            <div class="pattern-img pattern-img-1">
                                <img src="assets/images/Patterns-2.svg" class="img-fluid" alt="pattern">
                            </div>
                        </div>
                    </div>

                    <!-- Slide 1 -->
                    <div class="swiper-slide">
                        <div class="bs-testimonial-box">
                            <div class="leftBox">
                                <div class="profile-img">
                                    <!-- <img src="assets/images/profile/1.png" class="img-fluid" alt="person-img"> -->
                                    <div class="lottie-container">
                                        <div class="lottie-container-inner">

                                        </div>
                                        <img src="assets/images/profile/testimonial-img-3.png" class="img-fluid"
                                            alt="person-img">
                                    </div>
                                </div>
                                <div class="profile-content">
                                    <div class="name">Rohan Malhotra</div>
                                    <div class="designation">VP- YRF</div>
                                </div>
                            </div>
                            <div class="rightBox">
                                <div class="quote-img">
                                    <img src="assets/images/quote.svg" class="img-fluid" alt="quote-img">
                                </div>
                                <div class="title">
                                    Advanced analysis from Bio AI tests helped me identify potential health risks early
                                    on!
                                </div>
                                <p class="bs-para">
                                    I had an excellent experience with Fitnastic for my Bio AI Tests. With their
                                    insights, I’ve been able
                                    to take proactive steps to improve my well-being. The process was seamless, and
                                    their expert guidance
                                    made all the difference. I highly recommend them for anyone looking to take charge
                                    of their health.
                                </p>
                            </div>

                            <div class="pattern-img">
                                <img src="assets/images/pattern-1.svg" class="img-fluid" alt="pattern">
                            </div>
                            <div class="pattern-img pattern-img-1">
                                <img src="assets/images/Patterns-2.svg" class="img-fluid" alt="pattern">
                            </div>
                        </div>
                    </div>
                    <!-- Slide 1 -->
                    <div class="swiper-slide">
                        <div class="bs-testimonial-box">
                            <div class="leftBox">
                                <div class="profile-img">
                                    <div class="lottie-container">
                                        <div class="lottie-container-inner">

                                        </div>
                                        <img src="assets/images/profile/testimonial-img-2.png" class="img-fluid"
                                            alt="person-img">
                                    </div>
                                    <!-- <img src="assets/images/profile/1.png" class="img-fluid" alt="person-img"> -->
                                </div>
                                <div class="profile-content">
                                    <div class="name">Nayan Ratandhayara</div>
                                    <div class="designation">CEO- Shipyaari</div>
                                </div>
                            </div>
                            <div class="rightBox">
                                <div class="quote-img">
                                    <img src="assets/images/quote.svg" class="img-fluid" alt="quote-img">
                                </div>
                                <div class="title">
                                    Lost 7kg & Transformed My Health in Just 45 Days with Supershyft Report!
                                </div>
                                <p class="bs-para">
                                    Fitnastic’s wellness program delivered incredible results—my triglycerides dropped
                                    from 257.3 to 136,
                                    glucose levels improved significantly, and my Vitamin B12 levels doubled. Their
                                    tailored approach
                                    truly revolutionized my health journey!
                                </p>
                            </div>

                            <div class="pattern-img">
                                <img src="assets/images/pattern-1.svg" class="img-fluid" alt="pattern">
                            </div>
                            <div class="pattern-img pattern-img-1">
                                <img src="assets/images/Patterns-2.svg" class="img-fluid" alt="pattern">
                            </div>
                        </div>
                    </div>

                    <!-- Slide 1 -->
                    <div class="swiper-slide">
                        <div class="bs-testimonial-box">
                            <div class="leftBox">
                                <div class="profile-img">
                                    <!-- <img src="assets/images/profile/1.png" class="img-fluid" alt="person-img"> -->
                                    <div class="lottie-container">
                                        <div class="lottie-container-inner">

                                        </div>
                                        <img src="assets/images/profile/testimonial-img-1.png" class="img-fluid"
                                            alt="person-img">
                                    </div>
                                </div>
                                <div class="profile-content">
                                    <div class="name">Viraj Sheth</div>
                                    <div class="designation">CEO - Monk Entertainment</div>
                                </div>
                            </div>
                            <div class="rightBox">
                                <div class="quote-img">
                                    <img src="assets/images/quote.svg" class="img-fluid" alt="quote-img">
                                </div>
                                <div class="title">
                                    Personalized recommendations have helped me make informed lifestyle choices.
                                </div>
                                <p class="bs-para">
                                    I recently did my Bio AI health analysis and was impressed by the clear, in-depth
                                    insights. The report
                                    is easy to understand and a great tool for anyone serious about their health.
                                </p>
                            </div>

                            <div class="pattern-img">
                                <img src="assets/images/pattern-1.svg" class="img-fluid" alt="pattern">
                            </div>
                            <div class="pattern-img pattern-img-1">
                                <img src="assets/images/Patterns-2.svg" class="img-fluid" alt="pattern">
                            </div>
                        </div>
                    </div>

                    <!-- Slide 1 -->
                    <div class="swiper-slide">
                        <div class="bs-testimonial-box">
                            <div class="leftBox">
                                <div class="profile-img">
                                    <!-- <img src="assets/images/profile/1.png" class="img-fluid" alt="person-img"> -->
                                    <div class="lottie-container">
                                        <div class="lottie-container-inner">

                                        </div>
                                        <img src="assets/images/profile/testimonial-img-3.png" class="img-fluid"
                                            alt="person-img">
                                    </div>
                                </div>
                                <div class="profile-content">
                                    <div class="name">Rohan Malhotra</div>
                                    <div class="designation">VP- YRF</div>
                                </div>
                            </div>
                            <div class="rightBox">
                                <div class="quote-img">
                                    <img src="assets/images/quote.svg" class="img-fluid" alt="quote-img">
                                </div>
                                <div class="title">
                                    Advanced analysis from Bio AI tests helped me identify potential health risks early
                                    on!
                                </div>
                                <p class="bs-para">
                                    I had an excellent experience with Fitnastic for my Bio AI Tests. With their
                                    insights, I’ve been able
                                    to take proactive steps to improve my well-being. The process was seamless, and
                                    their expert guidance
                                    made all the difference. I highly recommend them for anyone looking to take charge
                                    of their health.
                                </p>
                            </div>

                            <div class="pattern-img">
                                <img src="assets/images/pattern-1.svg" class="img-fluid" alt="pattern">
                            </div>
                            <div class="pattern-img pattern-img-1">
                                <img src="assets/images/Patterns-2.svg" class="img-fluid" alt="pattern">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination testimonial-pagination"></div>

            </div>
        </section>
    </main>


    <!-- footer start -->
    <?php include_once 'view/footer.html' ?>
    <!-- footer end -->

    <!-- js group start -->
    <?php include_once 'view/include_js.html' ?>
    <!-- js group end -->





    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>


    <script>
        gsap.registerPlugin(ScrollTrigger);

        /** ===========================
     * Section 2 Animation (Pinning)
     * =========================== */
        {
            const section2 = document.querySelector('.section2');
            if (section2) {
                const textWrap = section2.querySelector('.text-wrap');
                const diagram = section2.querySelector('.diagram');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section2,
                        start: "top top",
                        end: "+=100%",
                        scrub: 1.5,
                        pin: true,
                    }
                });

                tl.from(textWrap, { opacity: 0, duration: 2 })
                    .to(textWrap, { top: "-100%", transform: "translate(-50%, 0%)", duration: 2.5, opacity: 0 })
                    .to(diagram, { opacity: 1, y: 0, duration: 1 }, "-=0.5");
            }
        }

        /** ===========================
         * Before/After Slider Section
         * =========================== */
        {
            const sliderBox = document.querySelector('.bs-after-befor-box');
            if (sliderBox) {
                const container = sliderBox.querySelector('.container');
                const slider = sliderBox.querySelector('.slider');
                const sliderLine = sliderBox.querySelector('.slider-line');
                const sliderButtonImg = sliderBox.querySelector('.slider-button img');
                const imageBefore = sliderBox.querySelector('.image-before');
                const imageAfter = sliderBox.querySelector('.image-after');

                // Load correct images for mobile/desktop
                function updateImagesForDevice() {
                    const isMobile = window.innerWidth <= 992;
                    if (isMobile) {
                        imageBefore.src = 'assets/images/drag/mob-1.jpg';
                        imageAfter.src = 'assets/images/drag/mob-2.jpg';
                    } else {
                        imageBefore.src = 'assets/images/drag/1.jpg';
                        imageAfter.src = 'assets/images/drag/2.jpg';
                    }
                }
                updateImagesForDevice();
                window.addEventListener('resize', updateImagesForDevice);

                // Slider UI update
                function updateSliderUI(value) {
                    if (value == 0) {
                        container.style.setProperty('--position', `50%`);
                    } else if (value == 100) {
                        container.style.setProperty('--position', `calc(100%)`);
                    } else {
                        container.style.setProperty('--position', `${value}%`);
                    }

                    if (value < 50) {
                        sliderLine.style.background = 'linear-gradient(270.01deg, #063533 0.01%, #33D8D1 100%)';
                        sliderButtonImg.src = 'assets/images/drag/green-button.png';
                    } else {
                        sliderLine.style.background = 'linear-gradient(90deg, #FF4562 0%, #B53A4D 100%)';
                        sliderButtonImg.src = 'assets/images/drag/button.png';
                    }
                }

                // Manual drag / input
                slider.addEventListener('input', (e) => {
                    const value = parseInt(e.target.value, 10);
                    updateSliderUI(value);
                });

                /** ===========================
                 * Autoplay only when .bs-after-befor-box is 50% visible
                 * =========================== */
                let hasAnimated = false;

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (!hasAnimated && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                            hasAnimated = true;
                            startAutoplay();
                        }
                    });
                }, {
                    threshold: buildThresholdList()
                });

                observer.observe(sliderBox);

                // Helper: More granular thresholds to catch 0.5 intersectionRatio reliably
                function buildThresholdList() {
                    let thresholds = [];
                    for (let i = 0; i <= 100; i++) {
                        thresholds.push(i / 100);
                    }
                    return thresholds;
                }

                // Autoplay animation
                function startAutoplay() {
                    const start = 100;
                    const end = 0;
                    const duration = 4000;
                    const startTime = performance.now();

                    function animate(time) {
                        const elapsed = time - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const value = Math.round(start + (end - start) * progress);

                        slider.value = value;
                        updateSliderUI(value);

                        // Keep manual interaction intact by firing input event
                        slider.dispatchEvent(new Event('input', { bubbles: true }));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    }

                    requestAnimationFrame(animate);
                }
            }
        }



        /** ===========================
         * Step Section Scroll Animation
         * =========================== */
        {
            function initStepSection(section) {
                const contentBoxes = section.querySelectorAll(".content-box");
                const steps = section.querySelectorAll(".step");
                let currentIndex = 0;

                // Initialize first step
                setActive(0);

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${window.innerHeight * contentBoxes.length}`,
                        pin: true,
                        scrub: true,
                        anticipatePin: 1,
                        pinSpacing: true
                    }
                });

                contentBoxes.forEach((_, index) => {
                    tl.to({}, {
                        duration: 1,
                        onStart: () => {
                            currentIndex = index;
                            setActive(index);
                        },
                        onReverseComplete: () => {
                            currentIndex = index;
                            setActive(index);
                        },
                    });
                });

                // Add click functionality to content boxes
                contentBoxes.forEach((box, index) => {
                    box.style.cursor = "pointer";
                    box.addEventListener("click", () => {
                        if (currentIndex !== index) {
                            setActive(index);
                            currentIndex = index;
                        }
                    });
                });

                function setActive(index) {
                    contentBoxes.forEach((box, i) => box.classList.toggle("active", i === index));
                    steps.forEach((step, i) => {
                        const video = step.querySelector("video");
                        step.classList.toggle("active", i === index);
                        if (video) {
                            if (i === index) {
                                video.play().catch(() => {
                                    // Autoplay might be blocked, video will play when user interacts
                                });
                            } else {
                                video.pause();
                                video.currentTime = 0;
                            }
                        }
                    });
                }
            }

            if (window.innerWidth >= 1025) {
                document.querySelectorAll(".step-section").forEach(initStepSection);
            }
        }

        /** ===========================
         * Random Active for Mobile Logos
         * =========================== */
        {
            const isMobile = window.innerWidth <= 992;
            if (isMobile) {
                function setRandomActive(selector = '.bs-logo-box', activeClass = 'active') {
                    const elements = document.querySelectorAll(selector);
                    if (!elements.length) return;

                    elements.forEach(el => el.classList.remove(activeClass));
                    const randomIndex = Math.floor(Math.random() * elements.length);
                    elements[randomIndex].classList.add(activeClass);
                }

                setInterval(() => setRandomActive('.bs-logo-box'), 2000);
            }
        }

        /** ===========================
         * Mobile Step Section Scroll Animation
         * =========================== */
        {
            const howSuperShftSection = document.querySelector("#howSuperShftSection");
            if (howSuperShftSection) {
                let dots = gsap.utils.toArray(".pagination-dots .dot");
                let sections = gsap.utils.toArray(".mobile-step-section .panel");
                let videos = gsap.utils.toArray(".mobile-video-wrapper .mobile-video");
                let currentMobileIndex = 0;

                // Initialize first step as active
                updateMobileStep(0);

                // Initialize first panel
                sections[0].classList.add('active-panel');
                
                // Create timeline for one-by-one animation
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: howSuperShftSection,
                        pin: true,
                        markers: false,
                        scrub: 1,
                        snap: 1 / (sections.length - 1),
                        end: () => "+=" + (window.innerHeight * sections.length),
                        onUpdate: (self) => {
                            let index = Math.round(self.progress * (sections.length - 1));
                            if (currentMobileIndex !== index) {
                                currentMobileIndex = index;
                                updateMobileStep(index);
                            }
                        }
                    }
                });

                // Animate each section sliding up one by one
                sections.forEach((section, index) => {
                    if (index > 0) {
                        tl.to(sections[index - 1], {
                            y: "-100%",
                            opacity: 0,
                            duration: 1,
                            ease: "power2.inOut"
                        }, index)
                        .fromTo(sections[index], {
                            y: "100%",
                            opacity: 0
                        }, {
                            y: "0%",
                            opacity: 1,
                            duration: 1,
                            ease: "power2.inOut",
                            onStart: () => {
                                sections[index].classList.add('active-panel');
                                sections[index - 1].classList.remove('active-panel');
                            }
                        }, index);
                    }
                });

                // Add click functionality to mobile panels
                sections.forEach((panel, index) => {
                    panel.style.cursor = "pointer";
                    panel.addEventListener("click", () => {
                        if (currentMobileIndex !== index) {
                            updateMobileStep(index);
                            currentMobileIndex = index;
                        }
                    });
                });

                // Add click functionality to dots
                dots.forEach((dot, index) => {
                    dot.style.cursor = "pointer";
                    dot.addEventListener("click", () => {
                        if (currentMobileIndex !== index) {
                            updateMobileStep(index);
                            currentMobileIndex = index;
                        }
                    });
                });

                function updateMobileStep(index) {
                    sections.forEach((section, i) => {
                        section.classList.toggle('active-panel', i === index);
                    });
                    
                    videos.forEach((vid, i) => {
                        vid.style.opacity = i === index ? 1 : 0;
                        vid.style.pointerEvents = i === index ? "auto" : "none";
                    });

                    dots.forEach((dot, i) => {
                        dot.classList.toggle("active", i === index);
                    });
                }

                ScrollTrigger.refresh();
            }
        }
    </script>

<!-- <script>
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");


  setTimeout(() => {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); 
  }, 3000); 
});


</script> -->
<script>
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    // Add fade-out animation
    loader.classList.add("fade-out");

    // Wait for fade animation to complete, then hide
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // 0.5s fade-out duration
  });
</script>
</body>

</html>