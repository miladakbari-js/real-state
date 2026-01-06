import Link from "next/link";
import styles from "@modules/Sidebar.module.css";
import { HiFilter } from "react-icons/hi";
import { categories } from "@/constants/strings";

function SideBar() {
  return (
    <div className={styles.container}>
      <p>
        <HiFilter />
        دسته بندی
      </p>
      <Link href="/buy-residential">همه</Link>

      {Object.keys(categories).map((i) => (
        <Link
        key={i._id}
          href={{
            pathname: "/buy-residential",
            query: { category: i },
          }}
        >
          {categories[i]}
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
