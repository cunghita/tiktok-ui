import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);
function AccountItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src={data.avatar_thumb.url_list[0]} alt="abc"></img>
            <div className={cx('info')}>
                <div className={cx('name')}>
                    <span>{data.search_user_name}</span>
                    {data.custom_verify && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </div>
                <span className={cx('username')}>{data.search_user_desc}</span>
            </div>
        </div>
    );
}

export default AccountItem;
