import Fridge1 from "../assets/refrigarator1.jpg"
import Fridge2 from "../assets/frigde2.jpg"
import Fridge3 from "../assets/fridge3.jpg"


import Samsung1 from "../assets/phone1.jpg"
import Samsung2 from "../assets/phone2.jpg"
import Samsung3 from "../assets/phone1.jpg"

import induction1 from "../assets/induction1.jpg"
import induction2 from "../assets/induction2.jpg"
import induction3 from "../assets/induction3.jpg"

import royal1 from "../assets/royal1.jpg"
import royal2 from "../assets/royal2.jpg"
import royal3 from "../assets/royal3.jpg"

import Heatpress1 from "../assets/Heatpress1.jpg"
import Heatpress2 from "../assets/heatpress2.jpg"


import ink1 from "../assets/ink1.jpg"
import ink2 from "../assets/ink2.jpg"
import ink3 from "../assets/ink3.jpg"

import BRANDING1 from "../assets/branding1.jpg"
import BRANDING2 from "../assets/branding2.jpg.jpg"
import BRANDING3 from "../assets/branding3.jpg"

import HP1 from "../assets/laptop1.jpg"
import HP2 from "../assets/laptop2.jpg"
import HP3 from "../assets/laptop3.jpg"




export const products = [
    {
        name:'refrigarator',
      image: Fridge1,
      description: "Description for Fridge 1",
      brand: "FridgeBrand",
      category: "Appliances",
      subcategory: "Refrigerators",
      price:" 799.99",
      seller: "Best Appliances Store",
      images: [Fridge1, Fridge2, Fridge3]
    },
    {
       name:"sumsung galaxy",
      image: Samsung1,
      description: "Description for Samsung 1",
    brand: "Samsung",
      category: "Electronics",
      subcategory: "Smartphones",
      price:" 599.99",
      seller: "Electronics World",
      images: [Samsung1, Samsung2, Samsung3]
    },
    {
        name:"Single Induction Cooker",
     image: induction1,
      description: "Description for Induction 1",
      brand: "InductionBrand",
      category: "Appliances",
      subcategory: "Kitchen Appliances",
      price: "149.99",
      seller: "Kitchen Superstore",
      images: [induction1, induction2, induction3]
    },
    {
        name:'Royal 32 smart frameless',
     image: royal1,
      description: "Description for Royal Product 1",
      brand: "Royal",
      category: "Clothing",
      subcategory: "T-Shirts",
      price:" 29.99",
      seller: "Fashion Outlet",
      images: [royal1, royal2, royal3]
    },
    {
        name:"Heat Press ",        
     image: Heatpress1,
      description: "Description for Heatpress 1",
      brand: "HeatpressBrand",
      category: "Machines",
      subcategory: "Printing Machines",
      price: "199.99",
      seller: "Print & More",
      images: [Heatpress1, Heatpress2]
    },
    {
        name:"Plastisol ink ",

     image: ink1,
      description: "Description for Ink 1",
      brand: "InkBrand",
      category: "Office Supplies",
      subcategory: "Printer Supplies",
      price: "19.99",
      seller: "Office Depot",
      images: [ink1, ink2, ink3]
    },
    {
        name:"Hp Elitebook 810 G3 11.6 ",
     image: HP1,
      description: "Description for HP Laptop",
      brand: "HP",
      category: "Electronics",
      subcategory: "Laptops",
      price:" 899.99",
      seller: "Tech Supermart",
      images: [HP1, HP2, HP3]
    }
    ,
    {
        name:"Hp Elitebook 810 G3 11.6 ",
     image: BRANDING1,
      description: "Description for  Branding machine",
      brand: "HP",
      category: "Electronics",
      subcategory: "Laptops",
      price: "2099.99",
      seller: "Tech Supermart",
      images: [BRANDING1, BRANDING2, BRANDING3]
    }  
  
  ];
  