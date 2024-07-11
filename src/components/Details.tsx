import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IArticle } from "../assets/interfaces/IArticle";

const Details = () => {
  const params = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const dataConverter = (dataStr: Date) => {
    const data = new Date(dataStr);
    return data.toLocaleString();
  };
  const fetchArticle = async () => {
    try {
      const resp = await fetch("https://api.spaceflightnewsapi.net/v4/articles/" + params.id);
      if (resp.ok) {
        const article = await resp.json();
        setArticle(article);
        setIsLoading(false);
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
    <Container className="mt-3">
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        <Row>
          <h1>Dettagli</h1>
          {article && (
            <>
              <Col xs={4}>
                <Image src={article.image_url} alt="Article Image" className="w-100" />
              </Col>
              <Col xs={8}>
                <h2>{article.title}</h2>
                <p>From: {article.news_site}</p>
                <p>{article.summary}</p>
                <a href={article.url}> Read More</a>
                <p>Pubblicato il: {dataConverter(article.published_at)}</p>
                <p>Ultimo aggiornamento: {dataConverter(article.updated_at)}</p>
              </Col>
            </>
          )}
        </Row>
      )}
    </Container>
  );
};
export default Details;
