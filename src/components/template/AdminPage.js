import styles from "@template/AdminPage.module.css";

function AdminPage({ profiles }) {
  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}>هیچ آگهی درانتظار تایید وجود ندارد</p>
      )}
      {profiles.map(i => <p>{i.title}</p>)}
    </div>
  );
}

export default AdminPage;
