import styles from "@modules/TextList.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";

function TextList({ title, profileData, setProfileData, type }) {
  const addHandler = () => {
    setProfileData({ ...profileData, [type]: [...profileData[type], ""] });
  };

  const changeHandler = (e, index) => {
    const { value } = e.target;
    const list = [...profileData[type]];
    list[index] = value;
    setProfileData({ ...profileData, [type]: list });
  };

  const deleteHandler = (index) => {
    const list = [...profileData[type]];
    list.splice(index, 1);
    setProfileData({ ...profileData, [type]: list });
  };
  return (
    <div className={styles.container}>
      <p>{title}</p>
      {profileData[type].map((i, index) => (
        <div className={styles.card} key={index}>
          <input
            value={i}
            type="text"
            onChange={(e) => changeHandler(e, index)}
          />
          <button onClick={(e) => deleteHandler(index)}>
            حذف
            <AiOutlineDelete />
          </button>
        </div>
      ))}
      <button onClick={addHandler}>
        افزودن
        <MdOutlineLibraryAdd />
      </button>
    </div>
  );
}

export default TextList;
