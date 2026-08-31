# Domain migration: adornandadmire.com → adornadmire.in

The old WordPress site at `www.adornandadmire.com` holds every ranking, backlink
and piece of accumulated trust this business has online, including a link from
the L'Oréal Professionnel salon locator. The new site is a different domain, so
none of that transfers on its own.

Do the steps below in order. Skipping the redirects means starting from zero.

## 0. Before you touch anything

Confirm the new site is live and correct at `https://www.adornadmire.in`, because
the redirects point at it. Check that these all load:

- `https://www.adornadmire.in/` and `/about-us`, `/services`, `/products`,
  `/gallery`, `/contact-us`
- The three article URLs listed in the table below
- `https://www.adornadmire.in/sitemap.xml`
- `https://www.adornadmire.in/robots.txt`

## 1. The redirect map

Every old URL has an exact counterpart, which is why the new routes reuse the
old slugs. The mapping is one-to-one with no exceptions:

| Old URL (adornandadmire.com) | New URL (www.adornadmire.in) |
| --- | --- |
| `/` | `/` |
| `/about-us/` | `/about-us` |
| `/services/` | `/services` |
| `/products/` | `/products` |
| `/gallery/` | `/gallery` |
| `/contact-us/` | `/contact-us` |
| `/what-are-the-benefits-of-regular-body-massage/` | `/what-are-the-benefits-of-regular-body-massage` |
| `/transform-your-look-with-our-signature-haircut-services/` | `/transform-your-look-with-our-signature-haircut-services` |
| `/what-are-the-benefits-of-hair-smoothening/` | `/what-are-the-benefits-of-hair-smoothening` |

Because the paths are identical, a single wildcard rule covers all nine and any
old URL not in the sitemap:

```
https://www.adornandadmire.com/*  →  https://www.adornadmire.in/$1   (301)
```

Three rules that matter regardless of which method you use:

1. **301, not 302.** A 302 is temporary and passes far less signal.
2. **No chains.** `old → new` in one hop. `old → old-www → new-apex → new-www`
   loses value at every step and slows crawling.
3. **Never redirect everything to the homepage.** It is the single most common
   migration mistake. Google treats a mass redirect to `/` as a soft 404 and
   drops the old pages entirely rather than transferring them.

## 2. Implementing the redirects

Pick whichever matches how the old domain is hosted.

### If the old domain is on Cloudflare (easiest)

Rules → Redirect Rules → Create rule:

- If: Hostname equals `adornandadmire.com` **or** `www.adornandadmire.com`
- Then: Dynamic redirect
- Expression: `concat("https://www.adornadmire.in", http.request.uri.path)`
- Status: 301
- Preserve query string: on

### If it is Apache (most shared cPanel hosting)

In `.htaccess`, **above** the WordPress block:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} ^(www\.)?adornandadmire\.com$ [NC]
  RewriteRule ^(.*)$ https://www.adornadmire.in/$1 [R=301,L]
</IfModule>
```

### If it is Nginx

```nginx
server {
    server_name adornandadmire.com www.adornandadmire.com;
    return 301 https://www.adornadmire.in$request_uri;
}
```

### If you only have WordPress admin

Install the **Redirection** plugin, then add a regex redirect from `^/(.*)$` to
`https://www.adornadmire.in/$1` with type 301. This is the weakest option
because PHP has to boot for every hit, but it works.

## 3. Verify the redirects

Run this and confirm every line shows `301` and lands on the right path in one
hop:

```bash
for p in / /about-us/ /services/ /products/ /gallery/ /contact-us/ \
         /what-are-the-benefits-of-regular-body-massage/ \
         /transform-your-look-with-our-signature-haircut-services/ \
         /what-are-the-benefits-of-hair-smoothening/; do
  printf '%-58s' "$p"
  curl -s -o /dev/null -w '%{http_code} → %{redirect_url}\n' \
    "https://www.adornandadmire.com$p"
done
```

Then confirm there are no chains:

```bash
curl -sIL https://www.adornandadmire.com/services/ | grep -E '^HTTP|^location'
```

You want exactly one `301` followed by one `200`.

## 4. Search Console

1. Add and verify **both** properties: `adornandadmire.com` and
   `adornadmire.in`. Use a Domain property (DNS TXT) for each if you can, since
   it covers every subdomain and protocol.
2. Paste the verification token for the new property into
   `SEARCH_CONSOLE_VERIFICATION` in `src/data/site.ts` and redeploy. It is
   currently empty, so the meta tag is not rendered at all.
3. On the **old** property, run **Settings → Change of address** and select the
   new domain. This is the important step: it tells Google the move is
   deliberate and migrates signals far faster than 301s alone. It requires the
   redirects to already be live.
4. On the new property, submit `https://www.adornadmire.in/sitemap.xml`.
5. Use **URL Inspection → Request indexing** on the homepage and the three
   article URLs to prompt an early crawl.

## 5. Keep the old domain alive

Renew `adornandadmire.com` and leave the redirects in place for **at least
twelve months**, ideally permanently. Backlinks on other people's websites keep
pointing at the old URLs indefinitely, and the day the redirect stops, that
link equity stops arriving.

## 6. Update the places that link to you

The redirects handle visitors, but a direct link is always better than a
redirected one. Update the URL on:

- Google Business Profile (highest priority)
- Instagram and Facebook bios
- The L'Oréal Professionnel salon locator listing
  (`hair-salon-en.lorealprofessionnel.com/168997-adorn-admire`) — contact your
  L'Oréal representative to get it changed
- Justdial, Sulekha, AlwaysDial and any other directory listing
- Google Ads: the final URLs in account `AW-10873835846` still point at the old
  domain. Redirected ad URLs can affect Quality Score, so change them.

## 7. What to expect

Rankings usually wobble for two to six weeks after a domain move, even when
everything is done correctly. Do not panic and start changing things in week
two. Watch these in Search Console:

- **Coverage**: old-domain URLs should move to "Page with redirect" while
  new-domain URLs enter "Indexed".
- **Performance**: total clicks across *both* properties combined should recover
  to the previous baseline within four to eight weeks.

If after eight weeks the new domain has not recovered, check for redirect
chains, a `noindex` left somewhere, or old URLs still returning 200 instead of
301 before assuming anything worse.
