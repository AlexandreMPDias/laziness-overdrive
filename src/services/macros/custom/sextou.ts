export default () => {
	const day = new Date().getDay();
	const templates = ['Segundou', 'Terçou', 'Quartou', 'Quintou', 'Sextou'];
	return templates[day - 1] || 'Flw';
}