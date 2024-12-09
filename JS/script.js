// Declare constants
const items = ["Chair", "Recliner", "Table", "Umbrella"];
const prices = [25.50, 37.75, 49.95, 24.89];
const shippingZones = { 1: 0, 2: 20.0, 3: 30.0, 4: 35.0, 5: 45.0, 6: 50.0 };
const taxRate = 0.15;

// Global variables
let purchasedItems = [];
let quantities = [];
let stateCode = "";

// Event listeners
document.getElementById("purchaseBtn").addEventListener("click", handlePurchase);
document.getElementById("resetBtn").addEventListener("click", resetPage);

// Function to handle the purchase process
function handlePurchase() {
    purchasedItems = [];
    quantities = [];
    let continueShopping = true;

    while (continueShopping) {
        let item = prompt("Enter the item you want to purchase (Chair, Recliner, Table, Umbrella):");
        if (!items.includes(item)) {
            alert("Invalid item. Please enter a valid item.");
            continue;
        }

        let quantity = parseInt(prompt(`Enter the quantity of ${item} you want to purchase:`), 10);
        if (isNaN(quantity) || quantity <= 0) {
            alert("Invalid quantity. Please enter a positive number.");
            continue;
        }

        purchasedItems.push(item);
        quantities.push(quantity);

        let moreItems = prompt("Do you want to purchase another item? (yes/no):");
        if (moreItems.toLowerCase() !== "yes") {
            continueShopping = false;
        }
    }

    stateCode = prompt("Enter the two-letter state abbreviation for shipping (e.g., CA, TX):").toUpperCase();
    if (!/^[A-Z]{2}$/.test(stateCode)) {
        alert("Invalid state abbreviation. Please enter a valid two-letter code.");
        return;
    }

    calculateAndDisplayInvoice();
}

// Function to calculate and display the invoice
function calculateAndDisplayInvoice() {
    let total = 0;
    let itemsSummary = "<ul>";

    purchasedItems.forEach((item, index) => {
        const itemPrice = prices[items.indexOf(item)] * quantities[index];
        itemsSummary += `<li>${quantities[index]} x ${item} @ $${prices[items.indexOf(item)].toFixed(2)} = $${itemPrice.toFixed(2)}</li>`;
        total += itemPrice;
    });

    itemsSummary += "</ul>";

    let shippingCost = total > 100 ? 0 : calculateShipping(stateCode);
    let tax = total * taxRate;
    let grandTotal = total + shippingCost + tax;

    document.getElementById("itemsSummary").innerHTML = `
        <h3>Items Purchased</h3>
        ${itemsSummary}
        <p><strong>Subtotal:</strong> $${total.toFixed(2)}</p>
    `;

    document.getElementById("transactionSummary").innerHTML = `
        <h3>Transaction Summary</h3>
        <p><strong>State:</strong> ${stateCode}</p>
        <p><strong>Shipping:</strong> $${shippingCost.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
        <p><strong>Total:</strong> $${grandTotal.toFixed(2)}</p>
    `;

    document.getElementById("invoice").style.display = "block";
}

// Function to calculate shipping cost
function calculateShipping(state) {
    const zone = Math.ceil(Math.random() * 6); // Simulating a zone determination
    return shippingZones[zone] || 50;
}

// Function to reset the page
function resetPage() {
    document.getElementById("invoice").style.display = "none";
    purchasedItems = [];
    quantities = [];
    stateCode = "";
}
