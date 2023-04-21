// TODO: when user clicks add cart, 'number to add' should be added to how many are currently in the cart (does not need to persist, but can as bonus #1)

//! globals 

const baseURL = 'http://localhost:3000/menu'

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

//! render on page 

const renderMenu = (itemObj) => {
   const span = document.createElement('span')
   span.innerText = itemObj.name
   span.addEventListener('click', e => displayMenuItem(itemObj))
   document.querySelector('#menu-items').append(span)
}

const displayMenuItem = (itemObj) => {
    document.querySelector('#dish-image').src = itemObj.image
    document.querySelector('#dish-name').innerText = itemObj.name
    document.querySelector('#dish-description').innerText = itemObj.description
    document.querySelector('#dish-price').innerText = itemObj.price
}

getMenu(1)
.then(itemObj => displayMenuItem(itemObj))
.catch(error => alert(error))

//! event listeners 