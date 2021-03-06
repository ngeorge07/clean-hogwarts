"use strict";

fetch("./students.json")
  .then((response) => response.json())
  .then(fetchData);

const Student = {
  first_name: "",
  nick_name: "",
  middle_name: "",
  last_name: "",
  image: "",
  gender: "",
  house: "",
};

const newData = [];

function fetchData(students) {
  let lastName;
  let middleName;
  let nickName;

  students.forEach((s) => {
    const newStudent = Object.create(Student);

    let lowerName = s.fullname.toLowerCase().trim();
    let house = s.house.toLowerCase().trim();
    let newFullName = "";
    let nextChar = false;

    for (let i = 0; i < lowerName.length; i++) {
      let char = lowerName[i];
      if (nextChar) {
        char = char.toUpperCase();
      }

      nextChar = char === "-" || char === " " || char === '"';
      newFullName += char;
    }

    const nameArr = newFullName.split(" ");

    const firstName =
      nameArr[0].substring(0, 1).toUpperCase() +
      nameArr[0].substring(1, nameArr[0].length);

    if (nameArr.length > 1) {
      lastName =
        nameArr[nameArr.length - 1].substring(0, 1).toUpperCase() +
        nameArr[nameArr.length - 1].substring(
          1,
          nameArr[nameArr.length - 1].length
        );
    } else {
      lastName = null;
    }

    let smallMiddleName = newFullName.substring(
      firstName.lastIndexOf(""),
      newFullName.lastIndexOf(" ")
    );

    if (nameArr.length > 2) {
      if (smallMiddleName.indexOf('"') === 1) {
        nickName = smallMiddleName.substring(
          smallMiddleName.indexOf('"') + 1,
          smallMiddleName.lastIndexOf('"')
        );

        if (smallMiddleName.split(" ").length > 2) {
          middleName = smallMiddleName.substring(
            smallMiddleName.lastIndexOf('"') + 2,
            smallMiddleName.lastIndexOf("")
          );
        } else middleName = null;
      } else if (
        smallMiddleName.lastIndexOf('"') ===
        smallMiddleName.length - 1
      ) {
        nickName = smallMiddleName.substring(
          smallMiddleName.indexOf('"') + 1,
          smallMiddleName.lastIndexOf('"')
        );

        if (smallMiddleName.split(" ").length > 2) {
          middleName = smallMiddleName.substring(
            smallMiddleName.indexOf("") + 1,
            smallMiddleName.indexOf('"') - 1
          );
        } else middleName = null;
      } else if (smallMiddleName.includes('"')) {
        nickName = smallMiddleName.substring(
          smallMiddleName.indexOf('"') + 1,
          smallMiddleName.lastIndexOf('"')
        );

        middleName =
          smallMiddleName.substring(
            smallMiddleName.indexOf(0) + 2,
            smallMiddleName.indexOf('"') - 1
          ) +
          smallMiddleName.substring(
            smallMiddleName.lastIndexOf('"') + 1,
            smallMiddleName.lastIndexOf("")
          );
      } else {
        middleName = smallMiddleName.substring(
          smallMiddleName.indexOf(0) + 2,
          smallMiddleName.lastIndexOf("")
        );
        nickName = null;
      }
    } else {
      middleName = null;

      nickName = null;
    }

    house = house.charAt(0).toUpperCase() + house.slice(1);

    function getImage(firstName, lastName) {
      return `images/${lastName
        .substring(lastName.lastIndexOf(""), lastName.indexOf("-") + 1)
        .toLowerCase()}_${firstName.substring(0, 1).toLowerCase()}.png`;
    }

    newStudent.first_name = firstName;
    newStudent.nick_name = nickName;
    newStudent.middle_name = middleName;
    newStudent.last_name = lastName;
    newStudent.gender = s.gender;
    newStudent.house = house;
    if (lastName) {
      newStudent.image = getImage(firstName, lastName);
    } else newStudent.image = null;

    newData.push(newStudent);

    // console.log(nickName);
  });

  // console.log(students);
}

console.log(newData);
