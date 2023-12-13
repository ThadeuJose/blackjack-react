import { Card } from "../../Card";
import "./Hand.css";

interface HandProps {
  title: string;
  value: number;
  cards: Card[];
  data_cy: string;
}

export default function Hand({
  title,
  value,
  cards,
  data_cy,
}: HandProps): JSX.Element {
  return (
    <div className='container'>
      <div className='title-box'>
        {title}: <span data-cy={data_cy}>{value}</span>
      </div>
      <div className='card-box'>
        {cards.map((path, index) => (
          <img
            className='card'
            key={index}
            src={`images/${printCard(path)}.png`}
          />
        ))}
      </div>
    </div>
  );
}

export function printCard(card: Card): string {
  if (card.hidden) {
    return "back";
  }
  return `${card.suit}_${printRank(card.rank)}`;
}

function printRank(rank: string): string {
  if (rank === "A") {
    return "1";
  }
  if (rank === "J") {
    return "jack";
  }
  if (rank === "Q") {
    return "queen";
  }
  if (rank === "K") {
    return "king";
  }
  return rank;
}
