# Local SEO checklist (off-site)

The website work is done. This document is the part only you can do, and for a
single-location salon it matters more than the website.

When someone in Bengaluru searches "salon near me" or "hair salon Kalyan Nagar",
the top of the results is the **map pack**: three business listings above the
normal blue links. Those three slots are chosen almost entirely by Google
Business Profile signals, not by your website. A perfect website with a neglected
profile loses to a mediocre website with an active one.

Rough weighting for map pack ranking:

- Google Business Profile completeness and activity — the largest factor
- Review count, average rating and review recency
- Proximity of the searcher to your address — you cannot change this
- Consistency of your name, address and phone across the web
- Website relevance and authority — what we just fixed

---

## 1. Google Business Profile

This is the highest-return work on this list. Everything here is free and takes
an afternoon.

### Categories

- **Primary category: `Hair Salon`.** The primary category carries the most
  weight of any single field. Do not use `Beauty Salon` as the primary if hair
  is your main business; pick the one matching most of your revenue.
- Add secondary categories: `Beauty Salon`, `Nail Salon`, `Waxing Hair Removal
  Service`, `Facial Spa`, `Makeup Artist`, `Barber Shop`.
- Do not add categories for services you do not offer. Irrelevant categories
  dilute relevance rather than widening reach.

### Core information

- Name: `Adorn & Admire` — exactly this, with no keywords appended. "Adorn &
  Admire Best Salon Kalyan Nagar" is name-stuffing and is a suspension risk.
- Address: `No. 420, 1st Floor, VP Plaza, CMR Main Road, HRBR Layout 2nd Block,
  Kalyan Nagar, Bengaluru, Karnataka 560043`
- Phone: `+91 96637 88314` as primary. Add `+91 91104 23554` as an additional
  number.
- Website: `https://www.adornadmire.in` — **update this as soon as the
  redirects are live**, it almost certainly still points at the old domain.
- Hours: Monday to Sunday, 10:30 AM to 9:00 PM. Set special hours for Diwali,
  Onam and public holidays in advance; being marked open when you are closed
  generates one-star reviews.
- Opening date: 2017.
- Attributes: set every applicable one, particularly "Identifies as
  women-owned" if true, wheelchair accessibility, appointment required /
  walk-ins welcome, and accepted payment methods including UPI.

### Move the exact map pin

The coordinates currently in `src/data/site.ts` are the HRBR Layout 2nd Block
locality centroid, not your doorway, because the address could not be geocoded
precisely. In Business Profile, drag the pin onto the actual VP Plaza building,
then send me the latitude and longitude so the schema on the site matches.

### Services and products

Add every service individually with a price and a description. This is
underused and it directly feeds the queries you appear for. Work from
`src/data/services.ts`, which already has all of them:

- Advance haircut, ₹850
- Balayage, ₹3,999
- Global highlights, ₹4,999
- GK keratin, ₹4,999
- Acrylic nail extensions, ₹999
- Gel nail extensions, ₹999
- Gel nail paint, ₹500
- Plus facials, clean-ups, de-tan, threading, waxing, bridal makeup, men's
  cutting, beard shaping and grey blending

### Photos — the most neglected item

Listings with a steady stream of photos get materially more calls and direction
requests than static ones. Aim for **five to ten new photos every week**.

- Exterior shots showing VP Plaza and the signage from the road, so people can
  find you
- Interior: the salon floor, the treatment area, the reception
- Team members at work
- Before-and-after transformations, with the client's permission. These are the
  single most persuasive image type for a salon.
- Geotagging photos does nothing; Google strips EXIF. Do not pay anyone who
  claims otherwise.

### Google Posts

Post weekly. Posts appear directly in your listing and signal an active
business.

- Seasonal packages and promotions: mention them in Google Posts when they run
- Seasonal content: bridal season, monsoon hair care, festive looks
- New services or new stylists
- Always include a "Call now" or "Book" button pointing at
  `https://www.adornadmire.in`

### Q&A

You can ask and answer your own questions, and most businesses never do, leaving
the section either empty or answered wrongly by strangers. Seed it with the
real questions, reusing the answers already written on `/contact-us`:

- Do you take walk-ins?
- Is there parking?
- Do you do men's haircuts?
- Do you offer bridal packages?
- Which products do you use?
- Which floor are you on?

### Messaging

Turn on messaging only if someone will actually answer within a few hours.
Google surfaces response times, and a slow one is worse than not offering it.

---

## 2. Reviews

Review count and recency are among the strongest map pack factors, and reviews
are the main reason someone picks one salon over another.

### Generating reviews

- Get your short review link from Business Profile (**Ask for reviews**) and
  save it.
- Ask every satisfied client at the point of payment. In person, at the moment
  they are pleased with their hair, is far more effective than any follow-up
  message.
- Put a QR code to the review link at the billing counter and on mirrors.
- Send it via WhatsApp within a couple of hours of the appointment, while the
  result is fresh.
- Target roughly ten to fifteen new reviews a month, arriving steadily. Fifty
  reviews in one week looks exactly like what it is and can get them filtered.

### Rules worth taking seriously

- **Never buy reviews and never incentivise them.** No discount in exchange for
  a review. Google detects the pattern, filters the reviews, and can suspend the
  listing outright. This is a real risk, not a theoretical one.
- Do not review your own business from staff accounts.

### Responding

Reply to **every** review, positive and negative, within a day or two.
Responding is itself an activity signal, and it is what prospective clients
read.

- Positive: thank them and name the service and stylist, which naturally puts
  relevant keywords in your listing. "Thanks Priya, glad Junaid got the balayage
  right for you."
- Negative: reply calmly, apologise for the experience, offer to fix it, and
  move the specifics off the platform via a phone number. Never argue. Future
  readers are judging your response far more than the complaint.

---

## 3. Citations and NAP consistency

A **citation** is any mention of your name, address and phone on another site.
Google cross-references them, and inconsistencies reduce its confidence in your
location.

Use this exact form everywhere, character for character:

```
Adorn & Admire
No. 420, 1st Floor, VP Plaza, CMR Main Road, HRBR Layout 2nd Block,
Kalyan Nagar, Bengaluru, Karnataka 560043
+91 96637 88314
https://www.adornadmire.in
```

### Listings to claim or correct

Priority order for India:

1. **Google Business Profile** — done above
2. **L'Oréal Professionnel salon locator** — you are already listed at
   `hair-salon-en.lorealprofessionnel.com/168997-adorn-admire`. Note the address
   there is misspelled ("VP PALZA") and the website is missing. Ask your L'Oréal
   rep to fix both: this is a high-authority, industry-relevant link and it is
   currently underused.
3. **Justdial** — still the highest-traffic local directory in India
4. **Sulekha**
5. **Bing Places** — small volume, but trivial to do
6. **Apple Business Connect** — drives Apple Maps and Siri results
7. **AlwaysDial** — a listing already exists with the old
   `https://adornadmire.com/` URL and a garbled address; correct it
8. **Facebook** — keep the address and hours in sync with Business Profile
9. **Instagram** — put the new domain in the bio
10. Aggregators where your clients actually look: UrbanClap/Urban Company,
    Nearbuy, Fresha, StyleSeat

### Audit what already exists

Search these and fix anything with an old phone number, the old domain, or a
mangled address:

```
"Adorn & Admire" Kalyan Nagar
"Adorn and Admire" Bangalore salon
"9663788314"
"adornandadmire.com"
```

The phone number search is the useful one: it surfaces listings you did not know
existed.

---

## 4. Ongoing rhythm

Sustained mediocre effort beats a single burst. A realistic routine:

**Weekly (about 30 minutes)**

- One Google Post
- Five to ten new photos
- Reply to every new review
- Ask that week's happy clients for reviews

**Monthly (about an hour)**

- Check Business Profile insights: calls, direction requests, searches
- Check Search Console: new queries, impressions, any coverage errors
- Update service prices on the site when they change, in
  `src/data/services.ts` under each service's `treatments` list
- Update special hours for the coming month's holidays

**Quarterly**

- Publish one new blog post. The three existing ones target smoothening,
  haircuts and massage; obvious next topics are balayage aftercare on Indian
  hair, monsoon hair care in Bengaluru, bridal hair timelines, and how often to
  get a facial.
- Re-audit citations for drift
- Review which queries you rank for and where the gaps are

---

## 5. What not to waste money on

Agencies sell all of these to salons. None of them work.

- **Buying backlinks or directory blasts.** Thousands of low-quality citations
  are a liability, not an asset.
- **Geotagged photo services.** Google strips EXIF from uploads.
- **Guaranteed number-one rankings.** Nobody can guarantee this. Proximity alone
  means your map pack position differs for every searcher.
- **Keyword stuffing the business name.** Suspension risk for a temporary gain.
- **Paid review packages.** The fastest route to a suspended listing.
- **Fake secondary locations.** Creating listings at addresses you do not occupy
  is fraud and gets everything removed.

The honest summary: complete profile, real photos every week, steady genuine
reviews, consistent NAP, and a website that loads fast and says what you do.
That is the whole game for a local salon.
