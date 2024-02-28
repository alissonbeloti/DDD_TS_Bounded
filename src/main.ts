import Address from './domain/entity/address'
import Customer from './domain/entity/customer'
import Order from './domain/entity/order'
import OrderItem from './domain/entity/order_item'
let customer = new Customer("123", "Alisson Beloti")
const address = new Address("Rua doi", 2, "64884", "Sorocaba")

customer.Address = address
customer.activate()

const item1 = new OrderItem("1", "Item 1", 10, 1, "P1");
const item2 = new OrderItem("2", "Item 2", 10, 1, "P2");

const order = new Order("1", "123", [item1, item2])