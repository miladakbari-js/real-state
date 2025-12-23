import styles from "@template/DetailsPage.module.css";
import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck, BiStore } from "react-icons/bi";
import { categories } from "src/constants/strings";
import { icons } from "src/constants/icons";
import { RiHome3Line } from "react-icons/ri";
import { MdApartment } from "react-icons/md";
import { GiOfficeChair } from "react-icons/gi";
import ItemList from "@modules/ItemList";
import Title from "@modules/Title";

function DetailsPage({ data }) {
  const categories = {
    apartment: "آپارتمان",
    villa: "ویلا",
    store: "مغازه",
    office: "دفتر",
  };
  const icons = {
    villa: <RiHome3Line />,
    apartment: <MdApartment />,
    store: <BiStore />,
    office: <GiOfficeChair />,
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{data.title}</h1>
        <span>
          <HiOutlineLocationMarker />
          {data.location}
        </span>
        <Title>توضیحات</Title>
        <p>{data.description}</p>

        <Title>امکانات</Title>
        <ItemList data={data.amenities} />
        <Title>قوانین</Title>
        <ItemList data={data.rules} />
      </div>
      <div className={styles.sidebar}></div>
    </div>
  );
}

export default DetailsPage;
