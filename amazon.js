import { cart } from './data/cart.js';

let productsHTML = ``;

products.forEach((product) => {
	productsHTML += `
		<div class="product-container">
		<div class="product-image-container">
			<img class="product-image"
				src="${product.image}">
		</div>

		<div class="product-name limit-text-to-2-lines">
			${product.name}
		</div>

		<div class="product-rating-container">
			<img class="product-rating-stars"
				src="images/ratings/rating-${product.rating.stars * 10}.png">
			<div class="product-rating-count link-primary">
				${product.rating.count}
			</div>
		</div>

		<div class="product-price">
			$${(product.priceCents / 100).toFixed(2)}
		</div>

		<div class="product-quantity-container">
			<select class="js-quantity-selector-${product.id}">
				<option selected value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
			</select>
		</div>

		<div class="product-spacer"></div>

		<div class="added-to-cart js-added-to-cart-${product.id}">
			<img src="images/icons/checkmark.png">
			Added
		</div>

		<button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
			Add to Cart
		</button>
	</div>
	`
});
document.querySelector(".js-products-grid").innerHTML = productsHTML;



document.querySelectorAll(".js-add-to-cart").forEach((button) => {
	button.addEventListener('click', () => {
		const productId = button.dataset.productId;
		let matchingItem;


		let added_to_cart = document.querySelector(`.js-added-to-cart-${productId}`);

		added_to_cart.classList.add("to-cart-added")
		
		let TimeoutId;
		let isRunning;

		if(isRunning){
			clearTimeout(TimeoutId);
			isRunning = false;
		}
		else if(!isRunning){
			TimeoutId = setTimeout(() => {
				added_to_cart.classList.remove("to-cart-added");
				isRunning = true;
			}, 2000)
		}

		let quantity_selector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)

		cart.forEach((item) => {
			if(productId === item.productId){
				matchingItem = item
			}
		})
		if(matchingItem){
			matchingItem.quantity += quantity_selector;
		}
		else{
			cart.push({
				productId: productId,
				quantity: quantity_selector
			});
		}
		cartQuantity = 0
		cart.forEach((item) => {
			cartQuantity += item.quantity
		})
		document.querySelector(".js-cart-quantity").innerHTML = cartQuantity
	})
})




