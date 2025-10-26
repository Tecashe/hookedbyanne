-- Seed Gallery Images (20+ crochet-themed images)
INSERT INTO "GalleryImage" (id, title, description, "imageUrl", category, "displayOrder", "createdAt", "updatedAt")
VALUES
  ('gallery-1', 'Cozy Blanket Collection', 'Beautiful handmade crochet blankets in warm tones', '/placeholder.svg?height=800&width=600', 'blankets', 1, NOW(), NOW()),
  ('gallery-2', 'Amigurumi Animals', 'Adorable crocheted stuffed animals and toys', '/placeholder.svg?height=600&width=600', 'toys', 2, NOW(), NOW()),
  ('gallery-3', 'Boho Tote Bags', 'Stylish crochet tote bags perfect for everyday use', '/placeholder.svg?height=700&width=600', 'bags', 3, NOW(), NOW()),
  ('gallery-4', 'Baby Essentials', 'Soft and gentle crochet items for babies', '/placeholder.svg?height=600&width=800', 'baby', 4, NOW(), NOW()),
  ('gallery-5', 'Granny Square Masterpiece', 'Classic granny square designs in vibrant colors', '/placeholder.svg?height=800&width=800', 'blankets', 5, NOW(), NOW()),
  ('gallery-6', 'Cozy Scarves', 'Warm and stylish crochet scarves for all seasons', '/placeholder.svg?height=600&width=400', 'accessories', 6, NOW(), NOW()),
  ('gallery-7', 'Home Decor Pillows', 'Decorative crochet pillow covers', '/placeholder.svg?height=600&width=600', 'home', 7, NOW(), NOW()),
  ('gallery-8', 'Market Bags', 'Eco-friendly crochet market bags', '/placeholder.svg?height=700&width=500', 'bags', 8, NOW(), NOW()),
  ('gallery-9', 'Flower Bouquets', 'Everlasting crochet flower arrangements', '/placeholder.svg?height=600&width=600', 'decor', 9, NOW(), NOW()),
  ('gallery-10', 'Cozy Cardigans', 'Handmade crochet cardigans and sweaters', '/placeholder.svg?height=800&width=600', 'clothing', 10, NOW(), NOW()),
  ('gallery-11', 'Baby Booties', 'Tiny crochet booties for little feet', '/placeholder.svg?height=500&width=600', 'baby', 11, NOW(), NOW()),
  ('gallery-12', 'Wall Hangings', 'Artistic crochet wall art and macrame', '/placeholder.svg?height=800&width=600', 'decor', 12, NOW(), NOW()),
  ('gallery-13', 'Cozy Beanies', 'Warm crochet hats and beanies', '/placeholder.svg?height=600&width=600', 'accessories', 13, NOW(), NOW()),
  ('gallery-14', 'Plant Hangers', 'Decorative crochet plant hangers', '/placeholder.svg?height=700&width=500', 'home', 14, NOW(), NOW()),
  ('gallery-15', 'Doily Collection', 'Intricate vintage-style crochet doilies', '/placeholder.svg?height=600&width=600', 'home', 15, NOW(), NOW()),
  ('gallery-16', 'Beach Cover-ups', 'Light and airy crochet beach wear', '/placeholder.svg?height=800&width=600', 'clothing', 16, NOW(), NOW()),
  ('gallery-17', 'Coaster Sets', 'Colorful crochet coasters for your home', '/placeholder.svg?height=500&width=600', 'home', 17, NOW(), NOW()),
  ('gallery-18', 'Stuffed Toys', 'Cuddly crochet stuffed animals', '/placeholder.svg?height=600&width=600', 'toys', 18, NOW(), NOW()),
  ('gallery-19', 'Shawls and Wraps', 'Elegant crochet shawls', '/placeholder.svg?height=700&width=800', 'accessories', 19, NOW(), NOW()),
  ('gallery-20', 'Kitchen Towels', 'Practical crochet kitchen accessories', '/placeholder.svg?height=600&width=500', 'home', 20, NOW(), NOW()),
  ('gallery-21', 'Bunting Banners', 'Festive crochet bunting decorations', '/placeholder.svg?height=500&width=800', 'decor', 21, NOW(), NOW()),
  ('gallery-22', 'Laptop Sleeves', 'Protective crochet laptop cases', '/placeholder.svg?height=600&width=700', 'accessories', 22, NOW(), NOW()),
  ('gallery-23', 'Christmas Ornaments', 'Festive crochet holiday decorations', '/placeholder.svg?height=600&width=600', 'decor', 23, NOW(), NOW()),
  ('gallery-24', 'Infinity Scarves', 'Trendy crochet infinity scarves', '/placeholder.svg?height=600&width=600', 'accessories', 24, NOW(), NOW()),
  ('gallery-25', 'Rug Collection', 'Durable crochet rugs for any room', '/placeholder.svg?height=800&width=800', 'home', 25, NOW(), NOW());

-- Seed Initial Products (New Arrivals)
INSERT INTO "Product" (id, name, description, price, "compareAtPrice", category, "imageUrl", images, inventory, sku, featured, "createdAt", "updatedAt")
VALUES
  ('prod-1', 'Sunset Dreams Blanket', 'A cozy handmade crochet blanket in warm sunset colors. Perfect for snuggling on the couch or adding a pop of color to your bedroom. Made with soft acrylic yarn.', 89.99, 120.00, 'blankets', '/placeholder.svg?height=800&width=800', ARRAY['/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800'], 15, 'BLK-001', true, NOW(), NOW()),
  
  ('prod-2', 'Teddy Bear Amigurumi', 'Adorable handmade crochet teddy bear, perfect as a gift or nursery decoration. Soft, safe, and made with love. Approximately 8 inches tall.', 34.99, NULL, 'toys', '/placeholder.svg?height=800&width=800', ARRAY['/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800'], 25, 'TOY-001', true, NOW(), NOW()),
  
  ('prod-3', 'Boho Market Tote', 'Spacious and stylish crochet tote bag with sturdy handles. Perfect for farmers market trips, beach days, or everyday use. Made with durable cotton yarn.', 45.99, 60.00, 'bags', '/placeholder.svg?height=800&width=800', ARRAY['/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800'], 20, 'BAG-001', true, NOW(), NOW()),
  
  ('prod-4', 'Baby Cloud Blanket', 'Ultra-soft baby blanket in gentle pastel colors. Safe for sensitive skin and perfect for swaddling or tummy time. Machine washable.', 54.99, NULL, 'baby', '/placeholder.svg?height=800&width=800', ARRAY['/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800'], 18, 'BABY-001', true, NOW(), NOW()),
  
  ('prod-5', 'Rainbow Granny Square Throw', 'Vibrant granny square blanket featuring all the colors of the rainbow. A statement piece that brings joy to any room. Approximately 50x60 inches.', 95.99, 130.00, 'blankets', '/placeholder.svg?height=800&width=800', ARRAY['/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800'], 12, 'BLK-002', true, NOW(), NOW()),
  
  ('prod-6', 'Chunky Knit Scarf', 'Luxuriously thick and warm crochet scarf. Perfect for cold winter days. Available in multiple colors. Extra long for versatile styling.', 38.99, NULL, 'accessories', '/placeholder.svg?height=800&width=800', ARRAY['/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800'], 30, 'ACC-001', true, NOW(), NOW()),
  
  ('prod-7', 'Boho Pillow Cover Set', 'Set of 2 decorative crochet pillow covers in neutral tones. Adds texture and warmth to any living space. Fits standard 18x18 inch inserts.', 52.99, 70.00, 'home', '/placeholder.svg?height=800&width=800', ARRAY['/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800'], 15, 'HOME-001', true, NOW(), NOW()),
  
  ('prod-8', 'Sunflower Bouquet', 'Everlasting crochet sunflower bouquet. Never wilts, never needs water. Perfect for home decor or as a unique gift. Set of 5 flowers.', 42.99, NULL, 'decor', '/placeholder.svg?height=800&width=800', ARRAY['/placeholder.svg?height=800&width=800', '/placeholder.svg?height=800&width=800'], 22, 'DECOR-001', true, NOW(), NOW());
