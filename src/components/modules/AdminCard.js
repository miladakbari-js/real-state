import styles from "@modules/AdminCard.module.css";
import { sp } from "@utils/replaceNumber";

function AdminCard({data:{title , description , location , price}}) {
  return <div className={styles.container}>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className={styles.properties}>
        <span>{location}</span>
        <span>{sp(price)}</span>
    </div>
    <button>انتشار</button>
  </div>;
}

export default AdminCard;
