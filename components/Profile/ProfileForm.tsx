import styles from "./ProfileForm.module.css";

const ProfileForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.control}>
        <label htmlFor="new-password">New PAssword</label>
        <input type="password" id="new-password" />
      </div>
      <div className={styles.control}>
        <label htmlFor="old-password">Old PAssword</label>
        <input type="password" id="old-password" />
      </div>
      <div className={styles.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
