import trae from "trae";
import configService from "./config";

const platziMusicService = trae.create({
  baseUrl: configService.apiURl
});

export default platziMusicService;
