# My Shop React Demo

- You are provided with an incomplete `<Checkout />` component.  
- You are not allowed to add any additional HTML elements.  

---

### Functional Requirements:

- Once the `<Checkout />` component is mounted, load the products using the `getStoreItems` function.  
- Once all the data is successfully loaded, hide the loading icon.  
- Render each product object as a `<Product/>` component, passing in the necessary props.

---

### Implement the following functionality:

- The **add** and **remove** buttons should adjust the ordered quantity of each product  
- The **add** and **remove** buttons should be enabled/disabled to ensure that the ordered quantity:
  - can’t be negative  
  - can’t exceed the available count for that product  
- The **total shown for each product** should be calculated based on:
  - the ordered quantity  
  - the price  
- The **total in the order summary** should be calculated  
- For orders **over ₹1000**, apply a **18% TAX** to the order  
  - Display the **TAX text** only if a TAX has been applied  
- The **total should reflect any TAX** that has been applied  
- All **Rupees amounts** should be displayed to **2 decimal places**  