//IMPORTS
import * as rest from "/script/rest.js";
import * as tools from "/script/tools.js";
import * as employee from "/script/employee-template.js";

const renderUserProfile = (user) => {
  const firstName = user.employee_name.split(" ")[0];
  const lastName = user.employee_name.split(" ")[1];
  const age = user.employee_age;
  const salary = user.employee_salary ? user.employee_salary : 0;

  let doc = document.open("employee.html", "_self");
  doc.write(employee.html);

  let pFirstName = doc.createElement("p");
  pFirstName.innerHTML = `Vardas: <strong>${firstName}</strong>`;

  let pLastName = doc.createElement("p");
  pLastName.innerHTML = `Pavardė: <strong>${lastName}</strong>`;

  let pAge = doc.createElement("p");
  pAge.innerHTML = `Amžius: <strong>${age}</strong>`;

  let pSalary = doc.createElement("p");
  pSalary.innerHTML = `Atlyginimas: <strong>${salary} €</strong>`;

  let returnButton = doc.createElement("a");
  returnButton.setAttribute("href", "index.html");
  returnButton.innerHTML = "← atgal į sąrašą";

  let infoPanel = doc.querySelector(".employee-info");
  infoPanel.appendChild(pFirstName);
  infoPanel.appendChild(pLastName);
  infoPanel.appendChild(pAge);
  infoPanel.appendChild(pSalary);
  infoPanel.appendChild(returnButton);
};

const renderUserRows = (users) => {
  users.forEach((user) => {
    renderUserRow(user);
  });
};

const renderUserRow = (user) => {
  let tdFirstName = document.createElement("td");
  tdFirstName.innerHTML = user.employee_name.split(" ")[0];

  let tdLastName = document.createElement("td");
  tdLastName.innerHTML = user.employee_name.split(" ")[1];

  let tdAge = document.createElement("td");
  tdAge.innerHTML = user.employee_age;

  let tdEdit = document.createElement("td");
  tdEdit.classList.add("manipulate");
  tdEdit.innerHTML = "✎";
  tdEdit.setAttribute("id", user.id);
  tdEdit.addEventListener("click", (e) => {
    tools.clearErrorLabels();
    renderEditableUserRow(user);
    tools.disableElement(e.target);
  });

  let tdDelete = document.createElement("td");
  tdDelete.classList.add("manipulate");
  tdDelete.innerHTML = "✖";
  tdDelete.addEventListener("click", (e) => {
    tools.clearErrorLabels();
    rest.deleteUser(user.id);
  });

  let tdLike = document.createElement("td");
  tdLike.classList.add("manipulate");
  tdLike.innerHTML = "❤";
  renderLikeStatus(user, tdLike);
  tdLike.addEventListener("click", () => {
    tools.clearErrorLabels();
    tools.toggleLike(user);
    renderLikeStatus(user, tdLike);
  });

  let tableBody = document.querySelector("table").tBodies[0];
  let newRow = tableBody.insertRow(1);
  newRow.appendChild(tdLike);
  newRow.appendChild(tdFirstName);
  newRow.appendChild(tdLastName);
  newRow.appendChild(tdAge);
  newRow.appendChild(tdEdit);
  newRow.appendChild(tdDelete);
  newRow.childNodes.forEach((node) => {
    if (!node.classList.contains("manipulate")) {
      node.addEventListener("click", () => {
        tools.clearErrorLabels();
        renderUserProfile(user);
      });
    }
  });
};

const renderLikeStatus = (user, node) => {
  tools.isLiked(user)
  ? node.classList.add("switched-on")
  : node.classList.remove("switched-on");
}

const renderEditableUserRow = (user) => {
  const rowIndex = document.getElementById(user.id).parentNode.rowIndex;
  const table = document.querySelector("table");
  const tableBody = table.tBodies[0];
  const currentRow = table.rows[rowIndex];
  currentRow.classList.add("not-displayed");

  // Like icon place holder
  let likeIconCell = document.createElement("td");
  likeIconCell.innerHTML = "❤";
  likeIconCell.style.width = "0px";
  likeIconCell.style.color = "white";
  likeIconCell.style.backgroundColor = "rgb(245, 245, 245)";

  // First name editor
  let firstNameEditCell = document.createElement("td");
  let firstNameInput = document.createElement("input");

  firstNameEditCell.setAttribute("class", "editable-cell");
  firstNameInput.setAttribute("class", "input");
  firstNameInput.setAttribute("type", "text");
  firstNameInput.setAttribute("value", user.employee_name.split(" ")[0]);

  firstNameEditCell.appendChild(firstNameInput);

  // Last name editor
  let lastNameEditCell = document.createElement("td");
  let lastNameInput = document.createElement("input");

  lastNameEditCell.setAttribute("class", "editable-cell");
  lastNameInput.setAttribute("class", "input");
  lastNameInput.setAttribute("type", "text");
  lastNameInput.setAttribute("value", user.employee_name.split(" ")[1]);

  lastNameEditCell.appendChild(lastNameInput);

  // Age editor and confirm button
  let ageEditCell = document.createElement("td");
  let ageInput = document.createElement("input");

  ageEditCell.setAttribute("class", "editable-cell");
  ageInput.setAttribute("class", "input");
  ageInput.setAttribute("type", "number");
  ageInput.setAttribute("value", user.employee_age);
  ageEditCell.appendChild(ageInput);

  let confirmCell = document.createElement("td");
  confirmCell.classList.add("manipulate");
  confirmCell.innerHTML = "✔";

  confirmCell.addEventListener("click", (e) => {
    user.employee_name = firstNameInput.value + " " + lastNameInput.value;
    user.employee_age = ageInput.value;
    rest.updateUser(user);
  });

  let newRow = tableBody.insertRow(rowIndex + 1);
  newRow.appendChild(likeIconCell);
  newRow.appendChild(firstNameEditCell);
  newRow.appendChild(lastNameEditCell);
  newRow.appendChild(ageEditCell);
  newRow.appendChild(confirmCell);
};

const renderUpdatedUserRow = (user) => {
  const editButton = document.getElementById(user.id);
  editButton.parentNode.childNodes[1].innerText = user.employee_name.split(
    " "
  )[0];
  editButton.parentNode.childNodes[2].innerText = user.employee_name.split(
    " "
  )[1];
  editButton.parentNode.childNodes[3].innerText = user.employee_age;
  tools.enableElement(editButton);
  const rowIndex = editButton.parentNode.rowIndex;
  const table = document.querySelector("table");
  const currentRow = table.rows[rowIndex];
  table.deleteRow(rowIndex + 1);
  currentRow.classList.remove("not-displayed");
};

const removeUserFromTable = (id) => {
  const rowIndex = document.getElementById(id).parentNode.rowIndex;
  document.querySelector("table").deleteRow(rowIndex);
};

const renderError = (message) => {
  let pImportantError = document.querySelector("#important-message");
  pImportantError.classList.remove("not-displayed");
  pImportantError.innerHTML = message;
}

export {
  renderUserRows,
  renderUserRow,
  removeUserFromTable,
  renderEditableUserRow,
  renderUpdatedUserRow,
  renderError
};
