import { createContext, useReducer } from 'react';

export const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
});

const initialCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            const updatedTotalAmount =
                state.totalAmount + action.item.price * action.item.amount;

            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );

            const existingCartItem = state.items[existingCartItemIndex];

            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }
        case 'REMOVE': {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            const existingItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingItem.price;
            let updatedItems;

            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(
                    (item) => item.id !== action.id
                );
            } else {
                const updatedItem = {
                    ...existingItem,
                    amount: existingItem.amount - 1,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }
        default:
            initialCartState;
    }
};

export const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        initialCartState
    );

    const addItem = (item) => {
        dispatchCartAction({ type: 'ADD', item });
    };

    const removeItem = (id) => {
        dispatchCartAction({ type: 'REMOVE', id });
    };

    return (
        <CartContext.Provider
            value={{
                items: cartState.items,
                totalAmount: cartState.totalAmount,
                addItem,
                removeItem,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};
