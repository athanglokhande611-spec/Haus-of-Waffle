/* MOBILE NAVIGATION */

function toggleNav() {

    const nav = document.querySelector("nav");

    nav.classList.toggle("show");

}


/* CATEGORY SWITCHING */

function showCategory(category, button) {

    document.querySelectorAll(".menu-section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(category).classList.remove("hidden");

    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

}


/* CART */

let cart = JSON.parse(localStorage.getItem("hausCart")) || [];


function saveCart() {

    localStorage.setItem(
        "hausCart",
        JSON.stringify(cart)
    );

}


function addToCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(name + " added to cart!");

}


function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const counters = document.querySelectorAll("#cartCount");

    counters.forEach(counter => {
        counter.textContent = count;
    });

}


function displayCart() {

    const container =
        document.getElementById("cartItems");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🧇</h2>

                <p>
                    Add something delicious from our menu.
                </p>

                <br>

                <a href="menu.html" class="main-btn">
                    Explore Menu →
                </a>
            </div>
        `;

        document.getElementById("cartTotal").textContent = "0";

        return;
    }


    let total = 0;


    container.innerHTML = cart.map((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        return `

        <div class="cart-item">

            <div>

                <h3>${item.name}</h3>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>


            <div>

                <strong>
                    ₹${itemTotal}
                </strong>

                <br>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>

        `;

    }).join("");


    document.getElementById("cartTotal").textContent = total;

}


function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    displayCart();

}


function clearCart() {

    cart = [];

    saveCart();

    updateCartCount();

    displayCart();

}


function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Thank you for ordering from Haus of Waffle! 🧇"
    );

    clearCart();

}


/* START */

updateCartCount();

displayCart();