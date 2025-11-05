import logo from "./logo.png";
import astro from "./astro.png";
import banner_img from "./banner_img.png";
import cart_icon from "./cart_icon.png";
import fiction_icon from "./fiction_icon.png";
import non_fiction_icon from "./non_fiction_icon.png";
import history_icon from "./history_icon.png";
import poetry_icon from "./poetry_icon.png";
import hero_book from "./hero_book.png";
import hero_girl from "./hero_girl.png";
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";
import image4 from "./image4.png";
import image5 from "./image5.png";
import image6 from "./image6.png";
import image7 from "./image7.png";
import image8 from "./image8.png";
import image9 from "./image9.png";
import image10 from "./image10.png";
import image11 from "./image11.png";
import image12 from "./image12.png";
import booksLogo from "./bookLogo.png";
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";
import img4 from "./img4.png";
import img5 from "./img5.png";
import img6 from "./img6.png";

import list_icon from "./list-icon.png";
import add_icon from "./add-icon.png";
import order_icon from "./order-icon.png";

export const assets = {
  logo,
  cart_icon,
  banner_img,
  hero_book,
  hero_girl,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  list_icon,
  order_icon,
  add_icon,
  booksLogo
};

export const categories = [
  {
    _id: "1",
    name: "Fiction",
    image: img1,
  },
  {
    _id: "2",
    name: "Non-Fiction",
    image: img2,
  },
  {
    _id: "3",
    name: "History",
    image: img3,
  },
  {
    _id: "4",
    name: "Poetry",
    image: img4,
  },
  {
    _id: "5",
    name: "Thrill",
    image: img5,
  },
  {
    _id: "6",
    name: "Astronaut",
    image: img6,
  },
];

export const books = [
  {
    _id: "1",
    title: "The Silent Forest",
    author: "Emily Hart",
    price: 20,
    offerPrice: 16,
    rating: 4.5,
    reviews: 45,
    description:
      "A suspenseful tale of mystery and survival in the wilderness.",
    image: image1,
    category: "Thrill",
  },
  {
    _id: "2",
    title: "Beyond the Stars",
    author: "James Carter",
    price: 25,
    offerPrice: 20,
    rating: 4.7,
    reviews: 32,
    description:
      "An astronaut's journey through time, space, and self-discovery.",
    image: image2,
    category: "Astronaut",
  },
  {
    _id: "3",
    title: "History Unfolded",
    author: "Sarah Monroe",
    price: 22,
    offerPrice: 18,
    rating: 4.4,
    reviews: 28,
    description: "Dive deep into the events that shaped our world.",
    image: image3,
    category: "History",
  },
  {
    _id: "4",
    title: "Fictional Realms",
    author: "Liam Grey",
    price: 18,
    offerPrice: 15,
    rating: 4.2,
    reviews: 40,
    description: "A world of imagination where anything is possible.",
    image: image4,
    category: "Fiction",
  },
  {
    _id: "5",
    title: "Verses of the Soul",
    author: "Nora Blake",
    price: 15,
    offerPrice: 12,
    rating: 4.8,
    reviews: 52,
    description: "A poetry collection that touches hearts and inspires minds.",
    image: image5,
    category: "Poetry",
  },
  {
    _id: "6",
    title: "The Truth Within",
    author: "Daniel Ross",
    price: 24,
    offerPrice: 19,
    rating: 4.3,
    reviews: 33,
    description:
      "A powerful non-fiction book revealing hidden realities of life.",
    image: image6,
    category: "Non-Fiction",
  },
  {
    _id: "7",
    title: "Whispers in the Dark",
    author: "Olivia Stone",
    price: 19,
    offerPrice: 14,
    rating: 4.6,
    reviews: 48,
    description: "A thrilling mystery that keeps you guessing until the end.",
    image: image7,
    category: "Thrill",
  },
  {
    _id: "8",
    title: "Galactic Dreams",
    author: "Ethan Wells",
    price: 26,
    offerPrice: 21,
    rating: 4.7,
    reviews: 36,
    description: "An astronaut’s search for meaning beyond the stars.",
    image: image8,
    category: "Astronaut",
  },
  {
    _id: "9",
    title: "Echoes of the Past",
    author: "Chloe Bennett",
    price: 21,
    offerPrice: 17,
    rating: 4.4,
    reviews: 39,
    description: "History told through the voices of those who lived it.",
    image: image9,
    category: "History",
  },
  {
    _id: "10",
    title: "Imaginary Lines",
    author: "Max Turner",
    price: 17,
    offerPrice: 13,
    rating: 4.1,
    reviews: 25,
    description:
      "Fictional stories that blur the line between real and unreal.",
    image: image10,
    category: "Fiction",
  },
  {
    _id: "11",
    title: "Soul Ink",
    author: "Isabella Moore",
    price: 16,
    offerPrice: 12,
    rating: 4.9,
    reviews: 60,
    description: "A touching poetry book that speaks to the soul.",
    image: image11,
    category: "Poetry",
  },
  {
    _id: "12",
    title: "Facts & Figures",
    author: "Noah Bryant",
    price: 23,
    offerPrice: 18,
    rating: 4.3,
    reviews: 29,
    description: "A non-fiction gem filled with surprising truths.",
    image: image12,
    category: "Non-Fiction",
  },
];
