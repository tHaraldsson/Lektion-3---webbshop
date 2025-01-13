const button = document.getElementById("myButton");
const outputDiv = document.getElementById("output");

button.addEventListener('click', () => {
    const text = document.createElement("p");
    text.textContent = "Du har tryckt på knappen!";

    const image = document.createElement("img");
    image.src = "https://www.sciencefriday.com/wp-content/uploads/2019/02/shutterstock_299412548.jpg";

    outputDiv.innerHTML = "";

    outputDiv.appendChild(text);
    outputDiv.appendChild(image);
});

document.addEventListener('DOMContentLoaded', function() {
    // Hämta DOM-elementen för kundvagnen och totalen
    const cartElement = document.getElementById('cart');
    const totalElement = document.getElementById('total');

    // Kontrollera att cartElement och totalElement finns
    if (!cartElement || !totalElement) {
        console.error("Kundvagnsrelaterade element inte funna i DOM.");
        return; // Avbryt om elementen inte finns
    }

    // Hämta kundvagnen från localStorage eller skapa en tom lista
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Funktion för att uppdatera kundvagnen
    function updateCart() {
        cartElement.innerHTML = ''; // Rensa innehållet i kundvagnen
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.namn} - ${item.pris} kr`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Ta bort';
            removeButton.addEventListener('click', () => removeItem(item));
            li.appendChild(removeButton);

            cartElement.appendChild(li);
            total += item.pris;
        });

        totalElement.textContent = `Totalt: ${total} kr`;
    }

    // Funktion för att ta bort en produkt från kundvagnen
    function removeItem(item) {
        const index = cart.findIndex(cartItem => cartItem.id === item.id);
        if (index > -1) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart)); // Spara tillbaka till localStorage
            updateCart();  // Uppdatera kundvagnen
        }
    }

    // Funktion för att lägga till en produkt i kundvagnen
    function addToCart(product) {
        // Logga för att kontrollera om knappen triggas
        console.log("Produkt klickad:", product);
        
        const productObj = {
            id: product.dataset.id,
            namn: product.dataset.namn,
            pris: parseInt(product.dataset.pris)
        };

        console.log("Produktobjekt:", productObj);  // Kontrollera produktens data

        cart.push(productObj);  // Lägg till produkten i kundvagnen

        // Spara kundvagnen till localStorage
        localStorage.setItem('cart', JSON.stringify(cart)); 
        console.log("Kundvagn efter tillägg:", cart);  // Kontrollera att kundvagnen sparas korrekt

        alert(`${productObj.namn} har lagts till i kundvagnen!`);
        updateCart();  // Uppdatera kundvagnen direkt
    }

    // Event listeners för att lägga till produkter i kundvagnen
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.produkt');
            addToCart(product);
        });
    });

    // Uppdatera kundvagnen när sidan laddas
    updateCart();
});  // Denna parentes stänger eventListener för DOMContentLoaded
