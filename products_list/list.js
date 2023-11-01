
document.addEventListener("DOMContentLoaded", function () {
    var productListContainer = document.getElementById("productListContainer");
    var spinner = document.getElementById("spinner");

    function fetchProductsList() {
        spinner.style.display = "block";

        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                data.forEach(product => {
                    createProductList(product);
                });
                spinner.style.display = "none";
            });
    }

    function createProductList(product) {
        let listCard = document.createElement("div");
        listCard.classList.add("list-card");

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

        coll.addEventListener("click", function(){
            if (informationAdd.style.display == "block"){
            informationAdd.style.display = "none";
        } else if (informationAdd.style.display == "none"){
            informationAdd.style.display = "block";
        }
        })

        informationAdd.appendChild(title);
        informationAdd.appendChild(price);
        informationAdd.appendChild(category);
        informationAdd.appendChild(description);

        imageContainer.appendChild(id);

        detailsContainer.appendChild(coll);
        detailsContainer.appendChild(informationAdd);

        listCard.appendChild(imageContainer);
        listCard.appendChild(detailsContainer);
        productListContainer.appendChild(listCard);
    }




    function formatCamelCase(text) {
        return text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    fetchProductsList();
});
