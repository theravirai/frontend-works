const parentBgEl = document.querySelector(".bg");
const childEls = document.querySelectorAll(".container .text span");
const textEl = document.querySelector(".text");
const lineEl = document.querySelector("#line");


childEls.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      const id = el.getAttribute("data-id");
      const bgEl = parentBgEl.querySelector(`.id-${id}`);
  
      parentBgEl.querySelectorAll("img").forEach((img) => {
        img.style.display = "none";
        img.style.animation = "";
      });
      bgEl.style.display = "block";
      bgEl.style.animation = "anima 1s ease forwards";
    });
  });