const cardsLists = document.getElementById('cards-lists')
let str = "";
let data = null; // for assign categories in global variable
let carts = [];
let displayCart = false;
let favouriteindex = 0;
let cartindex = 0;
let categoryies = null;


const showLists = async() =>{
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let result = await response.json();
    const {categories} = result;
    data = categories.map(ele=>({...ele,favourite:false,cart:false}));
    console.log(data);
    categoryies = ["Home",...new Set(categories.map(ele=>ele.strCategory))];
    showCategory();
    iterateItems(data);
}
showLists();


// iterate items of recipe
function iterateItems(data){
    str = "";
   data.forEach(element => {
        const {idCategory,strCategory,strCategoryThumb,strCategoryDescription,favourite} = element
        str += `
        <div class="card mx-4 my-2" style="width: 18rem;">
  <img src=${strCategoryThumb} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${strCategory}</h5>
    <p class="card-text">${strCategoryDescription.substring(0,100)}</p>
    <button onclick="onAddToCart('${idCategory}')" 
    class="btn btn-primary">${displayCart?'Remove item':'Add To Cart'}</button>
    <i onclick="addToFavourites('${idCategory}')" style=color: #dc0909;"
    style="${favourite?'color: #ff1100;':'color:#fff'}"  
    class="${favourite?'fa-solid fa-beat':'fa-regular'} fa-heart"></i>
  </div>
</div>
        `
    });
    cardsLists.innerHTML = str;
}

function onAddToCart(i){
    
    
    if(displayCart){
        cartindex--;
            document.getElementById('carts').innerHTML = `<span>Carts ${cartindex>0?cartindex:""}</span>`;
            carts = carts.filter(ele=>ele.idCategory != i)
          if(carts.length > 0){
              iterateItems(carts);
          }
          else{
            cardsLists.innerHTML = `<h2>No Items In Cart</h2>`
          } 
    }
    else{
        cartindex++;
        let cartIndex = data.findIndex(ele=>ele.idCategory == i);
        document.getElementById('carts').innerHTML = `<span>Carts ${cartindex}</span>`
        carts.push(data[cartIndex]);
    }
   
}

let favouriteItems = [];
let displayFavourite = false;
let favindex = 0;

function addToFavourites(i){
    if(displayFavourite){
        favouriteindex--;
        document.getElementById('favourites').innerHTML = `<span>Favourites ${index>0?index:""}</span>`
        favouriteItems = favouriteItems.filter(ele=>ele.idCategory != i);
            if(favouriteItems.length > 0){
                iterateItems(favouriteItems);
            }
            else{
                cardsLists.innerHTML = `<h2>No Items In Favourites</h2>`
            }         
    }
    else{
        if(displayCart){
            favindex = carts.findIndex(ele=>ele.idCategory == i);
           carts[favindex].favourite = !carts[favindex].favourite;
           if(carts[favindex].favourite){
            favouriteindex++;
            document.getElementById('favourites').innerHTML = `<span>Favourites ${favouriteindex}</span>`
            iterateItems(carts);
            favouriteItems.push(carts[favindex]); 
           }
           else{
            favouriteindex--;   
            document.getElementById('favourites').innerHTML = `<span>Favourites ${favouriteindex>0?favouriteindex:""}</span>`
            iterateItems(carts);
            favouriteItems = favouriteItems.filter(ele=>ele.idCategory != i);
           }
           
        }
        else{
            favindex = data.findIndex(ele=>ele.idCategory == i);
            data[favindex].favourite = !data[favindex].favourite;
                if(data[favindex].favourite){
                    favouriteindex++;
                    document.getElementById('favourites').innerHTML = `<span>Favourites ${favouriteindex}</span>`
                    iterateItems(data);
                    favouriteItems.push(data[favindex]); 
                }
                else{
                    favouriteindex--;   
                        document.getElementById('favourites').innerHTML = `<span>Favourites ${favouriteindex>0?favouriteindex:""}</span>`
                        iterateItems(data);
                        favouriteItems = favouriteItems.filter(ele=>ele.idCategory != i);
                }  
        }
             
        }
        
}



function showCart(){
    displayCart = true;
    if(carts.length > 0){
        iterateItems(carts);
    }
    else{
        cardsLists.innerHTML = `<h2>No Items In Carts</h2>`
    } 
}

function showFavourite(){
    displayFavourite = true;
    if(favouriteItems.length > 0){
        iterateItems(favouriteItems);
    }
    else{
        cardsLists.innerHTML = `<h2>No Items In Favourites</h2>`
    } 
}

let strforCategory = "";

function showCategory(){
    strforCategory = "";
    categoryies.forEach(ele=>{
        strforCategory += `
        <li class="category nav-item">
                  <a onclick="clickCategory('${ele}')" class=" cursor-pointer nav-link active" aria-current="page">${ele}</a>
         </li>
        `
    })
    allcategory.innerHTML = strforCategory;

}

function clickCategory(text){
  if(text == "Home"){
    showLists()
  }
  else{
    let newData = data.filter(ele=>ele.strCategory == text);
    iterateItems(newData)
  }

}

search.addEventListener('click',(e)=>{
    e.preventDefault()
    let newData = data.filter(ele=>ele.strCategory.toLowerCase() == input.value);
    iterateItems(newData);
    
})

