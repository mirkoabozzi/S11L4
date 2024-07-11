import { Col, Container, Row, Spinner } from "react-bootstrap";
import SingleArticle from "./SingleArticle";
import { useEffect, useState } from "react";
import { IArticle } from "../assets/interfaces/IArticle";

const Home = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticle = async () => {
    try {
      const resp = await fetch("https://api.spaceflightnewsapi.net/v4/articles");
      if (resp.ok) {
        const artilces = await resp.json();
        setArticles(artilces.results);
        setIsLoading(false);
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
        {isLoading ? (
          <Spinner animation="grow" />
        ) : (
          <Row>
            {articles.map((article) => (
              <Col className="my-2" key={article.id} sm={4}>
                <SingleArticle key={article.id} article={article} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    )
  );
};
export default Home;
