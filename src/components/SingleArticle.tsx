import { Button, Card, Col } from "react-bootstrap";
import { IArticle } from "../assets/interfaces/IArticle";
import { useNavigate } from "react-router-dom";

interface SingleArticleProps {
  article: IArticle;
}

const SingleArticle = ({ article }: SingleArticleProps) => {
  const navigate = useNavigate();

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={article.image_url} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.summary}</Card.Text>
          <Button onClick={() => navigate("/details/" + article.id)} variant="primary">
            See more
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleArticle;
