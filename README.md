# M2FT Website
**Elite Football Coaching & Performance Training**

A modern, professional website for M2FT Ltd — Marco Muthi's football coaching and fitness training business based in Surrey, UK.

---

## 🎯 Project Overview

**Live Website:** www.officialm2ft.com  
**Business:** M2FT Ltd  
**Owner:** Marco Muthi, MSc Performance Coach  
**Built:** March 2026

### Brand Identity
- **Colors:** Black (#0A0A0A), Navy (#0D1B2A), White (#FFFFFF)
- **Philosophy:** "Train Like a Pro. Perform Like One."
- **Services:** M2 Football coaching, M2 Fitness training, Holiday Camps

---

## ✅ Currently Completed Features

### Pages Built
1. **Homepage (index.html)**
   - Hero section with tagline
   - Stats bar (30+ players, 6 teams, MSc qualified)
   - Founder video placeholder section
   - 7-video slider showcasing training clips
   - M2 Football | M2 Fitness split services
   - Professional player testimonials
   - Credentials strip
   - M2FT App download section

2. **M2 Football (m2-football.html)**
   - 1-to-1, small group, and online programmes
   - Position-specific training breakdown
   - Pricing: £42.50 (1-to-1), £30 (2-3 players), £20 (4 players)
   - Grassroots teams coached
   - Cancellation policy

3. **M2 Fitness (m2-fitness.html)**
   - Personal training options (1-4 people)
   - Fitness class schedule (Mon/Wed/Fri/Sat)
   - Class pricing: £6/class, £10/2 classes, £60 unlimited
   - Testimonials from fitness members
   - Location details

4. **Holiday Camps (holiday-camps.html)**
   - Camp information (ages 5-13, Nescot Sports Centre)
   - Pricing: £25/day, £110/week
   - Daily schedule breakdown
   - Trust badges (DBS checked, first aid, MSc coach)
   - What to bring checklist

5. **Trainers (trainers.html)**
   - Marco Muthi (Founder & Head Coach)
   - Kelvin (Lead Football Coach)
   - Kam (Lead Fitness Trainer)
   - Louie Tomecek (Performance Analyst)
   - Qualifications and experience

6. **Contact (contact.html)**
   - Contact form with validation
   - Direct email: Marco@officialm2ft.com
   - Social media links
   - FAQ section
   - Quick links to all services

### Design Features
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Clean, modern, minimal aesthetic
- ✅ Black/Navy/White color scheme
- ✅ Professional navigation
- ✅ Mobile menu toggle
- ✅ Video slider with auto-play and controls
- ✅ Form validation
- ✅ Smooth scrolling
- ✅ Consistent footer across all pages

---

## 🚀 Deployment Instructions

### Option 1: Netlify (Recommended - FREE)

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Deploy via drag & drop:**
   - Log into Netlify
   - Click "Add new site" → "Deploy manually"
   - Drag the entire project folder into the upload zone
   - Site will be live in seconds with a temporary URL (e.g., `random-name-12345.netlify.app`)

3. **Connect your custom domain (www.officialm2ft.com):**
   - In Netlify: Go to Site Settings → Domain Management → Add custom domain
   - Add: `www.officialm2ft.com` and `officialm2ft.com`
   - Netlify will provide DNS settings

4. **Update DNS at your domain registrar:**
   - Log into your domain provider (GoDaddy, Namecheap, etc.)
   - Update DNS records:
     - **A Record:** `@` → `75.2.60.5` (Netlify IP)
     - **CNAME:** `www` → `[your-site-name].netlify.app`
   - DNS propagation takes 24-48 hours

5. **Enable HTTPS:**
   - Netlify automatically provisions free SSL certificates
   - Force HTTPS in Settings → Domain Management

---

### Option 2: GitHub Pages (FREE)

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com) and create a new repository
   - Name it `m2ft-website` (or anything you prefer)

2. **Upload your files:**
   - Upload all files (index.html, style.css, script.js, etc.) to the repository

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

4. **Your site will be live at:**
   - `https://[your-username].github.io/m2ft-website`

5. **Custom domain setup:**
   - In repository settings → Pages → Custom domain
   - Enter: `www.officialm2ft.com`
   - Create a CNAME file in your repository with `www.officialm2ft.com` as content
   - Update DNS at your registrar (same as Netlify instructions)

---

### Option 3: Traditional Web Host (cPanel)

1. **Choose a hosting provider** (Hostinger, SiteGround, Bluehost, etc.)

2. **Access cPanel:**
   - Log into your hosting account
   - Open File Manager

3. **Upload files:**
   - Navigate to `public_html` folder
   - Upload all website files
   - Ensure `index.html` is in the root directory

4. **Point your domain:**
   - If domain is registered elsewhere, update nameservers to your host's DNS
   - If domain is with the same provider, it should already be connected

5. **Enable SSL:**
   - Most hosts offer free Let's Encrypt SSL
   - Enable in cPanel → SSL/TLS → Let's Encrypt

---

## 📝 Post-Deployment Tasks

### 1. Add Your Assets
Replace placeholder content with real assets:

- **Founder Video** (homepage): Record 60-second intro, upload to YouTube/Vimeo, embed
- **Training Videos** (video slider): Upload 7 clips to YouTube/Vimeo, update video `<source>` tags
- **Team Photos** (trainers page): Add high-quality photos of Marco, Kelvin, Kam, Louie
- **Hero Images** (all pages): Add action shots of coaching/training sessions
- **App Screenshots** (homepage): Add M2FT app interface screenshots

### 2. Update Video URLs
Current video slider uses temporary Genspark file URLs. Update in `index.html`:

```html
<!-- Find this section around line 110-150 -->
<video muted loop playsinline>
    <source src="YOUR_YOUTUBE_OR_VIMEO_EMBED_URL" type="video/mp4">
</video>
```

### 3. Connect Email
The contact form currently shows a browser alert. To make it functional:

**Option A: Use a form service (easiest)**
- [Formspree](https://formspree.io) (free tier available)
- [Netlify Forms](https://www.netlify.com/products/forms/) (if using Netlify)
- Update the `<form>` action to point to the service endpoint

**Option B: PHP backend**
- If your host supports PHP, create a `send-email.php` script
- Update form action to `action="send-email.php"`

### 4. Update Social Links
Check all social media links point to correct profiles:
- Instagram: @officialm2ft
- Facebook: @officialm2ft
- LinkedIn: Marco Muthi profile

### 5. Add Analytics
- **Google Analytics:** Add tracking code to `<head>` of all pages
- **Facebook Pixel:** If running ads
- **Hotjar or similar:** For user behavior tracking

---

## 📂 File Structure

```
m2ft-website/
├── index.html              # Homepage
├── m2-football.html        # Football coaching page
├── m2-fitness.html         # Fitness training page
├── holiday-camps.html      # Holiday camps page
├── trainers.html           # Team/trainers page
├── contact.html            # Contact page with form
├── style.css               # Main stylesheet
├── script.js               # JavaScript (slider, mobile menu, form validation)
└── README.md               # This file
```

---

## 🎨 Design System

### Colors
```css
--black: #0A0A0A       /* Primary background */
--navy: #0D1B2A        /* Section contrast, cards */
--white: #FFFFFF       /* Text, CTAs */
--light-grey: #F5F5F5  /* Section breaks */
--medium-grey: #CCCCCC /* Body text, secondary info */
--dark-grey: #333333   /* Alternative backgrounds */
```

### Typography
- **Font Family:** System font stack (SF Pro, Segoe UI, Roboto, etc.)
- **Headings:** Bold, uppercase, tight letter-spacing
- **Body Text:** 1.125rem, line-height 1.7

### Responsive Breakpoints
- **Desktop:** 1024px+
- **Tablet:** 768px - 1023px
- **Mobile:** < 768px

---

## ⚠️ Features Not Yet Implemented

### 1. Booking System
**Current state:** Contact form only  
**Recommended:** Integrate Calendly or booking software
- [Calendly](https://calendly.com) — Embed booking widget
- [Acuity Scheduling](https://acuityscheduling.com)
- Update "Book Now" buttons to open booking interface

### 2. Blog/News Section
**Purpose:** SEO, content marketing, player updates  
**Next steps:**
- Create `blog.html` listing page
- Create template for individual blog posts
- Add RSS feed for updates

### 3. E-commerce (Optional)
If selling merchandise, online courses, or packages:
- Integrate Stripe or PayPal
- Add shopping cart functionality
- Create product pages

### 4. Member Portal (Future)
For clients to:
- Access training videos
- Track progress
- View schedules
- Message coaches

---

## 📱 M2FT App Integration

**Current Status:** Links to App Store & Google Play included  
**App URLs:**
- iOS: `https://apps.apple.com/fr/app/m2ft-app/id6747587394`
- Android: `https://play.google.com/store/apps/details?id=com.kahunas.io.M2FT`

### Deep Linking (Optional Enhancement)
Add app deep links to drive downloads:
- When users visit on mobile, show banner: "Download the M2FT App"
- Use branch.io or Firebase Dynamic Links for smart app banners

---

## 🔍 SEO Recommendations

### Completed
✅ Semantic HTML structure  
✅ Meta descriptions on all pages  
✅ Proper heading hierarchy (H1, H2, H3)  
✅ Alt text placeholders for images  
✅ Mobile-responsive design  

### To Implement
- [ ] Google Search Console setup
- [ ] Submit sitemap.xml
- [ ] Add schema.org markup (LocalBusiness, Organization)
- [ ] Create robots.txt
- [ ] Optimize image file sizes
- [ ] Add Open Graph tags for social sharing
- [ ] Internal linking strategy
- [ ] Blog content for keyword targeting

**Target Keywords:**
- "football coach Surrey"
- "football training Epsom"
- "personal trainer Surrey"
- "holiday football camps Epsom"
- "football coaching Stoneleigh"

---

## 🛠️ Maintenance & Updates

### Regular Tasks
- **Weekly:** Check contact form submissions
- **Monthly:** Update camp dates, pricing, testimonials
- **Quarterly:** Refresh player success stories, add new team photos
- **Annually:** Review SEO performance, update credentials

### Version Control
Consider using Git for version tracking:
```bash
git init
git add .
git commit -m "Initial M2FT website"
git remote add origin [your-repo-url]
git push -u origin main
```

---

## 📧 Support & Contact

**Website Owner:** Marco Muthi  
**Email:** Marco@officialm2ft.com  
**Business:** M2FT Ltd  
**Locations:** Surrey, UK (Nescot Sports Centre, Auriol Park)

---

## 🎓 Credits

**Design & Development:** Built by AI assistant for M2FT Ltd  
**Content:** Based on existing M2FT brand, services, and testimonials  
**Inspiration:** Modern sports coaching websites, clean athletic branding

---

## 📄 License

© 2025 M2FT Ltd. All rights reserved.  
This website is proprietary to M2FT Ltd and Marco Muthi.

---

## 🚀 Quick Start Checklist

Before going live, complete this checklist:

- [ ] Replace all placeholder images with real photos
- [ ] Upload and embed founder video
- [ ] Update video slider with YouTube/Vimeo URLs
- [ ] Test contact form and confirm email delivery
- [ ] Verify all social media links
- [ ] Test on mobile, tablet, and desktop
- [ ] Check all internal links work
- [ ] Add Google Analytics tracking code
- [ ] Enable SSL certificate
- [ ] Submit to Google Search Console
- [ ] Create XML sitemap
- [ ] Test page load speed (aim for < 3 seconds)
- [ ] Spell-check all content
- [ ] Update any outdated pricing or schedules

---

**Built with pride for M2FT. Train like a pro. Perform like one.** ⚽💪
