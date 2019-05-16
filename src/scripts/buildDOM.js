import APIManager from "./dbCalls";
const domBuild = {
  interestsToDom() {
    //fetch all interests then parse
    APIManager.getAllInterests().then(allInterests => {
      //create document fragment
      let interestsDocFragment = document.createDocumentFragment();
      //iterate over the array
      allInterests.forEach(interestObj => {
        console.log("obj", interestObj);
        //create variable to store return from interestBuilder function
        let interestsHTML = domBuild.interestsBuilder(interestObj);
        interestsDocFragment.appendChild(interestsHTML);
        let interestsOutputArticle = document.querySelector(
          "#interests__output"
        );
        interestsOutputArticle.appendChild(interestsDocFragment);
      });
    });
  },

  interestsBuilder(interestsObj) {
    let interestsContainer = document.createElement("div");
    let interestsNames = document.createElement("h2");
    let interestsDescription = document.createElement("p");
    let interestsLocation = document.createElement("h4");
    let interestsCost = document.createElement("p");
    let interestsEditButton = document.createElement("button");
    let interestsNameInput = document.getElementById("interests__name");
    let interestsCostInput = document.getElementById("interests__cost");
    let interestsLocationInput = document.getElementById("interests__location");
    let interestsDescriptionInput = document.getElementById(
      "interests__description"
    );
    let outpuIinterestsArticle = document.querySelector("#interests__output");
    console.log("interests object", interestsObj);
    //set attributes
    interestsContainer.setAttribute("id", `interests__${interestsObj.id}`);
    interestsEditButton.setAttribute(
      "id",
      `interests__button__${interestsObj.id}`
    );
    //updating DOM element content
    interestsNames.textContent = interestsObj.name;
    interestsDescription.textContent = interestsObj.description;
    interestsLocation.textContent = interestsObj.location;
    interestsCost.textContent = interestsObj.cost;
    interestsEditButton.textContent = "update interests";

    //update interests functionality on click
    interestsEditButton.addEventListener("click", function() {
      console.log(interestsObj.id);

      //variables to store input field content
      interestsNameInput = document.getElementById("interests__name");
      interestsDescriptionInput = document.getElementById(
        "interests__description"
      );
      interestsLocationInput = document.getElementById("interests__location");
      interestsCostInput = document.getElementById("interests__cost");

      //variables to store object content
      let selectedInterestsName = interestsObj.name;
      let selectedInterestsDescription = interestsObj.description;
      let selectedInterestsLocation = interestsObj.location;
      let selectedInterestsCost = interestsObj.cost;
      // let interestsId = interestsObj.id;

      //set input field content equal to object content
      interestsNameInput.value = selectedInterestsName;
      interestsDescriptionInput.value = selectedInterestsDescription;
      interestsLocationInput.value = selectedInterestsLocation;
      interestsCostInput.value = selectedInterestsCost;

      //toggle create interests button
      let createInterestsButton = document.getElementById("submit__interests");
      let replaceUpdateButton = document.createElement("button");
      replaceUpdateButton.setAttribute("id", "submit_updated_interests");
      replaceUpdateButton.textContent = "Submit Updated POI";
      createInterestsButton.replaceWith(replaceUpdateButton);
      replaceUpdateButton.addEventListener("click", function() {
        APIManager.updateInterestsOnClick(interestsObj.id).then(domBuild.updateDOM());
        replaceUpdateButton.replaceWith(createInterestsButton);
      });
    });

    //append to DOM
    interestsContainer.appendChild(interestsNames);
    interestsContainer.appendChild(interestsDescription);
    interestsContainer.appendChild(interestsLocation);
    interestsContainer.appendChild(interestsCost);
    interestsContainer.appendChild(interestsEditButton);
    outpuIinterestsArticle.appendChild(interestsContainer);

    //return DOM element
    return interestsContainer;
  },
  updateDOM() {
    let interestsNameInput = document.getElementById("interests__name");
    let interestsCostInput = document.getElementById("interests__cost");
    let interestsLocationInput = document.getElementById("interests__location");
    let interestsDescriptionInput = document.getElementById("interests__description");
    let outpuIinterestsArticle = document.querySelector("#interests__output");
    outpuIinterestsArticle.innerHTML = "";
    interestsNameInput.value = "";
    interestsDescriptionInput.value = "";
    interestsLocationInput.value = "";
    interestsCostInput.value = "";
    domBuild.interestsToDom();
  }
};

export default domBuild;
