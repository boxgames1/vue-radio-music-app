<template lang="pug">
  #app
    pm-header
    pm-notification(v-show="resultsAlert")
      p(slot="body") No se encontraron resultados
    pm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav.has-shadow
        .container
          input.input.is-large(
            type="text",
            placeholder="Buscar canciones",
            v-model="searchQuery"
          )
          a.button.is-info.is-large(@click="search") Find
          a.button.is-danger.is-large &times;
          p
            strong {{ selectedTrack }}
      .container.results
        .columns.is-multiline
          .column.is-one-quarter(v-for="track in tracks") 
            pm-track(
              :class="{ 'is-active': track.url === selectedTrack }" 
              :track="track", 
              @select="setSelectedTrack"
            )
      p.search-message {{searchMessage}}
    pm-footer
</template>

<script>
import trackService from "@/services/track";
import PmFooter from "@/components/layout/Footer.vue";
import PmHeader from "@/components/layout/Header.vue";
import PmTrack from "@/components/Track.vue";
import PmLoader from "@/components/shared/Loader.vue";
import PmNotification from "@/components/shared/Notification.vue";
import { setTimeout } from "timers";

export default {
  name: "app",
  data() {
    return {
      searchQuery: "",
      tracks: [],
      resultsCount: 0,
      resultsAlert: false,
      isLoading: false,
      selectedTrack: ""
    };
  },
  components: {
    PmFooter,
    PmHeader,
    PmTrack,
    PmLoader,
    PmNotification
  },
  computed: {
    searchMessage() {
      return `Found ${this.resultsCount} results`;
    }
  },
  watch: {
    resultsAlert() {
      if (this.resultsAlert) {
        setTimeout(() => {
          this.resultsAlert = false;
        }, 3000);
      }
    }
  },
  methods: {
    search() {
      this.isLoading = true;
      trackService.search(this.searchQuery).then(response => {
        this.tracks = response.results.trackmatches.track;
        this.resultsCount = response.results["opensearch:totalResults"];
        this.resultsAlert = !(this.resultsCount > 0);
        this.isLoading = false;
      });
    },
    setSelectedTrack(id) {
      this.selectedTrack = id;
    }
  }
};
</script>

<style lang="scss">
@import "./scss/main.scss";
.search-message {
  margin-top: 30px;
}

.results {
  margin-top: 50px;
}

.is-active {
  border: 3px solid #23d160;
}
</style>
