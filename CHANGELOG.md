# Changelog

All notable changes to the Supershyft website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-01-16

### Fixed
- Fixed visibility of all 4 points in "How Supershyft works?" section on homepage PC version
- Corrected layout to display points with number and content inline (side-by-side)
- Updated CSS selectors in technology page to prevent interference with homepage styling
- Ensured mobile version layout remains unchanged with vertical stacking

### Changed
- Modified `.step-section` CSS in index.php to use flexbox layout for better content alignment
- Updated technology.php CSS selectors to use `:not(.step-section)` pseudo-class for specificity

### Technical Details
- **Files Modified:**
  - `index.php` - Added comprehensive flexbox CSS rules for PC version
  - `technology.php` - Updated CSS selectors for page-specific styling
  - `assets/css/custom.css` - CSS adjustments

- **Branch:** `fix/how-supershyft-works-layout`

---

## [1.0.0] - Initial Release

### Added
- Initial launch of Supershyft website
- Homepage with banner and hero section
- "How Supershyft works?" section (mobile and PC versions)
- "Science of Age Reversal" technology section
- Testimonials carousel
- Comparison table
- Contact form
- Responsive design for mobile and desktop
