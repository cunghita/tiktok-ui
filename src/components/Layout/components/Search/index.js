import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../../../Popper';
import AccountItem from '../../../AccountItem';
import { useDebounce } from '../../../../hooks';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);
    const inputRef = useRef();
    //const options = {
    //    method: 'GET',
    //    headers: {
    //        'X-RapidAPI-Key': 'cc20341b0bmsh8e0c0e104119f72p114878jsn0a3cb2905970',
    //        'X-RapidAPI-Host': 'tiktok-private1.p.rapidapi.com',
    //    },
    //};
    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }
        setLoading(true);
        fetch('https://api.jsonbin.io/v3/b/642fd8e9ebd26539d0a629de')
            .then((response) => response.json())
            .then((response) => {
                //console.log(response.record.user_list);
                setSearchResult(response.record.user_list);
                setLoading(false);
                //console.log(response.record.user_list);
            })
            .catch((err) => setLoading(false));
    }, [debounced]);
    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchValue && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <div className={cx('search-title')}>Accounts</div>
                        {searchResult.map((result) => {
                            return <AccountItem key={result.user_info.uid} data={result.user_info} />;
                        })}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => {
                        if (e.target.value === ' ') {
                            return;
                        }
                        setSearchValue(e.target.value);
                    }}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button
                        className={cx('clear')}
                        onClick={() => {
                            setSearchValue('');
                            inputRef.current.focus();
                            setSearchResult([]);
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
