import basic from "../assets/basic.jpg"
import standard from "../assets/standard.avif"
import premium from "../assets/premium.jpg"
// import freemium from "../assets/free.jpg"

export const sliderContent = [
    // {
    //   title: 'Freemium Kshs:0',
    //   features: [
    //     ' ✔ Get up to 20 free ads per month',
    //     '🗙 priority ads per week',
    //     '🗙 priority ads per month',
    //     '🗙 Sponsered ads per month',
    //   ],
    //   button: '/free',
 
    //   image: freemium,
    //   price:0
    // },
    {
      title: 'Basic Kshs:0',
    features: [
        ' ✔ Get up to 20 free ads per month',
        '🗙 priority ads per week',
        '🗙 priority ads per month',
        '🗙 Sponsored ads per month',
      ],
      button: '/basic',
      image: basic,
      price:0
    },
    {
      title: 'Standard Ksh: 3000',
      features: [
        ' ✔Get upto 100 ads per month',
        ' ✔Get upto 25 ads per week @ Kes 900',
        ' ✔Get upto 25 priority ads per month',
        '🗙 No Ads Sponsorship',
      ],
      button: '/standard',
      image: standard,
      price:3500
    },
    {
      title: 'Premium Ksh: 7000',
      features: [
        ' ✔Get unlimited ads per month',
        ' ✔Get upto unlimited ads per week @ Kes 1200',
        ' ✔Get upto 50 priority ads per month',
        ' ✔Get Bonus sponsorship for your ads',
      ],
      button: '/premium',
      image: premium,
      price:4500
    },
  ];
