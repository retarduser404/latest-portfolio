# 🗂️ Component Reference Guide

## File Locations & Quick Edit Guide

### Main Files to Customize

#### 1. Hero Section
**File**: `src/components/Hero.tsx`
**Key Parts to Update:**
- Line ~26: Your name
- Line ~34: Subtitle ("Full Stack Developer & Builder")
- Line ~41: Main description text
- Line ~58-63: Button text and CTA buttons
- Line ~68-82: Social media links

**What It Contains:**
- Large name display
- Subtitle and description
- "View My Work" and "Get in Touch" buttons
- GitHub, LinkedIn, Email icons
- Animated background elements

---

#### 2. About Section
**File**: `src/components/About.tsx`
**Key Parts to Update:**
- Line ~25: Section heading
- Line ~37-54: Background paragraphs (4 paragraphs)
- Line ~61-77: Statistics cards (update numbers and labels)

**What It Contains:**
- "About Me" heading with accent
- 4 paragraphs of background info
- 4 statistics cards showing:
  - Years of experience
  - Projects completed
  - Technologies mastered
  - Dedication score

---

#### 3. Skills Section
**File**: `src/components/Skills.tsx`
**Key Parts to Update:**
- Line ~3-18: Skill categories and skills array
  - Categories: Frontend, Backend, Databases, AI/ML, Cyber Security, Tools
  - Each has a list of skills

**How to Add/Remove Skills:**
```typescript
const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', /* add more here */],
  },
  // ... more categories
];
```

**What It Contains:**
- 6 skill category cards
- Interactive skill tags with hover effects
- Grid layout with animations
- Color-coded borders

---

#### 4. Projects Section
**File**: `src/components/Projects.tsx`
**Key Parts to Update:**
- Line ~3-35: Project data array
  - Title, description, tech stack, links
  - Mark one as "featured: true" for special display
- Line ~92-95: Featured project display
- Line ~98-147: Other projects grid

**Project Structure:**
```typescript
{
  title: 'Project Name',
  description: 'What the project does...',
  tech: ['React', 'Node.js', /* ... */],
  github: 'https://github.com/...',
  demo: 'https://demo-url.com',
  featured: true,  // Only one should be true
}
```

**What It Contains:**
- 1 featured project (larger, highlighted)
- 5 additional projects in a grid
- Tech stack tags
- GitHub and Demo links
- Hover animations

---

#### 5. Blog Section
**File**: `src/components/Blog.tsx`
**Key Parts to Update:**
- Line ~3-40: Blog posts array
  - Title, excerpt, date, reading time, tags
  - Mark one as "featured: true"

**Blog Post Structure:**
```typescript
{
  title: 'Post Title',
  excerpt: 'Short description...',
  date: 'January 8, 2026',
  readTime: '8 min read',
  tags: ['Tag1', 'Tag2'],
  featured: true,
}
```

**What It Contains:**
- Featured post highlighting
- 6 blog post cards
- Date and reading time
- Category tags
- Professional layout

---

#### 6. Contact Section
**File**: `src/components/Contact.tsx`
**Key Parts to Update:**
- Line ~28: Email address (in initial state)
- Line ~79: Email link in "Email" card
- Line ~84: LinkedIn URL
- Line ~89: GitHub URL
- Form submission logic (line ~36-45)

**What It Contains:**
- "Get in Touch" heading
- 3 contact method cards (Email, LinkedIn, GitHub)
- Contact form with:
  - Name input
  - Email input
  - Message textarea
  - Submit button with success feedback

---

#### 7. Navbar
**File**: `src/components/Navbar.tsx`
**Key Parts to Update:**
- Line ~10: Change "KP" logo to your initials
- Line ~12-18: Menu items (can add/remove sections)

**What It Contains:**
- Fixed top navigation bar
- Logo with initials
- Menu links: Home, About, Skills, Projects, Blog, Contact
- Mobile hamburger menu
- Smooth scroll to sections

---

#### 8. Footer
**File**: `src/components/Footer.tsx`
**Key Parts to Update:**
- Line ~26: Brand description
- Line ~34-40: Quick Links (matches navbar)
- Line ~46-52: Social links
- Line ~62: Copyright author name

**What It Contains:**
- Brand/logo section
- Quick navigation links
- Social media links
- Copyright and attribution

---

### Global Styles

#### CSS File
**File**: `src/app/globals.css`
**Contains:**
- Custom scrollbar styling
- Neon text and border effects
- Glass morphism class
- Button styles (.btn-primary, .btn-secondary)
- Container padding utilities
- Grid animations
- Code highlighting styles

#### Tailwind Configuration
**File**: `tailwind.config.js`
**Customize:**
- Colors (dark theme, neon colors)
- Font families (Inter, Fira Code)
- Box shadows (neon glow effects)
- Animations and keyframes
- Responsive breakpoints

---

### Layout & Metadata

#### Root Layout
**File**: `src/app/layout.tsx`
**Contains:**
- Page title: "Karthik Prabhu | Full Stack Developer"
- Meta description
- SEO keywords
- Open Graph tags for social sharing
- HTML language setting

#### Main Page
**File**: `src/app/page.tsx`
**Contains:**
- Imports all components
- Renders in this order:
  1. Navbar
  2. Hero
  3. About
  4. Skills
  5. Projects
  6. Blog
  7. Contact
  8. Footer

---

## 🔄 Typical Customization Order

1. **First**: Update `Hero.tsx` with your name and intro
2. **Second**: Update `About.tsx` with your background
3. **Third**: Update `Skills.tsx` with your tech skills
4. **Fourth**: Update `Projects.tsx` with your projects
5. **Fifth**: Update `Blog.tsx` with your articles
6. **Sixth**: Update `Contact.tsx` with your email/links
7. **Seventh**: Update `Navbar.tsx` logo if needed
8. **Finally**: Update `layout.tsx` metadata (title, description)

---

## 🔍 Search & Replace Quick Tips

### Update All Social Links
Find: `href="#"`
Replace: `href="https://your-actual-links"`

### Change All "Karthik Prabhu" to Your Name
Find: `Karthik Prabhu`
Replace: `Your Name`

### Change Contact Email
Find: `karthik@example.com`
Replace: `your@email.com`

---

## 🎨 Color Theme

All neon colors are defined in `tailwind.config.js`:

- **Primary Neon**: `#00ff41` (Electric Lime)
- **Secondary**: `#ffff00` (Yellow)
- **Accent**: `#00ffff` (Cyan)
- **Dark BG**: `#0a0e27` (Near Black)
- **Dark Secondary**: `#0f1230` (Dark Blue)

---

## 📱 Responsive Breakpoints

Used throughout components:
- `md:` = Tablet (768px+)
- `lg:` = Desktop (1024px+)
- Default = Mobile (320px+)

Example:
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Text that changes size by screen
</div>
```

---

## ⚡ Key Component Props & State

### Navbar
- `isOpen` - Mobile menu toggle state
- `menuItems` - Navigation links array

### Hero
- Uses Framer Motion for animations
- Has background gradient elements
- Social icons with hover effects

### Contact
- `formData` - State for form inputs
- `submitted` - Success message state
- Form submission handler at line 36

### All Sections
- Use `whileInView` for scroll animations
- Use `initial`, `animate` for entrance animations
- Use `hover` states for interactive effects

---

## 🚀 Deployment Checklist

Before deploying, make sure to:
- [ ] Update all personal information
- [ ] Add project screenshots to `/public`
- [ ] Update all social media links
- [ ] Test form submission (add backend)
- [ ] Update meta tags in `layout.tsx`
- [ ] Test responsive design on mobile
- [ ] Run `npm run build` to check for errors
- [ ] Remove any TODO comments
- [ ] Add Google Analytics if desired

---

**Happy customizing!** 🎉
