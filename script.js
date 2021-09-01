var ID = Date.now();
var database = firebase.database();
var submitBtn = document.getElementById("submitBtn");
var fullName = "", email = "", password = "", dob = "", gender = "", gender_value = "", currentUserName = "";
function inputFields() {
  fullName = document.getElementById("fullName").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  dob = document.getElementById("dob").value;
  if (document.getElementById("gender_male").checked) {
    gender_value = "male";
  } else if (document.getElementById("gender_female").checked) {
    gender_value = "female";
  }
  if (fullName == "" || email == "" || password == "" || dob == "" || gender_value == "") {
    return true;
  } else {
    return false;
  }
}
function validateForm() {
  if (inputFields()) {
    window.alert("All fields are required.");
    return false;
  }
  return true;
}
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm()) {
    database.ref("/users/" + ID).set({
      full_name: fullName,
      email: email,
      pass_word: password,
      dateOfBirth: dob,
      gender: gender_value,
    });
    var currentUserID = ID;
    // window.alert(currentUserID);
    sessionStorage.setItem('CurrentUser', JSON.stringify(currentUserID));
    window.location.href = "./home.html";
  }
});
function getDetails() {
  var currentUserID = sessionStorage.getItem('CurrentUser');
  database.ref("/users/" + currentUserID).on('value', function(snapshot){
    currentUserName = snapshot.val().full_name;
    document.getElementById('userTitle').innerHTML = "Welcome " + currentUserName;
    console.log(currentUserName);
    console.log(currentUserID);
  });
}