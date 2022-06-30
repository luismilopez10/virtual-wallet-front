import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionType } from "../../features/transaccionSlice";

const postTransactionUrl = 'https://virtual-wallet-back-api.herokuapp.com/api/post/transaction'

export const postTransaction = createAsyncThunk('postTransaction', async (transaction: transactionType) => {
    const response = await fetch(postTransactionUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(transaction)
    })
    return (await response.json()) as transactionType;
})