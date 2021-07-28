//DOM ELEMENTS FUNCTIONING-speeding the process of loading
if (document.readyState == 'Loading') {
	document.addEventListener('DOMContentLoaded', ready)
}
else {
	console.log('Its not loading lol, refresh')
	ready();
}



//Little animations on the side


window.addEventListener('scroll', function () { showFunction() });

function showFunction() {
	if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
		document.getElementById("library").style.display = "block";

	}
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		document.getElementById("library2").style.display = "block";


	} if (document.body.scrollTop > 1600 || document.documentElement.scrollTop > 1600) {
		document.getElementById("library3").style.display = "block";

	}
}

//Payment methods popups
var paymentwrap = document.getElementById("open-plan");
paymentwrap.addEventListener('click', function () {
	document.querySelector(".payment-wrap").style.display = 'flex';
	document.querySelector(".section-gallery").style.display = 'none';
	document.querySelector(".close-payments").style.display = "flex";

});

//about the all services 
var payment_services = document.getElementById("open-servises-plan");
payment_services.addEventListener('click', function () {
	document.querySelector(".payment-wrap-services").style.display = 'flex';
	document.querySelector(".close-payments").style.display = "flex";
	document.querySelector(".section-gallery").style.display = 'none';
});

var close_payments = document.getElementById("close-payments");
close_payments.addEventListener('click', function () {
	document.querySelector(".section-gallery").style.display = 'block';
	document.querySelector(".payment-wrap-services").style.display = 'none';
	document.querySelector(".payment-wrap").style.display = 'none';

});
//Creating payment details with cart implemantation

function ready() {
	var read_button = document.getElementsByClassName("read-button");
	for (var i = 0; i < read_button.length; i++) {
		var rbutton = read_button[i];
		rbutton.addEventListener('click', addToCart);
	}

	var buy_button = document.getElementsByClassName("buy-button");
	for (var i = 0; i < buy_button.length; i++) {
		var bbutton = buy_button[i];
		bbutton.addEventListener('click', addToCart)
	}
	var removeCartItems = document.getElementsByClassName("btn-danger")[0];
	for (var i = 0; i < removeCartItems.length; i++) {
		var button = removeCartItems[i];
		button.addEventListener('click', removeCartItem);
	}
	var quantityInputs = document.getElementsByClassName("cart-quantity-input")[0];
	for (var i = 0; i < quantityInputs; i++) {
		var button = quantityInputs[i];
		button.addEventListener('click', quantityChanged)
	}
	var purchasebtn = document.getElementsByClassName("btn-purchase")[0];
	purchasebtn.addEventListener('click', purchase)
}

function purchase() {
	alert("thanks for your purchase, come again soon");
	var cartItems = document.getElementsByClassName("cart-items")[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartItems();

}
function removeCartItem(event) {
	var buttonclicked = event.target;
	buttonclicked.classList.add("fall");
	buttonclicked.parentElement.parentElement.remove();
	updateCartItems();
}
function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartItems();
}

//Ading items to the cart
function addToCart(event) {
	var button = event.target;
	var fetchbook = button.parentElement.parentElement;
	var title = fetchbook.getElementsByClassName("libhead")[0].innerText;
	var price = fetchbook.getElementsByClassName("price")[0].innerText;
	var bookcover = fetchbook.getElementsByClassName("book-image")[0].src;
	addToCartItems(title, bookcover, price);
	updateCartItems();
}

function addToCartItems(title, bookcover, price) {
	var cartrows = document.createElement('div');
	cartrows.classList.add('cart-row');
	var cartItems = document.getElementsByClassName('cart-items')[0];
	var cartItemsTitles = cartItems.getElementsByClassName('cart-book-title');
	for (var i = 0; i < cartItemsTitles.length; i++) {
		if (cartItemsTitles[i].innerText == title) {
			alert("Book already added in the cart")
			return
		}
	}
	var cartRowContent = `
		 <span class="cart-book cart-b">
				  <img class="cart-image" src="${bookcover}" width="100px" height="100px">
				  <div class="cart-book-title">${title}</div>
			  </span>

			  
			  <span class="cart-quantity cart-column">
				  <input type="number" value="1" class="cart-quantity-input">
				 
			  </span>
			  <span class="price-cancel">
<div class="cart-price">${price}</div>
<button class="btn btn-danger" type="button">X</button>
			  </span>
		`
	cartrows.innerHTML = cartRowContent
	cartItems.append(cartrows);
	cartrows.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
	cartrows.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);

}
function updateCartItems() {
	var cartItemscontainer = document.getElementsByClassName("cart-items")[0];
	var cartrows = cartItemscontainer.getElementsByClassName("cart-row");
	var total = 0;
	for (var i = 0; i < cartrows.length; i++) {
		var cartrow = cartrows[i];
		var priceperElement = cartrow.getElementsByClassName("cart-price")[0];
		var quantityElement = cartrow.getElementsByClassName("cart-quantity-input")[0];
		var quantity = quantityElement.value;
		var price = parseFloat(priceperElement.innerText.replace('Ksh.', ' '));
		total = total + (quantity * price);
		total = Math.round(total * 100) / 100;
	}
	document.getElementsByClassName("cart-total-price")[0].innerText = 'Ksh.' + total;
}

//opening and hiding 
	function hidepage(){
		document.getElementById("sec").style.display = "none";
		document.getElementById("library-wrap").style.display = "none";
		document.getElementById("search-bar").style.display = "none";
		document.getElementById("pay").style.display = "none";
		console.log("relax")
	}

	//Popup of legal dicuments and novels
	var hidden_books = document.getElementById("hidden-books1");
	var open_books1=document.getElementById("next12");
	var open_books = document.getElementById("next1");
	
	open_books.addEventListener('click', function () {
		hidepage();
		hidden_books.style.display = "block";
		
	})
	open_books1.addEventListener('click', function () {
				hidepage();
				hidden_books.style.display = "block";

	})
	//popup of pdfs

	var hidden_two=document.getElementById("hidden-books2");
	var open_pdfs= document.getElementById("next2");
	var open_pdfs2=document.getElementById("next22");
  open_pdfs.addEventListener("click", function(){
	  hidepage();
	  hidden_two.style.display="block"
  })
   open_pdfs2.addEventListener("click", function () {
		hidepage();
		hidden_two.style.display = "block"
	})

	//popups of docs
		var hidden_three = document.getElementById("hidden-books3");
		var open_docs = document.getElementById("next3");
		var open_docs2=document.getElementById("next33");

		open_docs.addEventListener("click", function () {
			console.log("me")
			hidepage();
			hidden_three.style.display = "block"
		})
		open_docs2.addEventListener("click", function () {
			console.log("coolm")
				hidepage();
				hidden_three.style.display = "block"
			})
	
	
