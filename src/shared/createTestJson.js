const readline = require('readline');
const fs = require('fs');
 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PATH = '/Users/gu/refactoring-app/src';
const fileCount = 256;

// Create Random Numbers Array
const setMatches = (v) => Array.from({ length: v }, (_, i) => i);
const shuffle = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

rl.on('line', (line) => {
  const input = line;
  const capitalize = `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
  const IMG_PATH = `img/ideal/ideal${capitalize}`;
  const randomNums = shuffle(setMatches(fileCount));
  const temp = [];

  randomNums.forEach((e) => {
    let data = {};

    data.id = e;
    data.subject = `ideal${capitalize}`;
    data.group = Math.floor(e/10);
    data.name = e;
    data.value = `그룹 : ${data.group} / 이름 : ${data.name}`
    data.fileName = `${data.id}_${data.subject}_${data.group}_${data.name}.jpg`;
    data.url = `${IMG_PATH}/${data.fileName}`;
    data.first = 0;
    data.enter = 0;
    data.firstRate = Number((data.enter === 0) ? -1 : ((data.first * 100) / data.enter).toFixed(2));
    data.win = 0;
    data.lose = 0;
    data.winRate = Number(((data.win + data.lose) === 0) ? -1 : ((data.win * 100) / (data.win + data.lose)).toFixed(2));

    temp.push(data);
  })

  const jsonData = JSON.stringify(temp, null, "\t");
  fs.writeFileSync(`${PATH}/shared/test${capitalize}Json.json`, jsonData);
  rl.close();
}).on("close", () => {
  process.exit();
});