import React, { useContext } from 'react';
import CartIconSVG from '../../assets/icons/CartIconSVG';
import { CartContext } from '../../contexts/CartContext';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const { items } = useContext(CartContext);

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    return (
        <button className={styles.button} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIconSVG />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
