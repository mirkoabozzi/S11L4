import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IArticle } from "../assets/interfaces/IArticle";

const Details = () => {
  const params = useParams();
  const [article, setArticle] = useState<IArticle>();

  const fetchArticle = async () => {
    try {
      const resp = await fetch("https://api.spaceflightnewsapi.net/v4/articles/" + params.id);
      if (resp.ok) {
        const article = await resp.json();
        setArticle(article);
      } else {
        throw new Error("Errore ner reperimento dei dati");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <h1>Pagina dettaglio</h1>
        <Col>
          <h2>{article?.title}</h2>
          <Image src={article?.image_url} alt="Article Image" />
        </Col>
        <Col>
          <p>{article?.summary}</p>
        </Col>
      </Row>
    </Container>
  );
};
export default Details;
