/* 
  base file for JavaScript across site 

  note: I would usually separate JS into separate files 
  but I didn't want to overcomplicate things as there is very little JS required for this project.
*/


/* the controls for the quantity input field */

class QuantityInput extends HTMLElement {
  constructor() {
    super()

    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true });

    /* find all button inside the quantity input and add click event listener */
    this.querySelectorAll('button').forEach(button =>
      button.addEventListener('click', this.onButtonClick.bind(this))
    )
  }

  onButtonClick(e) {
    e.preventDefault()
    const button = e.target.closest('button'),
          minusButton = this.querySelector('button[name="minus"]'),
          previousValue = this.input.value,
          minValue = this.input.getAttribute('min');
    
    /* increment or decrement the value based on which button was clicked */
    button.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    
    if (previousValue !== this.input.value) {
      this.input.dispatchEvent(this.changeEvent);

      /* disable minus button if the value reaches the min value */
      this.input.value <= minValue ? minusButton.disabled = true : minusButton.disabled = false;
    }
  } 
}

if (!customElements.get('quantity-input')) {
  customElements.define('quantity-input', QuantityInput);
}

/* cart drawer functionality */
class CartDrawer extends HTMLElement {
  constructor() {
    super();

    this.cartTrigger = document.querySelector('.header--basket');
    this.cartDrawer = this;
    this.overlay = this.querySelector('.cart-drawer--overlay');
    this.closeDrawerButton = this.querySelector('.cart-drawer--close-button');

    this.addEventListeners();
  }

  /* set event listeners */
  addEventListeners() {
    this.cartTrigger.addEventListener('click', this.openCart.bind(this));
    
    this.overlay.addEventListener('click', this.closeCart.bind(this));
    this.closeDrawerButton.addEventListener('click', this.closeCart.bind(this));
  }

  /* trigger the cart drawer open */
  openCart() {
    this.cartDrawer.setAttribute('open', true);
  }

  /* close the cart drawer */
  closeCart() {
    this.cartDrawer.removeAttribute('open');
  }
}

if(!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawer);
}
