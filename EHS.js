let flag = false;
var RegistrationDataArr = [];
var presentId;
var RegistrationDataUpdated = false;

function buyNow() {
  // //alert("buyNow")
  document.getElementById("webSite").classList.add("d-none");
  document.getElementById("Registration").classList.remove("d-none");
  document.getElementById("table").classList.add("d-none");
}
function Dashboard() {
  // //alert("Dashboard");
  document.getElementById("webSite").classList.add("d-none");
  document.getElementById("LoginAccount").classList.remove("d-none");
}

function Home() {
  // //alert("MobHomeile")
  document.getElementById("header").classList.remove("d-none");
  document.getElementById("slider").classList.remove("d-none");
  document.getElementById("mobileView").classList.remove("d-none");
  document.getElementById("footer").classList.remove("d-none");
  document.getElementById("products").classList.remove("d-none");
  document.getElementById("contact").classList.remove("d-none");
  document.getElementById("about").classList.remove("d-none");
}
function Mobile() {
  // //alert("Mobile")
  document.getElementById("header").classList.remove("d-none");
  document.getElementById("slider").classList.remove("d-none");
  document.getElementById("mobileView").classList.remove("d-none");
  document.getElementById("footer").classList.remove("d-none");
  document.getElementById("products").classList.add("d-none");
  document.getElementById("contact").classList.add("d-none");
  document.getElementById("about").classList.add("d-none");
}
function Products() {
  // //alert("Products")
  document.getElementById("header").classList.remove("d-none");
  document.getElementById("slider").classList.add("d-none");
  document.getElementById("mobileView").classList.add("d-none");
  document.getElementById("footer").classList.remove("d-none");
  document.getElementById("products").classList.remove("d-none");
  document.getElementById("contact").classList.add("d-none");
  document.getElementById("about").classList.add("d-none");
}
function Contact() {
  // //alert("Contact")
  document.getElementById("header").classList.remove("d-none");
  document.getElementById("slider").classList.add("d-none");
  document.getElementById("mobileView").classList.add("d-none");
  document.getElementById("footer").classList.remove("d-none");
  document.getElementById("products").classList.add("d-none");
  document.getElementById("contact").classList.remove("d-none");
  document.getElementById("about").classList.add("d-none");
}
function About() {
  // //alert("About")
  document.getElementById("header").classList.remove("d-none");
  document.getElementById("slider").classList.add("d-none");
  document.getElementById("mobileView").classList.add("d-none");
  document.getElementById("footer").classList.remove("d-none");
  document.getElementById("products").classList.add("d-none");
  document.getElementById("contact").classList.add("d-none");
  document.getElementById("about").classList.remove("d-none");
}
function goBack() {
  //alert("goBack");
  document.getElementById("Registration").classList.add("d-none");
  document.getElementById("webSite").classList.remove("d-none");
}

// login functionality
async function login() {
  // //alert("Login page run");

  var email = document.getElementById("YourEmail");
  email.classList.add("is-invalid");
  var password = document.getElementById("password");
  password.classList.add("is-invalid");

  var outputMail = document.getElementById("outputMail");
  outputMail.innerHTML = "";
  var outputPassword = document.getElementById("outputPassword");
  outputPassword.innerHTML = "";
  var member = document.getElementById("member");
  member.innerHTML = "User want to Login is  not a Admin";

  await fetch("http://localhost:3000/RegistrationUSerData")
    .then((response) => response.json())
    .then((json) => {
      // //console.log(json);
      loginDataArray = json;
      //console.log("loginDataArray", loginDataArray);
    });

  if (flag == true) {
    // //alert("true");

    email.classList.remove("is-invalid");
    outputMail.innerHTML = "";
    password.classList.remove("is-invalid");
    outputPassword.innerHTML = "";
    member.innerHTML = "";

    document.getElementById("LoginAccount").classList.add("d-none");
  }
  flag = false;

  if (email.value == "admin@gmail.com" && password.value == "admin123") {
    document.getElementById("table").classList.remove("d-none");
    document.getElementById("Registration").classList.remove("d-none");
    document.getElementById("RegistrationForm").classList.add("d-none");
    document.getElementById("LoginAccount").classList.add("d-none");
  }
}

async function submitOrder() {
  // //alert("submitorder");
  // //alert("RegisteredData");
  // let valid = RegisteredFormValidate();
  // if (!valid) {
  //   return false;
  // }
  var ClientOrder = {
    RegFirstName: document.getElementById("RegFirstName").value,
    RegLastName: document.getElementById("RegLastName").value,
    RegNumber: document.getElementById("RegNumber").value,
    RegYourEmail: document.getElementById("RegYourEmail").value,

    ProductList: document.getElementById("ProductList").value,
    RegProductQty: document.getElementById("RegProductQty").value,
    RegProductColor: document.getElementById("RegProductColor").value,
    RegAddress: document.getElementById("RegAddress").value,
  };
  //   console.log(ClientOrder);
  if (RegistrationDataUpdated) {
    // console.log("idOfUpdate", presentId);
    // console.log("objofupdate", ClientOrder);

    await fetch(`http://localhost:3000/ClientOrder/${presentId}`, {
      method: "PATCH",
      body: JSON.stringify(ClientOrder),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //alert("Update data is successful");
      });

    RegistrationDataUpdated = false;
  } else {
    await fetch(" http://localhost:3000/ClientOrder", {
      method: "POST",
      body: JSON.stringify(ClientOrder),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //alert(" Your order has been successfully submitted!");
        // console.log("json",json);
      });
  }
  document.getElementById("RegistrationForm").reset();

  document.getElementById("webSite").classList.remove("d-none");
  document.getElementById("Registration").classList.add("d-none");
  document.getElementById("table").classList.add("d-none");
}

// async function RegisteredFormValidate() {
//   let ErrorFound = false;

//   // var RegFirstName = document.getElementById("RegFirstName");

//   // RegFirstName.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   // var OutputName = document.getElementById("OutputName");
//   // OutputName.innerHTML = "";
//   // var nameRegex = /^[A-Za-z '-]{3,30}$/; // Modified regex to allow 3 to 30 characters
//   // if (!nameRegex.test(RegFirstName.value)) {
//   //   OutputName.innerHTML = "Please enter a valid  Name (3 to 30 alphabets)."; // Adjusted error message
//   //   RegFirstName.focus();
//   //   RegFirstName.classList.add("is-invalid");
//   //   ErrorFound = true;
//   // }

//   // var RegLastName = document.getElementById("RegLastName");

//   // RegLastName.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   // var OutputLastName = document.getElementById("OutputLastName");
//   // OutputLastName.innerHTML = "";
//   // var nameRegex = /^[A-Za-z '-]{3,30}$/; // Modified regex to allow 3 to 30 characters
//   // if (!nameRegex.test(RegLastName.value)) {
//   //   OutputLastName.innerHTML =
//   //     "Please enter a valid  Name (3 to 30 alphabets)."; // Adjusted error message
//   //   RegLastName.focus();
//   //   RegLastName.classList.add("is-invalid");
//   //   ErrorFound = true;
//   // }

//   var RegYourEmail = document.getElementById("RegYourEmail");
//   RegYourEmail.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   var outputMail = document.getElementById("outputMail");
//   outputMail.innerHTML = "";

//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   if (!RegYourEmail.value.match(mailformat)) {
//     outputMail.innerHTML = "You have entered an invalid email address";
//     // ////alert("You have entered an invalid email address!");
//     RegYourEmail.focus();
//     RegYourEmail.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//     ErrorFound = true;
//   }

//   // var RegSalary = document.getElementById("RegSalary");
//   // RegSalary.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   // var Salary = document.getElementById("Salary");
//   // Salary.innerHTML = "";

//   // var SalaryFormat = /^\d+(\.\d{1,2})?$/;

//   // if (!RegSalary.value.match(SalaryFormat)) {
//   //   Salary.innerHTML = "Salary must be positive numbers";
//   //   // ////alert("You have entered an invalid email address!");
//   //   RegSalary.focus();
//   //   RegSalary.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//   //   ErrorFound = true;
//   // }

//   // var RegNumber = document.getElementById("RegNumber");
//   // RegNumber.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   // var Number = document.getElementById("Number");
//   // Number.innerHTML = "";

//   // if (RegNumber.value.length == 11) {
//   //   // ////alert("Street Address must be less than 50 characters.");
//   //   // Number.innerHTML = "Phone Number must be 11 characters.";
//   // } else {
//   //   Number.innerHTML = "Phone Number must be 11 characters.";
//   //   RegNumber.focus();
//   //   RegNumber.classList.add("is-invalid");
//   //   ErrorFound = true;
//   // }

//   // var RegCNICNumber = document.getElementById("RegCNICNumber");
//   // RegCNICNumber.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   // var CNICNumber = document.getElementById("CNICNumber");
//   // CNICNumber.innerHTML = "";
//   // if (RegCNICNumber.value.length == 13) {
//   // } else {
//   //   // ////alert("Street Address must be less than 50 characters.");
//   //   CNICNumber.innerHTML = "CNIC number must be 13 characters.";
//   //   RegCNICNumber.focus();
//   //   RegCNICNumber.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//   //   ErrorFound = true;
//   // }

//   // var RegAddress = document.getElementById("RegAddress");
//   // RegAddress.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   // var outputAddress = document.getElementById("outputAddress");
//   // outputAddress.innerHTML = "";
//   // // Validation for Street Address
//   // if (RegAddress.value.length > 30) {
//   //   outputAddress.innerHTML = "You entered the to much long address";
//   //   RegAddress.focus();
//   //   RegAddress.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//   //   ErrorFound = true;
//   // }

//   // var RegPassword = document.getElementById("RegPassword");
//   // var RegConfirmPassword = document.getElementById("RegConfirmPassword");

//   // RegConfirmPassword.classList.remove("is-invalid"); // Remove the "is-invalid" class first
//   // var ConfirmPassword = document.getElementById("ConfirmPassword");
//   // ConfirmPassword.innerHTML = "";
//   // // Validation for Street Address
//   // if (RegConfirmPassword.value !== RegPassword.value) {
//   //   ConfirmPassword.innerHTML = "Confirm password is invalid";
//   //   RegConfirmPassword.focus();
//   //   RegConfirmPassword.classList.add("is-invalid"); // Add "is-invalid" class back if the email is invalid
//   //   ErrorFound = true;
//   // }

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
  // //alert("RegistrationTable");
  var tableBody = document.getElementById("RegistrationDataTableBody");
  tableBody.innerHTML = "";
  fetch("http://localhost:3000/ClientOrder")
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
        row.insertCell(2).innerHTML = json[i].RegNumber;
        row.insertCell(3).innerHTML = json[i].ProductList;
        row.insertCell(4).innerHTML = json[i].RegProductColor;
        row.insertCell(5).innerHTML = json[i].RegProductQty;
        row.insertCell(6).innerHTML = json[i].RegAddress;

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
        var cell = row.insertCell(7);
        cell.colSpan = 2; // Set colspan to 2
        cell.className = "px-4";
        cell.appendChild(ButtonContainer);
      }
    });
}
function RegUpdate(id) {
  // //alert("updated run");
  document.getElementById("RegistrationForm").classList.remove("d-none");
  document.getElementById("LoginAccount").classList.add("d-none");

  // //alert(id);
  // console.log("RegistrationDataArr", RegistrationDataArr[id]);
  (document.getElementById("RegFirstName").value =
    RegistrationDataArr[id].RegFirstName),
    (document.getElementById("RegLastName").value =
      RegistrationDataArr[id].RegLastName),
    (document.getElementById("RegNumber").value =
      RegistrationDataArr[id].RegNumber),
    (document.getElementById("RegYourEmail").value =
      RegistrationDataArr[id].RegYourEmail),
    (document.getElementById("ProductList").value =
      RegistrationDataArr[id].ProductList),
    (document.getElementById("RegProductQty").value =
      RegistrationDataArr[id].RegProductQty),
    (document.getElementById("RegProductColor").value =
      RegistrationDataArr[id].RegProductColor),
    (document.getElementById("RegAddress").value =
      RegistrationDataArr[id].RegAddress),
    (presentId = RegistrationDataArr[id].id);
  // console.log("presentId", presentId);
  RegistrationDataUpdated = true;
}

function RegDeleteData(id) {
  //alert(id);

  fetch(`http://localhost:3000/ClientOrder/${id}`, {
    method: "DELETE",
  }).then((res) => {
    RegistrationTable();
    // //alert("RegDeleteData run");
  });
}
 async function submitFeedBack(){
  // //alert("ertyu");
  var ClientFeedBack = {
    FullName: document.getElementById("FullName").value,
    Email: document.getElementById("Email").value,
    number: document.getElementById("Number").value,
    ModalName: document.getElementById("ModalName").value,

    DeviceColor: document.getElementById("DeviceColor").value,
    Feedback: document.getElementById("Feedback").value,
   
  };
  console.log(ClientFeedBack)
  document.getElementById("feed").reset();
  await fetch("http://localhost:3000/ClientFeedBack", {
    method: "POST",
    body: JSON.stringify(ClientFeedBack),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      //alert(" Your feedback has been successfully submitted!");
      // console.log("json",json);
    });
}