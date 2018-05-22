import React, { Component } from "react";
import RemoveBtn from "../components/RemoveBtn/RemoveBtn";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import { Link } from "react-router-dom";

import { Col } from "../components/Grid/Col";
import { Row } from "../components/Grid/Row";
import { Container } from "../components/Grid/Container";

import { List } from "../components/List/List";
import { ListItem } from "../components/List/ListItem";

import { Input } from "../components/Form/Input";
import { TextArea} from "../components/Form/TextArea";
import { FormBtn } from "../components/Form/FormBtn";

import API from "../utils/API";
import SaveBtn from "../components/SaveBtn/SaveBtn";

class Search extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

  searchArticles = (event) => {
    event.preventDefault();
    API.findArticles(this.state.topic, this.state.startYear, this.state.endYear)
      .then(res => 
          {
          this.setState({articles: res.data.response.docs});
          console.log(this.state.articles);
        }
        )
        .catch( err => console.log(err));
  };

  saveArticleSubmit = (headline, link, date, event) => {
    console.log("Working");
      API.saveArticle({
        headline: headline,
        link: link,
        date: date
      })
        .then(res => console.log("saved article"))
        .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <div className="panel panel-primary">
          <div className="panel-heading"><h4>Query</h4></div>
          <div className="panel-body"> 
            <form>
              <h4>Topic</h4>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="topic"
              />
              <h4>Start Year</h4>
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="startYear"
              />
              <h4>End Year</h4>
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="endYear"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                onClick={this.searchArticles}
              >
                Submit
              </FormBtn>
            </form>
            </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.articles.length ? (
              <div className="panel panel-primary">
                <div className="panel-heading"><h4>Results</h4></div>
                <div className="panel-body">
                  <List>
                    {this.state.articles.map(article => (
                      <ListItem
                        key={article._id}
                        headline={article.headline.main}
                        link={article.web_url}
                        date={article.pub_date}
                      >
                        <SaveBtn onClick={(event) => this.saveArticleSubmit(article.headline.main, article.web_url, article.pub_date, event)} />
                      </ListItem>))}
                  </List>
                </div>
              </div>
              ) : (
              <ul className="list-group">
                <li className="list-group-item"><h3>Search by Term</h3></li>
              </ul>)
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;