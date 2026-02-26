# 🌸 PETALÉ — Full Build Prompt
## Digital Flower Bouquet Gift App (egreet.in Clone + Enhanced)

---

## 🎯 PRODUCT OVERVIEW

Build a full-stack web app called **"Petalé"** where users:
1. Pick beautiful watercolor flowers
2. Auto-arrange them into a bouquet
3. Write a personal message
4. Add a Spotify song with a **specific timestamp** (start & end seconds)
5. Get a **unique shareable link**
6. Recipient opens it to see a fullscreen beautiful experience with music auto-playing at the chosen moment

---

## 🛠️ TECH STACK

```
Frontend:  Next.js 14 (App Router) + Tailwind CSS
Backend:   Supabase (Database + Storage + Auth-optional)
Music:     Spotify Embed API (with timestamp params)
Hosting:   Vercel
Fonts:     Google Fonts — "Cormorant Garamond" (display) + "DM Sans" (body)
Animation: Framer Motion
```

---

## 🎨 DESIGN SYSTEM (NON-NEGOTIABLE)

### Color Palette
```css
--cream:        #FAF7F2   /* Background */
--blush:        #F2C4CE   /* Accent */
--sage:         #A8B5A2   /* Leaves/secondary */
--dusty-rose:   #C9848F   /* Buttons */
--deep:         #2C2420   /* Text */
--white-soft:   #FFFEF9   /* Cards */
```

### Typography
```css
Display font:  "Cormorant Garamond" — for headings, flower names, romantic titles
Body font:     "DM Sans" — for instructions, labels, inputs
```

### Aesthetic Rules
- **NO hard shadows.** Only soft box-shadows with blur > 20px
- **NO bright colors.** Everything is muted, soft, editorial
- **Generous white space** — every section breathes
- Hover effects: gentle scale(1.03) + soft glow
- Transitions: all 0.3s ease
- Background: subtle paper texture (CSS noise overlay)

---

## 🌺 FLOWER ASSETS

Use high-quality **SVG watercolor-style illustrations** for these 8 flowers:

| Flower | Color | Meaning shown in UI |
|--------|-------|---------------------|
| Rose | Pink/Red | Love & Passion |
| Tulip | Yellow/Pink | Cheerfulness |
| Lily | White/Blush | Purity |
| Orchid | Purple/Lavender | Admiration |
| Peony | Soft Pink | Romance |
| Daisy | White/Yellow | Innocence |
| Carnation | Pink/Red | Deep Love |
| Chrysanthemum | Yellow/Gold | Joy |

**How to get free high-quality SVG flowers:**
- Source from: `https://www.svgrepo.com` (search "watercolor flower")
- Or use: Undraw botanical illustrations
- Or generate with: Adobe Firefly / Midjourney (watercolor style, white background, PNG with transparent BG)

**Flower display in selection grid:**
- White card, rounded-2xl, soft shadow
- Flower illustration centered (120x120px)
- Name below in Cormorant Garamond italic
- Meaning in tiny DM Sans muted text
- Selected state: blush border + checkmark badge

---

## 📐 PAGE STRUCTURE

### Route: `/create` — Bouquet Creator (3-step wizard)

---

### STEP 1: "Choose Your Flowers"

```
Header: "Choose Your Flowers"
Subtitle: "Select at least 3, up to 8"

Layout: 4-column grid (2-col on mobile)
Each card:
  - Flower SVG illustration
  - Name (Cormorant Garamond)
  - Meaning (small, muted)
  - Click to select/deselect
  - Counter badge on selected (1, 2, 3...)

Bottom bar:
  - Selected count: "3 flowers chosen"
  - "Continue →" button (disabled until ≥3 selected)
```

---

### STEP 2: "Your Bouquet"

```
Auto-arrangement algorithm:
  - Tallest flowers (orchid, lily) go to back-center
  - Medium flowers fill middle ring
  - Smaller flowers fill front corners
  - Green leaf SVGs auto-added as filler
  - Bouquet stem wraps all at bottom

Display:
  - Cream/white background
  - Bouquet centered, large (400px wide)
  - Gentle floating animation (keyframes: translateY -8px, 3s ease infinite)

Controls below bouquet:
  [ 🔀 Shuffle ]  [ 🖼 Background ]  [ + Add More ]

Background options (5 choices):
  - Soft Cream (default)
  - Blush Pink
  - Sage Green
  - Dusty Lavender  
  - Midnight (dark mode)

"Add Message →" button
```

---

### STEP 3: "Add Your Note"

```
Card layout, centered:

  Field 1: "To" — recipient name (placeholder: "Someone special")
  Field 2: Message textarea (placeholder: "Write what your heart says...")
           Character limit: 300, counter shown
  Field 3: "From" — sender name

  ─── Divider with music note icon ───

  SPOTIFY SECTION:
  Label: "Add a Song Moment 🎵"
  Subtext: "Pick a song and the exact moment that reminds you of them"
  
  Input: Spotify URL paste field
    Placeholder: "Paste Spotify track link..."
    
  After URL pasted → show:
    [ Track preview card — album art + title + artist ]
    
    Timestamp pickers:
      "▶ Start at"  [MM:SS input]
      "⏹ End at"   [MM:SS input]  ← optional
    
    Preview button: "▶ Preview this moment"
    → Opens mini Spotify embed player at that timestamp

  ─── Divider ───

  Custom URL (Optional):
    petalé.app/to/ [_____________]

  Buttons: [Back]  [Preview 👁]  [Finish Bouquet 🎀]
```

---

## 🎵 SPOTIFY INTEGRATION (KEY FEATURE)

### How it works:

**Step 1: Parse Spotify URL**
```javascript
// Input: https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
// Extract track ID: 4uLU6hMCjMI75M1A2tKUQC
function extractSpotifyId(url) {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}
```

**Step 2: Embed with timestamp**
```html
<!-- Spotify embed with start time (in seconds) -->
<iframe
  src="https://open.spotify.com/embed/track/{TRACK_ID}?t={START_SECONDS}"
  width="100%"
  height="80"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
```

**Step 3: Convert MM:SS to seconds**
```javascript
function timeToSeconds(mmss) {
  const [min, sec] = mmss.split(':').map(Number);
  return min * 60 + sec;
}
// "1:42" → 102 seconds
```

**Step 4: Store in database**
```
spotify_track_id: "4uLU6hMCjMI75M1A2tKUQC"
spotify_start_seconds: 102
spotify_end_seconds: 160  (optional)
```

**Step 5: On recipient page**
```javascript
// Auto-play embed at stored timestamp
// Note: Spotify embed autoplay requires user interaction first
// Solution: Show beautiful "Tap to open your gift 🎀" screen first
// After tap → flowers animate in → music plays at exact moment
```

---

## 🗄️ DATABASE SCHEMA (Supabase)

```sql
CREATE TABLE bouquets (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  custom_slug   TEXT UNIQUE,          -- for custom URLs
  flowers       TEXT[],               -- ['rose', 'tulip', 'lily']
  background    TEXT DEFAULT 'cream', -- background style
  to_name       TEXT,
  message       TEXT,
  from_name     TEXT,
  spotify_track_id     TEXT,
  spotify_start_sec    INTEGER,
  spotify_end_sec      INTEGER,
  spotify_track_name   TEXT,          -- cached for display
  spotify_artist       TEXT,          -- cached for display
  spotify_album_art    TEXT,          -- cached image URL
  created_at    TIMESTAMPTZ DEFAULT now(),
  view_count    INTEGER DEFAULT 0
);
```

---

## 📬 RECIPIENT PAGE: `/to/[slug]`

This is the **most important page** — the emotional payoff.

### Experience flow:

```
1. LANDING SCREEN (before interaction)
   ─────────────────────────────────
   Full screen cream/blush background
   Animated falling petals (CSS keyframes)
   
   Center card:
     🎀  (ribbon emoji, large)
     "You have a gift"
     "From [sender name]"
     
     [ Open Your Bouquet → ]  ← large, beautiful button

2. REVEAL ANIMATION (on button click)
   ─────────────────────────────────
   Bouquet zooms in from bottom (Framer Motion: y: 100 → 0, scale: 0.8 → 1)
   Flowers appear one by one with stagger (0.1s each)
   Music starts at chosen timestamp
   
3. BOUQUET VIEW (main state)
   ─────────────────────────────────
   
   TOP: Recipient name in Cormorant Garamond italic
        "For [name]"
   
   CENTER: Full bouquet illustration (large, floating animation)
   
   BOTTOM: 
     Message in a card:
       ─────────────────────
       "I don't say this enough,
        but you matter to me."
       
                         — [From name]
       ─────────────────────
   
   MUSIC PLAYER (if song added):
     Minimal bar at very bottom
     Album art thumbnail (40x40)
     Track name + artist
     "♪ Playing your moment"
     Spotify embed (can be hidden, just auto-plays)
   
   No buttons. No share. No distractions.
   Just emotion.
```

---

## ✨ MICRO-INTERACTIONS & ANIMATIONS

```javascript
// Flower selection: bounce on select
flower.onClick → scale(1.2) → scale(1.0) → border appears

// Bouquet assembly: staggered appear
flowers.map((f, i) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.15 }
}))

// Bouquet floating loop
@keyframes float {
  0%, 100% { transform: translateY(0px) }
  50%       { transform: translateY(-12px) }
}
animation: float 4s ease-in-out infinite;

// Petal fall on recipient page
@keyframes petalFall {
  0%   { transform: translateY(-10px) rotate(0deg); opacity: 1 }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0 }
}
// Spawn 15-20 petals with random: left position, delay, duration
```

---

## 🔗 SHARING FLOW

```
After "Finish Bouquet":

Modal appears:
  ✅ "Your bouquet is ready!"
  
  Link box: [ petalé.app/to/your-custom-url ]  [ 📋 Copy ]
  
  Share buttons:
  [ 💬 WhatsApp ]  [ 📸 Instagram DM ]  [ 📧 Email ]  [ 🔗 Copy Link ]
  
  [ View Your Creation → ]
```

---

## 📱 MOBILE-FIRST RULES

- All flower grids: 2 columns on mobile, 4 on desktop
- Bouquet: max 320px on mobile, 420px on desktop
- Touch targets: minimum 44x44px
- Bottom sticky buttons for wizard navigation
- Safe area padding for iPhone notch

---

## 🚀 MVP vs V2

### MVP (Build first):
- [x] 8 flowers, selection grid
- [x] Auto-arrange bouquet (static positions, not drag)
- [x] Message + sender/recipient names
- [x] Spotify URL + timestamp
- [x] Supabase storage
- [x] Unique UUID link
- [x] Beautiful recipient page

### V2 (Later):
- [ ] Custom slug URLs
- [ ] Background themes (5 options)
- [ ] Flower meanings tooltip
- [ ] View count on sender side
- [ ] Download as image (html2canvas)
- [ ] Premium: animated flowers, custom domain

---

## 🎀 FINAL QUALITY CHECKLIST

Before shipping, verify:
- [ ] Fonts loaded: Cormorant Garamond + DM Sans
- [ ] All flowers display as crisp SVG (not blurry PNG)
- [ ] Spotify embed appears with timestamp
- [ ] Mobile layout tested on 375px width
- [ ] Recipient page has NO UI chrome — pure emotion
- [ ] Bouquet has floating animation
- [ ] Loading states for all async actions
- [ ] Custom OG meta tags for link previews:
      og:title → "Someone sent you a bouquet 🌸"
      og:image → Static bouquet preview image
      og:description → "Tap to open your gift"

---

## 💡 PRO TIPS FOR IMPLEMENTATION

1. **For the bouquet layout** — use absolute positioning with predefined x/y slots based on number of flowers selected. Pre-design 5-8 arrangement templates.

2. **For Spotify** — the `?t=102` parameter in embed URL jumps to 1:42. Test it: `https://open.spotify.com/embed/track/TRACK_ID?t=102`

3. **For flower SVGs** — use inline SVG so you can apply CSS filters for color theming if needed.

4. **For the petal rain** — create 1 SVG petal, clone it 20 times with JS, apply random delays and horizontal positions.

5. **Emotional writing prompts** — add placeholder suggestions that rotate in the message field:
   - "I don't say this enough, but..."
   - "Every time I hear this song, I think of..."
   - "Thank you for being the kind of person who..."

---

*Build this with love. The emotion of the product depends entirely on the craft of the execution.*
