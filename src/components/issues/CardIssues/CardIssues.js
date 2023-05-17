import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import css from './CardIssues.module.css';
const moment = require('moment');

function CardIssues({ data }) {
  const [createdDate, setCreatedDate] = useState();

  useEffect(() => {
    if (data.created_at) {
      setCreatedDate(data.created_at);
      return;
    }
    return;
  }, [data.created_at]);

  const now = moment();

  const processDate = () => {
    const date = moment(createdDate);
    const diff = moment.duration(now.diff(date));
    const timeAgo = diff.humanize();
    return timeAgo;
  };

  return (
    <Card className={css.card}>
      <Card.Body>
        <Card.Title className={css.title}>{data.title}</Card.Title>

        <Card.Text className={css.text}>
          #{data.number} , opened {processDate()} ago
        </Card.Text>
        <div className={css.possition}>
          <Card.Link className={css.cardLinkUser} href={data.user.html_url}>
            {data.user.login}
          </Card.Link>
          <Card.Text className={css.comments}>
            comments {data.comments}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardIssues;
