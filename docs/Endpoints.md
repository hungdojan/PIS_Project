# Employee

- **POST /employee/login**
    - **Name**: Employee login
    - **Parameters**: `Employee` (with `login` and `password`)
    - **Output**: `EmployeeDTO` with a JWT cookie on success

- **POST /employee**
    - **Name**: Create a new employee
    - **Parameters**: `Employee` (with `login`, `password`, and `role`)
    - **Output**: `EmployeeDTO` (requires admin privileges via JWT)

- **PUT /employee**
    - **Name**: Update an existing employee
    - **Parameters**: `Employee` (with `id`, `login`, `password`, `role`) and `jwt` query parameter
    - **Output**: `EmployeeDTO` (requires admin privileges via JWT)

- **DELETE /employee/{id}**
    - **Name**: Delete an employee by ID
    - **Parameters**: `id` (Employee ID) and `jwt` query parameter
    - **Output**: Confirmation message (requires admin privileges via JWT)

- **GET /employee**
    - **Name**: Retrieve all employees
    - **Parameters**: `jwt` query parameter
    - **Output**: List of `EmployeeDTO` (requires admin privileges via JWT)

- **GET /employee/logout**
    - **Name**: Logout current user
    - **Parameters**: `jwt` cookie parameter
    - **Output**: Logout confirmation message

# Reservations
- **GET /reservations**
    - **Name**: Retrieve all reservations
    - **Parameters**: None
    - **Output**: List of `ReservationResponseDTO`

- **GET /reservations/{id}**
    - **Name**: Retrieve reservation by ID
    - **Parameters**: `id` (Reservation ID)
    - **Output**: `ReservationResponseDTO`

- **POST /reservations**
    - **Name**: Create a new reservation
    - **Parameters**: `ReservationDTO`
    - **Output**: `ReservationResponseDTO`

- **PUT /reservations/{id}**
    - **Name**: Update a reservation
    - **Parameters**: `id` (Reservation ID), `ReservationDTO`
    - **Output**: `ReservationResponseDTO`

- **DELETE /reservations/{id}**
    - **Name**: Delete a reservation
    - **Parameters**: `id` (Reservation ID)
    - **Output**: Confirmation (e.g., HTTP 200 status)

- **GET /reservations/reservationstime**
    - **Name**: Get reservations within a specific time period
    - **Parameters**: `ReservationDTO` (`at`, `until`)
    - **Output**: List of `ReservationResponseDTO`

#  Orders
- **GET /orders**
    - **Name**: Retrieve all orders
    - **Parameters**: None
    - **Output**: List of `OrderResponseDTO`

- **POST /orders**
    - **Name**: Create a new order
    - **Parameters**: `OrderDTO`
    - **Output**: `OrderResponseDTO`

- **PUT /orders**
    - **Name**: Update an existing order
    - **Parameters**: `OrderDTO`
    - **Output**: `OrderResponseDTO`

- **DELETE /orders/{id}**
    - **Name**: Delete an order by ID
    - **Parameters**: `id` (Order ID)
    - **Output**: Confirmation (e.g., HTTP 200 status)

# Rooms
- **GET /rooms**
    - **Name**: Retrieve all rooms
    - **Parameters**: None
    - **Output**: List of `RoomDTO`

- **GET /rooms/{id}**
    - **Name**: Retrieve room by ID
    - **Parameters**: `id` (Room ID)
    - **Output**: `RoomDTO`

- **GET /rooms/{id}/reservations**
    - **Name**: Get reservations for a specific room
    - **Parameters**: `id` (Room ID)
    - **Output**: List of `ReservationResponseDTO`

- **GET /rooms/{id}/orders**
    - **Name**: Get orders for a specific room
    - **Parameters**: `id` (Room ID)
    - **Output**: List of `OrderDTO`

- **POST /rooms**
    - **Name**: Create a new room
    - **Parameters**: `RoomDTO`
    - **Output**: `RoomDTO`

- **PUT /rooms/{id}**
    - **Name**: Update a room
    - **Parameters**: `id` (Room ID), `RoomDTO`
    - **Output**: `RoomDTO`

- **DELETE /rooms/{id}**
    - **Name**: Delete a room
    - **Parameters**: `id` (Room ID)
    - **Output**: Confirmation (e.g., HTTP 200 status)

- **GET /rooms/available**
    - **Name**: Get available rooms during a time period
    - **Parameters**: `ReservationDTO` (`at`, `until`)
    - **Output**: List of `RoomDTO`

- **GET /rooms/available/{id}**
    - **Name**: Check if a specific room is available
    - **Parameters**: `id` (Room ID), `ReservationDTO` (`at`, `until`)
    - **Output**: Boolean indicating availability


# Tables

- **GET /tables**
    - **Name**: Retrieve all tables
    - **Parameters**: None
    - **Output**: List of `TableDTO`

- **GET /tables/{id}/orders**
    - **Name**: Retrieve all orders for a specific table
    - **Parameters**: `table_id` (Table ID)
    - **Output**: List of `OrderResponseDTO`

# Food

- **GET /food**
    - **Name**: Retrieve all food items
    - **Parameters**: None
    - **Output**: List of `FoodDTO`

# Drink

- **GET /drinks**
    - **Name**: Retrieve all drinks
    - **Parameters**: None
    - **Output**: List of `DrinkDTO`

# Menu
- **GET /menus**
    - **Name**: Retrieve all menus
    - **Parameters**: None
    - **Output**: List of `MenuResponseDTO`

- **POST /menus**
    - **Name**: Create a new menu
    - **Parameters**: `MenuDTO`
    - **Output**: `MenuResponseDTO`

- **PUT /menus**
    - **Name**: Update an existing menu
    - **Parameters**: `MenuDTO`
    - **Output**: `MenuResponseDTO`

- **DELETE /menus/{id}**
    - **Name**: Delete a menu by ID
    - **Parameters**: `id` (Menu ID)
    - **Output**: Confirmation (e.g., HTTP 200 status)
