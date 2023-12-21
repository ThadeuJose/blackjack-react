import { Card } from "../../Card";

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
    <div className='container flex flex-col items-center pb-4'>
      {value > 0 && (
        <div className='flex pb-2'>
          <div className='font-semibold pr-2'>{title}:</div>
          <span className='font-bold ' data-cy={data_cy}>
            {value}
          </span>
        </div>
      )}
      <div className='flex gap-2'>
        {cards.map((path, index) => (
          <img
            className='h-44'
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
