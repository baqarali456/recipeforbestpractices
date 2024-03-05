const cardsLists = document.getElementById('cards-lists')
let str = "";
let data = null; // for assign categories in global variable
let carts = [];
let displayCart = false;


const showLists = async() =>{
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let result = await response.json();
    const {categories} = result;
    data = categories.map(ele=>({...ele,favourite:false,cart:false}));
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
    class="${favourite?'fa-solid':'fa-regular'} fa-heart"></i>
  </div>
</div>
        `
    });
    cardsLists.innerHTML = str;
}

let index = 0;
function onAddToCart(i){
    
    if(displayCart){
            index--;
            document.getElementById('carts').innerHTML = `<span>Carts ${index>0?index:""}</span>`;
            carts = carts.filter(ele=>ele.idCategory != i)
          if(carts.length > 0){
              iterateItems(carts);
          }
          else{
            cardsLists.innerHTML = `<h2>No Items In Cart</h2>`
          }
            
    }
    else{
        index++;
        let cartIndex = data.findIndex(ele=>ele.idCategory == i);
        document.getElementById('carts').innerHTML = `<span>Carts ${index}</span>`
        carts.push(data[cartIndex]); 
    }
   
}

let favouriteItems = [];
let displayFavourite = false;
let favindex = 0;

function addToFavourites(i){
    favindex = data.findIndex(ele=>ele.idCategory == i);
    data[favindex].favourite = !data[favindex].favourite;
    if(displayFavourite){
        
            index--;
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
            if(data[favindex].favourite){
                index++;
                document.getElementById('favourites').innerHTML = `<span>Favourites ${index}</span>`
                iterateItems(data);
                favouriteItems.push(data[favindex]); 
            }
            else{
                    index--;
                        
                    document.getElementById('favourites').innerHTML = `<span>Favourites ${index>0?index:""}</span>`
                       
                    iterateItems(data);
                    favouriteItems = favouriteItems.filter(ele=>ele.idCategory != i);
            }
    }

}


function showCart(){
    displayCart = true;
    iterateItems(carts);
}

function showFavourite(){
    displayFavourite = true;
    iterateItems(favouriteItems);
}

