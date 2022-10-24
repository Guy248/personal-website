//global+const
const ToDays = 86400000; //this number is the amount of millisecond in 1 day

//this function change the lable for rating
function onChangeRating() {
  var rangevalue = document.getElementById("Range_input").value;
  var lb = document.getElementById("label_range");
  lb.innerHTML = "rating above: " + rangevalue;
}

//this function is wire to event onload on the body
function OnLoadUserPage() {
  renderToSiteData();
  GetFromLSs(); //get data from LS and save in Cgroup.
  RenderUserDetails(); // just say hello to the user name.
  renderINTOselect();
  PutDateToDatePicker();
}

//write to the p of Username
function RenderUserDetails() {
  var current = cgroup41.currentUser;
  var str = cgroup41.users[current].userName;
  var pUserVac = document.getElementById("userVac");

  var fullname_p = document.getElementById("fullName");
  fullname_p.innerHTML = "Hello <b>" + str + "</b>";
  pUserVac.innerHTML =
    "You Have " +
    Object.keys(cgroup41.users[cgroup41.currentUser].wishList).length +
    " wishes";
}

//this function get the data from LS
function GetFromLSs() {
  if (localStorage["cgroup41"] != undefined) {
    cgroup41 = JSON.parse(localStorage["cgroup41"]);
  } else {
    cgroup41 = {
      users: {},
      currentUser: "",
      ApartOcup: {},
    };
  }
}

//this function is write the rooms option dynamic into select element(id=select-input)
function renderINTOselect() {
  var roomsArr = FindHowManyRoom();
  var str = "";
  var select = document.getElementById("select-input");

  for (var i = 0; i < roomsArr.length; i++) {
    str += "<option value='" + roomsArr[i] + "'>" + roomsArr[i] + "</option>";
  }
  select.innerHTML += str;

  // <option value="2">2</option>
}

//good bye $ sign
function separate(s1) {
  var realPrice;
  s1 = s1.replace("$", "");
  s1 = s1.replace(",", "");
  realPrice = parseFloat(s1);

  return realPrice;
}

//max price
function maxPrice() {
  var maximumPrice = separate(Arr[0].price);

  for (let i = 0; i < Arr.length; i++) {
    if (maximumPrice < separate(Arr[i].price)) {
      maximumPrice = separate(Arr[i].price);
    }
  }
  return maximumPrice;
}

// return the min price from DB
function minPrice() {
  var minimumPrice = separate(Arr[0].price);

  for (let i = 0; i < Arr.length; i++) {
    if (minimumPrice > separate(Arr[i].price)) {
      minimumPrice = separate(Arr[i].price);
    }
  }
  return minimumPrice;
}

//this function return the AVG of rating
function averageRating() {
  var average = 0;
  var count = 0;
  for (var i = 0; i < Arr.length; i++) {
    if (Arr[i].review_scores_rating != null) {
      average += parseInt(Arr[i].review_scores_rating);
      count++;
    }
  }
  return Math.round((average * 100) / count) / 100;
}

//this function is write to the h1 dynamic content about the site.
function renderToSiteData() {
  var h123 = document.getElementsByClassName("counters");
  h123[0].innerHTML = Arr.length;
  h123[1].innerHTML = averageRating();
  h123[2].innerHTML = minPrice() + " $";
}

//validation

//this function update the min controller *Validetion*
function updateMinInput(val) {
  if (val < 0) {
    document.getElementById("minPrice").value = 0;
  } else if (val > parseFloat(document.getElementById("maxPrice").value)) {
    alert("min price is larger that max price");
    document.getElementById("minPrice").value = 0;
  } else {
    document.getElementById("minPrice").value = Math.round(val * 100) / 100;
  }
}

//validation

//this function update the max controller *Validetion*
function updateMaxInput(val) {
  if (val < 0) {
    document.getElementById("maxPrice").value = 0;
  } else if (val < parseFloat(document.getElementById("minPrice").value)) {
    alert("min price is larger that max price");
    document.getElementById("maxPrice").value = maxPrice();
  } else {
    document.getElementById("maxPrice").value = Math.round(val * 100) / 100;
  }
}

//validation

//this function return array of the numbers of rooms
function FindHowManyRoom() {
  arrr = [];
  for (var i = 0; i < Arr.length; i++) {
    if (Arr[i].bedrooms != undefined) {
      arrr[i] = Arr[i].bedrooms;
    }
  }

  var uniqueArray = [...new Set(arrr)];
  uniqueArray = uniqueArray.filter((x) => x !== undefined);

  return uniqueArray;
}

//this function is getting Date var and add to him one day and return Date format.
function addDay(date) {
  var result = new Date(date);
  result.setDate(result.getDate() + 1);
  return result;
}

// this function return a sorted array  by parameters
function PriceFilter(valmin, valmax, bedrooms, rating) {
  var filterArr = [];
  if (valmin == null) {
    valmin = minPrice();
  }
  if (valmax == null || valmax == 0) {
    valmax = maxPrice();
  }

  var j = 0;
  for (var i = 0; i < Arr.length; i++) {
    if (rating == 0 && (bedrooms == -1 || bedrooms == 0)) {
      if (
        separate(Arr[i].price) >= valmin &&
        separate(Arr[i].price) <= valmax
      ) {
        filterArr[j++] = Arr[i];
      }
    } else if (bedrooms == -1 || bedrooms == 0) {
      if (
        separate(Arr[i].price) >= valmin &&
        separate(Arr[i].price) <= valmax &&
        Arr[i].review_scores_rating >= rating
      ) {
        filterArr[j++] = Arr[i];
      }
    } else if (rating == 0) {
      if (
        separate(Arr[i].price) >= valmin &&
        separate(Arr[i].price) <= valmax &&
        Arr[i].bedrooms == bedrooms
      ) {
        filterArr[j++] = Arr[i];
      }
    } else if (
      separate(Arr[i].price) >= valmin &&
      separate(Arr[i].price) <= valmax &&
      Arr[i].bedrooms == bedrooms &&
      Arr[i].review_scores_rating >= rating
    ) {
      filterArr[j++] = Arr[i];
    }
  }

  return filterArr;
}

//this function is filtering the apartment by date inputs and return an array
function dateFilter() {
  var min2 = document.getElementById("minPrice").value;
  var max = document.getElementById("maxPrice").value;
  var rooms = document.getElementById("select-input").value;
  var rating = document.getElementById("Range_input").value;
  var startDate = new Date(
    document.getElementById("start-date").value
  ).getTime();
  var endDate = new Date(document.getElementById("end-date").value).getTime();

  var datekeys = document.getElementById("start-date").value;
  if (startDate == "" || endDate == "") {
    var today = new Date();
    startDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    endDate = addDay(startDate);
  }
  var filter = PriceFilter(min2, max, rooms, rating);
  var res = [];

  GetFromLSs();

  var h = 0;

  for (var i = 0; i < filter.length; i++) {
    if (cgroup41.ApartOcup[filter[i].id + "-" + datekeys] != undefined) {
      var startA = new Date(
        cgroup41.ApartOcup[filter[i].id + "-" + datekeys].dateStart
      ).getTime();
      var endA = new Date(
        cgroup41.ApartOcup[filter[i].id + "-" + datekeys].dateEnd
      ).getTime();
      if (DateBigger(startDate, endDate, startA, endA) == true) {
        res[h++] = filter[i];
      }
    } else {
      res[h++] = filter[i];
    }
  }

  return res;
}

//this function check on specific dates if they are okay to perform presntion
function DateBigger(checkIN, checkOUT, Apartaken, ApartRealse) {
  var flag = false;

  if (checkOUT < Apartaken || checkIN >= ApartRealse) {
    flag = true;
  }
  return flag;
}

//this function render the apartments wire to onclick event of search  btn
function RenderApartments() {
  var finalArr = dateFilter();

  var apartStr = "";
  for (var i = 0; i < finalArr.length; i++) {
    apartStr += '<div class="apartBox row">';
    apartStr += '<div class="apartIMG col-md-4 col-xl-3">';
    apartStr +=
      '<img src="' +
      finalArr[i].picture_url +
      '" alt="picture of: ' +
      finalArr[i].name +
      '" /><br /><br /><h3>Price for night: ' +
      finalArr[i].price.replace(".00", "") +
      "</h3></div>";
    apartStr +=
      '<div class="col-md-8 col-xl-9"><h1>' + finalArr[i].name + "</h1>";
    apartStr +=
      "<p>" +
      finalArr[i].description +
      '</p><div class="row"><div class="apartBtn col-4"><button onclick="lref(`' +
      finalArr[i].listing_url +
      '`)">My website</button></div>';
    apartStr +=
      '<div class="apartBtn col-4"> <button id="P' +
      finalArr[i].id +
      '" onclick=" Cal_price_Order(this)" >Rent Now</button></div><div class="apartBtn col-4"><button id="W' +
      finalArr[i].id +
      '" onclick="AddToWishList(this)">Add to Wish List</button> </div> </div></div></div><hr />';
  }

  var ph = document.getElementById("ph-apartments");
  ph.innerHTML =
    "<h1>Found " + finalArr.length + " apartments in Amsterdam</h1>" + apartStr;
  move();
}

//this function is loading the loadBar
function move() {
  var i = 0;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    elem.style.display = "block";
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }

  document.getElementById("ph-apartments").scrollIntoView();
}

//this function just ref to host website
function lref(url) {
  window.open(url, "_blank");
}

//this function add to cgroup41 obj for specific user wish list and saving in LS
function AddToWishList(btn) {
  var id = btn.id.replace("W", "");
  var startDate = new Date(
    document.getElementById("start-date").value
  ).getTime();
  var endDate = new Date(document.getElementById("end-date").value).getTime();
  if (
    document.getElementById("start-date").value == "" ||
    document.getElementById("end-date").value == ""
  ) {
    var today = new Date();
    startDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    endDate =
      addDay(startDate).getFullYear() +
      "-" +
      (addDay(startDate).getMonth() + 1) +
      "-" +
      addDay(startDate).getDate();
    var wish = {
      checkIN: startDate,
      checkOUT: endDate,
      Id: id,
    };
  } else {
    var wish = {
      checkIN: document.getElementById("start-date").value,
      checkOUT: document.getElementById("end-date").value,
      Id: id,
    };
  }

  if (cgroup41.users[cgroup41.currentUser].wishList[id] == undefined) {
    cgroup41.users[cgroup41.currentUser].wishList[id] = wish;
    localStorage["cgroup41"] = JSON.stringify(cgroup41);
    alert("The apartment is added succesfully to your Wish-List");
  } else {
    alert("You already have that in your Wish-List");
  }
}

//this function is open and close the modal payment
function modalPayment() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

//this function close the modal by click on X span
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

//this function also open the modal and write to him dynamic bill and show the id and price of apartment
function Cal_price_Order(btn) {
  modalPayment();
  var startDate = new Date(
    document.getElementById("start-date").value
  ).getTime();
  var endDate = new Date(document.getElementById("end-date").value).getTime();

  if (
    document.getElementById("start-date").value == "" ||
    document.getElementById("end-date").value == ""
  ) {
    var today = new Date();
    startDate = new Date(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ).getTime();
    endDate = addDay(startDate);
  }

  var nights = (endDate - startDate) / ToDays;

  var id = btn.id.replace("P", "");
  for (var i = 0; i < Arr.length; i++) {
    if (Arr[i].id == id) {
      var apartment = Arr[i];
    }
  }

  var h2 = document.getElementById("checkoutH2");
  var mydiv = document.getElementById("CalDiv");
  var mystr =
    '<h4>Cart <span class="price" style="color:black"><i class="fa fa-shopping-cart"></i> <b>' +
    nights +
    " nights</b></span></h4>";
  mystr +=
    ' <p class="Pcal">price for night:<span class="price">' +
    separate(apartment.price) +
    "$</span></p>";
  mystr +=
    '<hr><p class="Pcal">Total <span class="price" style="color:black"><b>' +
    separate(apartment.price) * nights +
    "$</b></span></p>";
  mydiv.innerHTML = mystr;
  h2.innerHTML = "Checkout for apartment ID :" + apartment.id;
}

//this function is wire to cheakout button onclick event, and add to UpcomingRents the Order For current user.
function AddtoUpComingRents() {
  var startDate = document.getElementById("start-date").value;
  var endDate = document.getElementById("end-date").value;
  var apartmenID = document.getElementById("checkoutH2").innerHTML;
  apartmenID = apartmenID.replace("Checkout for apartment ID :", "");

  if (startDate == "" && endDate == "") {
    var today = new Date();
    startDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    endDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      1;
  }

  rent = {
    id: apartmenID,
    dateStart: startDate,
    dateEnd: endDate,
  };
  order = {
    id: apartmenID,
    dateStart: startDate,
    dateEnd: endDate,
    user: cgroup41.currentUser,
  };

  //this one was changed the keys was(apartmenID + cgroup41.currentUser) now the keys is apartmenID+"-"+startDate
  if (cgroup41.ApartOcup[apartmenID + "-" + startDate] == undefined) {
    if (confirm("Are you sure you want to make an order ?") == true) {
      cgroup41.users[cgroup41.currentUser].upcomingRents[
        apartmenID + "-" + startDate
      ] = rent;
      cgroup41.ApartOcup[apartmenID + "-" + startDate] = order;
      localStorage["cgroup41"] = JSON.stringify(cgroup41);
      alert(
        "Your order has been complete your Id-Order is: " +
          apartmenID +
          "-" +
          startDate
      );
      closeModal();
    }
  } else {
    alert("You already have that in your upcoming Rents list");
  }
}

//this function put default value in date inputs.
function PutDateToDatePicker() {
  datepickerStart = document.getElementById("start-date");
  datepickerEnd = document.getElementById("end-date");

  var Today = new Date();
  var end = addDay(Today);

  datepickerStart.value = Today.toISOString().substr(0, 10);
  datepickerEnd.value = end.toISOString().substr(0, 10);

  //if ((Today.getMonth() + 1) >= 10 && Today.getDate()>=10 ) {
  //    datepickerStart.value = Today.getFullYear().toString() + "-" + (Today.getMonth() + 1).toString() + "-" + Today.getDate().toString();
  //    datepickerEnd.value = end.getFullYear().toString() + "-" + (end.getMonth() + 1).toString() + "-" + end.getDate().toString();
  //}
  //else if ((Today.getMonth() + 1) < 10 && Today.getDate() >= 10) {
  //    datepickerStart.value = Today.getFullYear().toString() + "-0" + (Today.getMonth() + 1).toString() + "-" + Today.getDate().toString();
  //    datepickerEnd.value = end.getFullYear().toString() + "-0" + (end.getMonth() + 1).toString() + "-" + end.getDate().toString();
  //}
  //else if (Today.getDate() < 10 && (Today.getMonth() + 1)>=10) {
  //    datepickerStart.value = Today.getFullYear().toString() + "-" + (Today.getMonth() + 1).toString() + "-0" + Today.getDate().toString();
  //    datepickerEnd.value = end.getFullYear().toString() + "-" + (end.getMonth() + 1).toString() + "-0" + end.getDate().toString();
  //}
  //else if ((Today.getMonth() + 1) < 10 && Today.getDate() < 10) {
  //    datepickerStart.value = Today.getFullYear().toString() + "-0" + (Today.getMonth() + 1).toString() + "-0" + Today.getDate().toString();
  //    datepickerEnd.value = end.getFullYear().toString() + "-0" + (end.getMonth() + 1).toString() + "-0" + end.getDate().toString();
  //}
}

//validation
//this function return true if the dates is okay.
//this function is wire to onchange event of 2 date inputs
function onChangeDate() {
  var startDate = new Date(document.getElementById("start-date").value);
  var endDate = new Date(document.getElementById("end-date").value);
  var def = (endDate.getTime() - startDate.getTime()) / ToDays;

  var Today = new Date();

  if (endDate != "" && startDate != "") {
    if (def <= 0) {
      document.getElementById("end-date").value = addDay(startDate)
        .toISOString()
        .substr(0, 10);
    } else if (
      startDate.getTime() <
      Today.getTime() - Today.getHours() * 3600000
    ) {
      alert("Please insert correctly the dates");
      document.getElementById("start-date").value = Today.toISOString().substr(
        0,
        10
      );
      document.getElementById("end-date").value = addDay(Today)
        .toISOString()
        .substr(0, 10);
    }
  }
}
