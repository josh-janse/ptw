/**
 * Brand theme for React Email templates.
 *
 * Email clients can't read the app's `globals.css` custom properties (the
 * preview runs in an isolated iframe, and real inboxes strip linked CSS), so
 * the PtW tokens are inlined here as literal values. Keep these in sync with
 * the `:root` tokens in `app/globals.css`.
 */
export const emailTheme = {
  theme: {
    extend: {
      colors: {
        background: "#f6f3f3", // warm off-white app shell
        foreground: "#1a1a1a", // eerie-black text
        card: "#ffffff",
        muted: "#ede7e4",
        "muted-foreground": "#6f6862",
        border: "#e9e3e0", // creamy
        primary: "#ac715c", // witness salmon — single brand accent
        "primary-foreground": "#ffffff",
      },
      fontFamily: {
        // Plus Jakarta Sans stands in for the brand's Satoshi; falls back to
        // system sans in clients that don't load it.
        sans: [
          '"Plus Jakarta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        // Matches --radius (0.75rem) and its xl step in globals.css
        lg: "0.75rem",
        xl: "1.05rem",
      },
    },
  },
} as const;
