import { RegisterDetails } from "../pages/RegisterPage";

export interface loginCredentials {
  email: string;
  password: string;
}

export const validUser: loginCredentials = {
  email: "azis@example.com",
  password: "azis123",
};

export const invalidUser: loginCredentials = {
  email: "wrong@example.com",
  password: "Wrongpassword",
};

export const newUser: RegisterDetails = {
  title: "Mr.",
  password: "Test1234",
  day: "20",
  month: "10",
  year: "2000",
  newsletter: true,
  specialoffer: true,
  firstname: "udin",
  lastname: "sedunia",
  address1: "Jl kebon",
  country: "Australia",
  state: "Mumbai",
  city: "Mumbai",
  zipcode: "1010",
  mobilenumber: "034839852374",
};

export interface CartItem {
  name: string;
  price: string;
  quantity: string;
}

export const cartItems: CartItem[] = [
  { name: "Blue Top", price: "500", quantity: "1" },
  { name: "Men T-shirt", price: "400", quantity: "1" },
];
