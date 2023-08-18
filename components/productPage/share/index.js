import styles from './styles.module.scss';
import { FacebookIcon, FacebookShareButton } from 'react-share';
export default function Share() {
    console.log("window", window?.location.href)
    return (    
        <div className={styles.share}>
            <FacebookShareButton url={window?.location.href}>
                <FacebookIcon size={38} round={true} />
            </FacebookShareButton>
        </div>
    );
}