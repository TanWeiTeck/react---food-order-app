import React, { useContext, useEffect, useState } from 'react';
import CartIconSVG from '../../assets/icons/CartIconSVG';
import { CartContext } from '../../contexts/CartContext';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const { items } = useContext(CartContext);

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${styles.button} ${
        btnIsHighlighted ? styles.bump : ''
    }`;

    useEffect(() => {
        if (items.length === 0) {
            setBtnIsHighlighted(false);
        } else setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIconSVG />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
