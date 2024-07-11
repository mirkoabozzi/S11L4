import { Col, Container, Row } from "react-bootstrap";
import SingleArticle from "./SingleArticle";
import { useEffect, useState } from "react";
import { IArticle } from "../assets/interfaces/IArticle";

const Home = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const fetchArticle = async () => {
    try {
      const resp = await fetch("https://api.spaceflightnewsapi.net/v4/articles");
      if (resp.ok) {
        const artilces = await resp.json();
        setArticles(artilces.results);
      } else {
        throw new Error("Errore nel reperimento degli articoli");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    articles && (
      <Container className="mt-3">
        <h1>Articoli Space X</h1>
        <Row>
          {articles.map((article) => (
            <Col className="py-2" key={article.id} sm={3}>
              <SingleArticle key={article.id} article={article} />
            </Col>
          ))}
        </Row>
      </Container>
    )
  );
};
export default Home;
