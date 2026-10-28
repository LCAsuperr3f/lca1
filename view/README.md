# LCA VIEW preview

This is a separate chart page at `/view/`. It does not replace the site's root landing page.

For live Twelve Data candles:
1. Deploy this repository on Vercel.
2. In the Vercel project, set the environment variable `TWELVEDATA_API_KEY` for Preview and Production.
3. Deploy the `feat/lca-view-twelvedata` branch as a preview and open `/view/` on its Vercel URL.

The API key must be entered only in Vercel Environment Variables, never in client HTML or committed source.