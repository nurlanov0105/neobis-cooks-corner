import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

interface Props {
   userId: number;
   name: string;
   imageUrl: string;
}

const ChefsCard: FC<Props> = ({ userId, name, imageUrl }) => {
   return (
      <Link to={`/authors/${userId}`} className={styles.card}>
         <div className={styles.card__img} style={{ backgroundImage: `url(${imageUrl})` }}></div>
         <h4 className={styles.card__title}>{name}</h4>
      </Link>
   );
};

export default ChefsCard;
