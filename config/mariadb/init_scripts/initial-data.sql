INSERT INTO Company (name, phone, owner) VALUES ('Company1', '+420165161665', 'Owner1');
INSERT INTO Company (name, phone, owner) VALUES ('Company2', '+420541616578', 'Owner2');
INSERT INTO Company (name, phone, owner) VALUES ('Company3', '+420876543212', 'Owner3');
INSERT INTO Company (name, phone, owner) VALUES ('Company4', '+420654321003', 'Owner4');
INSERT INTO Company (name, phone, owner) VALUES ('Company5', '+420123456789', 'Owner5');

INSERT INTO Employee (login, password, role)
VALUES ('admin', 'PBKDF2WithHmacSHA256:2048:gFe9I2e2FuHQrHRh9PwwAI3m7pFhBwT7KBC2eE/RaDY=:W2AjzchF+/FNzBh3vkIMjT5T8gFK0toujhfwWnl5cyQ=', 'admin');
INSERT INTO Employee (login, password, role)
VALUES ('staff', 'PBKDF2WithHmacSHA256:2048:Py9QrwH45pw6XY18Yuk5wUGwPs/0MqgP05TJNSCLEes=:XHxl4E7nSoqlwDklWdweoqtBHIYLUDk4n5snxxtSPJE=', 'staff');
INSERT INTO Employee (login, password, role)
VALUES ('manager', 'PBKDF2WithHmacSHA256:2048:Dtck1ffPQBmFvdX8WtozZZGACiLIiw/1GpLY776o5hQ=:ICyw0IHXxH+iDvKD29UnHnckw44ksZG29LY/NNjOruQ=', 'manager');
INSERT INTO Employee (login, password, role)
VALUES ('waiter', 'PBKDF2WithHmacSHA256:2048:FxV5+y6XJN5bbdTr++CV9kUsokDC3ze6vw07sNNjgHc=:PTRKVjhmT7ZjR5vEQqA+U/ImkYDgaqzJ27eIjBUI/0w=', 'staff');
INSERT INTO Employee (login, password, role)
VALUES ('cleaner', 'PBKDF2WithHmacSHA256:2048:apXcPbjiq/zXZJAuaMC8d2Qg/Jrnkor7K03Ol63Klro=:N299/acqytYmr8FnZkLzmKPlMBv2esjuYWMszUj+K1Y=', 'staff');

INSERT INTO Reservation (at, until, name, new_name_with_keywords, phone, email, createdBy_id) VALUES ('2024-06-27 20:00:00','2024-06-27 22:00:00', 'Jan Holter', 2, '+420651651144', 'jan@gmail.com', 1);
INSERT INTO Reservation (at, until, name, new_name_with_keywords, phone, email, createdBy_id) VALUES ('2024-06-28 16:00:00','2024-06-28 18:00:00', 'Marina Hill', 3, '+420298413154', 'marina.hill@gmail.com', 1);
INSERT INTO Reservation (at, until, name, new_name_with_keywords, phone, email, createdBy_id) VALUES ('2024-06-28 19:00:00', '2024-06-28 21:00:00', 'Fero Stark', 2, '+420987654321', 'fero.stark@gmail.com', 2);
INSERT INTO Reservation (at, until, name, new_name_with_keywords, phone, email, createdBy_id) VALUES ('2024-06-29 14:00:00', '2024-06-29 16:00:00', 'Alice Johnson', 4, '+420159357486', 'alice.johnson@gmail.com', 1);
INSERT INTO Reservation (at, until, name, new_name_with_keywords, phone, email, createdBy_id) VALUES ('2024-06-29 15:00:00', '2024-06-29 23:00:00', 'Lorenzo Grande', 100, '+420876543210', 'lorenzo.grande@gmail.com', 2);

INSERT INTO Room (capacity, description) VALUES (100, 'Very nice room');
INSERT INTO Room (capacity, description) VALUES (200, 'Large event hall');
INSERT INTO Room (capacity, description) VALUES (50, 'Small private room');
INSERT INTO Room (capacity, description) VALUES (120, 'Medium-sized meeting room');

INSERT INTO Tablee (capacity) VALUES (5);
INSERT INTO Tablee (capacity) VALUES (10);
INSERT INTO Tablee (capacity) VALUES (8);
INSERT INTO Tablee (capacity) VALUES (6);
INSERT INTO Tablee (capacity) VALUES (4);

INSERT INTO Menu (name, description) VALUES ('Menu1', 'Menu for Monday');
INSERT INTO Menu (name, description) VALUES ('Menu2', 'Menu for Tuesday');
INSERT INTO Menu (name, description) VALUES ('Menu3', 'Menu for Wednesday');
INSERT INTO Menu (name, description) VALUES ('Menu4', 'Menu for Thursday');
INSERT INTO Menu (name, description) VALUES ('Menu5', 'Menu for Friday');

INSERT INTO Drink (name, description, price, type, volume, active) VALUES
('Lemonade', NULL, 2.3, 'non-alcoholic',400, TRUE),
('Cola',  NULL, 1.99, 'non-alcoholic', 500, TRUE),
('Sprite', NULL, 1.99, 'non-alcoholic', 300, TRUE),
('Beer', NULL, 2.5, 'alcoholic', 500, TRUE),
('Coffee', NULL, 2.5, 'hot', 500, TRUE),
('Iced Tea', 'Refreshing blend of black tea and lemon', 2.5, 'non-alcoholic', 450, TRUE),
('Orange Juice', 'Freshly squeezed oranges', 3.0, 'non-alcoholic', 350, TRUE),
('Cranberry Cocktail', 'Tangy blend of cranberry and lime', 2.8, 'alcoholic', 400, TRUE),
('Pineapple Punch', 'Sweet and tropical, with a hint of coconut', 3.2, 'non-alcoholic', 500, TRUE),
('Ginger Ale', 'Sparkling ginger soda', 2.7, 'non-alcoholic', 330, TRUE),
('Watermelon Cooler', 'Chilled watermelon juice with mint', 2.9, 'non-alcoholic', 450, TRUE),
('Lime Soda', 'Fizzing lime soda', 2.4, 'non-alcoholic', 400, TRUE),
('Mango Lassi', 'Creamy mango yogurt smoothie', 3.5, 'non-alcoholic', 350, TRUE),
('Peach Iced Tea', 'Iced tea infused with peach essence', 3.3, 'non-alcoholic', 450, TRUE),
('Strawberry Lemonade', 'Tart lemonade with a burst of strawberry', 2.8, 'non-alcoholic', 400, TRUE),
('Coconut Water', 'Naturally hydrating coconut water', 2.6, 'non-alcoholic', 500, TRUE),
('Blueberry Smoothie', 'Blend of blueberries, yogurt, and honey', 3.2, 'non-alcoholic', 400, TRUE),
('Pomegranate Juice', 'Freshly squeezed pomegranates', 3.1, 'non-alcoholic', 350, TRUE),
('Cucumber Mint Cooler', 'Cooling cucumber with a hint of mint', 2.9, 'non-alcoholic', 400, TRUE),
('Apple Cider', 'Warm spiced apple cider', 3.4, 'hot', 350, TRUE),
('Vanilla Milkshake', 'Classic creamy vanilla milkshake', 3.6, 'non-alcoholic', 400, TRUE),
('Raspberry Lemonade', 'Zesty lemonade with a touch of raspberry', 2.7, 'non-alcoholic', 400, TRUE),
('Passionfruit Punch', 'Exotic passionfruit blend with a splash of citrus', 3.0, 'non-alcoholic', 450, TRUE),
('Mint Julep', 'Refreshing mint-infused drink', 3.3, 'alcoholic', 400, TRUE),
('Grapefruit Spritzer', 'Bubbly grapefruit soda', 2.5, 'non-alcoholic', 330, TRUE);

INSERT INTO Food (name, description, price, type, allergens, grams, active) VALUES
('Pork chop', 'Very delicious', 9.99, 'meat', '1,2', 500, TRUE),
('French Fries', 'Crispy and tasty', 3.50, 'side', '1,2', 200, TRUE),
('Chicken Salad', 'Grilled chicken with mixed greens', 8.99, 'meat', '1,2', 350, TRUE),
('Vegan Burger', 'Delicious plant-based burger', 7.99, 'vegetarian', '1', 400, TRUE),
('Beef Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 8.99, 'meat', '1,2', 300, TRUE),
('Grilled Chicken Sandwich', 'Tender grilled chicken breast with mayo and pickles', 7.49, 'meat', NULL, 350, TRUE),
('Vegetarian Pizza', 'Loaded with fresh veggies and gooey cheese', 10.99, 'vegetarian', '3,4', 400, TRUE),
('Shrimp Alfredo Pasta', 'Creamy alfredo sauce with succulent shrimp', 12.99, 'seafood', '5', 450, TRUE),
('Margherita Pizza', 'Classic pizza topped with tomato sauce, mozzarella, and basil', 9.49, 'vegetarian', '3,4', 400, TRUE),
('Salmon Fillet', 'Grilled salmon served with lemon butter sauce', 14.99, 'seafood', NULL, 350, TRUE),
('Spaghetti Bolognese', 'Traditional Italian pasta dish with rich meat sauce', 11.99, 'meat', '1,2', 400, TRUE),
('Caprese Salad', 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze', 6.99, 'vegetarian', NULL, 250, TRUE),
('BBQ Ribs', 'Fall-off-the-bone ribs smothered in tangy BBQ sauce', 13.49, 'meat', NULL, 500, TRUE),
('Mushroom Risotto', 'Creamy risotto with wild mushrooms and Parmesan cheese', 9.99, 'vegetarian', NULL, 350, TRUE),
('Fish and Chips', 'Crispy battered fish served with fries and tartar sauce', 10.99, 'seafood', '5', 450, TRUE),
('Caesar Salad', 'Romaine lettuce, croutons, Parmesan cheese, and Caesar dressing', 7.99, 'vegetarian', NULL, 300, TRUE),
('Beef Tacos', 'Soft tortillas filled with seasoned ground beef, lettuce, and cheese', 8.49, 'meat', '1,2', 350, TRUE),
('Vegetable Stir-Fry', 'Assorted vegetables sautéed in a savory sauce', 9.49, 'vegetarian', NULL, 300, TRUE),
('Lobster Bisque', 'Rich and creamy soup made with tender lobster meat', 11.99, 'seafood', '5', 350, TRUE),
('Eggplant Parmesan', 'Breaded and fried eggplant topped with marinara sauce and cheese', 9.99, 'vegetarian', '4', 400, TRUE),
('Pulled Pork Sandwich', 'Slow-cooked pulled pork piled high on a bun with BBQ sauce', 9.49, 'meat', NULL, 400, TRUE),
('Quinoa Salad', 'Nutty quinoa mixed with fresh vegetables and vinaigrette', 8.49, 'vegetarian', NULL, 300, TRUE),
('Clam Chowder', 'Creamy New England-style soup loaded with clams and potatoes', 10.99, 'seafood', '5', 350, TRUE),
('Falafel Wrap', 'Crispy falafel balls wrapped in pita bread with tahini sauce', 7.99, 'vegetarian', NULL, 350, TRUE);

INSERT INTO Expenses (price, time, type, description, createdBy_id, orderedFrom_id) VALUES (99, '2024-06-27 17:50:06', 'food', 'Importand food', 1, 2);
INSERT INTO Expenses (price, time, type, description, createdBy_id, orderedFrom_id) VALUES (150, '2024-06-28 13:00:00', 'equipment', 'Kitchen maintenance', 1, 2);
INSERT INTO Expenses (price, time, type, description, createdBy_id, orderedFrom_id) VALUES (300, '2024-06-29 15:30:00', 'repair', 'HVAC system repair', 3, 3);

INSERT INTO Reservation_Room (Reservation_id, rooms_id) VALUES (5, 1);
INSERT INTO Reservation_Tablee (Reservation_id, tables_id) VALUES (1, 1);
INSERT INTO Reservation_Tablee (Reservation_id, tables_id) VALUES (3, 3);
INSERT INTO Reservation_Tablee (Reservation_id, tables_id) VALUES (4, 4);

INSERT INTO Order_ (atTime, prepared, preparedTime, payed, toRoom_id, toTable_id, food_id, drink_id)
VALUES
('2024-03-27 10:22:56', FALSE, '2024-03-29 14:22:56', FALSE, NULL, 1, NULL, 1),
('2024-03-28 11:22:56', FALSE, '2024-03-29 13:22:56', FALSE, 1, NULL, NULL, 2),
('2024-03-29 13:22:56', TRUE, '2024-03-29 12:22:56', TRUE, 2, NULL, 1, NULL),
('2024-03-30 15:22:56', FALSE, '2024-03-29 12:42:56', FALSE, NULL, 4, 2, NULL),

('2024-03-28 11:22:56', FALSE, '2024-03-28 13:22:56', TRUE, NULL, 1, 2, NULL),
('2024-03-05 15:45:30', FALSE, '2024-03-05 17:45:30', TRUE, NULL, 2, 2, NULL),
('2024-03-12 08:10:15', FALSE, '2024-03-12 10:10:15', TRUE, NULL, 3, 2, NULL),
('2024-03-19 12:30:00', FALSE, '2024-03-19 14:30:00', FALSE, NULL, 4, 2, NULL),
('2024-03-26 17:20:45', FALSE, '2024-03-26 19:20:45', FALSE, NULL, 5, 3, NULL),
('2024-03-02 09:55:20', FALSE, '2024-03-02 11:55:20', FALSE, NULL, 1, 6, NULL),
('2024-03-09 14:15:10', FALSE, '2024-03-09 16:15:10', FALSE, NULL, 2, 8, NULL),
('2024-03-16 10:40:00', FALSE, '2024-03-16 12:40:00', FALSE, NULL, 3, 7, NULL),
('2024-03-23 18:05:30', FALSE, '2024-03-23 20:05:30', FALSE, NULL, 4, 9, NULL),
('2024-03-30 13:00:45', FALSE, '2024-03-30 15:00:45', FALSE, NULL, 5, 10, NULL),
('2024-03-06 11:22:56', FALSE, '2024-03-06 13:22:56', FALSE, NULL, 1, 11, NULL),
('2024-03-13 15:45:30', FALSE, '2024-03-13 17:45:30', FALSE, NULL, 2, 12, NULL),
('2024-03-20 08:10:15', FALSE, '2024-03-20 10:10:15', FALSE, NULL, 3, 13, NULL),
('2024-03-27 12:30:00', FALSE, '2024-03-27 14:30:00', TRUE, NULL, 4, 15, NULL),
('2024-03-04 17:20:45', FALSE, '2024-03-04 19:20:45', TRUE, NULL, 5, 16, NULL),
('2024-03-11 09:55:20', FALSE, '2024-03-11 11:55:20', TRUE, NULL, 1, 14, NULL),
('2024-03-18 14:15:10', FALSE, '2024-03-18 16:15:10', FALSE, NULL, 2, 17, NULL),
('2024-03-25 10:40:00', FALSE, '2024-03-25 12:40:00', FALSE, NULL, 3, 16, NULL),
('2024-03-01 18:05:30', FALSE, '2024-03-01 20:05:30', FALSE, NULL, 4, 19, NULL),
('2024-03-08 13:00:45', FALSE, '2024-03-08 15:00:45', FALSE, NULL, 5, 20, NULL),

('2024-04-30 10:22:56', FALSE, '2024-05-01 14:22:56', FALSE, NULL, 1, NULL, 2),
('2024-04-30 11:22:56', FALSE, '2024-05-01 13:22:56', TRUE, NULL, 2, NULL, 3),
('2024-04-30 13:22:56', TRUE, '2024-05-01 12:22:56', TRUE, NULL, 3, NULL, 1),
('2024-04-30 15:22:56', FALSE, '2024-05-01 12:42:56', FALSE, NULL, 4, NULL, 4),
('2024-04-30 11:22:56', FALSE, '2024-05-01 13:22:56', TRUE, NULL, 1, NULL, 5),
('2024-04-30 15:45:30', FALSE, '2024-05-01 17:45:30', TRUE, NULL, 2, NULL, 6),
('2024-04-30 08:10:15', FALSE, '2024-05-01 10:10:15', TRUE, NULL, 3, NULL, 7),
('2024-04-30 12:30:00', FALSE, '2024-05-01 14:30:00', FALSE, NULL, 4, NULL, 8),
('2024-04-30 17:20:45', FALSE, '2024-05-01 19:20:45', FALSE, NULL, 5, NULL, 9),
('2024-04-30 09:55:20', FALSE, '2024-05-01 11:55:20', FALSE, NULL, 1, NULL, 10),
('2024-04-30 14:15:10', FALSE, '2024-05-01 16:15:10', FALSE, NULL, 2, NULL, 11),
('2024-04-30 10:40:00', FALSE, '2024-05-01 12:40:00', FALSE, NULL, 3, NULL, 12),
('2024-04-30 18:05:30', FALSE, '2024-05-01 20:05:30', FALSE, NULL, 4, NULL, 13),
('2024-04-30 13:00:45', FALSE, '2024-05-01 15:00:45', FALSE, NULL, 5, NULL, 14),
('2024-04-30 11:22:56', TRUE, '2024-05-01 13:22:56', TRUE, NULL, 1, NULL, 15),
('2024-04-30 15:45:30', TRUE, '2024-05-01 17:45:30', TRUE, NULL, 2, NULL, 16),
('2024-04-30 08:10:15', TRUE, '2024-05-01 10:10:15', TRUE, NULL, 3, NULL, 17),
('2024-04-30 12:30:00', TRUE, '2024-05-01 14:30:00', TRUE, NULL, 4, NULL, 18),
('2024-04-30 17:20:45', TRUE, '2024-05-01 19:20:45', TRUE, NULL, 5, NULL, 19),
('2024-04-30 09:55:20', TRUE, '2024-05-01 11:55:20', TRUE, NULL, 1, NULL, 20),

('2024-05-09 10:22:56', FALSE, '2024-05-10 14:22:56', FALSE, NULL, 1, NULL, 2),
('2024-05-10 11:22:56', FALSE, '2024-05-10 13:22:56', TRUE, NULL, 2, NULL, 3),
('2024-05-10 13:22:56', TRUE, '2024-05-10 12:22:56', TRUE, NULL, 3, NULL, 1),
('2024-05-10 15:22:56', FALSE, '2024-05-10 12:42:56', FALSE, NULL, 4, NULL, 4),
('2024-05-10 11:22:56', FALSE, '2024-05-10 13:22:56', TRUE, NULL, 1, NULL, 5),
('2024-05-10 15:45:30', FALSE, '2024-05-10 17:45:30', TRUE, NULL, 2, NULL, 6),
('2024-05-10 08:10:15', FALSE, '2024-05-10 10:10:15', TRUE, NULL, 3, NULL, 7),
('2024-05-10 12:30:00', FALSE, '2024-05-10 14:30:00', FALSE, NULL, 4, NULL, 8),
('2024-05-10 17:20:45', FALSE, '2024-05-10 19:20:45', FALSE, NULL, 5, NULL, 9),
('2024-05-10 09:55:20', FALSE, '2024-05-10 11:55:20', FALSE, NULL, 1, NULL, 10),
('2024-05-10 14:15:10', FALSE, '2024-05-10 16:15:10', FALSE, NULL, 2, NULL, 11),
('2024-05-10 10:40:00', FALSE, '2024-05-10 12:40:00', FALSE, NULL, 3, NULL, 12),
('2024-05-10 18:05:30', FALSE, '2024-05-10 20:05:30', FALSE, NULL, 4, NULL, 13),
('2024-05-10 13:00:45', FALSE, '2024-05-10 15:00:45', FALSE, NULL, 5, NULL, 14),
('2024-05-10 11:22:56', TRUE, '2024-05-10 13:22:56', TRUE, NULL, 1, NULL, 15),
('2024-05-10 15:45:30', TRUE, '2024-05-10 17:45:30', TRUE, NULL, 2, NULL, 16),
('2024-05-10 08:10:15', TRUE, '2024-05-10 10:10:15', TRUE, NULL, 3, NULL, 17),
('2024-05-10 12:30:00', TRUE, '2024-05-10 14:30:00', TRUE, NULL, 4, NULL, 18),
('2024-05-10 17:20:45', TRUE, '2024-05-10 19:20:45', TRUE, NULL, 5, NULL, 19),
('2024-05-10 09:55:20', TRUE, '2024-05-10 11:55:20', TRUE, NULL, 1, NULL, 20);


INSERT INTO Menu_Drink (Menu_id, drinks_id) VALUES (1, 1);
INSERT INTO Menu_Drink (Menu_id, drinks_id) VALUES (1, 2);
INSERT INTO Menu_Drink (Menu_id, drinks_id) VALUES (3, 3);

INSERT INTO Menu_Food (Menu_id, foods_id) VALUES (1, 1);
INSERT INTO Menu_Food (Menu_id, foods_id) VALUES (2, 1);
INSERT INTO Menu_Food (Menu_id, foods_id) VALUES (4, 2);
