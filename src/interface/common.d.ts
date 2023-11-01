export interface linkProps {
  name: string;
  url: string;
}

export interface userProps {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phonenumber: string;
  password: string;
}
export interface productCard {
  name: string;
  image: string;
  seller: string;
  price: string;
  // description: string | undefined;
  id: string;
}

// Replace "interface" with "type" for defining the ProductData type.
type ProductData = {
  isapproved: boolean;
  productname: string;
  productdescription: string;
  productprice: string;
  quantity: number;
  mainimage: string;
  category: string;
  subcategory: string;
  producttype: string;
  brand: string;
  productimages: File[] | [] | any[];
  producttid: string;
  isactive: boolean;
};

interface categoryData {
  categoryname: string;
  categoryimage: string;
}

interface subcategoryData {
  subcategoryname: string;
  subcategoryimage: string;
  parentcategory: string;
}
