function ProductManager() {
  this.products = [];
  var temp = [];

    // return a found product by id
  this.findProductById = function (id) {
    return this.products.find(product => product.id === id);
  };

  // return found product by title
  this.findProductByTitle = function (title) {
    return this.products.find(product => product.title === title);
  };


  // Creates a product with an id and title
  this.createProduct = function(id, title){
    let product = new Object();
    product.id = id;
    product.title = title;

    if(this.findProductById(id) != null){
      return false;
    }

    temp.push(id);
    this.products = [...this.products, product];
    return true;
  };

  // Updates a product, if one exists in the current products
  this.updateProduct = function (id, title) {

    if(temp.includes(id)){
      this.products = this.products.map(product => {
        return {
          id: id,
          title: title
        };
      });
      return true;
    }

    return false;
  };

  // deletes a product, if one exists
  this.deleteProduct = function (id) {
    if(temp.includes(id)){
      const product = this.products.find(product => product.id === id);
      delete product;
      return true;
    }
    return false;
  };


}
