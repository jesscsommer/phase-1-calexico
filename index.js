//TODO calculate for what's currently in the cart & display on the page
// you could display it as a div in the #dish section (try to append it after the h3)

//! globals 

const baseURL = 'http://localhost:3000/menu'
const form = document.querySelector('#cart-form')

//! fetch

const getMenu = (id) => {
    if (id) {
        return fetch(`${baseURL}/${id}`)
        .then(res => res.json())
    } else {
        return fetch(baseURL)
        .then(res => res.json())
    }
}

getMenu().then(menuItems => menuItems.forEach(itemObj => renderMenu(itemObj)))
.catch(error => alert(error))

const patchMenu = (id, body) => {
    return fetch(`${baseURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
}

//! render on page 

const renderMenu = (itemObj) => {
   const span = document.createElement('span')
   span.innerText = itemObj.name
   span.addEventListener('click', e => displayMenuItem(itemObj))
   document.querySelector('#menu-items').append(span)
}

const displayMenuItem = (itemObj) => {
    dish.name = itemObj.id
    document.querySelector('#dish-image').src = itemObj.image
    document.querySelector('#dish-name').innerText = itemObj.name
    document.querySelector('#dish-description').innerText = itemObj.description
    document.querySelector('#dish-price').innerText = itemObj.price
    document.querySelector('#number-in-cart').innerText = itemObj['number_in_bag']
    displayCost(itemObj)
}

getMenu(1)
.then(itemObj => displayMenuItem(itemObj))
.catch(error => alert(error))

const displayCost = (itemObj) => {
    const costDiv = document.createElement('div')
    costDiv.id = 'existing-cost'

    const costH3 = document.createElement('h3')
    costH3.id = 'totalPrice'
    costH3.innerText = `Total Cost: $${itemObj['number_in_bag'] * itemObj.price}`

    costDiv.append(costH3)
    if (document.querySelector('#existing-cost')) {
        document.querySelector('#existing-cost').remove()
    }
    document.querySelector('#number-in-cart').after(costDiv)
}

//! event listeners 

form.addEventListener('submit', e => {
    e.preventDefault();
    const newNumberInBag = parseInt(document.querySelector('#number-in-cart').innerText) + parseInt(e.target['cart-amount'].value)
    patchMenu(dish.name, {
        number_in_bag: newNumberInBag
    })
    document.querySelector('#number-in-cart').innerText = newNumberInBag
    totalPrice.innerText = `Total Cost: $${newNumberInBag * parseInt(document.querySelector('#dish-price').innerText)}`
    e.target.reset()
})