var homepageQuery = `
query {
	strates (names: ["soon", "anime"]) {
		name
		title
		movies {
			id
			title
			poster
		}
	}
	movie (id: 31798) {
		id
		title
		synopsis
		backdrop
		poster
		director
		releaseDate
		trailerYoutubeId
	}
}`;
