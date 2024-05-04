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
VALUES ('cleaner', 'PBKDF2WithHmacSHA256:2048:apXcPbjiq/zXZJAuaMC8d2Qg/Jrnkor7K03Ol63Klro=:N299/acqytYmr8FnZkLzmKPlMBv2esjuYWMszUj+K1Y=', 'cleaner');

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

INSERT INTO Drink (name, description, price, type, volume) VALUES ('Lemonade', NULL, 2.3, 'non-alcoholic',400);
INSERT INTO Drink (name, description, price, type, volume) VALUES ('Cola',  NULL, 1.99, 'non-alcoholic', 500);
INSERT INTO Drink (name, description, price, type, volume) VALUES ('Sprite', NULL, 1.99, 'non-alcoholic', 300);
INSERT INTO Drink (name, description, price, type, volume) VALUES ('Beer', NULL, 2.5, 'alcoholic', 500);
INSERT INTO Drink (name, description, price, type, volume) VALUES ('Coffee', NULL, 2.5, 'hot', 500);

INSERT INTO Food (name, description, price, type, allergens, grams) VALUES ('Pork chop', 'Very delicious', 9.99, 'meat', '1,2', 500);
INSERT INTO Food (name, description, price, type, allergens, grams) VALUES ('French Fries', 'Crispy and tasty', 3.50, 'side', '1,2', 200);
INSERT INTO Food (name, description, price, type, allergens, grams) VALUES ('Chicken Salad', 'Grilled chicken with mixed greens', 8.99, 'meat', '1,2', 350);
INSERT INTO Food (name, description, price, type, allergens, grams) VALUES ('Vegan Burger', 'Delicious plant-based burger', 7.99, 'vegetarian', '1', 400);

INSERT INTO Expenses (price, time, type, description, createdBy_id, orderedFrom_id) VALUES (99, '2024-06-27 17:50:06', 'food', 'Importand food', 1, 2);
INSERT INTO Expenses (price, time, type, description, createdBy_id, orderedFrom_id) VALUES (150, '2024-06-28 13:00:00', 'equipment', 'Kitchen maintenance', 1, 2);
INSERT INTO Expenses (price, time, type, description, createdBy_id, orderedFrom_id) VALUES (300, '2024-06-29 15:30:00', 'repair', 'HVAC system repair', 3, 3);

INSERT INTO Reservation_Room (Reservation_id, rooms_id) VALUES (5, 1);
INSERT INTO Reservation_Tablee (Reservation_id, tables_id) VALUES (1, 1);
INSERT INTO Reservation_Tablee (Reservation_id, tables_id) VALUES (3, 3);
INSERT INTO Reservation_Tablee (Reservation_id, tables_id) VALUES (4, 4);

INSERT INTO Order_ (atTime, prepared, preparedTime, payed, toRoom_id, toTable_id, food_id, drink_id) VALUES ('2024-06-27 10:22:56', FALSE, '2024-06-29 14:22:56', FALSE, NULL, 1, NULL, 1);
INSERT INTO Order_ (atTime, prepared, preparedTime, payed, toRoom_id, toTable_id, food_id, drink_id) VALUES ('2024-06-28 11:22:56', FALSE, '2024-06-29 13:22:56', FALSE, 1, NULL, NULL, 2);
INSERT INTO Order_ (atTime, prepared, preparedTime, payed, toRoom_id, toTable_id, food_id, drink_id) VALUES ('2024-06-29 13:22:56', TRUE, '2024-06-29 12:22:56', TRUE, 2, NULL, 1, NULL);
INSERT INTO Order_ (atTime, prepared, preparedTime, payed, toRoom_id, toTable_id, food_id, drink_id) VALUES ('2024-06-30 15:22:56', FALSE, '2024-06-29 12:42:56', FALSE, NULL, 4, 2, NULL);


INSERT INTO Menu_Drink (Menu_id, drinks_id) VALUES (1, 1);
INSERT INTO Menu_Drink (Menu_id, drinks_id) VALUES (1, 2);
INSERT INTO Menu_Drink (Menu_id, drinks_id) VALUES (3, 3);

INSERT INTO Menu_Food (Menu_id, foods_id) VALUES (1, 1);
INSERT INTO Menu_Food (Menu_id, foods_id) VALUES (2, 1);
INSERT INTO Menu_Food (Menu_id, foods_id) VALUES (4, 2);
