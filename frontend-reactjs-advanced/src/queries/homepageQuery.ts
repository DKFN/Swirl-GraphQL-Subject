export const homepageQuery = (targetId: number) =>  `
query {
	strates (names: ["soon", "anime", "drames", "thrillers", "noirblanc", "sciencefiction", "horreur", "fantastique"]) {
		name
		title
		movies {
			id
			title
			poster
		}
	}
	movie (id: ${targetId}) {
		id
		title
		synopsis
		backdrop
		poster
		director
		releaseDate
		trailerYoutubeId
		comments {
		    avatar
		    text
		    login
        }
	}
}`;
