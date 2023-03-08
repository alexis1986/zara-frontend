class ApiService {
    async getPodcasts() {
        const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`);
        const responseAsJson = await response.json();
        return responseAsJson.feed.entry.map(podcast =>                       
                        ({
                            id: podcast.id.attributes["im:id"],
                            name: podcast["im:name"].label,
                            image: podcast["im:image"][podcast["im:image"].length - 1].label,
                            author: podcast["im:artist"].label                        
                        })
                    );
    }

    async getEpisodesByPodcastId(podcastId) {
        const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`;
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const responseAsJson = await response.json();
        return JSON.parse(responseAsJson.contents).results;
    }
}  

export default new ApiService();