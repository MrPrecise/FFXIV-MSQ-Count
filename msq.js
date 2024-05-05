// ==UserScript==
// @name         MSQ
// @namespace    http://tampermonkey.net/
// @version      4
// @description  Script to index all the quest in FFXIV
// @author       You
// @match        https://ffxiv.consolegameswiki.com/wiki/Main_Scenario_Quests
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/MrPrecise/FFXIV-MSQ-Count/main/msq.js
// @updateURL    https://raw.githubusercontent.com/MrPrecise/FFXIV-MSQ-Count/main/msq.js
// ==/UserScript==

(function () {
  "use strict";
  var questMap = {};
  var GradaniaQuestMap = {};
  var LimasQuestMap = {};
  var UlDahQuestMap = {};

  var MSQTables = document.getElementsByClassName("pve");
  var counter = 0;
  var closeToHome = 0;

  IndexQuestline();

  function StarterQuestline(questName) {
    if (questName === "Close to Home") {
      closeToHome += 1;
      switch (closeToHome) {
        case 1:
          counter = 1;
          GradaniaQuestMap[counter] = "Close to Home Gradania";
          break;
        case 2:
          counter = 1;
          LimasQuestMap[counter] = "Close to Home Limsa Lominsa";
          break;
        case 3:
          counter = 1;
          UlDahQuestMap[counter] = "Close to Home Ul'dah";
          break;
      }
    } else {
      switch (closeToHome) {
        case 1:
          GradaniaQuestMap[counter] = questName;
          break;
        case 2:
          LimasQuestMap[counter] = questName;
          break;
        case 3:
          UlDahQuestMap[counter] = questName;
          break;
      }
    }
  }

  function IndexQuestline() {
    for (let i = 0; i < MSQTables.length; i++) {
      let QuestTable = Array.prototype.slice.call(
        MSQTables[i].getElementsByTagName("tr")
      );
      QuestTable.shift();
      for (let j = 0; j < QuestTable.length; j++) {
        counter = counter + 1;
        var questName = QuestTable[j].getElementsByTagName("td")[0].innerText;
        if (i == 0 || i == 1 || i == 2) {
          StarterQuestline(questName);
        } else if (questName == "It's Probably Pirates") {
          counter = 1;
          questMap[counter] = questName;
        } else {
          questMap[counter] = questName;
        }
      }
    }
  }

  console.log(GradaniaQuestMap);
  console.log(LimasQuestMap);
  console.log(UlDahQuestMap);
  console.log(questMap);

  var radioContainer = document.createElement("div");
  radioContainer.id = "StarterOptions";
  radioContainer.style.display = "flex";
  radioContainer.style.flexDirection = "column";
  radioContainer.style.alignItems = "flex-start";

  var options = [
    "Starter Gradania",
    "Starter Limasa",
    "Starter Ul'Dah",
    "After Intro",
  ];

  options.forEach(function (option) {
    var label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.marginBottom = "10px";

    var radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "radioGroup";
    radioButton.value = option;
    radioButton.style.marginRight = "20px";

    label.appendChild(radioButton);
    label.appendChild(document.createTextNode(option));
    radioContainer.appendChild(label);
  });

  var target = document.querySelector("#siteNotice");
  target.appendChild(radioContainer);

  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
        #StarterOptions {
            padding: 20px;
            background-color: #f4f4f4;
            border: 1px solid #ccc;
            margin: 20px 20px;

        }
    `;
  document.head.appendChild(style);
})();
