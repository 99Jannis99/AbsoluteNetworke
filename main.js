$(document).ready(function () {
  // Toggle menu on burger click
  $("#burger").on("click", function () {
    $("#nav-links").toggleClass("active");
    $(this).toggleClass("toggle");
  });

  // Toggle dropdown on button click
  $(".contact button").on("click", function () {
    $("#dropdown").toggleClass("show");
  });

  // Observer for scrolling
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const id = entry.target.getAttribute("id");
        const navLink = $(`.nav-links li a[href="#${id}"]`);
        if (entry.isIntersecting) {
          navLink.addClass("active");
        } else {
          navLink.removeClass("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Apply observer on each section
  $("section").each(function () {
    observer.observe(this);
  });

  // Draggable functionality for phones
  $(".phone").each(function () {
    var $this = $(this);
    var initialPosition = $this.offset();
    $this.data("initialPosition", initialPosition);
  });
  $(".phone").draggable({
    start: function () {},
    stop: function () {
      var $this = $(this);
      var initialPosition = $this.data("initialPosition");
      $this.css(initialPosition);
    },
  });

  // Function to check if color is light or dark
  function isLight(color) {
    var r, g, b, hsp;
    if (color.match(/^rgb/)) {
      color = color.match(/\d+/g);
      r = color[0];
      g = color[1];
      b = color[2];
    } else {
      color = +(
        "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
      );
      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp > 155; // returns true if light, false if dark
  }

  // Check the background color and apply invert filter if it's light
  var bgColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();
  if (isLight(bgColor)) {
    document.querySelector(".logo").style.filter = "invert(.9)";
  }

  // Handle clicks on different points, changing the root CSS variables
  ["home", "punkt2", "punkt3", "punkt4", "punkt5"].forEach((id) => {
    $("#" + id).click(function () {
      const colors = {
        home: [
          "#111111",
          "#1F1F1F",
          "#F6F6F6",
          "#0BE394",
          "#00F959",
          "#0BE394",
          "255",
        ],
        punkt2: [
          "#111111",
          "#2F2F2F",
          "#F6F6F6",
          "#FFCB74",
          "#FFCB74",
          "#e6d7af",
          "255",
        ],
        punkt3: [
          "#b1fbe0",
          "#fffdfd",
          "#1b2718",
          "#1b2718",
          "#0BE394",
          "#00F959",
          "0",
        ],
        punkt4: [
          "#a6b8ed",
          "#dff1fe",
          "#1F1F1F",
          "#6e69c3",
          "#a6b8ed",
          "#6e69c3",
          "0",
        ],
        punkt5: [
          "#f3584f",
          "#000201",
          "#f7f1ec",
          "#e6d7af",
          "#e6d7af",
          "#f7f1ec",
          "255",
        ],
      };
      // Map each color scheme to the respective CSS variables
      $(":root").css({
        "--background": colors[id][0],
        "--color-dark": colors[id][1],
        "--color-bright": colors[id][2],
        "--color-primary": colors[id][3],
        "--color-secondary": colors[id][4],
        "--color-tetiary": colors[id][5],
        "--rgba3": colors[id][6],
      });
      if (isLight(colors[id][0])) {
        document.querySelector(".logo").style.filter = "invert(.9)";
      } else {
        document.querySelector(".logo").style.filter = "invert(0)";
      }
    });
  });
});
