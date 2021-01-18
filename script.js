//  Selectors

const navigation = document.getElementById("navigation");
// console.log(navigation);

//  Event Listener and Functions

window.addEventListener("scroll", () => {
  // console.log(document.body.scrollTop);
  // console.log(document.documentElement.scrollTop);
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    navigation.style.background = "rgba(20, 20, 20, 1)";
  } else {
    navigation.style.background = "rgba(20, 20, 20, 0.1)";
  }
});

// Functions
