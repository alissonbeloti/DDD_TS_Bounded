import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {


    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrow("Id is required");
    });
    it("should throw error when CostumerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrow("CustomerId is required");
    });
    it("should throw error when CostumerId is empty", () => {
        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrow("Item quantity must be greater than 0");
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100, 2, "P1")
        const item2 = new OrderItem("i2", "Item 2", 200, 1, "P2")

        const order = new Order("1", "c1", [item, item2])

        const total = order.total();
        expect(total).toBe(400);
    });

    it("should check if the qty is greater than 0", () => {

        
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 100, 0, "P1")
            const order = new Order("1", "c1", [item])
        }).toThrow("Quantity must be greater than 0");
    });
})
