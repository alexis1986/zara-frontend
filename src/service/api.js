const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

class ApiService {
    async getPodcasts() {
        const data = await this.useApiCall(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`);
        return data.feed.entry.map(podcast =>                       
            ({
                id: podcast.id.attributes["im:id"],
                name: podcast["im:name"].label,
                summary: podcast.summary.label,
                image: podcast["im:image"][podcast["im:image"].length - 1].label,
                author: podcast["im:artist"].label                        
            }));        
    }

    async getPodcastById(podcastId) {
        const data = await this.getPodcasts();
        return data.find(({id}) => id === podcastId);
    }

    async getEpisodesByPodcastId(podcastId) {
        const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`;
        const data = await this.useApiCall(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        
        return JSON.parse(data.contents).results.map(({trackId, trackName, description, episodeUrl, releaseDate, trackTimeMillis}) =>                       
            ({
                description,
                episodeUrl,
                trackId,
                trackName,
                releaseDate,
                trackTimeMillis                        
            }));
    }

    async getEpisodeByPodcastIdAndEpisodeId(podcastId, episodeId) {
        const data = await this.getEpisodesByPodcastId(podcastId);
        return data.find(({trackId}) => trackId == episodeId);
    }

    async useApiCall(url) {
        let cachedData = JSON.parse(localStorage.getItem(url));
        
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME) {
            return cachedData.data;
        } else {
            const response = await fetch(url);
            const responseData = await response.json();
            localStorage.setItem(url, JSON.stringify({
                data: responseData,
                timestamp: Date.now(),
            }))

            return responseData;        
        }
    };
}  

export default new ApiService();