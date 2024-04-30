INSERT INTO Company (name, phone, owner) VALUES ('Company1', '+420165161665', 'Owner1');
INSERT INTO Company (name, phone, owner) VALUES ('Company2', '+420541616578', 'Owner2');
INSERT INTO Company (name, phone, owner) VALUES ('Company3', '+420876543212', 'Owner3');
INSERT INTO Company (name, phone, owner) VALUES ('Company4', '+420654321003', 'Owner4');

INSERT INTO Employee (name, login, password, role) VALUES ('Adam Holter', 'xholte00', 'password', 'MANAGER');
INSERT INTO Employee (name, login, password, role) VALUES ('Mirina Hill', 'xhillm00', 'password', 'CHEF');
INSERT INTO Employee (name, login, password, role) VALUES ('Marta Dorn', 'xdornm00', 'password', 'STAFF');
INSERT INTO Employee (name, login, password, role) VALUES ('Lorenzo Grande', 'xgrand00', 'password', 'STAFF');
INSERT INTO Employee (name, login, password, role) VALUES ('Alice Johnson', 'xjohns00', 'password123', 'MANAGER');
INSERT INTO Employee (name, login, password, role) VALUES ('John Doe', 'xdoej00', 'password123', 'CHEF');
INSERT INTO Employee (name, login, password, role) VALUES ('Jane Smith', 'xsmithj00', 'password123', 'STAFF');
INSERT INTO Employee (name, login, password, role) VALUES ('Bob Brown', 'xbrown00', 'password123', 'STAFF');

INSERT INTO Reservation (at, until, name, count, phone, email, createdBy) VALUES ('27-06-2024 20:00:00','27-06-2024 22:00:00', 2, '+420651651144', jan@gmail.com, 3);
INSERT INTO Reservation (at, until, name, count, phone, email, createdBy) VALUES ('27-06-2024 16:00:00','28-06-2024 00:00:00', 2, '+420298413154', fero@gmail.com, 4);
INSERT INTO Reservation (at, until, name, count, phone, email, createdBy) 
VALUES ('28-06-2024 19:00:00', '28-06-2024 21:00:00', 'John Doe', 4, '+420123456789', 'john.doe@gmail.com', 1);
INSERT INTO Reservation (at, until, name, count, phone, email, createdBy) 
VALUES ('29-06-2024 13:00:00', '29-06-2024 15:00:00', 'Jane Smith', 3, '+420987654321', 'jane.smith@gmail.com', 2);


INSERT INTO Room (name, capacity, description) VALUES ('Room1', 100, 'Very nice room');
INSERT INTO Room (name, capacity, description) VALUES ('Room2', 50, 'Cozy room with a great view');
INSERT INTO Room (name, capacity, description) VALUES ('Room3', 150, 'Large banquet hall');



INSERT INTO reservation_room (reservation_id, room_id) VALUES (1, 2);
INSERT INTO reservation_room (reservation_id, room_id) VALUES (2, 3);
INSERT INTO reservation_tablee (reservation_id, tablee_id) VALUES (2, 3);



INSERT INTO Tablee (name, capacity) VALUES ('Table 1', 5);
INSERT INTO Tablee (name, capacity) VALUES ('Table 2', 5);
INSERT INTO Tablee (name, capacity) VALUES ('Table 3', 5);
INSERT INTO Tablee (name, capacity) VALUES ('Table 4', 5);
INSERT INTO Tablee (name, capacity) VALUES ('Table 5', 4);
INSERT INTO Tablee (name, capacity) VALUES ('Table 6', 4);
INSERT INTO Tablee (name, capacity) VALUES ('Table 7', 4);
INSERT INTO Tablee (name, capacity) VALUES ('Table 9', 4);
INSERT INTO Tablee (name, capacity) VALUES ('Table 3', 2);
INSERT INTO Tablee (name, capacity) VALUES ('Table 10', 2);
INSERT INTO Tablee (name, capacity) VALUES ('Table 11', 2);
INSERT INTO Tablee (name, capacity) VALUES ('Table 12', 2);
INSERT INTO Tablee (name, capacity) VALUES ('Table 13', 6);
INSERT INTO Tablee (name, capacity) VALUES ('Table 14', 6);
INSERT INTO Tablee (name, capacity) VALUES ('Table 15', 6);
INSERT INTO Tablee (name, capacity) VALUES ('Table 16', 6);


INSERT INTO reservation_tablee (reservation_id, tablee_id) VALUES (4, 1);

INSERT INTO Menu (name, description) VALUES ('Menu1', 'Menu for Monday');
INSERT INTO Menu (name, description) VALUES ('Menu2', 'Menu for Tuesday');
INSERT INTO Menu (name, description) VALUES ('Menu3', 'Menu for Wednesday');
INSERT INTO Menu (name, description) VALUES ('Menu4', 'Menu for Thursday');
INSERT INTO Menu (name, description) VALUES ('Menu5', 'Menu for Friday');


INSERT INTO Order (atTime, prepared, preparedTime, payed, toRoom, toTable) VALUES ('27-06-2024 10:22:56', False,'', False, '', 1);
INSERT INTO Order (atTime, prepared, preparedTime, payed, toRoom, toTable) VALUES ('27-06-2024 16:22:56', True, '27-06-2024 9:50:06', False, 1, '');
INSERT INTO Order (atTime, prepared, preparedTime, payed, toRoom, toTable) 
VALUES ('28-06-2024 14:22:56', False, '', False, '', 2);
INSERT INTO Order (atTime, prepared, preparedTime, payed, toRoom, toTable) 
VALUES ('29-06-2024 11:22:56', True, '29-06-2024 10:50:06', False, '', 3);


INSERT INTO Drink (name, descriprion, price, type, volume) VALUES ('Lemonade','', 2.3, 'non-alcoholic',0.4);
INSERT INTO Drink (name, descriprion, price, type, volume) VALUES ('Cola','', 1.99,'non-alcoholic',0.33);
INSERT INTO Drink (name, descriprion, price, type, volume) VALUES ('Fanta','', 1.99,'non-alcoholic',0.33);
INSERT INTO Drink (name, descriprion, price, type, volume) VALUES ('Sprite','', 1.99,'non-alcoholic',0.33);
INSERT INTO Drink (name, descriprion, price, type, volume) VALUES ('Beer','', 2.5,'alcoholic',0.5);
INSERT INTO Drink (name, descriprion, price, type, volume) VALUES ('coffee','', 2.5,'hot',0.5);
INSERT INTO Drink (name, description, price, type, volume) 
VALUES ('Orange Juice', 'Freshly squeezed', 2.5, 'non-alcoholic', 0.4);
INSERT INTO Drink (name, description, price, type, volume) 
VALUES ('Espresso', 'Strong coffee', 1.8, 'hot', 0.15);
INSERT INTO Drink (name, description, price, type, volume) 
VALUES ('Tea', 'Green tea', 1.5, 'hot', 0.3);

INSERT INTO order_drink (order_id, drink_id) VALUES (2, 6);
INSERT INTO order_drink (order_id, drink_id) VALUES (3, 7);
INSERT INTO menu_drink (menu_id, drink_id) VALUES (1, 1);
INSERT INTO menu_drink (menu_id, drink_id) VALUES (3, 4);

INSERT INTO Food (name, description, price, type, allergens, grams) VALUES ('Pork chop', 'Very delicious', 9.99, 'meat', '1,2', 500);
INSERT INTO Food (name, description, price, type, allergens, grams) VALUES ('French fries', 'Very delicious', 3.00 , 'side', '1,2', 200);
INSERT INTO Food (name, description, price, type, allergens, grams) 
VALUES ('Chicken Burger', 'Juicy chicken with lettuce', 8.99, 'meat', '1,2', 450);
INSERT INTO Food (name, description, price, type, allergens, grams) 
VALUES ('Salad', 'Mixed greens with vinaigrette', 5.99, 'vegetarian', '1', 300);

INSERT INTO order_food (order_id, food_id) VALUES (1, 2);
INSERT INTO order_food (order_id, food_id) VALUES (1, 7);
INSERT INTO menu_food (menu_id, food_id) VALUES (2, 1);
INSERT INTO menu_food (menu_id, food_id) VALUES (3, 2);

INSERT INTO Expenses (price, time, type, description, createdBy, orderedFrom) VALUES (99, '27-06-2024 17:50:06', 'food', 'Importand food', 1, 2);
INSERT INTO Expenses (price, time, type, description, createdBy, orderedFrom) 
VALUES (150, '29-06-2024 12:30:00', 'beverages', 'Stocking up on drinks', 2, 3);