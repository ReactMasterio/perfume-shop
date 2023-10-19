"use client";
import React, { useState } from "react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  UserGroupIcon,
  CakeIcon,
  ClockIcon,
  BellIcon,
  CurrencyDollarIcon,
  NewspaperIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const products = [
  {
    id: 1,
    gender: "men",
    name: "Elegant Watch",
    description: "Stylish timepiece for any occasion.",
    icon: ClockIcon,
  },
  {
    id: 2,
    gender: "women",
    name: "Diamond Ring",
    description: "Sparkling jewelry for special moments.",
    icon: BellIcon,
  },
  {
    id: 3,
    gender: "men",
    name: "Leather Wallet",
    description: "Classic accessory for daily use.",
    icon: CurrencyDollarIcon,
  },
  {
    id: 4,
    gender: "women",
    name: "Pearl Necklace",
    description: "Timeless beauty to enhance your look.",
    icon: CakeIcon,
  },
  {
    id: 5,
    gender: "unisex",
    name: "Perfume Set",
    description: "Delicate scents for every mood.",
    icon: NewspaperIcon,
  },
  {
    id: 6,
    gender: "unisex",
    name: "Stylish Hat",
    description: "Fashionable headwear for all seasons.",
    icon: UserGroupIcon,
  },
];

export const MobileMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <button>
      btn
    </button>
  );
};
export default MobileMenu;
