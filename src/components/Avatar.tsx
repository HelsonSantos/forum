import styles from "./Avatar.module.css";

export const Avatar = ({ src, alt, hasBorder = false }: { src: string; alt?: string, hasBorder?: boolean }) => {
  return <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} alt={alt} />;
};
