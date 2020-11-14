//IMPORTS

import * as rest from "/ca/js/Js10/script/rest.js";
import * as tools from "/ca/js/Js10/script/tools.js";
import * as renderer from "/ca/js/Js10/script/renderer.js";

//LISTENERS
tools.getInputs().forEach((field) => {
  field.addEventListener("change", () => {
    tools.clearErrorLabels();
  });
});

document.querySelector("form").addEventListener("submit", tools.preventRefresh);

document.querySelector("#bt-prideti").addEventListener("click", () => {
  const userData = tools.validateFields();
  if (userData) {
    rest.registerUser(userData);
  } else {renderer.renderError("Būtina užpildyti visus laukelius!")}
});

//INITIALIZE LIKE STORAGE
if (!sessionStorage["likes"]) {
  let data = {
    likes: [],
  };
  sessionStorage.setItem("likes", JSON.stringify(data));
}

//INITIAL API CALL
rest.loadUsers();
