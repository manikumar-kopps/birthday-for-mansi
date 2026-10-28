# 💗 A Cute Birthday Website for My Love

A beautiful, romantic, interactive birthday website crafted like a personal love letter turned into a magical digital experience.

## ✨ Features & Sections
1. **Dreamy Pastel Design**: Soft pastel pink, cream, lavender, and white palette with floating hearts, twinkling stars, and romantic cursive fonts.
2. **Opening Screen 🎁**: Glowing animated heart with "Open Your Surprise ✨", unlocking floating hearts, sparkles, and a gentle transition.
3. **Birthday Hero Section 🎂**: Animated birthday cake with glowing candles and a "Make a Wish ✨" button that extinguishes the candles with sound and reveals a heartfelt wish.
4. **Interactive Love Letter 💌**: Wax-sealed envelope that opens with a click to reveal a heartfelt personal love letter (editable live or in config).
5. **Our Little Memories 📸**: Polaroid photo gallery with washi tape, gentle tilt hover animations, a full-screen Lightbox modal, and an instant photo upload button!
6. **Reasons Why You're Special 🌸**: Interactive 3D flip cards revealing sweet, personal thoughts from the heart.
7. **Interactive Love Buttons 💘**:
   - *Tap for a Hug 🤗*: Breathing heart hug modal with warm cuddle words.
   - *Tap for a Kiss 😘*: Floating kiss emojis and hearts shower.
   - *Need a Smile? 🌷*: Delivers sweet compliments.
   - *How Much Do I Love You? ♾️*: Animated meter charging to infinity.
   - *One More Surprise? 🎁*: Draws cute birthday VIP vouchers/coupons.
8. **Our Love Story Timeline 🧸**: Vertical romantic milestone timeline connecting the sparks of your journey.
9. **Birthday Cake Mini-Game 🎂**: Interactive 5-candle cake where candles can be lit individually (or using keyboard keys 1-5), blown out with spacebar/button, popping celebration confetti!
10. **The Secret Love Room 🔐**: Private vault protected with a password (default: `love`) and customizable hint, unlocking private love notes and photos.
11. **Music & Atmosphere 🎶**: Built-in soothing romantic piano melody with top-right vinyl widget, autoplay on first click, and custom MP3 support.
12. **Final Surprise 💝**: Starry night sky with "Send You All My Love 💗" revealing the final emotional birthday message.
13. **Live Personalization Gear ⚙️**: A floating button in the bottom left allowing live edits to names, nicknames, and secret passwords.

---

## 🚀 How to Run the Website Locally

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready files will be in the `dist/` directory.

---

## 🎨 How to Customize Content

All text, names, love letters, reasons, milestones, photos, and secret passwords can be easily customized in one single file:
👉 **`src/config.ts`**

### Changing Her Name & Nickname
In `src/config.ts`:
```typescript
partnerName: "Mansi",
partnerNickname: "My Sunshine ☀️💕",
senderName: "Your favorite person 💗",
```

### Changing the Secret Vault Password
In `src/config.ts`:
```typescript
secretRoom: {
  password: "love", // change to your anniversary date e.g. "2410" or nickname
  hint: "Hint: 4 letters, begins with 'l' 🌸",
  ...
}
```

### Adding Your Own Photos
You can either:
- Tap the **"Add / Upload Our Photo"** button directly on the website to test right away.
- Or place your photos into `public/images/` and update the URLs in `src/config.ts` (`memories.photos`).
