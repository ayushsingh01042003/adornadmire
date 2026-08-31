/**
 * Client reviews shown on the site.
 *
 * Deliberately NOT emitted as Review / aggregateRating JSON-LD. Google treats
 * reviews a business collects and publishes about itself as "self-serving" and
 * excludes them from review rich results, so marking them up earns no stars and
 * risks a structured-data manual action. Star ratings in search come from the
 * Google Business Profile instead. These stay as visible on-page content.
 */

export interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  service: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Deepshikha Shukla',
    date: '2 weeks ago',
    rating: 5,
    text: 'Ajay has done amazing nail art! He is very patient and listens to all of it. Again thanks Ajay, see you next time!',
    service: 'Nail Art',
  },
  {
    id: 2,
    name: 'Aanchal Tomar',
    date: '15 Dec 2025',
    rating: 5,
    text: 'Amazing experience with stylist Javed! I showed him a reference picture and he could recreate it. Would recommend him for hair.',
    service: 'Haircut',
  },
  {
    id: 3,
    name: 'Latha Vishwanath',
    date: '2 weeks ago',
    rating: 5,
    text: "Junaid did hair colouring and it was super! I'm using the service since 2 years, it's really amazing service.",
    service: 'Hair Colour',
  },
  {
    id: 4,
    name: 'Priyambada Patro',
    date: '1 week ago',
    rating: 5,
    text: "Beautiful balayage and global colour! Junaid did my balayage and global colour, it's gorgeous and I couldn't be happier.",
    service: 'Balayage',
  },
  {
    id: 5,
    name: 'Arina Shijugurumayum',
    date: '1 week ago',
    rating: 5,
    text: 'Ajay, thank you, it\u2019s pretty! The nail art came out exactly the way I wanted it.',
    service: 'Nail Art',
  },
  {
    id: 6,
    name: 'Shruti',
    date: '1 week ago',
    rating: 5,
    text: 'Great service and a really warm team. Happy with how my hair treatment turned out.',
    service: 'Hair Treatment',
  },
];
