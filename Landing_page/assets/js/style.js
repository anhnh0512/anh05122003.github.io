const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
let cartItemID = 1
let data = [
    {
        name : "Armchair",
        category : "Chair",
        price : "50.25",
        imgSrc : "../images/armchair_item1.png"
    },
    {
        name : "Armchair",
        category : "Chair",
        price : "102.00",
        imgSrc : "../images/armchair_item2.png"
    },
    {
        name : "Armchair",
        category : "Chair",
        price : "15.00",
        imgSrc : "../images/armchair_item3.png"
    },
    {
        name : "Bunk bed",
        category : "Bed",
        price : "23.75",
        imgSrc : "../images/bed_item1.png"
    },
    {
        name : "Bunk bed",
        category : "Bed",
        price : "50.00",
        imgSrc : "../images/bed_item2.png"
    },
    {
        name : "Bunk bed",
        category : "Bed",
        price : "200.50",
        imgSrc : "../images/bed_item3.png"
    },
    {
        name : "Bunk bed",
        category : "Bed",
        price : "5.50",
        imgSrc : "../images/bed_item4.png"
    },
    {
        name : "Rooking chairs",
        category : "Chair",
        price : "25.00",
        imgSrc : "../images/chair_item1.png"
    },
    {
        name : "Deck chair",
        category : "Chair",
        price : "49.00",
        imgSrc : "../images/chair_item2.png"
    },
    {
        name : "Wooden chairs",
        category : "Chair",
        price : "60.99",
        imgSrc : "../images/chair_item3.png"
    },
    {
        name : "Wooden chairs",
        category : "Chair",
        price : "69.20",
        imgSrc : "../images/chair_item4.png"
    },
    {
        name : "Wooden chairs",
        category : "Chair",
        price : "224.99",
        imgSrc : "../images/chair_item5.png"
    },
    {
        name : "Wooden Closet",
        category : "Closet",
        price : "90.25",
        imgSrc : "../images/closet_item1.png"
    },
    {
        name : "Cupboard Closet",
        category : "Closet",
        price : "99.99",
        imgSrc : "../images/cupboard_closet.png"
    },
    {
        name : "Wooden Cupboard Closet",
        category : "Closet",
        price : "75.80",
        imgSrc : "../images/cupboard_closet_item1.png"
    },
    {
        name : "Iron Closet",
        category : "Closet",
        price : "159.00",
        imgSrc : "../images/cupboard_closet_item2.png"
    },
    {
        name : "Fireplace",
        category : "Fireplace",
        price : "100.50",
        imgSrc : "../images/fireplace_item1.png"
    },
    {
        name : "Piano",
        category : "Piano",
        price : "187.45",
        imgSrc : "../images/piano.png"
    },
    {
        name : "Pattern Pillow",
        category : "Pillow",
        price : "322.50",
        imgSrc : "../images/pillow_item1.png"
    },
    {
        name : "Pattern Pillow",
        category : "Pillow",
        price : "288.99",
        imgSrc : "../images/pillow_item2.png"
    }
]
function evenListeners() {
    let searchProduct = document.getElementById('search_product')
    window.addEventListener('DOMContentLoaded', () => {
        //load data from object or JSON
        loadJSON(data)
        // load item in cart when browser load 
        handlelocalStorage()
        //handle displaying the product's category
        loadCategory()
    })
    //toogle navar when click will set height = 0 and Press again height = 240px 
    $('.navbar-toogler').addEventListener('click',()=>{
       $('.navbar-collapse').classList.toggle('show-navbar') 
    })
    //show product statistics table
    $('#cart-btn').addEventListener('click',()=>{
        $('.cart-container').classList.toggle('show-cart-container')
    })
    //handle purchase product
    $('.product-list').addEventListener('click',purchaseProduct)
    
    // delete product
    $('.cart-list').addEventListener('click',deleteProduct)
    let searchInput = document.getElementById('search')

    //search product
    searchProduct.onclick = function name() {
        handleSearchProduct(searchInput)
    }
    $('input[name = search]').oninput = rerenderData

    //handle navbar when scroll
    window.addEventListener('scroll',handleScroll)

    //user 
    $('.form-submit').addEventListener('click',loginUser)

    //handle animate on scroll
    window.addEventListener('scroll',animateOnScroll)

    //show dialog login 
    $('#button-login').addEventListener('click',()=>{
        // $('.overlay-dialog').classList.add('show-overlay')
        $('.dialog').classList.toggle('show-dialog')
    })
    $('.overlay-close').addEventListener('click',()=>{
        $('.dialog').classList.toggle('show-dialog')
    })
}
//update cart info 
function uppdateCartInfo() {
    let cartInfo = findCartInfo()
    document.getElementById('cart-count-info').textContent = cartInfo.productCount
    document.getElementById('cart-total-value').textContent = cartInfo.total
}
uppdateCartInfo()
// document.querySelector('li').classList.toggle
evenListeners()


//hander scroll page
function handleScroll(params) {
    let navValue = $$('.nav-link')
        if(window.scrollY > 0){
            Array.from(navValue).forEach(nav =>{
                nav.classList.add('item')
            })
            $('.header-img .navbar-brand').classList.add('item')
            $('.cart-button').classList.add('item')
            $('.navbar').classList.add('nav-bg')
            $('.user-login').classList.add('item')
        }
        else {
            $('.user-login').classList.remove('item')
            $('.navbar').classList.remove('nav-bg')
            $('.header-img .navbar-brand').classList.remove('item')
            $('.cart-button').classList.remove('item')
            Array.from(navValue).forEach(nav =>{
                nav.classList.remove('item')
            })
        }
}
//load product
function loadJSON(data) {
        let html = ''
        data.forEach(product => {
            html += `
            <div class = "product-item">
                <div class = "product-img">
                    <img src = "${product.imgSrc}" alt = "arm chair">
                    <button class = "add-to-cart">
                        <i class = "fas fa-shopping-cart"></i>
                        Add To Cart
                    </button>
                </div>
                <div class = "product-content">
                    <h3 class = "product-name">${product.name}</h3>
                    <span class = "product-category">${product.category}</span>
                    <p class = "product-price">${product.price}</p>
                </div>
            </div>
            `
            $('.product-list').innerHTML = html
        })
}

//load product category
function loadCategory() {
    let htmls = '' 
    let arr = []
    let allBtn = document.createElement('span')
    allBtn.innerHTML = 'All'
    allBtn.addEventListener('click',function (params) {
        let html = ''
        data.forEach(product => {
            html += `
            <div class = "product-item show-products">
                <div class = "product-img">
                    <img src = "${product.imgSrc}" alt = "arm chair">
                    <button class = "add-to-cart">
                        <i class = "fas fa-shopping-cart"></i>
                        Add To Cart
                    </button>
                </div>
                <div class = "product-content">
                    <h3 class = "product-name">${product.name}</h3>
                    <span class = "product-category">${product.category}</span>
                    <p class = "product-price">${product.price}</p>
                </div>
            </div>
            `
            $('.product-list').innerHTML = html
        })
       
    })
    $('.category-product').appendChild(allBtn)
    data.forEach(product => {
        let category = product.category
        if(!arr.includes(category)){
            arr.push(category)
        }
    })
    htmls = arr.forEach(category => {
        let span = document.createElement('span')
        span.classList.add('category')
        span.addEventListener('click',getCategory)
        span.innerHTML = category
        $('.category-product').appendChild(span)
    })
    return htmls
}
//filler product category  
function getCategory() {
    let value = this.textContent.toLowerCase()
    let arr = []
    let htmls = ''
    let allProduct = $$('.product-item')
    arr = data.filter(product => {
        let productCategory = product.category.toLowerCase()
        return productCategory.includes(value)
    })
    Array.from(allProduct).forEach(product => {
        product.classList.add('hide')
    })
    htmls = arr.map(product=> {
        return `<div class = "product-item show-products">
                    <div class = "product-img">
                        <img src = "${product.imgSrc}" alt = "arm chair">
                        <button class = "add-to-cart">
                            <i class = "fas fa-shopping-cart"></i>
                            Add To Cart
                        </button>
                    </div>
                    <div class = "product-content">
                        <h3 class = "product-name">${product.name}</h3>
                        <span class = "product-category">${product.category}</span>
                        <p class = "product-price">${product.price}</p>
                    </div>
                </div>
        `
    })
    $('.product-list').innerHTML = htmls.join('')
}

//add product
function purchaseProduct(e) {
    if(e.target.classList.contains('add-to-cart')){
        let product = e.target.parentElement.parentElement
        getProductInfo(product)
    }
}
//get info product
function getProductInfo(product) {
    let productInfo = {
        id:cartItemID,
        imgSrc:product.querySelector('.product-img img').src,
        name : product.querySelector('.product-name').textContent,
        category:product.querySelector('.product-category').textContent,
        price:product.querySelector('.product-price').textContent
    }
    cartItemID++
    addToCartList(productInfo)
    saveProductInStorage(productInfo)
}
// add product to cart list
function addToCartList(product) {
    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')
    cartItem.setAttribute(`data-id`,`${product.id}`)
    cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "arm chair">
        
        <div class = "cart-item-info">
            <h3 class = "product-name">${product.name}</h3>
            <span class = "product-category">${product.category}</span>
            <p class = "product-price">${product.price}</p>
        </div>
        <button type = 'button' class = "del-cart-item">
            <i class = "fas fa-times"></i>
        </button>
    `
    $('.cart-list').appendChild(cartItem)
}
//load data if value input = 0
function rerenderData() {
    let value = this.value.length

    if(value == 0) {
        loadJSON(data)
    }
}
// handle Search Product in input
function handleSearchProduct(searchInput) {
    let productItems = $$('.product-item')
    let value = searchInput.value.toLowerCase().trim()
    let getData =  data.filter(product =>{
        let productName  = product.name.trim().toLowerCase()
        return productName.includes(value) 
    })
    if(value.length > 0){
        let htmls = ''
        Array.from(productItems).forEach(product => {
            product.classList.add('hide')
        })
        htmls = getData.map(product => {
            return `<div class = "product-item show-products">
            <div class = "product-img">
                <img src = "${product.imgSrc}" alt = "arm chair">
                <button class = "add-to-cart">
                    <i class = "fas fa-shopping-cart"></i>
                    Add To Cart
                </button>
            </div>
            <div class = "product-content">
                <h3 class = "product-name">${product.name}</h3>
                <span class = "product-category">${product.category}</span>
                <p class = "product-price">${product.price}</p>
            </div>
        </div>`
        })
        let html = htmls.join('')
        $('.product-list').innerHTML = html
    }
}

// Save product to Local Storage
function saveProductInStorage(item) {
    let product = getProductFromStorage()
    product.push(item)
    localStorage.setItem('product',JSON.stringify(product))
    uppdateCartInfo()
}
// Get product in Local Storage
function getProductFromStorage() {
    return localStorage.getItem('product')? JSON.parse(localStorage.getItem('product')) : []
}
// Render product in Local Storage to html
function handlelocalStorage() {
    let products = getProductFromStorage()
    if(products.length < 1){
        return
    }
    else {
        products.forEach(product =>{
            const cartItem = document.createElement('div')
            cartItem.classList.add('cart-item')
            cartItem.setAttribute(`data-id`,`${product.id}`)
            cartItem.innerHTML = `
            <img src = "${product.imgSrc}" alt = "arm chair">
            
            <div class = "cart-item-info">
                <h3 class = "product-name">${product.name}</h3>
                <span class = "product-category">${product.category}</span>
                <p class = "product-price">${product.price}</p>
            </div>
            <button type = 'button' class = "del-cart-item">
                <i class = "fas fa-times"></i>
            </button>
            `
            $('.cart-list').appendChild(cartItem)
        })
    }
}


function localCart() {
    let products = getProductFromStorage()
    if(products.length < 1){
        cartItemID = 1
    }
    else {
        cartItemID = products[products-length - 1].id
        cartItemID++
    }
    products.forEach(product => {
        addToCartList(product)
    })
    uppdateCartInfo()
}
function findCartInfo() {
    let products = getProductFromStorage()
    let total = products.reduce((acc,product)=> {
        let price = parseFloat(product.price.substr(0))
        return acc += price
    }, 0)
    return {
        total : total.toFixed(2),
        productCount:products.length
    }
}
//delete product from cart list and local storage
function deleteProduct(e) {
    let cartItem
    if(e.target.tagName === 'BUTTON'){
        cartItem = e.target.parentElement
        cartItem.remove()
    }
    else if(e.target.tagName === 'I'){
        cartItem = e.target.parentElement.parentElement
        cartItem.remove()
    }
    let products = getProductFromStorage()
    let uppdateProducts = products.filter((product)=>{
        return product.id != parseInt(cartItem.dataset.id)
    })
    localStorage.setItem('product',JSON.stringify(uppdateProducts))
    uppdateCartInfo()
} 
//user
function loginUser() {
    alert('tính năng này đang được phát triển')
}

//show product when scroll
function animateOnScroll() {
    let screenY = window.scrollY
    let coordinatesSearch = $('.search-product').offsetTop
    let allProduct = $$('.product-item')
    let distanse = 650
    console.log(distanse)
    console.log(screenY)
    Array.from(allProduct).forEach(product => {
        let showProducts = product.offsetTop
        let a = screenY >= showProducts - distanse;
        console.log(a)
        console.log(showProducts)
        if(screenY >= showProducts - distanse){
            product.classList.add('show-products')
        }
    })
    if(screenY >= coordinatesSearch - distanse){
        $('.search-product').classList.add('show-products')
    }
}