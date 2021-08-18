const readline = require('readline');
const fs = require('fs');
 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
const PATH = '/Users/gu/refactoring-app/src';
const fileCount = 256;

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const idealData = [];
  input.forEach((line) => {
    const capitalize = `${line.charAt(0).toUpperCase()}${line.slice(1)}`;
    const IMG_PATH = `img/ideal/ideal${capitalize}`;

    const temp = {
      subject: `ideal${capitalize}`,
      info: []
    };
    const subject = temp.subject;

    for (let i = 0; i < fileCount; i++) {
      let mockData = {};

      mockData.group = `${Math.floor(i/10)}`;
      mockData.name = `${i}`;
      mockData.url = `${IMG_PATH}/${i}_${subject}_${mockData.group}_${mockData.name}.jpg`;
      mockData.firstTotal = {
        first: 0,
        enter: 0,
        firstRate: 0
      };
      mockData.winTotal = {
        win: 0,
        lose: 0,
        winRate: 0
      };

      temp.info.push(mockData);
    }

    idealData.push(temp);
  })
  const jsonData = JSON.stringify(idealData, null, "\t");
  fs.writeFileSync(`${PATH}/shared/mockJson.json`, jsonData);
  process.exit();
});

// rl.on('line', (line) => {
//   const input = line;
//   const capitalize = `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
//   const IMG_PATH = `img/ideal/ideal${capitalize}`;
//   // const randomNums = setMatches(fileCount);
//   const temp = {
//     subject: `ideal${capitalize}`,
//     idealData: []
//   }

//   for (let i = 0; i < fileCount; i++) {
//     let data = {};

//     data.index = i;
//     data.group = `${Math.floor(i/10)}`;
//     data.name = `${i}`;
//     data.url = `${IMG_PATH}/${data.index}_${data.subject}_${data.group}_${data.name}.jpg`;
//     data.firstTotal = {
//       first: 0,
//       enter: 0,
//       firstRate: 0
//     };
//     data.winTotal = {
//       win: 0,
//       lose: 0,
//       winRate: 0
//     };

//     temp.idealData.push(data);
//   }

//   const jsonData = JSON.stringify(temp, null, "\t");
//   fs.writeFileSync(`${PATH}/shared/test${capitalize}Json.json`, jsonData);
//   rl.close();
// }).on("close", () => {
//   process.exit();
// });