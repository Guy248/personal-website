//global
var counter = 0;

//this function is wire to onload event on wishlist page body element
function onLoadWishListPage()
{
    GetFromLSs();
    RenderTheList();
    RenderUserDetails2();
    
    
}

//this function is delete wish from the local storage then reload the page.
function CancelOrder2(btn) {


    var RealId = btn.id.replace("C","")

    if (confirm("Are you sure you want to DELETE the wish?")) {
        cgroup41.users[cgroup41.currentUser].wishList[RealId] = undefined;


        localStorage['cgroup41'] = JSON.stringify(cgroup41);
        location.reload();
    }
 












  

}


//this function will render the wish list details into html wishlist page.
function RenderTheList() {
    var divPH = document.getElementById("menu-ph-wishlist");  //this the div we will render on it
    
    var RenderStr = '';
        for (k in cgroup41.users[cgroup41.currentUser].wishList) {
            for (var j = 0; j < Arr.length; j++) {
                if (cgroup41.users[cgroup41.currentUser].wishList[k].Id == Arr[j].id) {
                    RenderStr += '<div class="col-lg-3 col-6">';
                    RenderStr += '<div class="card">';
                    RenderStr += '<img src="' + Arr[j].picture_url+'" alt="apaerment pic">';
                    RenderStr += '<h1>id: ' + Arr[j].id+'</h1>';
                    RenderStr += '<p class="price">price for night: ' + Arr[j].price + '</p><p class="price">rating: ' + Arr[j].review_scores_rating+'</p><p class="price">bedrooms: '+Arr[j].bedrooms+'</p>';
                    RenderStr += '<p class="price">Check-In: ' + cgroup41.users[cgroup41.currentUser].wishList[k].checkIN + '</p>'
                    RenderStr += '<p class="price">Check-Out: ' + cgroup41.users[cgroup41.currentUser].wishList[k].checkOUT + '</p>'
                    RenderStr += '<p class="price">Apartment type: ' + Arr[j].property_type + '</p>';
                    RenderStr += '<p><button onclick="From_list_to_rents(this)" id="BTN' + Arr[j].id + '">Rent this reservation</button></p>';
                    RenderStr += '<p><button class="cancelBtn" onclick="CancelOrder2(this)" id="C' + Arr[j].id + '">Cancel this reservation</button></p>';
                    RenderStr += '</div></div>';
                    counter++;
                }

            }

        }
        RenderStr += '</div>';
    divPH.innerHTML = '<div class="cardRow row">'+RenderStr;
    
    
      



        //< div class="col-lg-3 col-sm-4 col-6" >
               
        //<div class="card">
        //    <img src="https://a0.muscache.com/pictures/10272854/8dcca016_original.jpg" alt="Denim Jeans" style="width:100%">
        //        <h1>id: 53023</h1>
        //        <p class="price">price for night: $140</p>
        //        <p class="price">Check-In: 4.7</p>
        //        <p class="price">Check-Out: 3</p>
        //        <p>St.dunkenShoot 14 enter A</p>
        //        <p><button>Add to Cart</button></p>
        //        </div>
            
        //    </div>


}

//this function is same things like the first one technical issues
function RenderUserDetails2() {
    var current = cgroup41.currentUser;
    var str2 = cgroup41.users[current].userName
    var pUserVac = document.getElementById("userVac2");


    var fullname_p = document.getElementById("fullName2");
    fullname_p.innerHTML = "Hello <b>" + str2 + "</b>";
   // pUserVac.innerHTML = "You Have " + Object.keys(cgroup41.users[cgroup41.currentUser].upcomingRents).length + " Vacations";
    pUserVac.innerHTML = "You Have " + counter + " wishes";
    

}


//this function need to take apartment from wish list and perform the real order.
function From_list_to_rents(btn) {

    var id_neto = btn.id.replace("BTN", "");
    GetFromLSs();
    var start = cgroup41.users[cgroup41.currentUser].wishList[id_neto].checkIN;
    var End = cgroup41.users[cgroup41.currentUser].wishList[id_neto].checkOUT;
    

    rent = {
        id: id_neto,
        dateStart: start,
        dateEnd: End,
    }
    order = {
        id: id_neto,
        dateStart: start,
        dateEnd: End,
        user: cgroup41.currentUser,
    }

    if (cgroup41.ApartOcup[id_neto + "-" + start] == undefined) {
        if (confirm("Are you sure you want to make an order ?") == true) {
            cgroup41.users[cgroup41.currentUser].upcomingRents[id_neto + "-" + start] = rent;
            cgroup41.ApartOcup[id_neto + "-" + start] = order;
            cgroup41.users[cgroup41.currentUser].wishList[id_neto] = undefined;
            localStorage["cgroup41"] = JSON.stringify(cgroup41);
            alert("Your order has been complete your Id-Order is: " + id_neto + "-" + start);
            
            location.reload();
        }

        

    }
    else {
        alert("You already have that in your upcoming Rents list")
    }





}