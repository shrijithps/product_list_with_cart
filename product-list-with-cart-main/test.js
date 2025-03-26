const cartCountElement = document.getElementById("cart-count");
const items = document.querySelector('#cart-items')
let cartCount = 0;

let buttons = document.querySelectorAll('.addToCart');
        document.addEventListener("click", function(event) {
            if (event.target.closest(".addToCart")) {
                cartCount++;
                console.log('button clicked');
        
                let parent = event.target.closest(".product"); 
                let itemName = parent.querySelector("h3").textContent;
                let itemPrice = parent.querySelector('.product_price').textContent;
        
                document.getElementById("cart-count").textContent = cartCount;
                
                let addedItems = document.createElement('div');
                addedItems.classList.add('cartItems');
                
                let listItem = document.createElement('p');
                let priceItem = document.createElement('p');

                listItem.textContent = `${itemName}`;
                priceItem.textContent = `${priceItem}`
                listItem.setAttribute("item-price", itemPrice);

                addedItems.appendChild(listItem); 
                addedItems.appendChild(priceItem)
                items.appendChild(addedItems);


                if (cartCount > 0) {
                    document.getElementById("cart-count").classList.remove("hidden");
                }
            }
        });

async function loadProducts(){
    try{
        const response =  await fetch('data.json')
        const products = await response.json();
        const container = document.querySelector('.products-container');

        products.forEach(product => {
        let imgSrc = "";
         if(window.innerWidth >= 1024){
            console.log("hel")
             imgSrc = product.image.desktop;
             console.log("he")
         }
         else if (window.innerWidth > 768) {
            console.log("else if")
            imgSrc = product.image.tablet;
        } else if(window.innerWidth <= 640){
            imgSrc = product.image.mobile;
        }
        else{
            console.log("else")
            imgSrc = product.image.thumbnail
        }
    

        const productCard = document.createElement('div');
        productCard.classList.add('product');

        productCard.innerHTML = 

        `<img src="${imgSrc}" alt="${product.name}" class="product-image rounded-xl h-40 w-40">
        <p>${product.category}</p>
        <h3>${product.name}</h3>
        <p class='product_price'>${product.price}</p>
         <div class="addToCart border-2 rounded-2xl inline-flex p-2 w-58 border-black">
        <img src="./assets/images/icon-add-to-cart.svg">
        <button class="addToCart">Add to Cart</button>
        </div>`
        container.appendChild(productCard)

        })
    }

    catch(e){

    }
}

function calculateTotal(){
    let total = 0;
    document.querySelectorAll('.cartItems p').forEach(item => {
        total += parseFloat(item.getAttribute("item-price")); 
    });
    console.log("Total Price:", total);

}

loadProducts();