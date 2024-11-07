# 1. create an user and assign the role ADMIN - from authentication endpoint: SignUp - this does generate the token

# 2. generate some Products - SQL

INSERT INTO product ("name", "description", "price", "tags", "createdAt", "updatedAt")
VALUES
('Wireless Earbuds', 'High-quality wireless earbuds with noise cancellation and long battery life.', 79.99, 'electronics, audio, wireless, earbuds', now(), now()),
('Stainless Steel Water Bottle', 'Insulated stainless steel water bottle, keeps drinks cold for 24 hours and hot for 12 hours.', 25.50, 'outdoor, hydration, stainless steel, eco-friendly', now(), now()),
('Yoga Mat', 'Non-slip yoga mat made from eco-friendly materials, ideal for all fitness levels.', 35.00, 'fitness, yoga, wellness, eco-friendly', now(), now()),
('Bluetooth Speaker', 'Portable Bluetooth speaker with rich sound and waterproof design for outdoor use.', 59.99, 'electronics, audio, portable, Bluetooth', now(), now()),
('Organic Coffee Beans', 'Premium organic coffee beans sourced from sustainable farms, medium roast.', 12.99, 'food, beverages, organic, coffee', now(), now()),
('LED Desk Lamp', 'Adjustable LED desk lamp with multiple brightness levels and USB charging port.', 45.00, 'home, lighting, desk lamp, LED', now(), now()),
('Fitness Tracker', 'Advanced fitness tracker with heart rate monitoring, sleep tracking, and smartphone notifications.', 99.99, 'fitness, technology, wearables, health', now(), now()),
('Non-Stick Cookware Set', '10-piece non-stick cookware set, perfect for all types of cooking.', 150.00, 'kitchen, cookware, non-stick, home', now(), now()),
('Graphic T-Shirt', 'Comfortable cotton graphic t-shirt with unique designs, available in various colors.', 19.99, 'apparel, clothing, graphic tee, casual', now(), now()),
('Indoor Herb Garden Kit', 'Complete indoor herb garden kit with pots, soil, and seeds for easy growing.', 29.99, 'gardening, indoor, herbs, home', now(), now());


# 3. create some addresses, assign to user with id:#1 - once an address is created, it will be autoassigned to current user
INSERT INTO addresses ("addressOne", "addressTwo", "city", "country", "pincode", "userId", "createdAt", "updatedAt")
VALUES
('123 Maple Street', NULL, 'New York', 'USA', '10001', 1, NOW(), NOW()),
('456 Oak Avenue', 'Apt 2B', 'Los Angeles', 'USA', '90001', 1, NOW(), NOW())

# 4 add products to cart (AddItemToCart - form Cart)

# 5 create order - go to User and updated the defaultShipping/Billing Address to one from Addresses

# 6 an order event is created





