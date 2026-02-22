const gadgets = [
    // Mobiles
    {
        id: "m01",
        name: "Nebula X Pro",
        category: "mobile",
        price: 1199,
        budget: "high",
        usage: ["photography", "general"],
        image: "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "Snapdragon 8 Gen 3",
            ram: "12GB",
            storage: "512GB",
            battery: "5000mAh",
            display: "6.8\" AMOLED 120Hz"
        },
        highlights: ["108MP Quad Camera", "Exceptional Low-light", "Premium Build"]
    },
    {
        id: "m02",
        name: "GameTron 5000",
        category: "mobile",
        price: 899,
        budget: "medium",
        usage: ["gaming", "general"],
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cd120?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "Dimensity 9200+",
            ram: "16GB",
            storage: "256GB",
            battery: "6000mAh",
            display: "6.7\" OLED 144Hz"
        },
        highlights: ["Built-in Cooling Fan", "Shoulder Triggers", "Massive Battery"]
    },
    {
        id: "m03",
        name: "Everyday Lite",
        category: "mobile",
        price: 349,
        budget: "low",
        usage: ["general", "productivity"],
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "Snapdragon 695",
            ram: "6GB",
            storage: "128GB",
            battery: "4500mAh",
            display: "6.5\" LCD 90Hz"
        },
        highlights: ["Great Value", "All-day Battery", "Clean UI"]
    },
    {
        id: "m04",
        name: "WorkPhone Enterprise",
        category: "mobile",
        price: 799,
        budget: "medium",
        usage: ["productivity", "general"],
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "Tensor G3 (Custom)",
            ram: "8GB",
            storage: "256GB",
            battery: "4800mAh",
            display: "6.4\" OLED 120Hz"
        },
        highlights: ["Stylus Support", "Enterprise Security", "Seamless Sync"]
    },

    // Laptops
    {
        id: "l01",
        name: "CreatorBook Pro 16",
        category: "laptop",
        price: 2499,
        budget: "high",
        usage: ["productivity", "photography", "gaming"],
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "Intel Core i9 14th Gen",
            ram: "32GB",
            storage: "2TB NVMe SSD",
            battery: "99Wh",
            display: "16\" Mini-LED 4K 120Hz"
        },
        highlights: ["Color Accurate Display", "RTX 4080 GPU", "Studio Mics"]
    },
    {
        id: "l02",
        name: "Stealth Gamer 15",
        category: "laptop",
        price: 1499,
        budget: "high",
        usage: ["gaming"],
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "AMD Ryzen 9 7940HS",
            ram: "16GB",
            storage: "1TB Gen4 SSD",
            battery: "80Wh",
            display: "15.6\" QHD 240Hz"
        },
        highlights: ["RTX 4070 GPU", "Vapor Chamber Cooling", "RGB Keyboard"]
    },
    {
        id: "l03",
        name: "StudentPad 14",
        category: "laptop",
        price: 499,
        budget: "low",
        usage: ["general", "productivity"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "Intel Core i3 13th Gen",
            ram: "8GB",
            storage: "256GB SSD",
            battery: "50Wh",
            display: "14\" FHD IPS"
        },
        highlights: ["Lightweight", "Long Battery Life", "Affordable"]
    },
    {
        id: "l04",
        name: "OfficeMate Ultra",
        category: "laptop",
        price: 999,
        budget: "medium",
        usage: ["productivity", "general"],
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "Apple M3 (equivalent)",
            ram: "16GB",
            storage: "512GB SSD",
            battery: "65Wh",
            display: "13.6\" Liquid Retina"
        },
        highlights: ["Silent Operation", "Incredible Battery", "Premium Aluminum"]
    },

    // Tablets
    {
        id: "t01",
        name: "ScribePad Pro",
        category: "tablet",
        price: 899,
        budget: "medium",
        usage: ["productivity", "photography"],
        image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "M2 AI Chip",
            ram: "8GB",
            storage: "256GB",
            battery: "8000mAh",
            display: "12.9\" OLED 120Hz"
        },
        highlights: ["Pro Stylus Included", "Laptop Replacement", "Desktop Class Apps"]
    },
    {
        id: "t02",
        name: "MediaTab 10",
        category: "tablet",
        price: 299,
        budget: "low",
        usage: ["general", "gaming"],
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "Helio G99",
            ram: "4GB",
            storage: "64GB",
            battery: "7000mAh",
            display: "10.4\" IPS LCD"
        },
        highlights: ["Quad Speakers", "Kids Mode", "Expandable Storage"]
    },

    // Smartwatches
    {
        id: "w01",
        name: "ActiveFit Ultra",
        category: "smartwatch",
        price: 799,
        budget: "high",
        usage: ["general", "productivity"],
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "S9 SiP",
            ram: "1GB",
            storage: "64GB",
            battery: "3 Days",
            display: "1.9\" Sapphire OLED"
        },
        highlights: ["Dive Ready", "Precision GPS", "Titanium Case"]
    },
    {
        id: "w02",
        name: "Tracker Lite",
        category: "smartwatch",
        price: 149,
        budget: "low",
        usage: ["general"],
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600",
        specs: {
            processor: "FitOS Chip",
            ram: "N/A",
            storage: "N/A",
            battery: "14 Days",
            display: "1.4\" AMOLED"
        },
        highlights: ["2 Week Battery", "Continuous Heart Rate", "Sleep Tracking"]
    }
];
