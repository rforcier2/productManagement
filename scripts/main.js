const productManager = new ProductManager();

var $allItems     = $("#allItems");

function productManagement(operations) {
  let errorReasonCodes = ["Product Already Exists", "Product Doesn't Exist"],
  successCode = "Operation Completed Successfully";


  return operations.map(operation => {
    //const[...params] = prodInfo
    const [methodName, ...params] = operation;
    let result = productManager[methodName].call(productManager, ...params),
    productIdNum = [...params].splice(0,1),
    prouductFullTitle = [...params].splice(1,1);

  let errorExists =
        `<div class='alert alert-danger'>
           RESULT: ${JSON.stringify(result)}
          <br>
           Operation: ${operation}
          <br>
           REASON: ${errorReasonCodes[0]}
        </div>
        `,

      errorNoProduct =
        `<div class='alert alert-danger'>
           RESULT: ${JSON.stringify(result)}
          <br>
           Operation: ${operation}
          <br>
           REASON: ${errorReasonCodes[1]}
        </div>
        `,

      successResult =
        `<div class='alert alert-success'>
         RESULT: ${JSON.stringify(result)}
         <br>
         Operation: ${operation}
         </div>
        `,

      eachProduct =
        `<tr class="uniqueProduct">
            <td class="productId">${productIdNum}</td>
            <td class="productName">${prouductFullTitle}</td>
        </tr>`,

      productsTableEnd =
        `</tbody>
      </table>
      `,

      informationResult =
      `<div class='alert alert-success'>
        RESULT: ${JSON.stringify(result)}
        <br>
        Operation: ${operation}
        </div>
      `;


    if (result === undefined)
      return "<br>" + "null" + operation

    if (result == true && operation.includes('createProduct')) {
      return successResult && $allItems.append(eachProduct)
    }

    if (result == true && operation.includes('updateProduct')){
      if(eachProduct.indexOf(eachProduct) >=0){
        eachProduct.replace(eachProduct, eachProduct);
      }
      return successResult && $allItems.append(eachProduct)
    }

    else if(result == false && operation.includes('createProduct'))
      return errorExists

    else if (result == false && operation.includes('updateProduct'))
      return errorNoProduct

    else {
      return informationResult;
    }
     $allItems.append(productsTableEnd);
  });

}

      const $productId    = $("#productId"),
            $productTitle = $("#productTitle"),
            $selOperation = $("#selectOperation");

        var queue         = [],
            fullOperation    = [],
            $error        = $("#error"),
            $errors       = $("#errors"),
            $success      = $("#success"),
            $current      = $("#currentQueue"),
            $successDiv   = $("#successDiv"),
            $currentDiv   = $("#currentDiv"),
            $prodIdDiv    = $("#productIdDiv"),
            $prodTitleDiv = $("#productTitleDiv");

      $success.hide();
      $errors.hide();
      $current.hide();
      $currentDiv.hide();
      $successDiv.hide();



    $selOperation.click(function(){
      $productTitleDiv.show();
      $productIdDiv.show();

      if($selOperation.val() == "findProductById"){
        $productTitleDiv.hide();
        $productTitle.val() = "";
      }
      else if($selOperation.val() == "findProductByTitle"){
        $productIdDiv.hide();
        $productId.val() = "";
      }
    });



     $("#operationQueue").click(function(){
       $success.hide();

      let patt   = new RegExp(/<(\/*?)(?!(em|br\s*\/|strong))\w+?.+?>/gim);
      let  error  = "";

      if (patt.test($productId.val()) || patt.test($productTitle.val())){
  	    error += "Please Enter a Valid Id or Title <br/>";
        $errors.show();
      }

      if($selOperation.val() == "Choose..."){
        error += "Valid Operation Required <br />";
      }

      if( !$productId.val() && $selOperation.val() != "findProductByTitle" ){
        error += "Product Id Required! <br />";
      }

      if( !$productTitle.val() && $selOperation.val() != "findProductById" ){
        error += "Product Title Required! <br />";
      }

      if( error != ""){
        $errors.show();
        $error.html( error );
        return false;
      }


      $errors.hide();

      if($selOperation.val() && $productId.val() && $productTitle.val()){
        queue.push( [$selOperation.val(), $productId.val(), $productTitle.val() ] )
      }

      else if($selOperation.val() && $productId.val() && !$productTitle.val()){
        queue.push( [$selOperation.val(), $productId.val() ]);
      }

      else if ($selOperation.val() && $productTitle.val() && !$productId.val()){
        queue.push( [$selOperation.val(), $productTitle.val() ]);
      }


      $current.html("");
      $currentDiv.show();
      $current.show();
      for(ops of queue){
        $current.append("Operation: " + ops + "<br>");
      }
      $("#operationSubmit").show();
     });


    $("#operationSubmit").click(function(){
      $successDiv.show();
      $success.html("").show().append(productManagement(queue));;
      $currentDiv.hide();
      queue = [];
      fullOperation = [];
    });

    $("#refresh").click(function(){
      $allItems.show();
    })
