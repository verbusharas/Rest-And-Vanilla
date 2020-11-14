const preventRefresh = (event) => {
  event.preventDefault();
};

const disableElement = (element) => {
  if (!element.classList.contains("disable")) {
    element.classList.add("disable");
  }
};

const enableElement = (element) => {
  if (element.classList.contains("disable")) {
    element.classList.remove("disable");
  }
};

const toggleLoader = () => {
  if (document.querySelector(".loader").classList.contains("hidden")) {
    document.querySelector(".loader").classList.remove("hidden");
  } else {
    document.querySelector(".loader").classList.add("hidden");
  }
};

const getInputs = () => {
  return document.querySelectorAll("input");
};

const clearErrorLabels = () => {
  const errorLabel = document.querySelector(".error-text");
  errorLabel.classList.add("not-displayed");
};

const clearInputs = () => {
  const inputs = getInputs();
  inputs.forEach((input) => {
    input.value = "";
  });
};

const validateFields = () => {
  const inputData = getInputs();
  let isValid = true;

  inputData.forEach((input) => {
    if (input.value === "") {
      isValid = false;
    }
  });
  return isValid ? inputData : isValid;
};

const toggleLike = (user) => {
  let data = JSON.parse(sessionStorage.getItem("likes"));
  if (data.likes.includes(user.id)) {
    const index = data.likes.indexOf(user.id);
    data.likes.splice(index, index + 1);
  } else {
    data.likes.push(user.id);
  }
  sessionStorage.setItem("likes", JSON.stringify(data));
};

const isLiked = (user) => {
  let data = JSON.parse(sessionStorage.getItem("likes"));
  return data.likes.includes(user.id);
};

export {
  preventRefresh,
  disableElement,
  enableElement,
  toggleLoader,
  getInputs,
  clearErrorLabels,
  clearInputs,
  validateFields,
  toggleLike,
  isLiked,
};
