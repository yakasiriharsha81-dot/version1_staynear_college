# StayNear College 🎓🏠
> **“Find a place to stay, close to where you study.”**

StayNear College is a complete, modern, responsive web application built to help college students find affordable, verified PGs, hostels, and rental rooms within walking distance of their academic campuses.

---

## 🌟 Key Capabilities & Features

### 1. 🎓 College Search & Campus Directory
- Search campuses by **College Name**, **City**, **Area**, or **PIN code**.
- Integrated popular student hubs: **Nellore**, **Tirupati**, **Hyderabad**, **Chennai**, **Bengaluru**, and **Vijayawada**.
- College cards display campus photos, city/area, active stays count, and a direct **"View Nearby Stays"** button.

### 2. 📍 Precise Distance Calculation (Haversine Formula)
- Real great-circle distance is calculated between college coordinates and accommodation coordinates.
- Clear formatting: e.g., `500 m`, `0.8 km from ABC Degree College`.
- **Integrity Rule**: If coordinates are unavailable, the app displays **"Distance unavailable"** rather than inventing numbers.

### 3. 🎯 Budget-First Search Workflow
- Quick prompt: *"What is your monthly budget?"* (`₹3,000`, `₹5,000`, `₹7,500`, `₹10,000`, `₹15,000+`).
- Next step: *"Which college are you studying at?"* → Instantly displays matching, verified accommodations.

### 4. 🔍 Multi-Factor Filters & Sorting
- **Location**: City & Area filters.
- **Budget**: Under ₹3,000, ₹3,000–₹5,000, ₹5,000–₹8,000, ₹8,000–₹12,000, or custom Min/Max range.
- **Accommodation Type**: PG, Hostel, Room, Shared Room, Single Room, Apartment.
- **Gender Category**: Boys Only, Girls Only, Unisex / Family.
- **Room Sharing**: Single, Double Sharing, Triple Sharing, 4 Sharing.
- **Facilities**: Wi-Fi, Food, AC, Non-AC, Washing Machine, Parking, Laundry, Power Backup, Study Room, CCTV, Security, Attached Bathroom.
- **Distance**: Within 500 m, Within 1 km, Within 2 km, Within 5 km.
- **Sort By**: Distance (Closest first), Price: Low to High, Price: High to Low, Recently Added.

### 5. 🗺️ Interactive Maps (Leaflet & OpenStreetMap)
- Zero-config interactive map showing:
  - Custom blue academic graduation cap marker for the target college campus.
  - Price pill markers for nearby PGs and hostels.
  - Interactive popup on marker click displaying property photo, name, rent/month, distance from campus, and a **"View Details"** action.
  - Seamless support for Google Maps API if configured via environment variables.

### 6. 🏠 Accommodation Details View
- Full image gallery with thumbnail preview.
- Distance badge relative to target college.
- Verified status badge.
- Room types table with transparent bed availability.
- Amenities grid.
- **Food & Meal info** shown clearly (or specified as self-cooking/mess).
- Property rules & gate timings.
- Direct Owner Contact: **Call Owner** and **WhatsApp Owner** with pre-filled enquiry message.
- Instant enquiry message form.
- Student reviews section with star ratings, resident badges, and student review submission.
- **Report Property modal** for safety or inaccurate listing flags.

### 7. ⚖️ Objective Property Comparison
- Add up to 3 accommodations side-by-side.
- Compares: Monthly rent, Deposit, Distance, Room type, Sharing, Food, Wi-Fi, AC, Laundry, CCTV, Parking, and Power Backup.
- *Strict non-bias principle*: We display facts objectively without declaring an automatic winner.

### 8. ❤️ Bookmarked Favorites
- One-click saving of properties with persistence across sessions via local storage and Supabase.

### 9. 🏢 Property Owner Dashboard
- **My Properties**: Monitor active listings, view bed availability, toggle status (`Available`, `Few Beds Left`, `Full`), and delete listings.
- **Add Property Form**: Complete 9-step wizard:
  1. Basic Information
  2. Location & College Selection
  3. Pricing & Food details
  4. Rooms & Bed Sharing
  5. Facilities Checklist
  6. Photos
  7. Rules & Gate Timings
  8. Public Contact Details (Phone & WhatsApp)
  9. Preview & Publish
- **Student Enquiries**: Review incoming inquiries with student phone, email, and message; update status (`New`, `Contacted`, `Closed`).

### 10. 🛡️ Admin Moderation Portal
- Review all submitted listings with approval and rejection controls (`Approved`, `Pending`, `Rejected`).
- Grant official **Verified** status badge after inspection.
- Review safety/accuracy reports submitted by students with resolution actions.
- Manage configured campus locations.

### 11. 📱 Mobile-First Responsive Design
- Optimized for mobile and Android devices.
- Sticky search and filter drawer.
- Bottom navigation bar (`Home`, `Find Stays`, `Colleges`, `Saved`, `Compare`).
- Hamburger menu and rapid 1-click demo role switcher (`Student`, `Owner`, `Admin`).

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React
- **Mapping**: Leaflet + OpenStreetMap (No API key needed, zero-config)
- **Database & Auth Schema**: PostgreSQL / Supabase SQL schema in `schema.sql`
- **Build Tool**: Vite 5

---

## 🗄️ Database Schema (`schema.sql`)

The repository includes a ready-to-run [schema.sql](file:///c:/Users/yakas/New%20folder/schema.sql) file designed for Supabase/PostgreSQL, complete with Row-Level Security (RLS) policies:
- `users`: id, name, email, phone, role, college_id, created_at
- `colleges`: id, name, city, area, address, latitude, longitude, image_url
- `properties`: id, owner_id, name, property_type, gender_category, address, city, area, pin_code, latitude, longitude, monthly_rent, deposit, availability, verification_status, is_verified, food_included, rules, owner contact info
- `rooms`: id, property_id, room_type, sharing, price, available_beds
- `facilities`: id, property_id, facility_name
- `property_images`: id, property_id, image_url
- `favorites`: id, user_id, property_id
- `reviews`: id, property_id, user_id, rating, comment, verified_student
- `enquiries`: id, property_id, student_id, student_name, student_phone, student_email, message, status
- `reports`: id, property_id, user_id, reason, description, status

---

## 🚀 Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000/`.

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📋 Sample Demo Listings

The application comes pre-loaded with sample demo listings centered around **ABC Degree College, Nellore, Andhra Pradesh**:
1. **Sri Sai Student PG** — Girls — ₹5,500/month — 0.8 km — Wi-Fi, Food, CCTV, Laundry
2. **Student Nest Hostel** — Boys — ₹4,500/month — 1.2 km — Wi-Fi, Laundry, CCTV, Food
3. **Campus View Rooms** — Unisex/Family — ₹7,000/month — 1.5 km — Wi-Fi, Parking
4. **Balaji Budget Boy PG** — Boys — ₹2,800/month — 0.7 km — Food, Wi-Fi
5. **Royal Elite Luxury Student Suites** — Unisex — ₹11,000/month — 2.8 km — AC, Gym, Wi-Fi
6. Plus campus listings across Tirupati (SVU), Hyderabad (Osmania University), Chennai (Anna University), etc.

*All demo properties are prominently labeled with an amber `DEMO LISTING` badge.*
