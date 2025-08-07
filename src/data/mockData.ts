// Mock E-commerce Data for Chatbot Demo
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  salesCount: number;
  description: string;
  image?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  orderDate: string;
  estimatedDelivery?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic T-Shirt",
    category: "Tops",
    price: 29.99,
    stock: 150,
    salesCount: 2450,
    description: "Comfortable cotton classic t-shirt available in multiple colors"
  },
  {
    id: "2", 
    name: "Denim Jeans",
    category: "Bottoms",
    price: 79.99,
    stock: 80,
    salesCount: 1890,
    description: "Premium denim jeans with classic fit"
  },
  {
    id: "3",
    name: "Summer Dress",
    category: "Dresses",
    price: 59.99,
    stock: 65,
    salesCount: 1650,
    description: "Light and breezy summer dress perfect for warm weather"
  },
  {
    id: "4",
    name: "Hooded Sweatshirt",
    category: "Hoodies",
    price: 49.99,
    stock: 120,
    salesCount: 1420,
    description: "Cozy hooded sweatshirt with kangaroo pocket"
  },
  {
    id: "5",
    name: "Athletic Shorts",
    category: "Bottoms", 
    price: 34.99,
    stock: 200,
    salesCount: 1200,
    description: "Moisture-wicking athletic shorts for active lifestyle"
  },
  {
    id: "6",
    name: "Cardigan Sweater",
    category: "Sweaters",
    price: 69.99,
    stock: 45,
    salesCount: 980,
    description: "Elegant cardigan sweater perfect for layering"
  },
  {
    id: "7",
    name: "Button-Up Shirt",
    category: "Tops",
    price: 44.99,
    stock: 90,
    salesCount: 890,
    description: "Professional button-up shirt for work or casual wear"
  },
  {
    id: "8",
    name: "Yoga Leggings",
    category: "Activewear",
    price: 39.99,
    stock: 175,
    salesCount: 760,
    description: "High-performance yoga leggings with four-way stretch"
  }
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: "12345",
    customerId: "user_001",
    customerName: "Sarah Johnson",
    status: "shipped",
    items: [
      { productId: "1", productName: "Classic T-Shirt", quantity: 2, price: 29.99 },
      { productId: "2", productName: "Denim Jeans", quantity: 1, price: 79.99 }
    ],
    total: 139.97,
    orderDate: "2024-01-20",
    estimatedDelivery: "2024-01-25"
  },
  {
    id: "12346",
    customerId: "user_002", 
    customerName: "Mike Chen",
    status: "delivered",
    items: [
      { productId: "3", productName: "Summer Dress", quantity: 1, price: 59.99 }
    ],
    total: 59.99,
    orderDate: "2024-01-18",
    estimatedDelivery: "2024-01-23"
  },
  {
    id: "12347",
    customerId: "user_003",
    customerName: "Emma Davis",
    status: "processing",
    items: [
      { productId: "4", productName: "Hooded Sweatshirt", quantity: 1, price: 49.99 },
      { productId: "5", productName: "Athletic Shorts", quantity: 2, price: 34.99 }
    ],
    total: 119.97,
    orderDate: "2024-01-22",
    estimatedDelivery: "2024-01-28"
  }
];

// AI Response Templates
export const getAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Top selling products
  if (lowerQuery.includes('top') && (lowerQuery.includes('sell') || lowerQuery.includes('popular'))) {
    const topProducts = mockProducts
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, 5);
    
    return `Here are our top 5 best-selling products:\n\n${topProducts.map((product, index) => 
      `${index + 1}. **${product.name}** - ${product.salesCount} units sold ($${product.price})`
    ).join('\n')}`;
  }
  
  // Order status
  if (lowerQuery.includes('order') && lowerQuery.includes('status')) {
    const orderIdMatch = lowerQuery.match(/\d+/);
    if (orderIdMatch) {
      const orderId = orderIdMatch[0];
      const order = mockOrders.find(o => o.id === orderId);
      
      if (order) {
        return `**Order #${order.id} Status: ${order.status.toUpperCase()}**\n\nCustomer: ${order.customerName}\nOrder Date: ${order.orderDate}\nTotal: $${order.total}\n${order.estimatedDelivery ? `Estimated Delivery: ${order.estimatedDelivery}` : ''}\n\nItems:\n${order.items.map(item => `• ${item.productName} (Qty: ${item.quantity}) - $${item.price}`).join('\n')}`;
      } else {
        return `I couldn't find an order with ID ${orderId}. Please check the order number and try again.`;
      }
    }
  }
  
  // Stock/inventory queries
  if (lowerQuery.includes('stock') || lowerQuery.includes('inventory') || lowerQuery.includes('left')) {
    const productName = lowerQuery.match(/classic t-shirt|denim jeans|summer dress|hooded sweatshirt|athletic shorts|cardigan sweater|button-up shirt|yoga leggings/i);
    
    if (productName) {
      const product = mockProducts.find(p => 
        p.name.toLowerCase().includes(productName[0].toLowerCase())
      );
      
      if (product) {
        return `**${product.name}** currently has **${product.stock} units** in stock.\n\nPrice: $${product.price}\nCategory: ${product.category}\nTotal Sales: ${product.salesCount} units\n\n${product.description}`;
      }
    }
    
    return `I can help you check stock levels! Please specify which product you'd like to know about. Our popular items include:\n• Classic T-Shirt\n• Denim Jeans\n• Summer Dress\n• Hooded Sweatshirt\n• Athletic Shorts`;
  }
  
  // General product inquiries
  if (lowerQuery.includes('product') || lowerQuery.includes('item')) {
    return `I can help you with product information! Here are some things I can assist with:\n\n• **Product stock levels** - "How many Classic T-Shirts are in stock?"\n• **Top selling products** - "What are the top 5 best sellers?"\n• **Order status** - "What's the status of order 12345?"\n• **Product details** - Just ask about any specific item!\n\nWhat would you like to know?`;
  }
  
  // Default responses
  const responses = [
    "I'm here to help with your shopping needs! I can check product availability, order status, and provide recommendations.",
    "How can I assist you today? I can help with orders, product information, stock levels, and more!",
    "Welcome to our customer support! I can help you track orders, check inventory, or find the perfect products.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};