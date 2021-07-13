var fs = require('fs');
const PATH = '/Users/gu/refactoring-app/src';
const IMG_PATH = 'img/ideal/female';
fs.readdir(`${PATH}/${IMG_PATH}`, (err, filelist) => {

    const list = filelist;

    let temp = [];
    for (let i = 0; i < list.length; i++) {

        let splitName = list[i].replace('.jpg', '').split('_');

        let data = {};
        data.id = i;
        data.filename = list[i];
        data.url = `${IMG_PATH}/${list[i]}`;
        data.group = splitName[splitName.length - 2];
        data.name = splitName[splitName.length - 1];
        data.value = `${data.group} ${data.name}`;

        temp.push(data);
    }

    console.log(temp);
    const jsonData = JSON.stringify(temp, null, "\t");
    fs.writeFileSync(`${PATH}/json/ideal/female/idealFemaleJson.json`, jsonData);

}); 