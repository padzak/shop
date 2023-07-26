import styles from './styles.module.scss';
import { useSession } from 'next-auth/react';
import { defaultUser } from '@/data/user';

export default function User() {
    const { data: session } = useSession();
    return (
        <div className={styles.user}>
            <img  src="" alt=""/>
            <div className={styles.user__container}>
                {
                    session ? (
                    <div className={styles.user__info}> 
                        <img src={session.user?.image} alt=""/>
                        <h4>{session.user.name}</h4>
                    </div> 
                    ) : (
                        <div className={styles.user__info}> 
                        <img src={defaultUser.image} alt=""/>
                        <h4>{defaultUser.name}</h4>
                    </div> 
                    )
                }
            </div>
        </div>
    );
}