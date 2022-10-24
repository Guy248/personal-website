//global
var countGlobal = 0;


//this function wire to the body element in myRents Page.
function OnLoadMyRents() {
    GetFromLSs();
    RenderMyRents()
    RenderUserDetails3();
}

//this function is delete order from the local storage then reload the page
function CancelOrder(btn) {

    var RealId = btn.id
    if (confirm("Are you sure you want to CANCEL the order ?")) {
        cgroup41.users[cgroup41.currentUser].upcomingRents[RealId] = undefined;
        cgroup41.ApartOcup[RealId] = undefined;

        localStorage['cgroup41'] = JSON.stringify(cgroup41);
        location.reload();
    }
  



}

//this function is render the Rents of the cuurent user
function RenderMyRents() {
    var ph = document.getElementById("myrents-ph");
    var renderSTR = '<div class="cardRow row">';
    
   
    var today = new Date();

    for (k in cgroup41.users[cgroup41.currentUser].upcomingRents) {
        var dateApart = new Date(cgroup41.users[cgroup41.currentUser].upcomingRents[k].dateStart);
        if (dateApart.getTime() > today.getTime()) {
            for (var j = 0; j < Arr.length; j++) {
                if (cgroup41.users[cgroup41.currentUser].upcomingRents[k].id == Arr[j].id) {
                    renderSTR += '<div class="col-lg-3 col-6">';
                    renderSTR += '<div class="card">';
                    renderSTR += '<img src="' + Arr[j].picture_url + '" alt="apaerment pic">';
                    renderSTR += '<h1>id: ' + Arr[j].id + '</h1>';
                    renderSTR += '<p class="price">price for night: ' + Arr[j].price + '</p><p class="price">rating: ' + Arr[j].review_scores_rating + '</p><p class="price">bedrooms: ' + Arr[j].bedrooms + '</p>';
                    renderSTR += '<p class="price">Check-In: ' + cgroup41.users[cgroup41.currentUser].upcomingRents[k].dateStart + '</p>'
                    renderSTR += '<p class="price">Check-Out: ' + cgroup41.users[cgroup41.currentUser].upcomingRents[k].dateEnd + '</p>'
                    renderSTR += '<p class="price">Apartment type: ' + Arr[j].property_type + '</p>';
                    renderSTR += '<p><button onclick="CancelOrder(this)" id="' + Arr[j].id + '-' + cgroup41.users[cgroup41.currentUser].upcomingRents[k].dateStart + '">Cancel reservation</button></p>';
                    renderSTR += '</div></div>';
                    countGlobal++;

                }

            }

        }
      

    }
    renderSTR += '</div>';
    ph.innerHTML = renderSTR;


    //<div class="col-lg-3 col-6">

    //    <div class="card">
    //        <img src="https://a0.muscache.com/pictures/10272854/8dcca016_original.jpg" alt="Denim Jeans" style="width:100%">
    //            <h1>id: 53023</h1>
    //            <p class="price">price for night: $140</p>
    //            <p class="price">rating: 4.7</p>
    //            <p class="price">bedrooms: 3</p>
    //            <p class="price">checkIn: 2022-05-05</p>
    //            <p class="price">checkOut: 2022-05-05</p>
    //            <p class="price">St.dunkenShoot 14 enter A</p>
    //            <p><button onclick="">Cancel</button></p>
    //            </div>

    //    </div>




}

//this function just render the user detalis to the header.
function RenderUserDetails3() {
    var current = cgroup41.currentUser;
    var str2 = cgroup41.users[current].userName
    var pUserVac = document.getElementById("userVac3");


    var fullname_p = document.getElementById("fullName3");
    fullname_p.innerHTML = "Hello <b>" + str2 + "</b>";
    pUserVac.innerHTML = "You Have " + countGlobal + " Vacations";

}