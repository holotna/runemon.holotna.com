const appId = 2763800;

document.addEventListener('DOMContentLoaded', function() {
	const url = `https://api.holotna.com/steam-app-news/${appId}`;
	fetch(url)
		.then(res => res.json())
		.then(json => {
			console.log(json);
			const newsParent = document.getElementById("news-parent");
			const newsList = document.getElementById("news-list");
			if (!json.hasOwnProperty("appnews") || json.appnews.newsitems.length == 0) {
				console.log("No news yet!");
			} else {
				const template = document.getElementById("template-news");
				const noNews = document.getElementById("no-news");
				noNews.style.display = "none";
				json.appnews.newsitems.forEach(n => {
					const entry = template.content.cloneNode(true);

					const title = entry.querySelector(".news-title");
					const date = entry.querySelector(".news-date");
					const content = entry.querySelector(".news-content");
					const link = entry.querySelector(".news-link");

					title.textContent = n.title;
					date.textContent = new Date(n.date * 1000).toDateString();
					content.textContent = n.contents.replace(/({STEAM_CLAN_IMAGE}\S*(\s|$))/, "");
					link.href = n.url;

					newsList.appendChild(entry);
				});
			}
		})
		.catch(e => console.error(e));
}, false);