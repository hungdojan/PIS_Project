### Employee
- **Fields**:
    - `id`: `Long`
    - `login`: `String`
    - `role`: `String`
    - `password`: `String`

### EmployeeDTO
- **Fields**:
    - `id`: `Long`
    - `login`: `String`
    - `role`: `String`

### ReservationDTO
- **Fields**:
    - `id`: `Long`
    - `at`: `Date`
    - `until`: `Date`
    - `name`: `String`
    - `count`: `Integer`
    - `phone`: `String`
    - `email`: `String`
    - `createdByEmployeeId`: `Long`
    - `tableIds`: `Collection<Long>`
    - `roomIds`: `Collection<Long>`

### ReservationResponseDTO
- **Fields**:
    - `id`: `Long`
    - `at`: `Date`
    - `until`: `Date`
    - `name`: `String`
    - `count`: `Integer`
    - `phone`: `String`
    - `email`: `String`
    - `createdByEmployeeId`: `Long`
    - `tables`: `Collection<TableDTO>`
    - `rooms`: `Collection<RoomDTO>`

### OrderDTO
- **Fields**:
    - `id`: `Long`
    - `atTime`: `Date`
    - `prepared`: `Boolean`
    - `preparedTime`: `Date`
    - `payed`: `Boolean`
    - `food`: `Long`
    - `drink`: `Long`
    - `toRoom`: `Long`
    - `toTable`: `Long`

### OrderResponseDTO
- **Fields**:
    - `id`: `Long`
    - `atTime`: `Date`
    - `prepared`: `Boolean`
    - `preparedTime`: `Date`
    - `payed`: `Boolean`
    - `toTable`: `TableDTO`
    - `foods`: `List<FoodDTO>`
    - `drinks`: `List<DrinkDTO>`

### RoomDTO
- **Fields**:
    - `id`: `Long`
    - `capacity`: `Integer`
    - `description`: `String`

### MenuDTO
- **Fields**:
    - `id`: `Long`
    - `name`: `String`
    - `description`: `String`
    - `foods`: `List<Long>`
    - `drinks`: `List<Long>`

### TableDTO
- **Fields**:
    - `id`: `Long`
    - `capacity`: `Integer`

### FoodDTO
- **Fields**:
    - `id`: `Long`
    - `name`: `String`
    - `description`: `String`
    - `price`: `Float`
    - `type`: `String`
    - `allergens`: `String`
    - `grams`: `Integer`

### Food
- **Fields**:
    - `id`: `long`
    - `name`: `String`
    - `description`: `String`
    - `price`: `float`
    - `type`: `String`
    - `allergens`: `String`
    - `grams`: `int`
    - `orders`: `Collection<Order>`
    - `menus`: `Collection<Menu>`

### DrinkDTO
- **Fields**:
    - `id`: `Long`
    - `name`: `String`
    - `description`: `String`
    - `price`: `Float`
    - `type`: `String`
    - `volume`: `Integer`

### Drink
- **Fields**:
    - `id`: `long`
    - `name`: `String`
    - `description`: `String`
    - `price`: `float`
    - `type`: `String`
    - `volume`: `int`
    - `orders`: `Collection<Order>`
    - `menus`: `Collection<Menu>`

### MenuResponseDTO
- **Fields**:
    - `id`: `Long`
    - `name`: `String`
    - `description`: `String`
    - `foods`: `Collection<FoodDTO>`
    - `drinks`: `Collection<DrinkDTO>`

### JwtDTO
- **Fields**:
    - `user`: `String`
    - `role`: `String`
    - `token`: `String`
