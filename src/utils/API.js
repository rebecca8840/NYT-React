import axios from "axios";

export default {

  getArticles: function() {
    return axios.get("/api/articles");
  },
 
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },

  saveArticle: function(articleData) {
    console.log(articleData);
    return axios.post("/api/articles", articleData);
  },
  findArticles: function(topic, startYear, endYear) {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=54d61f55f75244bb9819c29f5e41aa3f&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231");
  }
};