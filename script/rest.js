// IMPORTS
import * as renderer from "/script/renderer.js";
import * as tools from "/script/tools.js";

// PARAMETERS
const urlApiGet = "http://dummy.restapiexample.com/api/v1/employees";
const urlApiPost = "http://dummy.restapiexample.com/api/v1/create";
const urlApiDelete = "http://dummy.restapiexample.com/api/v1/delete/";
const urlApiPut = "http://dummy.restapiexample.com/api/v1/update/";

  // LOAD USERS
const loadUsers = () => {
  tools.toggleLoader();
  axios
    .get(urlApiGet)
    .then((response) => {
      if (response.status === 200) {
        let users = response.data.data;
        renderer.renderUserRows(users);
      }
    })
    .catch((error) => {
      console.log(error);
      renderer.renderError("Įvyko serverio klaida. Pabandykite dar kartą.");
    })
    .then(() => {
      tools.toggleLoader();
    });
  }

// REGISTER NEW USER
const registerUser = (userData) => {
  const newUser = {
    id: 0,
    employee_name: userData[0].value + " " + userData[1].value,
    employee_age: userData[2].value,
  };
  tools.toggleLoader();
  axios
    .post(urlApiPost, JSON.stringify(newUser))
    .then((response) => {
      Object.assign(newUser, { id: response.data.data.id });
      renderer.renderError("Registracija sėkminga! Vartotojo ID: " + newUser.id);
      renderer.renderUserRow(newUser);
      tools.clearInputs();
    })
    .catch((error) => {
      renderer.renderError("Įvyko serverio klaida, bandykite dar kartą.");
      console.log(error);
    })
    .then(() => {
      tools.toggleLoader();
    });
};

// DELETE USER
const deleteUser = (id) => {
  tools.toggleLoader();
  axios
    .delete(urlApiDelete + id)
    .then((response) => {
      if (response.status === 200) {
        renderer.renderError("Vartotojas sėkmingai ištrintas.");
        renderer.removeUserFromTable(id);
      }
    })
    .catch((error) => {
      renderer.renderError("Įvyko serverio klaida. Pabandykite dar kartą.");
      console.log(error);
    })
    .then(() => {
      tools.toggleLoader();
    });
};

// UPDATE USER
const updateUser = (user) => {
  tools.toggleLoader();
  axios
    .put(urlApiPut + user.id)
    .then((response) => {
      if (response.status === 200) {
        renderer.renderError("Vartotojas sėkmingai atnaujintas.");
        renderer.renderUpdatedUserRow(user);
      }
    })
    .catch((error) => {
      console.log(error);
      renderer.renderError("Įvyko serverio klaida. Pabandykite dar kartą.");
    })
    .then(() => {
      tools.toggleLoader();
    });
};


// EXPORTS
export { loadUsers, registerUser, deleteUser, updateUser };
