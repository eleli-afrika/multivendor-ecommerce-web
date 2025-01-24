import basic from "../assets/basic.jpg";
import standard from "../assets/standard.avif";
import premium from "../assets/premium.jpg";

export const sliderContent = [
  
  {
    title: 'Basic Kshs: 0',
    features: [
      '✔ Get up to 20 free ads per month',
      '🗙 Top Ads',
      '🗙 Suggested Ads',
      '🗙 Store',
      '🗙 Verified Seller',
      '🗙 Trending Ads',
    ],
    button: '/basic',
    image: basic,
    price: 0
  },
  {
    title: 'Standard Ksh: 3000',
    features: [
      '✔ Get up to 150 ads per month',
      '✔ Top Ads',
      '✔ Suggested Ads',
      '🗙 Store',
      '🗙 Verified Seller',
      '🗙 Trending Ads',
    ],
    button: '/standard',
    image: standard,
    price: 3500
  },
  {
    title: 'Premium Ksh: 7000',
    features: [
      '✔ Get unlimited ads per month',
      '✔ Top Ads',
      '✔ Suggested Ads',
      '✔ Store',
      '✔ Verified Seller',
      '✔ Trending Ads',
    ],
    button: '/premium',
    image: premium,
    price: 4500
  },
];
