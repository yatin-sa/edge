export default function decorate(block) {
    // [...block.children].forEach((row) => {
    //   if (row.querySelector("picture")) {
    //     row.className = "profile-images";
    //   }
    //   row.className = "profile-details";
    // });
  
    
    function getCookie() {
      let name = "access_token" + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    // console.log(getCookie());
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getCookie()}`);
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(
      "https://captivateprime.adobe.com/primeapi/v2/learningObjects?page[limit]=10&filter.loTypes=course&sort=name&filter.ignoreEnhancedLP=true",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        const parentEl = document.querySelector(".my-course1");
        parentEl.insertAdjacentHTML("afterend", `<div class="numList"></div>`);
        console.log('ssssss')
        renderMarkup(result.data, true);
        // pagination();
      })
      .catch((error) => console.log("error", error));
  }
  const renderMarkup = function (result, value) {
    const parentEl = document.querySelector(".my-course1");
  
    const markup = generateMarkuploop();
    parentEl.innerHTML = ""; 
    var navctr = '<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>';
    var newcont = '<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel"><div class="carousel-inner">'+markup+'</div>'+navctr+'</div>';
    parentEl.insertAdjacentHTML("afterbegin", newcont);
    var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    $('.carousel').carousel({
      interval: 2000
    });
    function generateMarkuploop() {
      const Mark = result.map((res,i) => generateMarkup(res,i)).join("");
      return Mark;
    }
    function generateMarkup(result,i) {
        console.log('in function aaa',result,i)
      return `<div class="carousel-item ${(i==0) ? "active":""}"> <div class="block-post-products p-4 dis" id="${result.attributes.localizedMetadata[0].overview}">
  <img class="products-img" src="${result.attributes.imageUrl}" alt="" />
  <div class="img-txt-products"><span>${result.attributes.localizedMetadata[0].name} juhhuuhhh</span></div>
  </div></div>`;
    }
    return markup;
  };
  function pagination() {
    const pagEl = document.querySelector(".numList");
    const courseList = document.querySelectorAll(".block-post-products");
    let num1 = courseList.length;
    let onepage = Math.ceil(num1 / 3);
    console.log(onepage);
    pagEl.innerHTML = "";
    for (let i = onepage; i > 0; i--) {
      pagEl.insertAdjacentHTML("afterbegin", `<span class="pageNum">${i}</span>`);
    }
    const pagBtn = document.querySelectorAll(".pageNum");
    for (let j = 0; j < 3; j++) {
      courseList[j].classList.remove("dis");
    }
    pagBtn.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        let currentval = Number(btn.textContent);
        for (let i = 0; i < courseList.length; i++) {
          courseList[i].classList.add("dis");
        }
        for (
          let j = 0 + (currentval - 1) * 3;
          j < 3 * (currentval - 1 + 1);
          j++
        ) {
          courseList[j].classList.remove("dis");
        }
      });
    });
  }
 