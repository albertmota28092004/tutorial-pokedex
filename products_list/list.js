var productListContainer = document.getElementById("productListContainer");
var spinner = document.getElementById("spinner");
var successAlert = document.getElementById("success");

function fetchProductsList() {
    spinner.style.display = "block";

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            // Datos FakeStore
            let fakeStoreProducts = data;

            // Se obtienen datos del localStorage
            let createdProducts = JSON.parse(localStorage.getItem("createdProducts")) || [];
            let eliminatedProducts = JSON.parse(localStorage.getItem("eliminatedProducts")) || [];

            // Filtra los productos eliminados
            createdProducts = createdProducts.filter(product => !eliminatedProducts.includes(product.id));

            let allProducts = fakeStoreProducts.concat(createdProducts);

            allProducts.forEach(product => {
                createProductList(product);
            });

            spinner.style.display = "none";
        });
}


function createProductList(product) {
    let listCard = document.createElement("div");
    listCard.classList.add("list-card");
    listCard.setAttribute("data-product-id", product.id);

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container-list");

    let image = document.createElement("img");
    image.classList.add("img-list");
    image.src = product.image;
    image.style.width = "50px";
    image.style.height = "50px";

    imageContainer.appendChild(image);

    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    let id = document.createElement("p");
    id.textContent = `Id: ${product.id}`;

    let title = document.createElement("p");
    title.textContent = product.title;
    title.style.fontWeight = "bold";

    let price = document.createElement("p");
    price.textContent = `$ ${product.price}`;

    let category = document.createElement("p");
    category.textContent = `Category: ${formatCamelCase(product.category)}`;
    category.style.fontWeight = "bold";

    let description = document.createElement("p");
    description.textContent = `Description: ${product.description}`;

    let rating = document.createElement("div");
    rating.textContent = `Rating: `;

    let rate = document.createElement("p");
    rate.textContent = `Rate: ${product.rating.rate}`;

    let count = document.createElement("p");
    count.textContent = `Count: ${product.rating.count}`;

    rating.appendChild(rate)
    rating.appendChild(count)

    let coll = document.createElement("button");
    coll.classList.add("collapsible");
    coll.textContent = 'More info';
    coll.style.fontWeight = "bold";
    coll.style.border = "3px solid #021429";
    coll.style.borderRadius = "30px";
    coll.style.color = "#021429";

    let informationAdd = document.createElement("div");
    informationAdd.classList.add("content");
    informationAdd.style.display = "none";

    coll.addEventListener("click", function () {
        if (informationAdd.style.display == "block") {
            informationAdd.style.display = "none";
        } else if (informationAdd.style.display == "none") {
            informationAdd.style.display = "block";
        }
    })

    let editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";
/*
    editButton.addEventListener("click", function (event) {
        event.preventDefault();

        let saveButton = document.createElement("button");
        saveButton.textContent = 'Save';
        let inputContainer = document.createElement("form");
        inputContainer.classList.add("input-container");
        let titleInput = document.createElement('input');
        titleInput.classList.add("form-control");
        let priceInput = document.createElement('input');
        priceInput.classList.add("form-control");
        let descriptionInput = document.createElement('input');
        descriptionInput.classList.add("form-control");
        descriptionInput.setAttribute("rows", "5");
        let categoryInput = document.createElement('input');
        categoryInput.classList.add("form-control");
        let ratingInput = document.createElement('input');
        ratingInput.classList.add("form-control");
        let newTitle = document.createElement("p");
        let newPrice = document.createElement("p");
        let newDescription = document.createElement("p");
        let newCategory = document.createElement("p");
        let newRating = document.createElement("p");


        titleInput.value = title.textContent;
        priceInput.value = price.textContent;
        descriptionInput.value = description.textContent;
        categoryInput.value = category.textContent;
        ratingInput.value = rating.textContent;

        title.parentNode.replaceChild(titleInput, title);
        price.parentNode.replaceChild(priceInput, price);
        description.parentNode.replaceChild(descriptionInput, description);
        category.parentNode.replaceChild(categoryInput, category);
        rating.parentNode.replaceChild(ratingInput, rating);


        saveButton.addEventListener("click", function (event) {
            event.preventDefault();

            newTitle.value = titleInput.value
            newPrice.value = priceInput.value
            newDescription.value = descriptionInput.value
            newCategory.value = categoryInput.value
            newRating.value = ratingInput.value

            titleInput.parentNode.replaceChild(newTitle, titleInput)
            priceInput.parentNode.replaceChild(newPrice, priceInput)
            descriptionInput.parentNode.replaceChild(newDescription, descriptionInput)
            categoryInput.parentNode.replaceChild(newCategory, categoryInput)
            ratingInput.parentNode.replaceChild(newRating, ratingInput)

            informationAdd.appendChild(titleInput);
            informationAdd.appendChild(priceInput);
            informationAdd.appendChild(descriptionInput);
            informationAdd.appendChild(categoryInput);
            informationAdd.appendChild(ratingInput);

            
        })

        informationAdd.appendChild(saveButton);

    });
*/

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        deleteProduct(product.id);
    });


    informationAdd.appendChild(title);
    informationAdd.appendChild(price);
    informationAdd.appendChild(category);
    informationAdd.appendChild(description);
    informationAdd.appendChild(rating);
    informationAdd.appendChild(editButton);

    imageContainer.appendChild(id);

    detailsContainer.appendChild(coll);
    detailsContainer.appendChild(informationAdd);
    detailsContainer.appendChild(deleteButton);


    listCard.appendChild(imageContainer);
    listCard.appendChild(detailsContainer);
    /*listCard.appendChild(editButton);
    listCard.appendChild(deleteButton);*/
    productListContainer.appendChild(listCard);
}



function deleteProduct(id) {
    fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(deletedProduct => {
            deleteProductFromUI(id);
        })
        .catch(error => console.error('Error al eliminar el producto:', error));
}


function deleteProductFromUI(productId) {
    console.log("Deleting product from UI:", productId);

    let productCard = document.querySelector(`.list-card[data-product-id="${productId}"]`);
    if (productCard) {
        console.log("Removing product from UI:", productId);
        productCard.remove();

        // Elimina el producto del localStorage
        let eliminatedProducts = JSON.parse(localStorage.getItem("eliminatedProducts")) || [];
        eliminatedProducts.push(productId);
        localStorage.setItem("eliminatedProducts", JSON.stringify(eliminatedProducts));
        productCard.style.display = "none";
    } else {
        console.log("Product card not found for ID:", productId);
    }
}


function loadEliminatedProducts() {
    console.log("Loading eliminated products...");
    let eliminatedProducts = JSON.parse(localStorage.getItem("eliminatedProducts")) || [];

    console.log("Eliminated Products:", eliminatedProducts);

    for (let productId of eliminatedProducts) {
        let productCard = document.querySelector(`.list-card[data-product-id="${productId}"]`);
        if (productCard) {
            console.log("Removing product from UI:", productId);
            productCard.remove();
        }
    }
}


// Llama a la función para cargar productos eliminados al cargar la página
loadEliminatedProducts();



function formatCamelCase(text) {
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
function registerProduct() {
    event.preventDefault();
    let id = document.getElementById("id").value;
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").value;
    let imageInput = document.getElementById("image");
    let rate = document.getElementById("rate").value;
    let count = document.getElementById("count").value;

    let image = imageInput.files[0];

    let imageElement = document.createElement("img");
    imageElement.src = URL.createObjectURL(image);
    imageElement.style.width = "50px";
    imageElement.style.height = "50px";

    let newProduct = {
        id: id,
        title: title,
        price: price,
        description: description,
        category: category,
        image: imageElement.src,
        rating: {
            rate: rate,
            count: count
        }
    };

    let createdProducts = JSON.parse(localStorage.getItem("createdProducts")) || [];
    createdProducts.push(newProduct);
    localStorage.setItem("createdProducts", JSON.stringify(createdProducts));

    createProductList(newProduct);
    successAlert.style.display = "block";

}
/*
function updateProduct(id) {
    let id = document.getElementById("id").value;
    fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(
            {
                title: 'test product',
                price: 13.5,
                description: 'lorem ipsum set',
                image: 'https://i.pravatar.cc',
                category: 'electronic'
            }
        )
    })
        .then(res => res.json())
        .then(json => console.log(json))
}
*/