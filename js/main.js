fetch("https://dummyjson.com/products")
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    // in ra data gốc
    let dataGoc = data.products;
    console.log(dataGoc);

    let dataSearchCategory = dataGoc;

    // lấy ra các loại sản phẩm
    const categoryList = [];
    categoryList.push("All");
    dataGoc.forEach((product) => {
      if (!categoryList.includes(product.category)) {
        categoryList.push(product.category);
      }
    });

    // tạo ra các button loại sản phẩm
    const buttonProducts = document.querySelector(".button-products");
    let resultBTN = categoryList.map((ctg) => `<button class="btn-yellow">${ctg}</button>`);
    buttonProducts.innerHTML = resultBTN.join("");

    // hiển thị sản phẩm
    const displayProducts = (data) => {
      const productList = document.querySelector(".section-3 .row");

      if (data.length === 0) {
        productList.innerHTML = `<p>Không có sản phẩm nào ...</p>`;
      } else {
        const resultPRODUCT = data.map(
          (product) => `
          <div class="col-xl-2 col-lg-3 col-md-4 col-6">
            <div class="product">
              <div class="thumbnail"><img src="${product.thumbnail}" alt=""></div>
              <div class="info">
                <div>
                  <div class="title">${product.title}</div>
                </div>
                <div>
                  <div class="price">${product.price}$</div>
                  <div class="stock">Còn lại: ${product.stock} sp</div>
                </div>
              </div>
              <div class="discountPercentage">${Math.round(product.discountPercentage)}%</div>
            </div>
          </div>
          `
        );
        productList.innerHTML = resultPRODUCT.join("");
      }
    };

    // hiển thị default
    displayProducts(dataGoc);

    // Sắp xếp sản phẩm
    const selectSort = document.querySelector("#sort");
    console.log(selectSort);

    function sortProducts() {
      const valueOption = selectSort.value;
      switch (valueOption) {
        case "thapcao":
          dataSearchCategory = dataSearchCategory.sort((a, b) => a.price - b.price);
          dataGoc = dataGoc.sort((a, b) => a.price - b.price);
          break;
        case "caothap":
          dataSearchCategory = dataSearchCategory.sort((a, b) => b.price - a.price);
          dataGoc = dataGoc.sort((a, b) => b.price - a.price);
          break;
        case "giamnhieu":
          dataSearchCategory = dataSearchCategory.sort((a, b) => b.discountPercentage - a.discountPercentage);
          dataGoc = dataGoc.sort((a, b) => b.discountPercentage - a.discountPercentage);
          break;
        default:
          break;
      }
      displayProducts(dataSearchCategory);
    }

    selectSort.addEventListener("change", sortProducts);

    // loại sản phẩm
    const searchCategory = (category) => {
      if (category === "All") {
        return dataGoc;
      }
      const listCategory = dataGoc.filter((product) => product.category.toUpperCase().includes(category.toUpperCase()));
      return listCategory;
    };
    const btnProducts = document.querySelectorAll(".btn-yellow");
    btnProducts.forEach((btn) => {
      btn.addEventListener("click", () => {
        dataSearchCategory = searchCategory(btn.textContent);
        displayProducts(dataSearchCategory);
      });
    });

    // Tìm kiếm sản phẩm
    const searchName = (name) => {
      const list = dataGoc.filter((product) => product.title.toUpperCase().includes(name.toUpperCase()));
      return list;
    };
    const btnSearch = document.querySelector("#search");
    const textSearch = document.querySelector("#textSearch");

    btnSearch.addEventListener("click", () => {
      if (textSearch !== "") {
        dataSearchCategory = searchName(textSearch.value);
        displayProducts(dataSearchCategory);
      }
    });
  })
  .catch((err) => {
    console.log("Loi data");
  });
