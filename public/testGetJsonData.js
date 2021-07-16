const testFemaleJson = require('/Users/gu/refactoring-app/src/json/ideal/female/testFemaleJson.json');

// const makeIds = (v) => Array.from({ length: v }, (_, i) => i);
// const getEntriesIndex = (jsonData, ids) => {
//   const temp = ids.map((e) => {
//     const getEntriesIndexByIds = (item) => {
//       return item.id === e;
//     }
//     return jsonData.findIndex(getEntriesIndexByIds);
//   });
//   return temp;
// }
const getEntriesData = (jsonData, ids) => {
  const temp = ids.map((e) => {
    return jsonData[e];
  })
  return temp;
}
const makeDraw = (arr) => {
	const temp = [];
	for (let i = 0; i < arr.length; i += 2) {
		temp.push(arr.slice(i, i + 2));
	}
	return temp;
}

const data = testFemaleJson;
const roundValue = 16;

const entriesId = makeIds(roundValue);
// const entriesIndex = getEntriesIndex(data, entriesId);
const entriesData = getEntriesData(data, entriesId);

console.log(entriesId);
console.log(entriesData);