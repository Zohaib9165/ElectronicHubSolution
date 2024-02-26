var updatedIndex = 0;
var isUpdated = false;
var EditRowItem;
var number = 0;
var jsSum;
var productName;
var quantity;
var productPrice;
var ArrayOfInvoice = [];
var filteredArr = [];
var productArray = [];
var ParentProductArray = [];
var parentIndex;
var row_col_6_span;
var AddDataInvoice;
var ClientDataArray = [];
var num;
var IsUpgrade = false;
var upGradeIndex;
var printListFlag = true;
var loginDataArray = [];
let flag = false;
var RegistrationDataArr = [];
var presentId;
var RegistrationDataUpdated = false;
// Generate the Ordered Code
async function generateUniqueCode() {
  // async function to generate a random uppercase letter from A to Z
  async function getRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  // async function to generate a random 4-digit number
  async function getRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // Generate the unique code
  // const specialCharacters = "#";
  const capitalLetters = getRandomLetter() + getRandomLetter();
  const numbers = getRandomNumber();

  const uniqueCode = capitalLetters + numbers;
  return uniqueCode;
}
// Example usage:
const generatedCode = generateUniqueCode();
// //////console.log(generatedCode);

async function SaveData(status) {
  ////alert("Data Successfully Saved=" + number);
  // let valid = formValidate();
  // if (!valid) {
  //   return false;
  // }

  var addInvoice = document.getElementById("addInvoice");
  addInvoice.classList.add("d-none");

  var RowOFButton = document.getElementById("legerBill");
  RowOFButton.classList.add("d-none");

  var mainInvoice = document.getElementById("mainInvoice");
  mainInvoice.classList.add("mt-5");

  var mainUi = document.getElementById("mainUi");
  mainUi.classList.remove("d-none");

  var StreetAddress = document.getElementById("StreetAddress").value;

  var City = document.getElementById("City").value;

  var PostCode = document.getElementById("PostCode").value;

  var Country = document.getElementById("Country").value;

  var ClientName = document.getElementById("ClientName").value;

  var ClientEmail = document.getElementById("ClientEmail").value;

  var ClientStreetAddress = document.getElementById(
    "ClientStreetAddress"
  ).value;

  var ClientCity = document.getElementById("ClientCity").value;

  var ClientPostCode = document.getElementById("ClientPostCode").value;

  var ClientCountry = document.getElementById("ClientCountry").value;

  var InvoiceDate = document.getElementById("InvoiceDate").value;

  var PaymentDate = document.getElementById("PaymentDate").value;

  var ProjectDescription = document.getElementById("ProjectDescription").value;

  // Iterate over each row to get values
  for (var i = 0; i < number; i++) {
    var productNameElement = document.getElementById("ProductName" + i);
    var quantityElement = document.getElementById("quantity" + i);
    var productPriceElement = document.getElementById("ProductPrice" + i);
    var productTotalElement = document.getElementById("totalAmount" + i);

    // Debugging statements
    //// //////console.log("productNameElement", productNameElement);
    //// //////console.log("quantityElement", quantityElement);
    //// //////console.log("productPriceElement", productPriceElement);

    // Check if elements exist before accessing their values
    if (
      productNameElement &&
      quantityElement &&
      productPriceElement &&
      productTotalElement
    ) {
      var productName = productNameElement.value;
      var quantity = quantityElement.value;
      var productPrice = productPriceElement.value;
      var totalPrice = productTotalElement.innerHTML;
      // You now have the values in the variables (productName, quantity, productPrice)
      // // //////console.log("Product Name:1", productName);
      // // //////console.log("Quantity:1", quantity);
      //  // //////console.log("Product Price:1", productPrice);
      // // //////console.log("Product totalPrice:1", totalPrice);
    }

    var productObj = {
      productName: productName,
      quantity: quantity,
      productPrice: productPrice,
      totalPrice: parseFloat(totalPrice),
    };
    // //////console.log("object productObj", productObj);
    productArray.push(productObj);
    // //////console.log("object OF product array", productArray);
  }

  var total = productArray.reduce(async function (accumulator, product) {
    return accumulator + product.totalPrice;
  }, 0);

  EditRowItem = number;
  //////console.log("EditRowItem", EditRowItem);
  number = 0;
  document.getElementById("jsProductAdd").innerHTML = "";
  document.getElementById("newList").innerHTML = "";

  id = new Date().getTime().toString();

  AddDataInvoice = {
    StreetAddress: StreetAddress,
    City: City,
    PostCode: PostCode,
    Country: Country,
    ClientName: ClientName,
    ClientEmail: ClientEmail,
    ClientStreetAddress: ClientStreetAddress,
    ClientCity: ClientCity,
    ClientPostCode: ClientPostCode,
    ClientCountry: ClientCountry,
    InvoiceDate: InvoiceDate,
    PaymentDate: PaymentDate,
    ProjectDescription: ProjectDescription,
    id: id,
    generatedCode: generateUniqueCode(),
    total: total,
    status: status,
  };
  //// //////console.log("AddDataInvoice before push in array",AddDataInvoice)
  // ArrayOfInvoice.push(AddDataInvoice)
  //// //////console.log(ArrayOfInvoice)

  document.getElementById("FormId").reset();
  if (isUpdated) {
    ////console.log("parentIndex", parentIndex);
    ArrayOfInvoice[updatedIndex] = AddDataInvoice;

    ////console.log("ParentProductArray 1st", ParentProductArray);
    ////console.log("productArray", productArray);
    ParentProductArray[parentIndex] = productArray;
    ////console.log("ParentProductArray last", ParentProductArray);

    productArray = [];
    isUpdated = false;
  } else {
    await fetch("http://localhost:3000/AddDataInvoice", {
      method: "POST",
      body: JSON.stringify(AddDataInvoice),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // alert("Data successfully posted");
        ArrayOfInvoice = json;
      });

    // ArrayOfInvoice.push(AddDataInvoice);
    //// //////console.log(ArrayOfInvoice);
    ParentProductArray.push(productArray);
    ////console.log("ParentProductArray22222", ParentProductArray);
    productArray = [];
  }

  await createDiv();

  document.getElementById("arrayLength").innerHTML =
    "There are " + ArrayOfInvoice.length + " total invoices.";
  return true;
}

async function AddInvoice() {
  var addInvoice = document.getElementById("addInvoice");
  addInvoice.classList.remove("d-none");

  var mainInvoice = document.getElementById("mainInvoice");
  mainInvoice.classList.remove("mt-5");

  var mainUi = document.getElementById("mainUi");
  mainUi.classList.add("d-none");

  var newRowJs = document.getElementById("jsProductAdd");
  newRowJs.innerHTML = "";
  // //////alert("Invoice app ");
}

async function AddNewItem() {
  // parentIndex = index;
  // //////console.log(" Index" ,index)
  // //alert(index);
  var superParent = document.createElement("div");
  superParent.className = "row addItemRow mt-3";
  superParent.id = "jsRow" + number;
  // superParent.id = "delete" + number;
  // //////console.log("objectId", superParent);

  var parent = document.createElement("div");
  parent.className = "col-md-4";

  // Product Name Input
  var parent_input = document.createElement("input");
  parent_input.setAttribute("type", "text");
  parent_input.className = "form-control inputOfAddInvoice";
  parent_input.id = "ProductName" + number;

  parent.appendChild(parent_input);
  superParent.appendChild(parent);

  // Product Quantity Input

  var parent_input_Qty = document.createElement("div");
  parent_input_Qty.className = "col-md-2";

  var parent_input_Qty_input = document.createElement("input");
  parent_input_Qty_input.setAttribute("type", "number");
  parent_input_Qty_input.className = "form-control inputOfAddInvoice";
  parent_input_Qty_input.id = "quantity" + number;
  parent_input_Qty_input.onchange = (event) => {
    Storing(event.target.id);
  };

  parent_input_Qty.appendChild(parent_input_Qty_input);
  superParent.appendChild(parent_input_Qty);

  // Product Price Input

  var parent_input_Price = document.createElement("div");
  parent_input_Price.className = "col-md-3";

  let parent_input_Price_input = document.createElement("input");
  parent_input_Price_input.setAttribute("type", "number");
  parent_input_Price_input.className = "form-control inputOfAddInvoice";
  parent_input_Price_input.id = "ProductPrice" + number;
  parent_input_Price_input.onchange = (event) => {
    Storing(event.target.id);
  };
  //  productPrice ="ProductPrice"+number;

  parent_input_Price.appendChild(parent_input_Price_input);
  superParent.appendChild(parent_input_Price);

  // Product TotalAmount:

  var parent_TotalAmount = document.createElement("div");
  parent_TotalAmount.className = "col-md-2 d-flex";

  let parent_TotalAmount_tag = document.createElement("div");
  parent_TotalAmount_tag.className = "ms-3 labelSet";
  parent_TotalAmount_tag.id = "totalAmount" + number;

  parent_TotalAmount_tag.innerHTML = "0.00";

  let parent_TotalAmount_tag_icon = document.createElement("img");
  parent_TotalAmount_tag_icon.className = "ms-4";
  parent_TotalAmount_tag_icon.id = "delete" + number;
  parent_TotalAmount_tag_icon.setAttribute("src", "./icons/icon-delete.svg");
  parent_TotalAmount_tag_icon.onclick = (event) => {
    Delete(event.target.id);
  };

  parent_TotalAmount.appendChild(parent_TotalAmount_tag);

  parent_TotalAmount.appendChild(parent_TotalAmount_tag_icon);

  superParent.appendChild(parent_TotalAmount);

  var newRowJs = document.getElementById("jsProductAdd");

  newRowJs.appendChild(superParent);

  number++;
  // //alert(number);
}

async function Delete(id) {
  number = number - 1;
  var lastNumber = parseInt(id.match(/\d+$/)[0]);
  var rowOfInputs = document.getElementById("jsRow" + lastNumber);

  if (rowOfInputs) {
    // Get the parent (the table) and remove the row
    var parentElement = rowOfInputs.parentNode;
    parentElement.removeChild(rowOfInputs);

    ////console.log("ProductArray before", productArray);
    // Remove the corresponding entry from your array
    productArray.splice(lastNumber, 1);
    ////console.log("ProductArray after", productArray);
  }
}

async function Storing(id) {
  ////alert(id);

  var inputString = id;
  var lastNumber = parseInt(inputString.match(/\d+$/)[0]);

  //// //////console.log(lastNumber);// Output: 6
  var inputQuantity = document.getElementById("quantity" + lastNumber).value;
  //// //////console.log("objectInputQuantity" ,inputQuantity);

  var inputPrice = document.getElementById("ProductPrice" + lastNumber).value;
  //// //////console.log("inputPrice" ,inputPrice);
  var product = inputQuantity * inputPrice;

  //// //////console.log("objectOF Product",product)

  var totalAmount = document.getElementById("totalAmount" + lastNumber);
  totalAmount.innerHTML = product;
  //// //////console.log("totalAmount" ,totalAmount);
}

async function FilteredData() {
  var mainInvoice = document.getElementById("FilterData");

  // Toggle the visibility by adding or removing the "d-none" class
  mainInvoice.classList.toggle("d-none");
}

async function GoBack() {
  //////alert("Go back async function is run");
  document.getElementById("mainUi").classList.remove("d-none");

  document.getElementById("legerBill").classList.add("d-none");
}

var ShowCompleteBill = async function (id, myID) {
  // Find the index of 'orange' in the array
  //////console.log("myID", myID);
  //////console.log("ArrayOfInvoice", ArrayOfInvoice);
  let myindexofcode = myID;

  ////console.log("myindexofcode: ", myindexofcode);

  let nameToFind = myID;

  let index = ArrayOfInvoice.findIndex((obj) => obj.id === nameToFind);

  if (index !== -1) {
    ////console.log(`Object with name${nameToFind} found at index ${index}`);
  } else {
    ////console.log(`Object with name${nameToFind}notfound`);
  }
  ////console.log(" ArrayOfInvoice[index]", ArrayOfInvoice[index]);
  var inputString = id;
  // //alert(id);
  var lastIdex = parseInt(inputString.match(/\d+$/)[0]);

  var customerProduct = ParentProductArray[index];
  ////console.log("CustomerProduct", customerProduct);
  // //////console.log("Show Complete Bill called with index: ", index);
  // ////alert("Show Complete Bill");
  document.getElementById("mainUi").classList.add("d-none");
  document.getElementById("legerBill").classList.remove("d-none");
  document.getElementById("RowOFButton").classList.remove("d-none");
  document.getElementById("CompleteBill").classList.remove("d-none");

  // Update the HTML elements with the data from the array
  var projectDescription = document.getElementById("projectDescription");
  projectDescription.innerHTML = ArrayOfInvoice[index].ProjectDescription;

  var DateInvoice = document.getElementById("DateInvoice");
  // DateInvoice.innerHTML = elem.InvoiceDate;
  DateInvoice.innerHTML = ArrayOfInvoice[index].InvoiceDate;

  var DatePayment = document.getElementById("DatePayment");
  DatePayment.innerHTML = ArrayOfInvoice[index].PaymentDate;

  var orderedName = document.getElementById("orderedName");
  orderedName.innerHTML = ArrayOfInvoice[index].ClientName;

  var ClientSA = document.getElementById("ClientSA");
  ClientSA.innerHTML = ArrayOfInvoice[index].ClientStreetAddress;

  var orderCode = document.getElementById("orderCode");
  orderCode.innerHTML = ArrayOfInvoice[index].generatedCode;

  var ClientC = document.getElementById("ClientC");
  ClientC.innerHTML = ArrayOfInvoice[index].ClientCity;

  var ClientCountryCode = document.getElementById("ClientCountryCode");
  ClientCountryCode.innerHTML = ArrayOfInvoice[index].ClientPostCode;

  var bookerSA = document.getElementById("bookerSA");
  bookerSA.innerHTML = ArrayOfInvoice[index].StreetAddress;

  var bookerC = document.getElementById("bookerC");
  bookerC.innerHTML = ArrayOfInvoice[index].City;

  var bookerCountryCode = document.getElementById("bookerCountryCode");
  bookerCountryCode.innerHTML = ArrayOfInvoice[index].PostCode;

  var bookercountry = document.getElementById("bookercountry");
  bookercountry.innerHTML = ArrayOfInvoice[index].Country; // Make sure Country is defined somewhere

  var mail = document.getElementById("mail");
  mail.innerHTML = ArrayOfInvoice[index].ClientEmail;

  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  for (var i = 0; i < customerProduct.length; i++) {
    var row = tableBody.insertRow(i);
    row.insertCell(0).textContent = customerProduct[i].productName;
    row.insertCell(1).textContent = customerProduct[i].quantity;
    row.insertCell(2).textContent = customerProduct[i].productPrice;
    row.insertCell(3).textContent = customerProduct[i].totalPrice;
    // //////console.log("ParentProductArray[i].productName",ParentProductArray[i].productName);
  }

  // // Using reduce to calculate the sum of all prices
  var total = customerProduct.reduce(async function (accumulator, product) {
    return accumulator + product.totalPrice;
  }, 0);
  //////console.log("total", total);
  var GrandTotal = document.getElementById("GrandTotal");
  GrandTotal.innerHTML = "£ " + total;

  // Making the #3rd Page of ui which is making the button

  var parent = document.createElement("div");
  parent.className = "row  p-0 m-0 ";

  var parent_col1 = document.createElement("div");
  parent_col1.className = "col-md-4 padd";

  var parent_col2 = document.createElement("div");
  parent_col2.className = "col-md-2 enteriesRow  mt-1";

  var parent_col2_span = document.createElement("sapn");
  parent_col2_span.className = "mb-2 heading";
  parent_col2_span.innerHTML = "Status";

  var row_col_6 = document.createElement("span");

  row_col_6_span = document.createElement("span");
  row_col_6_span.className = "badge bg-secondary  ms-4 py-3 px-4";

  var row_col_6_span_i = document.createElement("i");
  row_col_6_span_i.className = "fa-sharp fa-solid fa-circle fa-2xs";
  row_col_6.appendChild(row_col_6_span);
  row_col_6_span.appendChild(row_col_6_span_i);

  // Add the "Paid" text after the icon
  row_col_6_span.appendChild(
    document.createTextNode(ArrayOfInvoice[index].status)
  );
  if (ArrayOfInvoice[index].status == "pending") {
    // //alert("Status Pending");
    row_col_6_span.classList.add("pending");
  }
  if (ArrayOfInvoice[index].status == "draft") {
    // //alert("Status Draft");
    row_col_6_span.classList.add("draft");
  }
  if (ArrayOfInvoice[index].status == "paid") {
    // //alert("Status Draft");
    row_col_6_span.classList.add("piller");
  }

  parent_col2.appendChild(parent_col2_span);
  parent_col1.appendChild(parent_col2_span);

  parent_col1.appendChild(row_col_6);
  parent.appendChild(parent_col1);

  var div = document.createElement("div");
  div.className = "col-md-8 padd";

  var div_div = document.createElement("div");
  div_div.className = "float-end";

  var div_div_btn = document.createElement("button");
  div_div_btn.className = "btn btn-primary mt-1 pdfButton  py-2 me-1";
  div_div_btn.innerHTML = "Edit";
  //  div_div_btn.id= elem.id
  div_div_btn.setAttribute("type", "button");
  div_div_btn.setAttribute("onclick", `EditData(${index})`);
  div_div.appendChild(div_div_btn);

  var div_div_btn1 = document.createElement("button");
  div_div_btn1.className = "btn btn-danger mt-1 pdfButton py-2 me-1";
  div_div_btn1.innerHTML = "Delete";
  //  div_div_btn1.id= elem.id
  div_div_btn1.setAttribute("type", "button");
  //  div_div_btn1.setAttribute("onclick", "DeleteData(this.id)")
  div_div_btn1.addEventListener("click", async function () {
    DeleteData(index, this.id);
  });
  div_div.appendChild(div_div_btn1);

  var div_div_btn2 = document.createElement("button");
  div_div_btn2.className = "btn btn-primary mt-1 pdfButton py-2";
  div_div_btn2.innerHTML = "Mark as read";
  // div_div_btn2.id = elem.id;
  div_div_btn2.setAttribute("type", "button");
  div_div_btn2.addEventListener("click", async function () {
    postData(index, "paid");
  });

  div_div.appendChild(div_div_btn2);

  var div_btn = document.createElement("button");
  div_btn.className = "btn btn-warning mt-1 pdfButton  py-2 ms-1";
  div_btn.innerHTML = "Download pdf";
  div_btn.setAttribute("type", "button");
  div_btn.setAttribute("onclick", "generatePdf()");
  div_div.appendChild(div_btn);

  parent.appendChild(div);
  div.appendChild(div_div);

  var RowOFButton = document.getElementById("RowOFButton");
  RowOFButton.innerHTML = "";
  RowOFButton.appendChild(parent);
};

async function EditData(index) {
  parentIndex = index;
  var addInvoice = document.getElementById("addInvoice");
  addInvoice.classList.remove("d-none");

  var mainInvoice = document.getElementById("mainInvoice");
  mainInvoice.classList.remove("mt-5");
  var mainInvoice1 = document.getElementById("mainUi");
  // //////alert(mainInvoice1)
  //// //////console.log(mainInvoice1)
  mainInvoice1.classList.add("d-none");

  // document.getElementById("FirstName").value=arrOfStudentData[index].nameName;

  document.getElementById("StreetAddress").value =
    ArrayOfInvoice[index].StreetAddress;

  document.getElementById("City").value = ArrayOfInvoice[index].City;

  document.getElementById("PostCode").value = ArrayOfInvoice[index].PostCode;

  document.getElementById("Country").value = ArrayOfInvoice[index].Country;

  document.getElementById("ClientName").value =
    ArrayOfInvoice[index].ClientName;

  document.getElementById("ClientEmail").value =
    ArrayOfInvoice[index].ClientEmail;

  document.getElementById("ClientStreetAddress").value =
    ArrayOfInvoice[index].ClientStreetAddress;

  document.getElementById("ClientCity").value =
    ArrayOfInvoice[index].ClientCity;

  document.getElementById("ClientPostCode").value =
    ArrayOfInvoice[index].ClientPostCode;

  document.getElementById("ClientCountry").value =
    ArrayOfInvoice[index].ClientCountry;

  document.getElementById("InvoiceDate").value =
    ArrayOfInvoice[index].InvoiceDate;

  document.getElementById("PaymentDate").value =
    ArrayOfInvoice[index].PaymentDate;

  document.getElementById("ProjectDescription").value =
    ArrayOfInvoice[index].ProjectDescription;
  // //alert("Are you sure you want to edit data");

  var ProductArr = ParentProductArray[index];
  //////console.log("ProductArr", ProductArr);
  // //alert(number);

  //////console.log("EditRowItem in edit async function", EditRowItem);

  for (var i = 0; i < ProductArr.length; i++) {
    // //alert("Are you sure you want to edit data");

    var ProductArr = ParentProductArray[index];
    //////console.log("ProductArr", ProductArr);

    var superParent = document.createElement("div");
    superParent.className = "row addItemRow mt-3";
    superParent.id = "jsRow" + number;
    // //////console.log("objectId", superParent);

    var parent = document.createElement("div");
    parent.className = "col-md-4";

    // Product Name Input
    var parent_input = document.createElement("input");
    parent_input.setAttribute("type", "text");
    parent_input.className = "form-control inputOfAddInvoice";
    parent_input.id = "ProductName" + number;
    // parent_input.id = ProductArr[i].productName;

    parent.appendChild(parent_input);
    superParent.appendChild(parent);

    // Product Quantity Input

    var parent_input_Qty = document.createElement("div");
    parent_input_Qty.className = "col-md-2";

    var parent_input_Qty_input = document.createElement("input");
    parent_input_Qty_input.setAttribute("type", "number");
    parent_input_Qty_input.className = "form-control inputOfAddInvoice";
    parent_input_Qty_input.id = "quantity" + number;
    // parent_input_Qty_input.id = ProductArr[i].quantity;
    parent_input_Qty_input.onchange = (event) => {
      Storing(event.target.id);
    };

    parent_input_Qty.appendChild(parent_input_Qty_input);
    superParent.appendChild(parent_input_Qty);

    // Product Price Input

    var parent_input_Price = document.createElement("div");
    parent_input_Price.className = "col-md-3";

    let parent_input_Price_input = document.createElement("input");
    parent_input_Price_input.setAttribute("type", "number");
    parent_input_Price_input.className = "form-control inputOfAddInvoice";
    parent_input_Price_input.id = "ProductPrice" + number;
    // parent_input_Price_input.id = ProductArr[i].productPrice;
    parent_input_Price_input.onchange = (event) => {
      Storing(event.target.id);
    };
    //  productPrice ="ProductPrice"+number;

    parent_input_Price.appendChild(parent_input_Price_input);
    superParent.appendChild(parent_input_Price);

    // Product TotalAmount:

    var parent_TotalAmount = document.createElement("div");
    parent_TotalAmount.className = "col-md-2 d-flex";

    let parent_TotalAmount_tag = document.createElement("div");
    parent_TotalAmount_tag.className = "ms-3 labelSet";
    parent_TotalAmount_tag.id = "totalAmount" + number;

    // parent_TotalAmount_tag.innerHTML = ProductArr[i].totalPrice;

    let parent_TotalAmount_tag_icon = document.createElement("img");
    parent_TotalAmount_tag_icon.className = "ms-4";
    parent_TotalAmount_tag_icon.id = "delete" + number;
    parent_TotalAmount_tag_icon.setAttribute("src", "./icons/icon-delete.svg");
    parent_TotalAmount_tag_icon.onclick = (event) => {
      Delete(event.target.id);
    };

    parent_TotalAmount.appendChild(parent_TotalAmount_tag);

    parent_TotalAmount.appendChild(parent_TotalAmount_tag_icon);

    superParent.appendChild(parent_TotalAmount);

    var newRowJs = document.getElementById("jsProductAdd");

    newRowJs.appendChild(superParent);

    // //alert("you want to edit values");
    document.getElementById("ProductName" + i).value =
      ProductArr[i].productName;
    document.getElementById("quantity" + i).value = ProductArr[i].quantity;
    document.getElementById("ProductPrice" + i).value =
      ProductArr[i].productPrice;
    document.getElementById("totalAmount" + i).innerHTML =
      ProductArr[i].totalPrice;

    number++;
  }

  //////console.log("index", index);
  isUpdated = true;
  //////console.log("productArray", ParentProductArray[index]);
  updatedIndex = index;
  // //alert(updatedIndex);
}

async function createDiv(total) {
  fetch("http://localhost:3000/AddDataInvoice")
    .then((response) => response.json())
    .then((json) => {
      document.getElementById("AddNewRow").innerHTML = "";
      // console.log("json.length", json.length);
      for (var i = 0; i < json.length; i++) {
        var row = document.createElement("div");
        row.className = "row row1 FilteredDatatxt p-0 m-0 mt-3 DataRow";
        // row.id = elem.id;
        row.id = "DataRow" + number;
        row.addEventListener("click", async function () {
          ShowCompleteBill(this.id, json.id);
        });

        var row_col_2 = document.createElement("div");
        row_col_2.className = "col-md-2 enteriesRow1   px-4 mt-1";
        row_col_2.innerHTML = "#" + json[i].generatedCode;

        row.appendChild(row_col_2);

        var row_col_3 = document.createElement("div");
        row_col_3.className = "col-md-3  enteriesRow2 text-center mt-1";
        row_col_3.innerHTML = json[i].InvoiceDate;

        row.appendChild(row_col_3);

        var row_col_4 = document.createElement("div");
        row_col_4.className = "col-md-2  enteriesRow2 text-center mt-1";
        row_col_4.innerHTML = json[i].ClientName;

        row.appendChild(row_col_4);

        var row_col_5 = document.createElement("div");
        row_col_5.className = "col-md-3  enteriesRow1  mt-1 ";
        // row_col_5.id = "GT"+number;
        row_col_5.innerHTML = "£ " + json[i].total;

        row.appendChild(row_col_5);

        var row_col_6 = document.createElement("div");
        row_col_6.className = "col-md-2 enteriesRow";

        row_col_6_span = document.createElement("span");
        row_col_6_span.className = "badge bg-secondary  ms-0";

        var row_col_6_span_i = document.createElement("i");
        row_col_6_span_i.className = "fa-sharp fa-solid fa-circle fa-2xs me-2";
        row_col_6_span.appendChild(row_col_6_span_i);

        // Add the "Paid" text after the icon
        row_col_6_span.appendChild(document.createTextNode(json[i].status));

        if (json[i].status == "pending") {
          // //alert(elem.status);
          row_col_6_span.classList.add("pending");
          // //////console.log("pending");
        }
        if (json[i].status == "draft") {
          // //alert(elem.status);
          row_col_6_span.classList.add("draft");
          // //////console.log("pending");
        }
        if (json[i].status == "paid") {
          // //alert(elem.status);
          row_col_6_span.classList.add("piller");
          // //////console.log("pending");
        }

        row_col_6.appendChild(row_col_6_span);

        var row_col_6_span_img = document.createElement("img");
        row_col_6_span_img.setAttribute("src", "./icons/icon-arrow-right.svg");
        row_col_6_span_img.setAttribute("alt", "img not found");
        // row_col_6_span_img.id=elem.id;
        row_col_6_span_img.id = "IconNum" + number;
        //// //////console.log(index);
        row_col_6_span_img.addEventListener("click", async function () {
          ShowCompleteBill(this.id, json.id);
        });
        //// //////console.log('objectID',elem.id)

        row_col_6_span_img.className = "img-fluid ms-2";

        // Append the image after the span content
        row_col_6.appendChild(row_col_6_span_img);

        // Now, append the entire div to the document or another container
        // document.body.appendChild(row_col_6); // or append it to another container

        row.appendChild(row_col_6);

        var AddNewRow = document.getElementById("AddNewRow");
        AddNewRow.appendChild(row);
        number++;
      }
    });
  // //////console.log("yehe a gye ", number);
  number = 0;
}

var DeleteData = async function (index, id) {
  parentIndex = index;
  // //alert(parentIndex);
  document.getElementById("confirmationMsg").classList.remove("d-none");
};

async function DeleteIndex() {
  // //alert("parentIndex");
  //////console.log("parentIndex", parentIndex);

  document.getElementById("mainUi").classList.remove("d-none");

  document.getElementById("legerBill").classList.add("d-none");
  document.getElementById("confirmationMsg").classList.add("d-none");

  ArrayOfInvoice.splice(parentIndex, 1);
  createDiv();

  // alert(ArrayOfInvoice.length);
  document.getElementById("arrayLength").innerHTML =
    "There are " + ArrayOfInvoice.length + " total invoices.";
}

var postData = async function (parentIndex, status) {
  // //alert(parentIndex);
  // //////console.log(row_col_6_span.classList);
  // //alert(status);
  if (status == "paid") {
    row_col_6_span.classList.remove("pending");
    row_col_6_span.classList.remove("draft");
    row_col_6_span.classList.add("piller");

    var row_col_6_span_i = document.createElement("i");
    row_col_6_span_i.className = "fa-sharp fa-solid fa-circle fa-2xs me-2";
    row_col_6_span.innerHTML = "";
    row_col_6_span.appendChild(row_col_6_span_i);

    // ParentProductArray[parentIndex] = productArray;
    // ArrayOfInvoice[updatedIndex] = AddDataInvoice;

    row_col_6_span.appendChild(
      document.createTextNode((ArrayOfInvoice[parentIndex].status = status))
    );
    // //////console.log("ArrayOfInvoice", ArrayOfInvoice[parentIndex]);

    createDiv();
  }
};

// async function formValidate() {
//   // //alert("form validation")
//   // Get form fields values
//   let ErrorFound = false;

//   var StreetAddress = document.getElementById("StreetAddress");
//   StreetAddress.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputSA = document.getElementById("SA");
//   outputSA.innerHTML = "";
//   // Validation for Street Address
//   if (StreetAddress.value.length > 50) {
//     // //alert("Street Address must be less than 50 characters.");
//     outputSA.innerHTML = "Street Address must be less than 50 characters.";
//     StreetAddress.focus();
//     StreetAddress.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var City = document.getElementById("City");
//   City.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCity = document.getElementById("c");
//   outputCity.innerHTML = "";
//   var cityRegex = /^[A-Za-z]{1,10}$/;

//   if (!City.value.match(cityRegex)) {
//     outputCity.innerHTML = "You have entered an invalid City Name";
//     City.focus();
//     City.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   // // Validation for Post Code
//   var PostCode = document.getElementById("PostCode");
//   PostCode.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputPC = document.getElementById("pc");
//   outputPC.innerHTML = "";
//   if (PostCode.value.length < 5) {
//     outputPC.innerHTML = "Post Code  must be more than 5 characters.";
//     PostCode.focus();
//     PostCode.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var Country = document.getElementById("Country");
//   Country.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCntry = document.getElementById("cntry");
//   outputCntry.innerHTML = "";
//   var cityRegex = /^[A-Za-z]{1,20}$/;

//   if (!Country.value.match(cityRegex)) {
//     outputCntry.innerHTML = "You have entered an invalid Country Name";
//     Country.focus();
//     Country.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   var ClientName = document.getElementById("ClientName");

//   ClientName.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCN = document.getElementById("CN");
//   outputCN.innerHTML = "";
//   var nameRegex = /^[A-Za-z '-]{3,30}$/; // Modified regex to allow 3 to 30 characters
//   if (!nameRegex.test(ClientName.value)) {
//     //alert("name");
//     outputCN.innerHTML =
//       "Please enter a valid client name (3 to 30 alphabets)."; // Adjusted error message
//     ClientName.focus();
//     ClientName.classList.add("is-invalid");
//     // //alert("Please enter a valid client name (3 to 30 alphabets)."); // You may remove this line as it's commented out
//     ErrorFound = true;
//   }

//   var ClientStreetAddress = document.getElementById("ClientStreetAddress");
//   ClientStreetAddress.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCSA = document.getElementById("CSA");
//   outputCSA.innerHTML = "";
//   // Validation for Street Address
//   if (ClientStreetAddress.value.length > 50) {
//     // //alert("Street Address must be less than 50 characters.");
//     outputCSA.innerHTML = "Street Address must be less than 50 characters.";
//     ClientStreetAddress.focus();
//     ClientStreetAddress.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var ClientCity = document.getElementById("ClientCity");
//   ClientCity.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCC = document.getElementById("CC");
//   outputCC.innerHTML = "";
//   var cityRegex = /^[A-Za-z]{1,10}$/;

//   if (!ClientCity.value.match(cityRegex)) {
//     outputCC.innerHTML = "You have entered an invalid City Name";
//     // //alert("You have entered an invalid email address!");
//     ClientCity.focus();
//     ClientCity.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   var ClientPostCode = document.getElementById("ClientPostCode");
//   ClientPostCode.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCPC = document.getElementById("cpc");
//   outputCPC.innerHTML = "";
//   if (ClientPostCode.value.length < 5) {
//     outputCPC.innerHTML = "Post Code must be more than 5 characters.";
//     ClientPostCode.focus();
//     ClientPostCode.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var ClientCountry = document.getElementById("ClientCountry");
//   ClientCountry.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCCountry = document.getElementById("CCountry");
//   outputCCountry.innerHTML = "";
//   var cityRegex = /^[A-Za-z]{1,20}$/;

//   if (!ClientCountry.value.match(cityRegex)) {
//     outputCCountry.innerHTML = "You have entered an invalid Country Name";
//     // //alert("You have entered an invalid email address!");
//     ClientCountry.focus();
//     ClientCountry.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   var ClientEmail = document.getElementById("ClientEmail");
//   ClientEmail.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputNEw = document.getElementById("output");
//   outputNEw.innerHTML = "";

//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   if (!ClientEmail.value.match(mailformat)) {
//     outputNEw.innerHTML = "You have entered an invalid email address";
//     // //alert("You have entered an invalid email address!");
//     ClientEmail.focus();
//     ClientEmail.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var ProjectDescription = document.getElementById("ProjectDescription");
//   ProjectDescription.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var PDescription = document.getElementById("PDescription");
//   PDescription.innerHTML = "";
//   var cityRegex = /^[A-Za-z]{1,30}$/;
//   if (ProjectDescription.value.match(cityRegex)) {
//     PDescription.innerHTML = "You have entered an invalid City Name";
//     // //alert("You have entered an invalid email address!");
//     ProjectDescription.focus();
//     ProjectDescription.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   if (ErrorFound) {
//     return false;
//   } else {
//     return true;
//   }
// }

async function Paid() {
  //////console.log("ArrayOfInvoice 1st time", ArrayOfInvoice);
  filteredArr = ArrayOfInvoice;
  //////console.log("filteredArr 1st time", filteredArr);

  var ArrayOfInvoice2 = ArrayOfInvoice.filter(async function (elem) {
    return elem.status == "paid";
  });
  //////console.log("ArrayOfInvoice2", ArrayOfInvoice2);
  ArrayOfInvoice = ArrayOfInvoice2;
  createDiv();
  ArrayOfInvoice = filteredArr;
  //////console.log("filteredArr 1st time", filteredArr);

  //////console.log("ArrayOfInvoice last time", ArrayOfInvoice);
}

async function Pending() {
  //////console.log("ArrayOfInvoice 1st time", ArrayOfInvoice);

  // //alert("Pending");
  filteredArr = ArrayOfInvoice;
  var ArrayOfInvoice2 = ArrayOfInvoice.filter(async function (elem) {
    return elem.status == "pending";
  });
  //////console.log("ArrayOfInvoice2", ArrayOfInvoice2);
  ArrayOfInvoice = ArrayOfInvoice2;
  createDiv();
  ArrayOfInvoice = filteredArr;
  //////console.log("ArrayOfInvoice last time", ArrayOfInvoice);
}

async function Draft() {
  //////console.log("ArrayOfInvoice 1st time", ArrayOfInvoice);
  // //alert("Draft");
  filteredArr = ArrayOfInvoice;
  var ArrayOfInvoice2 = ArrayOfInvoice.filter(async function (elem) {
    return elem.status == "draft";
  });

  ArrayOfInvoice = ArrayOfInvoice2;
  createDiv();
  ArrayOfInvoice = filteredArr;
  //////console.log("ArrayOfInvoice last time", ArrayOfInvoice);
}
async function Cancel() {
  document.getElementById("confirmationMsg").classList.add("d-none");
}

// MOde async functionality
async function darkMode() {
  // //////alert('Dark Mode Run')
  document.getElementById("darkMode").classList.add("d-none");
  document.getElementById("lightMode").classList.remove("d-none");

  document.documentElement.style.setProperty("--txtColor", "#000");
  document.documentElement.style.setProperty(
    "--txtOFPTagColor",
    "rgba(128, 128, 128, 0.904)"
  );

  document.documentElement.style.setProperty("--bgcOfBody", "#F2F2F2");
  document.documentElement.style.setProperty("--bgOfParentDiv", "#FFFFFF");
  document.documentElement.style.setProperty("--heading", "#888EB0");
  document.documentElement.style.setProperty("--bgOfCard", "#FFFFFF");
  document.documentElement.style.setProperty("--inputBg", "#FFFFFF");
  document.documentElement.style.setProperty("--rowGT", "#373B53");

  document.documentElement.style.setProperty(
    "--borderColor",
    "rgba(128, 128, 128, 0.904)"
  );
}

async function lightMode() {
  // //////alert('Light Mode Run')
  document.getElementById("darkMode").classList.remove("d-none");
  document.getElementById("lightMode").classList.add("d-none");

  document.documentElement.style.setProperty("--txtColor", "#fff");
  document.documentElement.style.setProperty("--txtOFPTagColor", "#fff");
  document.documentElement.style.setProperty("--bgcOfBody", "#141625");
  document.documentElement.style.setProperty("--bgOfParentDiv", "#1F213A");
  document.documentElement.style.setProperty("--heading", "#fff");
  document.documentElement.style.setProperty("--bgOfCard", "#1e2139");
  document.documentElement.style.setProperty("--borderColor", "#1f213a");
  document.documentElement.style.setProperty("--inputBg", "#252945");
  document.documentElement.style.setProperty("--rowGT", "#0C0E16");
}

// Client CRUD async functionality

async function AddClient() {
  // //alert("Add New Client");

  document.getElementById("clinetCrud").classList.remove("d-none");
  document.getElementById("InvoicesData").classList.add("d-none");
  document.getElementById("Registration").classList.add("d-none");
}
async function GoHome() {
  // //alert("Add New Client");

  document.getElementById("clinetCrud").classList.add("d-none");
  document.getElementById("InvoicesData").classList.remove("d-none");
}
async function submitForm() {
  // //alert("submitForm");

  // let valid = ValidateClientForm();
  // if (!valid) {
  //   return false;
  // }
  clientObj = {
    FClientName: document.getElementById("FClientName").value,
    ClientMail: document.getElementById("FClientEmail").value,
    FStreetAddress: document.getElementById("FStreetAddress").value,
    FCity: document.getElementById("FCity").value,
    FPostCode: document.getElementById("FPostCode").value,
    FCountry: document.getElementById("FCountry").value,
  };

  ////console.log("clientObj", clientObj);

  document.getElementById("ClientForm").reset();

  //   if(isUpdated){
  //     arrOfStudentData[updatedIndex]= studentDataObj;
  //     isUpdated=false;
  //   }
  // else{
  //   arrOfStudentData.push(studentDataObj);
  //   ////console.log(arrOfStudentData);
  // }

  if (IsUpgrade) {
    ClientDataArray[upGradeIndex] = clientObj;
    IsUpgrade = false;
  } else {
    ClientDataArray.push(clientObj);
    ////console.log("ClientDataArray", ClientDataArray);
  }

  table();
}

// async function ValidateClientForm() {
//   // //alert("hgfdsa");
//   let ErrorFound = false;

//   var StreetAddress = document.getElementById("FStreetAddress");
//   StreetAddress.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputSA = document.getElementById("FSA");
//   outputSA.innerHTML = "";
//   // Validation for Street Address
//   if (StreetAddress.value.length > 30) {
//     // //alert("Street Address must be less than 50 characters.");
//     outputSA.innerHTML = "Street Address must be less than 30 characters.";
//     StreetAddress.focus();
//     StreetAddress.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var ClientName = document.getElementById("FClientName");

//   ClientName.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCN = document.getElementById("FCN");
//   outputCN.innerHTML = "";
//   var nameRegex = /^[A-Za-z '-]{3,30}$/; // Modified regex to allow 3 to 30 characters
//   if (!nameRegex.test(ClientName.value)) {
//     outputCN.innerHTML =
//       "Please enter a valid client name (3 to 30 alphabets)."; // Adjusted error message
//     ClientName.focus();
//     ClientName.classList.add("is-invalid");
//     // //alert("Please enter a valid client name (3 to 30 alphabets)."); // You may remove this line as it's commented out
//     ErrorFound = true;
//   }

//   var ClientEmail = document.getElementById("FClientEmail");
//   ClientEmail.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputNEw = document.getElementById("FCE");
//   outputNEw.innerHTML = "";

//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   if (!ClientEmail.value.match(mailformat)) {
//     outputNEw.innerHTML = "You have entered an invalid email address";
//     // //alert("You have entered an invalid email address!");
//     ClientEmail.focus();
//     ClientEmail.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var ClientCity = document.getElementById("FCity");
//   ClientCity.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCC = document.getElementById("FC");
//   outputCC.innerHTML = "";
//   var cityRegex = /^[A-Za-z]{1,30}$/;

//   if (!ClientCity.value.match(cityRegex)) {
//     outputCC.innerHTML = "You have entered an invalid City Name";
//     // //alert("You have entered an invalid email address!");
//     ClientCity.focus();
//     ClientCity.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   var ClientPostCode = document.getElementById("FPostCode");
//   ClientPostCode.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCPC = document.getElementById("FPC");
//   outputCPC.innerHTML = "";
//   if (ClientPostCode.value.length < 5) {
//     // //alert("Street Address must be less than 50 characters.");
//     outputCPC.innerHTML = "Street Address must be more than 5 characters.";
//     ClientPostCode.focus();
//     ClientPostCode.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var ClientCountry = document.getElementById("FCountry");
//   ClientCountry.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputCCountry = document.getElementById("FCtry");
//   outputCCountry.innerHTML = "";
//   var cityRegex = /^[A-Za-z]{1,30}$/;

//   if (!ClientCountry.value.match(cityRegex)) {
//     outputCCountry.innerHTML = "You have entered an invalid Country Name";
//     // //alert("You have entered an invalid email address!");
//     ClientCountry.focus();
//     ClientCountry.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   if (ErrorFound) {
//     return false;
//   } else {
//     return true;
//   }
// }
async function table() {
  // //alert("Create Div");
  var tableBody = document.getElementById("ClientDataTableBody");
  tableBody.innerHTML = "";

  ////console.log(ClientDataArray);

  for (var i = 0; i < ClientDataArray.length; i++) {
    var table = document.getElementById("ClientDataTableBody");
    var row = table.insertRow(i);
    row.insertCell(0).innerHTML = i + 1;
    row.insertCell(1).innerHTML = ClientDataArray[i].FClientName;
    row.insertCell(2).innerHTML = ClientDataArray[i].ClientMail;
    row.insertCell(3).innerHTML = ClientDataArray[i].FStreetAddress;
    row.insertCell(4).innerHTML = ClientDataArray[i].FCity;
    row.insertCell(5).innerHTML = ClientDataArray[i].FPostCode;
    row.insertCell(6).innerHTML = ClientDataArray[i].FCountry;

    // Create delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger";
    deleteButton.id = "del" + i;
    deleteButton.setAttribute("onclick", "deleteData(" + i + ")");
    row.insertCell(7).appendChild(deleteButton);

    // Create update button
    var updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.className = "btn btn-primary";
    updateButton.id = "update" + i;
    updateButton.setAttribute("onclick", "update(" + i + ")");
    row.insertCell(7).appendChild(updateButton);
  }
}
async function update(id) {
  // //alert(id);
  document.getElementById("FClientName").value =
    ClientDataArray[id].FClientName;
  document.getElementById("FClientEmail").value =
    ClientDataArray[id].ClientMail;
  document.getElementById("FStreetAddress").value =
    ClientDataArray[id].FStreetAddress;
  document.getElementById("FCity").value = ClientDataArray[id].FCity;
  document.getElementById("FPostCode").value = ClientDataArray[id].FPostCode;
  document.getElementById("FCountry").value = ClientDataArray[id].FCountry;
  IsUpgrade = true;
  upGradeIndex = id;
  ////console.log("upGradeIndex", upGradeIndex);
}
async function deleteData(id) {
  // //alert(id);
  ClientDataArray.splice(id, 1);
  table();
}

async function showList() {
  if (printListFlag) {
    // ////console.log("ClientDataArray", ClientDataArray);
    // //alert("Show Client Array");
    for (var i = 0; i < ClientDataArray.length; i++) {
      // var parent_ul_li_hr = document.createElement("hr");
      var parent_ul = document.createElement("ul");
      parent_ul.className = "m-0 p-0 removeBulletList";
      var parent_ul_li = document.createElement("li");
      parent_ul_li.className = "removeBulletList";
      parent_ul_li.innerHTML = ClientDataArray[i].FClientName;
      parent_ul_li.id = i;
      parent_ul_li.setAttribute("onclick", "hitIndex(" + i + ")");
      parent_ul.appendChild(parent_ul_li);

      var newList = document.getElementById("newList");
      newList.appendChild(parent_ul);
      // newList.appendChild(parent_ul_li_hr);
    }
    printListFlag = false;
  }
  document.getElementById("newList").classList.remove("d-none");
  // //alert(i);
}
async function hitIndex(index) {
  // //alert(index);
  ////console.log("ClientDataArray[index]", ClientDataArray[index]);
  document.getElementById("ClientName").value =
    ClientDataArray[index].FClientName;
  document.getElementById("ClientEmail").value =
    ClientDataArray[index].ClientMail;
  document.getElementById("ClientStreetAddress").value =
    ClientDataArray[index].FStreetAddress;
  document.getElementById("ClientCity").value = ClientDataArray[index].FCity;
  document.getElementById("ClientPostCode").value =
    ClientDataArray[index].FPostCode;
  document.getElementById("ClientCountry").value =
    ClientDataArray[index].FCountry;

  document.getElementById("newList").classList.add("d-none");
  // alert("newList remove");
}
async function generatePdf() {
  // //alert("downloadpdf");
  var element = document.getElementById("downloadpdf");

  html2pdf(element);
}

//Date Validation
var date = new Date();
var tDate = date.getDate();
var Month = date.getMonth() + 1;
var year = date.getFullYear();
if (tDate < 10) {
  tDate = "0" + tDate;
}
if (Month < 10) {
  Month = "0" + Month;
}
var minDate = year + "-" + Month + "-" + tDate;
document.getElementById("InvoiceDate").setAttribute("min", minDate);
document.getElementById("PaymentDate").setAttribute("min", minDate);
// ////console.log(minDate);

// async functionality of login page

async function login() {
  // alert("Login page run");

  var email = document.getElementById("YourEmail");
  email.classList.add("is-invalid");
  var password = document.getElementById("password");
  password.classList.add("is-invalid");

  var outputMail = document.getElementById("outputMail");
  outputMail.innerHTML = "";
  var outputPassword = document.getElementById("outputPassword");
  outputPassword.innerHTML = "";
  var member = document.getElementById("member");
  member.innerHTML = "User want to SigIn is  not a member";

  await fetch("http://localhost:3000/RegistrationUSerData")
    .then((response) => response.json())
    .then((json) => {
      // //console.log(json);
      loginDataArray = json;
      //console.log("loginDataArray", loginDataArray);
    });

  for (var i = 0; i < loginDataArray.length; i++) {
    // alert("ENTER THE FOR LOOP");
    //console.log("password", password.value);
    if (
      email.value == loginDataArray[i].RegYourEmail &&
      password.value == loginDataArray[i].RegPassword
    ) {
      // alert("true");
      flag = true;
      break;
    }
  }

  if (flag == true) {
    // alert("true");

    email.classList.remove("is-invalid");
    outputMail.innerHTML = "";
    password.classList.remove("is-invalid");
    outputPassword.innerHTML = "";
    member.innerHTML = "";

    document.getElementById("clientAdd").classList.remove("d-none");
    document.getElementById("LoginAccount").classList.add("d-none");
    document.getElementById("InvoicesData").classList.remove("d-none");
    document.getElementById("SideBar").classList.remove("d-none");
  }
  flag = false;

  if (email.value == "admin@gmail.com" && password.value == "admin123") {
    document.getElementById("InvoicesData").classList.remove("d-none");
    document.getElementById("userAdd").classList.remove("d-none");
    document.getElementById("Registration").classList.add("d-none");
  }
}

// Registration From  functionality

async function AddUser() {
  // alert("AddUser");
  document.getElementById("InvoicesData").classList.add("d-none");
  document.getElementById("Registration").classList.remove("d-none");

  document.getElementById("clinetCrud").classList.add("d-none");
}

async function RegisteredData() {
  // alert("RegisteredData");
  // let valid = RegisteredFormValidate();
  // if (!valid) {
  //   return false;
  // }

  var RegistrationUSerDataObj = {
    RegFirstName: document.getElementById("RegFirstName").value,
    RegLastName: document.getElementById("RegLastName").value,
    RegNumber: document.getElementById("RegNumber").value,
    RegCNICNumber: document.getElementById("RegCNICNumber").value,
    RegYourEmail: document.getElementById("RegYourEmail").value,
    RegMale: document.getElementById("RegMale").checked,
    RegFemale: document.getElementById("RegFemale").checked,
    RegAddress: document.getElementById("RegAddress").value,
    RegSalary: document.getElementById("RegSalary").value,
    RegPassword: document.getElementById("RegPassword").value,
    RegConfirmPassword: document.getElementById("RegConfirmPassword").value,
  };
  // console.log("RegistrationUSerDataObj", RegistrationUSerDataObj);

  document.getElementById("RegistrationForm").reset();

  if (RegistrationDataUpdated) {
    console.log("idOfUpdate", presentId);
    console.log("objofupdate", RegistrationUSerDataObj);

    await fetch(`http://localhost:3000/RegistrationUSerData/${presentId}`, {
      method: "PATCH",
      body: JSON.stringify(RegistrationUSerDataObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        alert("Update data is successful");
      });

    RegistrationDataUpdated = false;
  } else {
    await fetch("http://localhost:3000/RegistrationUSerData", {
      method: "POST",
      body: JSON.stringify(RegistrationUSerDataObj),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // alert("Data successfully posted");
        // console.log(json);
      });
  }
  await RegistrationTable();

  // document.getElementById("clientAdd").classList.remove("d-none");
  // document.getElementById("InvoicesData").classList.remove("d-none");
  // document.getElementById("Registration").classList.add("d-none");
}

// async function RegisteredFormValidate() {
//   let ErrorFound = false;

//   var RegFirstName = document.getElementById("RegFirstName");

//   RegFirstName.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var OutputName = document.getElementById("OutputName");
//   OutputName.innerHTML = "";
//   var nameRegex = /^[A-Za-z '-]{3,30}$/; // Modified regex to allow 3 to 30 characters
//   if (!nameRegex.test(RegFirstName.value)) {
//     OutputName.innerHTML = "Please enter a valid  Name (3 to 30 alphabets)."; // Adjusted error message
//     RegFirstName.focus();
//     RegFirstName.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   var RegLastName = document.getElementById("RegLastName");

//   RegLastName.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var OutputLastName = document.getElementById("OutputLastName");
//   OutputLastName.innerHTML = "";
//   var nameRegex = /^[A-Za-z '-]{3,30}$/; // Modified regex to allow 3 to 30 characters
//   if (!nameRegex.test(RegLastName.value)) {
//     OutputLastName.innerHTML =
//       "Please enter a valid  Name (3 to 30 alphabets)."; // Adjusted error message
//     RegLastName.focus();
//     RegLastName.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   var RegYourEmail = document.getElementById("RegYourEmail");
//   RegYourEmail.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputMail = document.getElementById("outputMail");
//   outputMail.innerHTML = "";

//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   if (!RegYourEmail.value.match(mailformat)) {
//     outputMail.innerHTML = "You have entered an invalid email address";
//     // //alert("You have entered an invalid email address!");
//     RegYourEmail.focus();
//     RegYourEmail.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var RegSalary = document.getElementById("RegSalary");
//   RegSalary.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var Salary = document.getElementById("Salary");
//   Salary.innerHTML = "";

//   var SalaryFormat = /^\d+(\.\d{1,2})?$/;

//   if (!RegSalary.value.match(SalaryFormat)) {
//     Salary.innerHTML = "Salary must be positive numbers";
//     // //alert("You have entered an invalid email address!");
//     RegSalary.focus();
//     RegSalary.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var RegNumber = document.getElementById("RegNumber");
//   RegNumber.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var Number = document.getElementById("Number");
//   Number.innerHTML = "";

//   if (RegNumber.value.length == 11) {
//     // //alert("Street Address must be less than 50 characters.");
//     // Number.innerHTML = "Phone Number must be 11 characters.";
//   } else {
//     Number.innerHTML = "Phone Number must be 11 characters.";
//     RegNumber.focus();
//     RegNumber.classList.add("is-invalid");
//     ErrorFound = true;
//   }

//   var RegCNICNumber = document.getElementById("RegCNICNumber");
//   RegCNICNumber.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var CNICNumber = document.getElementById("CNICNumber");
//   CNICNumber.innerHTML = "";
//   if (RegCNICNumber.value.length == 13) {
//   } else {
//     // //alert("Street Address must be less than 50 characters.");
//     CNICNumber.innerHTML = "CNIC number must be 13 characters.";
//     RegCNICNumber.focus();
//     RegCNICNumber.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var RegAddress = document.getElementById("RegAddress");
//   RegAddress.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputAddress = document.getElementById("outputAddress");
//   outputAddress.innerHTML = "";
//   // Validation for Street Address
//   if (RegAddress.value.length > 30) {
//     outputAddress.innerHTML = "You entered the to much long address";
//     RegAddress.focus();
//     RegAddress.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   var RegPassword = document.getElementById("RegPassword");
//   var RegConfirmPassword = document.getElementById("RegConfirmPassword");

//   RegConfirmPassword.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var ConfirmPassword = document.getElementById("ConfirmPassword");
//   ConfirmPassword.innerHTML = "";
//   // Validation for Street Address
//   if (RegConfirmPassword.value !== RegPassword.value) {
//     ConfirmPassword.innerHTML = "Confirm password is invalid";
//     RegConfirmPassword.focus();
//     RegConfirmPassword.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   if (ErrorFound) {
//     return false;
//   } else {
//     return true;
//   }
// }
window.onload = function () {
  RegistrationTable();
};
async function RegistrationTable() {
  // alert("RegistrationTable");
  var tableBody = document.getElementById("RegistrationDataTableBody");
  tableBody.innerHTML = "";
  fetch("http://localhost:3000/RegistrationUSerData")
    .then((response) => response.json())
    .then((json) => {
      RegistrationDataArr = json;
      // console.log("RegistrationDataArr", RegistrationDataArr);

      for (var i = 0; i < json.length; i++) {
        var table = document.getElementById("RegistrationDataTableBody");
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML =
          json[i].RegFirstName + " " + " " + json[i].RegLastName;
        row.insertCell(2).innerHTML = json[i].RegYourEmail;
        row.insertCell(3).innerHTML = json[i].RegPassword;
        row.insertCell(4).innerHTML = json[i].RegAddress;
        row.insertCell(5).innerHTML = json[i].RegSalary;

        var ButtonContainer = document.createElement("div");
        ButtonContainer.className =
          "w-100 d-flex justify-content-center gap-2 mt-1";
        // Create delete button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-danger";
        deleteButton.id = json[i].id;
        deleteButton.setAttribute("onclick", `RegDeleteData(this.id)`);
        ButtonContainer.appendChild(deleteButton);

        // Create update button
        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.className = "btn btn-primary float-end ml-4";
        updateButton.id = json[i].id;
        updateButton.setAttribute("onclick", "RegUpdate(" + i + ")");
        ButtonContainer.appendChild(updateButton);

        // Append container to cell
        var cell = row.insertCell(6);
        cell.colSpan = 2; // Set colspan to 2
        cell.className = "p-0";
        cell.appendChild(ButtonContainer);
      }
    });
}
function RegUpdate(id) {
  // alert("updated run");
  // alert(id);
  console.log("RegistrationDataArr", RegistrationDataArr[id]);

  (document.getElementById("RegFirstName").value =
    RegistrationDataArr[id].RegFirstName),
    (document.getElementById("RegLastName").value =
      RegistrationDataArr[id].RegLastName),
    (document.getElementById("RegNumber").value =
      RegistrationDataArr[id].RegNumber),
    (document.getElementById("RegCNICNumber").value =
      RegistrationDataArr[id].RegCNICNumber),
    (document.getElementById("RegYourEmail").value =
      RegistrationDataArr[id].RegYourEmail),
    (document.getElementById("RegMale").checked =
      RegistrationDataArr[id].RegMale),
    (document.getElementById("RegFemale").checked =
      RegistrationDataArr[id].RegFemale),
    (document.getElementById("RegAddress").value =
      RegistrationDataArr[id].RegAddress),
    (document.getElementById("RegSalary").value =
      RegistrationDataArr[id].RegSalary),
    (document.getElementById("RegPassword").value =
      RegistrationDataArr[id].RegPassword);
  document.getElementById("RegConfirmPassword").value =
    RegistrationDataArr[id].RegConfirmPassword;

  presentId = RegistrationDataArr[id].id;
  // console.log("presentId", presentId);
  RegistrationDataUpdated = true;
}

function RegDeleteData(id) {
  // alert(id);

  fetch(`http://localhost:3000/RegistrationUSerData/${id}`, {
    method: "DELETE",
  }).then((res) => {
    RegistrationTable();
    // alert("RegDeleteData run");
  });
}
