import basic from "../assets/basic.jpg"
import standard from "../assets/standard.avif"
import premium from "../assets/premium.jpg"
import freemium from "../assets/free.jpg"

export const sliderContent = [
    {
      title: 'Freemium Kshs:0',
      features: [
        ' ✔ Get up to 20 free ads per month',
        '🗙 priority ads per week',
        '🗙 priority ads per month',
        '🗙 Sponsered ads per month',
      ],
      button: 'Get Started',
      image: freemium,
      price:0
    },
    {
      title: 'Basic Kshs:2500',
      features: [
        ' ✔Get up to 50 ads per month',
        ' ✔Get upto 10 ads per week @ Kes 700',
        ' ✔Get upto 10 priority ads per month',
        '🗙 No ads Sponsorship',
      ],
      button: 'Get Started',
      image: basic,
      price:2500
    },
    {
      title: 'Standard Ksh: 3500',
      features: [
        ' ✔Get upto 100 ads per month',
        ' ✔Get upto 25 ads per week @ Kes 900',
        ' ✔Get upto 25 priority ads per month',
        '🗙 No Ads Sponsorship',
      ],
      button: 'Get Started',
      image: standard,
      price:3500
    },
    {
      title: 'Premium Ksh: 4500',
      features: [
        ' ✔Get unlimited ads per month',
        ' ✔Get upto unlimited ads per week @ Kes 1200',
        ' ✔Get upto 50 priority ads per month',
        ' ✔Get Bonus sponsorship for your ads',
      ],
      button: 'Get started',
      image: premium,
      price:4500
    },
  ];
