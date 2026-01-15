<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->

<head>
    <title>Supershyft Blog | Precision Nutrition Insights</title>
    <meta name="description" content="Explore the Supershyft blog for deep-dives on precision nutrition, metabolic risk forecasting, and how Bio AI personalizes your health journey.">
    <meta property="og:title" content="Supershyft Blog | Precision Nutrition Insights">
    <meta property="og:description" content="Discover how precision nutrition and Bio AI work together to transform health outcomes. Read Supershyft's latest insights and guides.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.supershyft.com/blogs.php">
    <meta property="og:image" content="https://www.supershyft.com/assets/images/meta-thumbnail.jpg">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="canonical" href="https://www.supershyft.com/blogs.php">
    <!-- css group start -->
    <?php include_once 'view/include_css.html'; ?>
    <!-- css group end -->

    <style>
        :root {
            --blog-dark: #0b2c2a;
            --blog-dark-2: #0f3f38;
            --blog-green: #0f473f;
            --blog-light: #f9fbfb;
            --blog-rose: #cc203b;
            --blog-rose-light: #ff4b65;
            --blog-amber: #ffb347;
            --blog-sand: #f6ede6;
            --blog-border: #dbe7e4;
            --blog-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
            --blog-radius-lg: 32px;
            --blog-radius-md: 20px;
            --blog-radius-sm: 14px;
        }

        html {
            scroll-behavior: smooth;
        }

        body.blogs-page {
            background: linear-gradient(180deg, #f7fdfc 0%, #f4f7f6 35%, #eef3f2 100%);
            color: #0f2220;
            font-family: 'Sora', sans-serif;
            font-size: 18px;
        }

        /* Headers with DM Sans */
        h1, h2, h3, h4, h5, h6,
        .blog-hero h1,
        .section-title h2,
        .hero-card h3,
        .info-card h3,
        .feature-item h3 {
            font-family: 'DM Sans', sans-serif;
        }

        h1, h2 {
            color: #FFF;
            font-family: "DM Sans" !important;
            font-size: 40px;
            font-style: normal;
            font-weight: 600;
            line-height: 30.026px;
        }

        h3 {
            font-family: "DM Sans" !important;
            font-weight: 600 !important;
        }

        p, .blog-author, .blog-hero p.lead, .section-title p {
            font-size: 18px;
            font-weight: 400 !important;
        }

        strong, b {
            font-weight: 500 !important;
        }

        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        

        .blog-hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            padding-left: 40px;
            padding-bottom: 70px;
            padding-right: 30px;
            background: url('assets/images/blogs/Rectangle.png') center/cover no-repeat;
            color: #fff;
            text-align: left;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
        }

        .blog-hero::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
            pointer-events: none;
        }

        .blog-hero .container {
            position: relative;
            z-index: 1;
            max-width: none;
            padding: 0;
        }

        .blog-hero .content-grid {
            display: block;
            max-width: 1400px;
        }

        .pill-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 16px;
        }

        .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            font-size: 13px;
            letter-spacing: 0.2px;
        }

        .pill .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ffb347;
            display: inline-block;
        }

        .blog-hero h1 {
            font-family: 'DM Serif Text', serif;
            font-size: clamp(32px, 3.5vw, 44px);
            line-height: 1.15;
            margin-bottom: 12px;
            letter-spacing: -0.5px;
            white-space: nowrap;
        }

        .blog-author {
            font-size: 16px;
            color: #f3f8f7;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .blog-hero p.lead {
            font-size: 14px;
            margin: 0 0 32px;
            color: #f3f8f7;
            line-height: 1.55;
        }

        .blog-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 24px;
            margin-bottom: 0;
            padding-top: 0;
            border-top: none;
            max-width: 100%;
        }

        .blog-tab {
            display: flex;
            padding: 6px 18px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border-radius: 26843500px;
            border: 1px solid #FFF;
            background: transparent;
            color: #FFF;
            text-align: center;
            font-family: Sora;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .blog-tab:hover {
            border-radius: 26843500px;
            border: 1px solid #C4C4C4;
            background: linear-gradient(90deg, #FFF 0%, #C4C4C4 100%);
            color: #0b2c2a;
        }

        .blog-tab.active {
            background: #cc203b;
            border-color: #cc203b;
            color: #fff;
        }

        .cta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 19px;
            align-items: center;
        }

        .cta-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 20px;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: linear-gradient(135deg, #ff4b65 0%, #cc203b 100%);
            color: #fff;
            font-weight: 600;
            letter-spacing: 0.2px;
            box-shadow: 0 14px 30px rgba(204, 32, 59, 0.25);
        }

        .cta-btn.secondary {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.22);
            color: #fff;
            box-shadow: none;
        }

        .hero-card {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: var(--blog-radius-lg);
            padding: 22px;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(6px);
        }

        .hero-card h3 {
            font-size: 30px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .hero-card p {
            margin: 0 0 12px;
            color: #f3f8f7;
            line-height: 1.55;
        }

        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
        }

        .stat {
            padding: 12px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.14);
            font-size: 14px;
            color: #fff;
        }

        .blog-section {
            padding: 20px 0;
        }

        /* Ensure in-page anchor navigation accounts for sticky header */
        section[id], h2[id] {
            scroll-margin-top: 100px;
        }

        .section-title {
            max-width: 840px;
            margin: 0 auto 20px;
            text-align: center;
        }

        .section-title h2 {
            font-family: 'DM Serif Text', serif;
            font-size: clamp(26px, 3vw, 34px);
            color: var(--blog-dark);
            margin-bottom: 14px;
        }

        .section-title p {
            margin: 0;
            color: #42524e;
            font-size: 16px;
        }

        .quote-card {
            background: linear-gradient(135deg, #fbe9e6 0%, #fff 100%);
            border: 1px solid #f3d1cb;
            box-shadow: var(--blog-shadow);
            border-radius: var(--blog-radius-lg);
            padding: 28px;
            margin-top: -40px;
        }

        .quote-card p {
            font-size: 16px;
            color: #2c3835;
            margin: 0 0 12px;
            line-height: 1.6;
        }

        .quote-card strong { color: var(--blog-dark); }

        .quote-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            color: #cc203b;
            font-weight: 700;
            font-size: 14px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 18px;
        }

        .info-card {
            padding: 22px;
            background: #fff;
            border-radius: var(--blog-radius-md);
            border: 1px solid var(--blog-border);
            box-shadow: 0 16px 32px rgba(6, 53, 51, 0.06);
        }

        .info-card h3 {
            font-size: 18px;
            margin-bottom: 10px;
            color: var(--blog-dark);
        }

        .info-card p {
            margin: 0;
            color: #4a5b57;
            line-height: 1.55;
        }

        .badge-rose {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(204, 32, 59, 0.12);
            color: #cc203b;
            font-weight: 700;
            font-size: 12px;
            letter-spacing: 0.3px;
            margin-bottom: 10px;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
        }

        .feature-card {
            padding: 18px 18px 16px;
            border-radius: var(--blog-radius-md);
            background: linear-gradient(145deg, #fff 0%, #f7fbfb 100%);
            border: 1px solid var(--blog-border);
            box-shadow: 0 12px 26px rgba(12, 92, 80, 0.08);
        }

        .feature-card h4 {
            font-size: 15px;
            margin: 0 0 6px;
            color: var(--blog-dark);
        }

        .feature-card p { margin: 0; color: #4a5b57; font-size: 14px; }

        .tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 10px;
            border-radius: 10px;
            background: #0f473f;
            color: #fff;
            font-size: 12px;
            margin-bottom: 10px;
        }

        .two-column {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            align-items: center;
        }

        .image-tile {
            width: 100%;
            min-height: 260px;
            border-radius: var(--blog-radius-lg);
            background: linear-gradient(120deg, #fff 0%, #f1f6f5 100%);
            border: 1px solid var(--blog-border);
            box-shadow: var(--blog-shadow);
            position: relative;
            overflow: hidden;
        }

        .image-tile::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(90% 90% at 20% 20%, rgba(204, 32, 59, 0.16) 0%, rgba(204, 32, 59, 0) 40%),
                radial-gradient(70% 70% at 80% 10%, rgba(15, 71, 63, 0.2) 0%, rgba(15, 71, 63, 0) 45%);
        }

        .table-wrap {
            background: #fff;
            border-radius: var(--blog-radius-lg);
            border: 1px solid var(--blog-border);
            box-shadow: 0 18px 32px rgba(12, 92, 80, 0.09);
            overflow: hidden;
        }

        .blog-table {
            width: 100%;
            border-collapse: collapse;
        }

        .blog-table th, .blog-table td {
            padding: 14px 16px;
            border-bottom: 1px solid #e9f0ee;
            font-size: 14px;
            line-height: 1.5;
        }

        .blog-table th { background: #f7fbfb; color: #0f3f38; }

        .blog-table td:first-child, .blog-table th:first-child { font-weight: 700; color: #0f2220; }

        .list-columns {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 16px;
        }

        .list-box {
            background: #fff;
            border: 1px solid var(--blog-border);
            border-radius: var(--blog-radius-md);
            padding: 18px;
            box-shadow: 0 14px 26px rgba(11, 44, 42, 0.07);
        }

        .list-box h4 { margin: 0 0 10px; font-size: 15px; color: var(--blog-dark); }

        .list-box ul { margin: 0; padding-left: 18px; color: #42524e; line-height: 1.55; }

        .cta-section {
            background: linear-gradient(135deg, #0f473f 0%, #08302d 100%);
            color: #fff;
            padding: 50px 0;
            border-radius: var(--blog-radius-lg);
            position: relative;
            overflow: hidden;
        }

        .cta-section::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(80% 80% at 20% 10%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%);
        }

        .cta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
            margin-top: 22px;
        }

        .quote-block {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            align-self: stretch;
            border-radius: 12.511px;
            border-left: 5.004px solid #CC203B;
            background: #FFF;
            padding: 32px;
            margin-bottom: 60px;
            position: relative;
            gap: 32px;
        }

        .quote-icon-img {
            display: none;
        }

        .quote-block::before {
            content: '"';
            background: linear-gradient(180deg, #CC203B 0%, #FA3A58 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-family: 'Times New Roman', serif;
            font-size: 128px;
            font-weight: bold;
            line-height: 147px;
            height: 147px;
            width: 64px;
            flex-shrink: 0;
            letter-spacing: -5.12px;
        }

        .quote-block p {
            color: #000;
            font-family: "DM Sans";
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin: 0;
            flex: 1;
        }

        .feature-grid-2x2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            margin-bottom: 40px;
        }

        .feature-item {
            background: #f5f5f5;
            padding: 32px;
            border-radius: 16px;
            text-align: left;
        }

        .feature-item-icon {
            font-size: 28px;
            margin-bottom: 12px;
        }

        .feature-item h3 {
            font-size: 25px;
            color: #cc203b;
            margin: 0 0 12px 0;
            font-weight: 700;
        }

        .feature-item p {
            font-size: 20px;
            color: #666;
            line-height: 1.55;
            margin: 0;
        }

        .banner-quote {
            background: linear-gradient(135deg, #cc203b 0%, #0f473f 100%);
            color: #fff;
            padding: 36px 40px;
            border-radius: 16px;
            text-align: center;
            font-size: 18px;
            line-height: 1.6;
            font-weight: 600;
        }

        @media (max-width: 767px) {
            .feature-grid-2x2 {
                grid-template-columns: 1fr;
            }
            .quote-block {
                padding: 24px;
            }
            .feature-item {
                padding: 20px;
            }
        }
            margin-top: 24px;
            font-size: 13px;
            color: #dbe7e4;
        }

        @media (max-width: 991px) {
            .blog-hero { padding-top: 110px; }
            .quote-card { margin-top: -40px; }
        }

        @media (max-width: 767px) {
            .blog-hero { min-height: 70vh; padding: 90px 0 70px; }
            .cta-row { flex-direction: column; align-items: flex-start; }
            .blog-section { padding: 45px 0; }
            .quote-card { margin-top: -20px; padding: 22px; }
        }
    </style>
</head>

<body class="blogs-page">
    <!-- header start -->
    <?php include_once 'view/header.html'; ?>
    <!-- header end -->

    <main class="blog-wrapper">
        <section class="blog-hero">
            <div class="container">
                <div class="content-grid">
                    <h1>Precision Nutrition vs Personalized Nutrition</h1>
                    <p class="blog-author">What's the Difference - And Why It Matters for Your Health Journey<br><strong>- Ronak Agrawal</strong></p>

                    
                    <div class="blog-tabs">
                        <a class="blog-tab" href="#precision-insights">What is Precision Nutrition</a>
                        <a class="blog-tab" href="#what-is-personalized-nutrition">What is Personalized Nutrition</a>
                        <a class="blog-tab" href="#key-differences">Precision vs Personalised: Key Differences</a>
                        <a class="blog-tab" href="#how-supershyft">How SuperShyft Uses Precision Nutrition</a>
                        <a class="blog-tab" href="#why-matters">Why This Distinction Matters</a>
                        <a class="blog-tab" href="#supershyft-edge">The SuperShyft Edge: Blending Both Worlds</a>
                        <a class="blog-tab" href="#summary">Summary: in a Nutshell</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="blog-section" style="background: url('assets/images/blogs/bg2.png') center/cover no-repeat;"id="precision-insights">
            <div class="container">
                <div class="quote-block">
                    <img src="assets/images/blogs/quote-icon.png" alt="Quote mark" class="quote-icon-img">
                    <p>If you're exploring nutrition options through SuperShyft you may wonder: What's the difference between precision nutrition and personalized nutrition? While the terms are often used interchangeably, they actually represent different philosophies and methods – and understanding those can help you make smarter wellness decisions.</p>
                </div>

                <h2 style="color: #FFF; font-family: 'DM Sans'; font-size: 40px; font-weight: 600; line-height: 30.026px; margin: 40px 0 20px 0;">What Is Precision Nutrition?</h2>
                <p style="color: #dbe7e4; font-size: 18px; line-height: 1.6; margin-bottom: 40px;">Precision nutrition is a cutting-edge approach that goes beyond traditional dietary guidelines. Rather than relying on broad, population-level recommendations, precision nutrition uses detailed biological data to tailor nutritional guidance to an individual's unique metabolic and health profile.</p>

                <div class="feature-grid-2x2">
                    <div class="feature-item">
                        
                        <h3>🔬Biomarker Analysis</h3>
                        <p>Measuring blood biomarkers, hormones, lipids, and other physiological indicators.</p>
                    </div>
                    <div class="feature-item">
                        
                        <h3>📊Data-Driven Insights</h3>
                        <p>Using AI and predictive models to interpret your biomarker data.</p>
                    </div>
                    <div class="feature-item">
                        
                        <h3>⚡Metabolic Risk Forecasting</h3>
                        <p>Identifying early signs of conditions before they become serious health issues.</p>
                    </div>
                    <div class="feature-item">
                        
                        <h3>🎯Lifestyle Integration</h3>
                        <p>Translating biological insights into actionable dietary plans and behavior coaching.</p>
                    </div>
                </div>

                <div class="banner-quote">
                    "Precision Nutrition's strength lies in its science-first, predictive, and highly individualized approach. It's about knowing – based on your biology – what foods and habits might benefit you most."
                </div>
            </div>
        </section>

        <section class="blog-section" id="what-is-personalized-nutrition" style="padding: 48px 0;">
            <div class="container">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: flex-start; margin-bottom: 48px;">
                    <div style="display: flex; flex-direction: column; gap: 32px;">
                        <h2 style="font-family: 'DM Sans'; font-size: 40px; font-weight: 600; line-height: 30.026px; color: #000; margin: 0;">What Is Personalized Nutrition?</h2>
                        <p style="font-family: 'Sora'; font-size: 18px; font-weight: 400; line-height: 30.026px; color: #000; margin: 0;">Personalized nutrition emphasizes tailoring dietary recommendations around your preferences, goals, and lifestyle. While it often incorporates data such as dietary history or habits, it may not rely as heavily on in-depth biological measurements.</p>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <img src="https://www.figma.com/api/mcp/asset/2400c5cb-7ed9-4a01-a933-49563bb72b3d" alt="Personalized Nutrition" style="width: 555px; height: 311px; border-radius: 10px; object-fit: cover; transform: rotate(180deg);">
                    </div>
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 36px; justify-content: center;">
                    <div style="display: flex; width: 560px; padding: 32px; flex-direction: column; align-items: flex-start; gap: 16px; border-radius: 24px; border: 1px solid #CC203B; background: linear-gradient(277deg, #CEC9C9 -30.55%, #FFF 34.22%, #FFF 65.77%, #CEC9C9 126.99%);">
                        <h3 style="color: #cc203b; font-family: 'DM Sans'; font-size: 24px; font-weight: 500; line-height: 28.18px; margin: 0;">🎯  Goal-Oriented Planning</h3>
                        <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: 32px; letter-spacing: 0.32px; color: #505050; margin: 0;">Building nutrition plans around what you want to achieve - weight loss, muscle gain, or more energy.</p>
                    </div>
                    <div style="display: flex; width: 560px; padding: 32px; flex-direction: column; align-items: flex-start; gap: 16px; border-radius: 24px; border: 1px solid #CC203B; background: linear-gradient(277deg, #CEC9C9 -30.55%, #FFF 34.22%, #FFF 65.77%, #CEC9C9 126.99%);">
                        <h3 style="color: #cc203b; font-family: 'DM Sans'; font-size: 24px; font-weight: 500; line-height: 28.18px; margin: 0;">🧠  Behavioral Focus</h3>
                        <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: 32px; letter-spacing: 0.32px; color: #505050; margin: 0;">Encouraging habit-based changes, from portion control to mindful eating.</p>
                    </div>
                    <div style="display: flex; width: 560px; padding: 32px; flex-direction: column; align-items: flex-start; gap: 16px; border-radius: 24px; border: 1px solid #CC203B; background: linear-gradient(277deg, #CEC9C9 -30.55%, #FFF 34.22%, #FFF 65.77%, #CEC9C9 126.99%);">
                        <h3 style="color: #cc203b; font-family: 'DM Sans'; font-size: 24px; font-weight: 500; line-height: 28.18px; margin: 0;">🔄  Flexibility</h3>
                        <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: 32px; letter-spacing: 0.32px; color: #505050; margin: 0;">Your plan adjusts as your circumstances change - travel, stress, work, or family life.</p>
                    </div>
                    <div style="display: flex; width: 560px; padding: 32px; flex-direction: column; align-items: flex-start; gap: 16px; border-radius: 24px; border: 1px solid #CC203B; background: linear-gradient(277deg, #CEC9C9 -30.55%, #FFF 34.22%, #FFF 65.77%, #CEC9C9 126.99%);">
                        <h3 style="color: #cc203b; font-family: 'DM Sans'; font-size: 24px; font-weight: 500; line-height: 28.18px; margin: 0;">👥  Human Coaching</h3>
                        <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: 32px; letter-spacing: 0.32px; color: #505050; margin: 0;">Regular interaction with a coach who uses behavior change principles to help you stick to your plan.</p>
                    </div>
                </div>
            </div>
        </section>

        

        

        <section class="blog-section" id="key-differences" style="background: url('assets/images/blogs/bg2.png') center/cover no-repeat; padding: 48px 85px;">
            <div style="display: flex; flex-direction: column; gap: 48px;">
                <div style="display: flex; flex-direction: column; gap: 48px;">
                    <h2 style="color: #FFF; font-family: 'DM Sans'; font-size: 40px; font-weight: 600; line-height: 30.026px; margin: 0;">Precision vs Personalized: Key Differences</h2>
                    
                    <div style="padding: 32px; border-radius: 24px; box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25); background: linear-gradient(276deg, #CEC9C9 0%, #FFF 25.2%, #FFF 48.5%, #FFF 73.13%, #CEC9C9 100%); overflow: hidden; display: flex; flex-direction: column; gap: 16px; position: relative;">
                        <!-- Continuous vertical lines -->
                        <div style="position: absolute; left: 238px; top: 50px; bottom: 32px; width: 1px; background: rgba(0, 0, 0, 0.2);"></div>
                        <div style="position: absolute; left: 712px; top: 50px; bottom: 32px; width: 1px; background: rgba(0, 0, 0, 0.2);"></div>
                        
                        <div style="border-radius: 12.511px ; display: flex; flex-direction: column; overflow: hidden;border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
                            <div style="padding: 28px 25px; display: grid; grid-template-columns: 213px 474px 534px; background: transparent;">
                                <p style="color: #063533; font-family: 'DM Sans'; font-size: 28px; font-style: SemiBold; font-weight: 600; line-height: 30.026px; margin: 0;"><strong >Aspect</strong></p>
                                <p style="color: #063533; font-family: 'DM Sans'; font-size: 28px; font-style: SemiBold; font-weight: 600; line-height: 30.026px; margin: 0;"><strong>Precision Nutrition</strong></p>
                                <p style="color: #063533; font-family: 'DM Sans'; font-size: 28px; font-style: SemiBold; font-weight: 600; line-height: 30.026px; margin: 0;"><strong>Personalized Nutrition</strong></p>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column;">
                            <div style="padding: 22px 25px; display: grid; grid-template-columns: 213px 474px 534px; border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
                                <p style="color: #063533; font-family: 'DM Sans'; font-size: 24px; font-style: normal; font-weight: 600; line-height: 30.026px; margin: 0;"><strong>Data Depth</strong></p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0;">Deep biological data (blood <br> biomarkers, metabolic risk)</p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0;">Lifestyle and preference data, possibly some <br> blood data, but less intensive</p>
                            </div>
                            
                            <div style="padding: 24px 25px; display: grid; grid-template-columns: 213px 474px 534px; border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
                                <p style="color: #063533; font-family: 'DM Sans'; font-size: 24px; font-style: normal; font-weight: 600; line-height: 30.026px; margin: 0;"><strong>Predictive Capability</strong></p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0; align-self: center;">High - forecasts future health risks</p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0; align-self: center;">Moderate - based on current habits and goals</p>
                            </div>
                            
                            <div style="padding: 25px 25px; display: grid; grid-template-columns: 213px 474px 534px; border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
                                <div style="align-self: center;">
                                    <p style="color: #063533; font-family: 'DM Sans'; font-size: 24px; font-style: normal; font-weight: 600; line-height: 30.026px; margin: 0;"><strong>Plan <br> Specificity</strong></p>
                                </div>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0;">Very specific nutrition + <br> lifestyle recommendations</p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0; align-self: center;">Flexible, goal- and habit-based plans</p>
                            </div>
                            
                            <div style="padding: 42px 25px; display: grid; grid-template-columns: 213px 474px 534px; border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
                                <p style="color: #063533; font-family: 'DM Sans'; font-size: 24px; font-style: normal; font-weight: 600; line-height: 30.026px; margin: 0; align-self: center;"><strong>Scalability</strong></p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0; align-self: center;">Requires lab infrastructure, AI systems</p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0;">Easier to scale with human coaching, fewer<br> diagnostic tests</p>
                            </div>
                            
                            <div style="padding: 42px 25px; display: grid; grid-template-columns: 213px 474px 534px;">
                                <p style="color: #063533; font-family: 'DM Sans'; font-size: 24px; font-style: normal; font-weight: 600; line-height: 30.026px; margin: 0; align-self: center;"><strong>Use Case</strong></p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0;">Ideal for early detection of metabolic <br> issues, preventive health</p>
                                <p style="font-family: 'DM Sans'; font-size: 20.017px; font-weight: 400; line-height: 30.026px; color: #0a0a0a; margin: 0;">Best for behavior change, sustainable eating,<br> long-term adherence</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="how-supershyft" style="display: flex; flex-direction: column; gap: 16px; border-radius: 17.515px;">
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <h2 style="font-family: 'DM Sans'; font-size: 40px; font-weight: 600; line-height: 30.026px; color: #FFF; margin: 0;">How SuperShyft Uses Precision Nutrition</h2>
                        <p style="font-family: 'Sora'; font-size: 18px; font-weight: 400; line-height: 30.026px; color: #FFF; margin: 0;">SuperShyft builds its model on precision health — not just nutrition. Here's how it applies precision principles:</p>
                    </div>
                    
                    <div style="display: flex; flex-direction: column;">
                        <div style="padding: 15px 0; display: flex; gap: 16px; align-items: center;">
                            <span style="color: #FFF; font-family: Arial; font-size: 20.017px; line-height: 30.026px;">✓</span>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <p style="font-family: 'Sora'; font-size: 20px; font-weight: 600; line-height: normal; color: #FFF; margin: 0;">Bio AI Testing:</p>
                                <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: normal; color: #FFF; margin: 0;">Comprehensive blood test measuring 88+ biomarkers</p>
                            </div>
                        </div>
                        
                        <div style="padding: 15px 0; display: flex; gap: 16px; align-items: center;">
                            <span style="color: #FFF; font-family: Arial; font-size: 20.017px; line-height: 30.026px;">✓</span>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <p style="font-family: 'Sora'; font-size: 20px; font-weight: 600; line-height: normal; color: #FFF; margin: 0;">Risk Prediction:</p>
                                <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: normal; color: #FFF; margin: 0;">Algorithms assess risk for a dozen+ metabolic conditions</p>
                            </div>
                        </div>
                        
                        <div style="padding: 15px 0; display: flex; gap: 16px; align-items: center;">
                            <span style="color: #FFF; font-family: Arial; font-size: 20.017px; line-height: 30.026px;">✓</span>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <p style="font-family: 'Sora'; font-size: 20px; font-weight: 600; line-height: normal; color: #FFF; margin: 0;">Customized Lifestyle Plan:</p>
                                <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: normal; color: #FFF; margin: 0;">Nutrition and workout strategy tailored to your metabolic profile</p>
                            </div>
                        </div>
                        
                        <div style="padding: 15px 0; display: flex; gap: 16px; align-items: center;">
                            <span style="color: #FFF; font-family: Arial; font-size: 20.017px; line-height: 30.026px;">✓</span>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <p style="font-family: 'Sora'; font-size: 20px; font-weight: 600; line-height: normal; color: #FFF; margin: 0;">Ongoing Testing & Feedback:</p>
                                <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: normal; color: #FFF; margin: 0;">Periodic testing to track biomarker changes</p>
                            </div>
                        </div>
                        
                        <div style="padding: 15px 0; display: flex; gap: 16px; align-items: center;">
                            <span style="color: #FFF; font-family: Arial; font-size: 20.017px; line-height: 30.026px;">✓</span>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <p style="font-family: 'Sora'; font-size: 20px; font-weight: 600; line-height: normal; color: #FFF; margin: 0;">High Accuracy:</p>
                                <p style="font-family: 'Sora'; font-size: 16px; font-weight: 400; line-height: normal; color: #FFF; margin: 0;">Over 92% accuracy in metabolic assessments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="blog-section" id="why-matters">
            <div class="container">
                <div style="width: 100%; height: 100%; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 24px; display: inline-flex; margin: 40px 0 48px 5px;">
                    <div style="color: black; font-size: 40px; font-family: DM Sans; font-weight: 600; line-height: 30.03px; word-wrap: break-word; margin-bottom: 16px;">Why This Distinction Matters</div>
                    <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
                        <div style="flex: 1 1 0; color: black; font-size: 18px; font-family: Sora; font-weight: 400; line-height: 30.03px; word-wrap: break-word">Choosing between precision and personalized nutrition isn't just semantics — it affects how effective, long-lasting, and health-focused your wellness journey can be.</div>
                    </div>
                </div>
                <div class="feature-grid-2x2", style="margin-left: 70px; margin-right: 70px">
                    <div style="padding: 30px; background: linear-gradient(90deg, #e0e0e0 0%, #ffffff 50%, #e0e0e0 100%); border: 2px solid #e0e0e0; border-radius: 20px; border-radius: 24px; outline: 1px rgba(204, 32, 59, 0.50) solid;">
                        <h3 style="color: #cc203b; font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">🛡️</span> Preventative Power
                        </h3>
                        <p style="font-size: 14px; line-height: 1.6; color: #555;">Detect early metabolic risks before they manifest as disease.</p>
                    </div>
                    <div style="padding: 30px; background: linear-gradient(90deg, #e0e0e0 0%, #ffffff 50%, #e0e0e0 100%); border: 2px solid #e0e0e0; border-radius: 20px; border-radius: 24px; outline: 1px rgba(204, 32, 59, 0.50) solid;">
                        <h3 style="color: #cc203b; font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">🎯</span> Tailored Interventions
                        </h3>
                        <p style="font-size: 14px; line-height: 1.6; color: #555;">Data-backed insights aligned with your biology and risk profile.</p>
                    </div>
                    <div style="padding: 28px; background: linear-gradient(90deg, #e0e0e0 0%, #ffffff 50%, #e0e0e0 100%); border: 2px solid #e0e0e0; border-radius: 20px; border-radius: 24px; outline: 1px rgba(204, 32, 59, 0.50) solid;">
                        <h3 style="color: #cc203b; font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">💪</span> Behavioral Sustainability
                        </h3>
                        <p style="font-size: 14px; line-height: 1.6; color: #555;">Plans that fit your life, habits, and daily reality.</p>
                    </div>
                    <div style="padding: 28px; background: linear-gradient(90deg, #e0e0e0 0%, #ffffff 50%, #e0e0e0 100%); border: 2px solid #e0e0e0; border-radius: 20px; border-radius: 24px; outline: 1px rgba(204, 32, 59, 0.50) solid;">
                        <h3 style="color: #cc203b; font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px;">📈</span> Long-Term Tracking
                        </h3>
                        <p style="font-size: 14px; line-height: 1.6; color: #555;">Combine both approaches for optimal outcomes.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="blog-section">
            <div class="container">
                <div style="border:1px solid; width: 100%; height: 100%; padding-left: 64px; padding-right: 64px; padding-top: 32px; padding-bottom: 32px; background: white; border-radius: 16px; border-left: 5px #CC203B solid; flex-direction: column; justify-content: center; align-items: center; gap: 24px; display: inline-flex">
                    <div style="align-self: stretch; height: 30.03px; position: relative">
                        <div style="left: 0px; top: -2.75px; position: absolute; color: #CC203B; font-size: 32px; font-family: DM Sans; font-weight: 400; line-height: 30.03px; word-wrap: break-word; background: var(--Gradient-1, linear-gradient(90deg, #CC203B 0%, #063533 100%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;">Questions to Ask When Choosing Your Approach</div>
                    </div>
                    <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
                        <div style="align-self: stretch; padding-left: 9px; padding-right: 9px; padding-top: 12px; padding-bottom: 12px; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                            <img src="assets/images/blogs/clarity_dot-circle-line@2x.png" alt="bullet" style="width: 18px; height: 18px; flex-shrink: 0;">
                            <div style="color: #CC203B; font-size: 18px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">Have you experienced recurring health issues like high blood sugar or lipid imbalance?</div>
                        </div>
                        <div style="align-self: stretch; padding-left: 9px; padding-right: 9px; padding-top: 12px; padding-bottom: 12px; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                            <img src="assets/images/blogs/clarity_dot-circle-line@2x.png" alt="bullet" style="width: 18px; height: 18px; flex-shrink: 0;">
                            <div style="color: #CC203B; font-size: 18px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">Is early detection of disease risk important to you?</div>
                        </div>
                        <div style="align-self: stretch; padding-left: 9px; padding-right: 9px; padding-top: 12px; padding-bottom: 12px; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                            <img src="assets/images/blogs/clarity_dot-circle-line@2x.png" alt="bullet" style="width: 18px; height: 18px; flex-shrink: 0;">
                            <div style="color: #CC203B; font-size: 18px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">Do you prefer a data-driven, scientific approach vs. behavior-change coaching?</div>
                        </div>
                        <div style="align-self: stretch; padding-left: 9px; padding-right: 9px; padding-top: 12px; padding-bottom: 12px; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                            <img src="assets/images/blogs/clarity_dot-circle-line@2x.png" alt="bullet" style="width: 18px; height: 18px; flex-shrink: 0;">
                            <div style="color: #CC203B; font-size: 18px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">Are you comfortable with blood tests and long-term tracking?</div>
                        </div>
                        <div style="align-self: stretch; padding-left: 9px; padding-right: 9px; padding-top: 12px; padding-bottom: 12px; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                            <img src="assets/images/blogs/clarity_dot-circle-line@2x.png" alt="bullet" style="width: 18px; height: 18px; flex-shrink: 0;">
                            <div style="color: #CC203B; font-size: 18px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">Are lifestyle and sustainability more important than short-term transformation?</div>
                        </div>
                        <div style="align-self: stretch; padding-left: 9px; padding-right: 9px; padding-top: 12px; padding-bottom: 12px; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                            <img src="assets/images/blogs/clarity_dot-circle-line@2x.png" alt="bullet" style="width: 18px; height: 18px; flex-shrink: 0;">
                            <div style="color: #CC203B; font-size: 18px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">What's your budget and how frequently are you willing to test?</div>
                        </div>
                        <div style="align-self: stretch; padding-left: 9px; padding-right: 9px; padding-top: 12px; padding-bottom: 12px; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                            <img src="assets/images/blogs/clarity_dot-circle-line@2x.png" alt="bullet" style="width: 18px; height: 18px; flex-shrink: 0;">
                            <div style="color: #CC203B; font-size: 18px; font-family: Sora; font-weight: 400; line-height: 24px; word-wrap: break-word">Do you want a coach to hold you accountable, or periodic check-ins based on data?</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="blog-section" id="supershyft-edge">
            <div class="container">
                <div class="section-title" style="text-align: left; margin: 0 0 32px 0;">
                    <h2>The Supershyft Edge: Blending Both Worlds</h2>
                    <p>While SuperShyft centers on precision nutrition, it doesn't ignore the power of personalization. Here's how their program brings together both approaches:</p>
                </div>

                <div style="position: relative; margin-bottom: 40px;">
                    <div class="image-tile" style="height: 400px; background: url('assets/images/blogs/s6.png') center/cover no-repeat; display: flex; align-items: center; justify-content: center;">
                        <img src="assets/images/blogs/logo6.png" alt="SuperShyft Logo" style="max-width: 150px; max-height: 150px;">
                    </div>
                </div>

                <div class="feature-grid-2x2">
                    <div style="padding: 28px; background: linear-gradient(90deg, #e0e0e0 0%, #fdf1f3 50%, #e0e0e0 100%); border: 2px solid #e0e0e0; border-radius: 20px;">
                        <h3 style="color: #cc203b; font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px; color: #4b7ba7;">📊</span> AI-Backed Precision
                        </h3>
                        <p style="font-size: 14px; line-height: 1.6; color: #555;">Blood biomarker analysis gives you an evidence-based foundation.</p>
                    </div>
                    <div style="padding: 28px; background: linear-gradient(90deg, #e0e0e0 0%, #fdf1f3 50%, #e0e0e0 100%); border: 2px solid #e0e0e0; border-radius: 20px;">
                        <h3 style="color: #cc203b; font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px; color: #4b7ba7;">📋</span> Personalized Action Plan
                        </h3>
                        <p style="font-size: 14px; line-height: 1.6; color: #555;">Built around your data and your preferences.</p>
                    </div>
                    <div style="padding: 28px; background: linear-gradient(90deg, #e0e0e0 0%, #fdf1f3 50%, #e0e0e0 100%); border: 2px solid #e0e0e0; border-radius: 20px;">
                        <h3 style="color: #cc203b; font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px; color: #4b7ba7;">🧠</span> Behavioral Sustainability
                        </h3>
                        <p style="font-size: 14px; line-height: 1.6; color: #555;">Delivered in a way that supports realistic, long-term habits.</p>
                    </div>
                    <div style="padding: 28px; background: linear-gradient(90deg, #e0e0e0 0%, #fdf1f3 50%, #e0e0e0 100%); border: 2px solid #e0e0e0; border-radius: 20px;">
                        <h3 style="color: #cc203b; font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px; color: #4b7ba7;">📈</span> Progress Tracking
                        </h3>
                        <p style="font-size: 14px; line-height: 1.6; color: #555;">Future tests guide updates in an iterative process.</p>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #cc203b 0%, #0f473f 100%); color: #fff; padding: 36px 40px; border-radius: 16px; text-align: center; font-size: 16px; line-height: 1.6; margin-top: 40px;">
                    "SuperShyft isn't purely 'precision' – it's a hybrid model with deep biological insights and real-world, human-centered coaching built in."
                </div>
            </div>
        </section>

        <section class="blog-section" id="summary" style="background: url('assets/images/blogs/bg2.png') center/cover no-repeat;">
            <div class="container">
                <div style="background: #fff; border: 2px solid #cc203b; border-radius: 16px; padding: 32px 28px; position: relative; margin-bottom: 50px; box-shadow: 0 10px 24px rgba(0,0,0,0.08);">
                    <h3 style="color: #0b2c2a; font-size: 26px; margin: 0 0 22px 0;">Summary: In a Nutshell</h3>
                    <div style="display: grid; gap: 14px;">
                        <div style="display: flex; align-items: flex-start; gap: 12px;">
                            <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; border: 2px solid #cc203b; border-radius: 50%; box-sizing: border-box; flex-shrink: 0; margin-top: 2px;">
                                <span style="width: 6px; height: 6px; background: #2aa872; border-radius: 50%; display: block; box-sizing: border-box;"></span>
                            </span>
                            <p style="margin: 0; color: #1f1f1f; font-size: 15px; line-height: 1.55;"><strong>Precision Nutrition</strong> = Deep data + Predictive risk + Specific, biology-based plan</p>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 12px;">
                            <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; border: 2px solid #cc203b; border-radius: 50%; box-sizing: border-box; flex-shrink: 0; margin-top: 2px;">
                                <span style="width: 6px; height: 6px; background: #2aa872; border-radius: 50%; display: block; box-sizing: border-box;"></span>
                            </span>
                            <p style="margin: 0; color: #1f1f1f; font-size: 15px; line-height: 1.55;"><strong>Personalized Nutrition</strong> = Habit-focused + Goal-aligned + Flexible and coach-led</p>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 12px;">
                            <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; border: 2px solid #cc203b; border-radius: 50%; box-sizing: border-box; flex-shrink: 0; margin-top: 2px;">
                                <span style="width: 6px; height: 6px; background: #2aa872; border-radius: 50%; display: block; box-sizing: border-box;"></span>
                            </span>
                            <p style="margin: 0; color: #1f1f1f; font-size: 15px; line-height: 1.55;"><strong>SuperShyft</strong> = Precision-driven platform with personalized recommendations + ongoing tracking + real habit-based lifestyle coaching</p>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 12px;">
                            <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center; border: 2px solid #cc203b; border-radius: 50%; box-sizing: border-box; flex-shrink: 0; margin-top: 2px;">
                                <span style="width: 6px; height: 6px; background: #2aa872; border-radius: 50%; display: block; box-sizing: border-box;"></span>
                            </span>
                            <p style="margin: 0; color: #1f1f1f; font-size: 15px; line-height: 1.55;"><strong>Choosing what's right</strong> = depends on your goals, risk profile, and how you view health: preventative, sustainable, or both</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 style="font-family: 'DM Serif Text', serif; font-size: 32px; margin-bottom: 32px; color: #fff;">Final Thoughts</h2>
                    <div style="display: grid; gap: 24px;">
                        <div style="display: flex; align-items: flex-start; gap: 16px;">
                            <span style="color: #4ade80; font-size: 24px; line-height: 1; flex-shrink: 0;">✓</span>
                            <p style="margin: 0; color: #dbe7e4; font-size: 15px; line-height: 1.6;">Understanding the difference between precision nutrition and personalized nutrition empowers you to choose the right path – whether it's to transform your health proactively, build new habits, or both.</p>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 16px;">
                            <span style="color: #4ade80; font-size: 24px; line-height: 1; flex-shrink: 0;">✓</span>
                            <p style="margin: 0; color: #dbe7e4; font-size: 15px; line-height: 1.6;">SuperShyft stands out because it combines the most powerful elements of both worlds: data-backed insights, predictive metabolic risk, and hands-on lifestyle planning.</p>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 16px;">
                            <span style="color: #4ade80; font-size: 24px; line-height: 1; flex-shrink: 0;">✓</span>
                            <p style="margin: 0; color: #dbe7e4; font-size: 15px; line-height: 1.6;">The best approach - and where SuperShyft really shines - is the hybrid model: precision for deep insights, personalization for real-life sustainability. That way, you're not just chasing results – you're shaping a future where your health choices are smart, sustainable, and aligned with who you are.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="blog-section" style="background: #fafafa;">
            <div class="container" style="max-width: 1100px;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <h2 style="font-family: 'DM Serif Text', serif; font-size: 34px; color: #0b2c2a; margin: 0 0 12px 0;">Ready to Transform Your Health ?</h2>
                    <a href="contact-us.php" style="display: inline-flex; align-items: center; justify-content: center; padding: 12px 28px; background: linear-gradient(135deg, #f84c6f 0%, #d41d3f 100%); color: #fff; border-radius: 999px; font-weight: 600; font-size: 15px; letter-spacing: 0.1px; box-shadow: 0 10px 20px rgba(212,29,63,0.22);">Get Supershyft Today</a>
                </div>

                <div style="display: grid; gap: 26px;">
                    <div>
                        <h3 style="font-size: 22px; color: #0b2c2a; margin: 0 0 14px 0;">Handpicked topics</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
                            <div style="background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(0,0,0,0.08);">
                                <div style="aspect-ratio: 4 / 3; background: url('assets/images/blogs/s7.png') center/cover no-repeat;"></div>
                                <div style="padding: 10px 12px; font-size: 13px; color: #1f1f1f;">SuperShyft's Bio AI, AI-driven health reports</div>
                            </div>
                            <div style="background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(0,0,0,0.08);">
                                <div style="aspect-ratio: 4 / 3; background: url('assets/images/blogs/s7.png') center/cover no-repeat;"></div>
                                <div style="padding: 10px 12px; font-size: 13px; color: #1f1f1f;">NVIDIA – Empowering high-performance</div>
                            </div>
                            <div style="background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(0,0,0,0.08);">
                                <div style="aspect-ratio: 4 / 3; background: url('assets/images/blogs/s7.png') center/cover no-repeat;"></div>
                                <div style="padding: 10px 12px; font-size: 13px; color: #1f1f1f;">SuperShyft's Bio AI, AI-driven health reports</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 style="font-size: 22px; color: #0b2c2a; margin: 0 0 14px 0;">Similar topics</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
                            <div style="background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(0,0,0,0.08);">
                                <div style="aspect-ratio: 4 / 3; background: url('assets/images/blogs/s7.png') center/cover no-repeat;"></div>
                                <div style="padding: 10px 12px; font-size: 13px; color: #1f1f1f;">SuperShyft's Bio AI, AI-driven health reports</div>
                            </div>
                            <div style="background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(0,0,0,0.08);">
                                <div style="aspect-ratio: 4 / 3; background: url('assets/images/blogs/s7.png') center/cover no-repeat;"></div>
                                <div style="padding: 10px 12px; font-size: 13px; color: #1f1f1f;">NVIDIA – Empowering high-performance</div>
                            </div>
                            <div style="background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(0,0,0,0.08);">
                                <div style="aspect-ratio: 4 / 3; background: url('assets/images/blogs/s7.png') center/cover no-repeat;"></div>
                                <div style="padding: 10px 12px; font-size: 13px; color: #1f1f1f;">SuperShyft's Bio AI, AI-driven health reports</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const targets = document.querySelectorAll('section.blog-section, section.blog-hero');
            targets.forEach(el => el.classList.add('reveal'));

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            targets.forEach(el => observer.observe(el));
        });
    </script>

    <?php include_once 'view/footer.html'; ?>
    <?php include_once 'view/include_js.html'; ?>
</body>

</html>
