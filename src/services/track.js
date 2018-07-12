import platziMusicService from "./platzi-music";
import configService from "./config";
const trackService = {
  search: track => {
    return platziMusicService
      .get("/", {
        params: {
          method: "track.search",
          track,
          api_key: configService.apiKey,
          format: "json"
        }
      })
      .then(reponse => reponse.data);
  }
};

export default trackService;
