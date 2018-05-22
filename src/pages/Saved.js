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

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
          this.setState({articles: res.data})
        )
      .catch(err => console.log(err));
  };

  deleteArticleSubmit = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }

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
            {this.state.articles.length ? (
              <div className="panel panel-primary">
                <div className="panel-heading"><h4>Saved Articles</h4></div>
                <div className="panel-body">
                  <List>
                    {this.state.articles.map(article => (
                      <ListItem
                        key={article._id}
                        headline={article.headline}
                        link={article.link}
                        date={article.date}
                      >
                        <RemoveBtn onClick={() => this.deleteArticleSubmit(article._id)} />
                      </ListItem>))}
                  </List>
                </div>
              </div>
              ) : (
              <ul className="list-group">
                <li className="list-group-item"><h3><em>No Saved Articles</em></h3></li>
              </ul>)
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;