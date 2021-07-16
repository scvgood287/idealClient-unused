// Import all Images
const importAll = (r) => {
	let images = {};
	r.keys().map((e, i) => {
		let splitName = e.replace('.jpg', '').replace('./', '').split('_');
		let splitNameLength = splitName.length;

		images[i] = r(e);
		images[i].group = splitName[splitNameLength - 2];
		images[i].name = splitName[splitNameLength - 1].replace('-', ' ');
		images[i].value = `${images[i].group} ${images[i].name}`;
	});
	return images;
}

// const images = importAll(
type === 'idealFemale' ?
require.context('img/ideal/female', false, /\.jpg/) :
type === 'idealMale' ?
require.context('img/ideal/male', false, /\.jpg/) :
type === 'idealFood' ?
require.context('img/ideal/food', false, /\.jpg/) :
type === 'idealTour' ?
require.context('img/ideal/tour', false, /\.jpg/) : null