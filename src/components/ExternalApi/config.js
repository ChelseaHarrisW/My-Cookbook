fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tasty.p.rapidapi.com",
		"x-rapidapi-key": "ccfe9e4b9fmsh1dfb38f1ffd1498p1cf05ajsn8fe18037dd22"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});