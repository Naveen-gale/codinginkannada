# 🚀 Fast Guide: How to Rank Your Website on Google

Follow these steps to get your website indexed and ranking on Google without buying a custom domain.

## Phase 1: Verification (Critical)

1.  **Open Google Search Console**: Go to [Google Search Console](https://search.google.com/search-console/about).
2.  **Add Property**: 
    -   Select **URL prefix**.
    -   Enter your full website URL (e.g., `https://codinginkannada.vercel.app`).
3.  **Get the HTML Tag**:
    -   Under the verification options, look for **HTML tag**.
    -   Copy the code that looks like this: `<meta name="google-site-verification" content="RANDOM_CODE_HERE" />`.
4.  **Update index.html**:
    -   Open your `frontend/index.html` file.
    -   Find the placeholder I added: `<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />`.
    -   **Replace** `YOUR_VERIFICATION_CODE_HERE` with your actual code from Google.
5.  **Deploy**: Push your code to GitHub/Vercel.
6.  **Verify**: Go back to Google Search Console and click **Verify**.

## Phase 2: Indexing Your Pages

1.  **Submit Sitemap**:
    -   In Search Console, click on **Sitemaps** in the left menu.
    -   Type `sitemap.xml` in the "Add a new sitemap" box.
    -   Click **Submit**.
2.  **Request Indexing**:
    -   Paste your home URL into the top search bar ("Inspect any URL").
    -   If it says "URL is not on Google", click **Request Indexing**.

## Phase 3: How to Rank High (Pro Tips)

1.  **Keywords**: I have already added main keywords to your `index.html`. Make sure you use words like "Learn Coding in Kannada" in your website headings (`h1` tags).
2.  **Fast Loading**: Google ranks fast sites higher. Vercel is already fast, so you are in good shape.
3.  **Social Sharing**: Share your link on WhatsApp, LinkedIn, and YouTube. Google notices when people visit your site from other places.
4.  **Content**: Add a "Blog" section later if you can. More text/content = better ranking.

---
**Note**: It usually takes **2 to 7 days** for Google to show your site in search results after you submit the sitemap.
