

//this function store the info about user creating object and saving the user in array of users and store in local storage.
function StoreToLS() {
    //create JSON obj for 1 user
       var userMail = document.getElementById("signup-email").value;
        user = {
            userName: document.getElementById("signup-text").value,
            userPassword: document.getElementById("signup-pas1").value,
            wishList: {},
            upcomingRents: {},
            
        }

    if (cgroup41.users[userMail] == undefined) {
        cgroup41.users[userMail] = user;      //push the user obj to the array of users obj.
        
        //now stringfy before storing to local storage.
        localStorage["cgroup41"] = JSON.stringify(cgroup41);
        alert("Hello " + document.getElementById("signup-text").value + " Your Are Member now");
    }

    else {
        alert("This email is already registered to this website please try again");

    }
    


}

//Get data from LS and return all Data in one obj 'cgroup41'.
function GetFromLS() {
    if (localStorage["cgroup41"] != undefined) {
        cgroup41 = JSON.parse(localStorage["cgroup41"]);

    }
    else {
        cgroup41 =
        {
            users: {},
            currentUser: "",
            ApartOcup: {}, 
                
            

        }
    }

}

//this function checking if the password1 is equil to password2.
function ValidPassword() {
    let flag = false;
    var pas1 = document.getElementById("signup-pas1").value;
    var pas2 = document.getElementById("signup-pas2").value;
    if (pas1 == pas2) {
        flag = true;
    }
    else {
        alert("invalid password")
    }
    return flag;
}

// this function valid the mail
function validEmail() {

    var validEmail = document.getElementById("signup-email").value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    let flag = false;
    if (validEmail.match(validRegex)) {
        flag = true;
    }
    else {
        alert("invalid email")
    }
    return flag;
}

//this function is wire to event onclick of sign up buttons.
function OnClickSignUp() {
    //validation on the password
    var signupmail = document.getElementById("signup-email").value;
    var FullName = document.getElementById("signup-text").value;
    if (ValidPassword() && document.getElementById("signup-email").value != "" && document.getElementById("signup-pas1").value != "" && document.getElementById("signup-pas2").value != "") {
       
        if (validEmail() ) {
            StoreToLS();
           
        }
        //store the info.
        

       
    }
   
  
  

    /////// sol for some problem.
    var modal = document.getElementById('id01');
    modal.style.display = "none";
    /////// refreash the page again

}

//this function is wire to onload event on the body element when the page is  load/Refreash.        
function OnLoadEnterPage() {

    GetFromLS();

    //put automaticly the email to the input element
    let lsmail = cgroup41.currentUser;
    document.getElementById("signin-mail").value = lsmail;

   
}

//this function is wire to event onclick of sign up buttons in login div (in the first page) to open signup modal!!!.
function onclickSignUp_In() {

    var modal = document.getElementById('id01');
    modal.style.display = 'block'
    
    

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//this function cheak valdiation on user input                                                      
function LogIn_validation(email, pass) {
    let flag = false;
    if (cgroup41.users[email] != undefined) {
        if (cgroup41.users[email].userPassword == pass) {
            flag = true;
        }
    }
    return flag;
}

//this function is wire to onclick event log in btn and open user window
function onclickLogIn_btn() {

    if (LogIn_validation(document.getElementById("signin-mail").value, document.getElementById("signin-pas").value)) {
        cgroup41.currentUser = document.getElementById("signin-mail").value
        localStorage['cgroup41'] = JSON.stringify(cgroup41);
       
       
        window.location="UserHomePage.html";
       
        
       
        
        

    }
    else
        alert("Please try again or sign up to our site");
}







