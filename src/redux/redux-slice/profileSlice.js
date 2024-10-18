import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUpdate } from "./registerSlice";
import { url } from "../store";

export const fetchProfile = createAsyncThunk(
    "slice/fetchProfile",
    async function(_, {rejectWithValue}) {
        try {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
                    'Content-Type': 'application/json',
                }
            }

            const response = await axios.get(url + `/api/account/profile/`, headers)
            const data = await response.data

            return data
        } catch (error) {
            return rejectWithValue
        }
    }
)

export const fetchUpdatePassword = createAsyncThunk(
    "slice/fetchUpdatePassword",
    async function({ oldPassword, newPassword }, {rejectWithValue}) {
        try {
            const data = {
                password: oldPassword,
                new_password: newPassword
            }
            const response = await axios.patch(url + `/api/account/update/password/`, data, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
                }
            })
            const result = await response.data

            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const lng = JSON.parse(localStorage.getItem("lang")) || "en";
const passwordMessagesError = {
    en: "Password field is required",
    ru: "Поле пароля обязательно",
    kk: "Құпия сөз өрісі қажет"
};

const profileSlice = createSlice({
    name: "profileSlice",
    initialState: {
        account: null,
        status: null,
        error: null,
        oldPassword: "",
        oldPasswordError: passwordMessagesError[lng] || passwordMessagesError.en,
        oldPasswordDirty: false,
        newPassword: "",
        newPasswordError: passwordMessagesError[lng] || passwordMessagesError.en,
        newPasswordDirty: false,
        validation: false,
        lang: lng
    },
    reducers: {
        handleChangeOldPassword(state, action) {
            state.oldPassword = action.payload.event.target.value;
            const value = action.payload.event.target.value;

            if (value.trim().length < 8 || value.trim().length > 20) {
                if (state.lang === "en") state.oldPasswordError = "Password must be between 8 and 20 characters";
                if (state.lang === "ru") state.oldPasswordError = "Пароль должно быть от 8 до 20 символов";
                if (state.lang === "kk") state.oldPasswordError = "Құпия сөз 8 пен 20 таңбадан тұруы керек";
            } else if (!value) {
                state.oldPasswordError = passwordMessagesError[state.lang];
            } else {
                state.oldPasswordError = "";
            }
        },
        handleChangeNewPassword(state, action) {
            state.newPassword = action.payload.event.target.value
            const value = action.payload.event.target.value;

            if (value.trim().length < 8 || value.trim().length > 20) {
                if (state.lang === "en") state.newPasswordError = "Password must be between 8 and 20 characters";
                if (state.lang === "ru") state.newPasswordError = "Пароль должно быть от 8 до 20 символов";
                if (state.lang === "kk") state.newPasswordError = "Құпия сөз 8 пен 20 таңбадан тұруы керек";
            } else if (!value) {
                state.newPasswordError = passwordMessagesError[state.lang];
            } else {
                state.newPasswordError = "";
            }
        },
        blurHandler(state, action) {
            action.payload.event.preventDefault();
            const name = action.payload.event.target.name;

            switch (name) {
                case "oldPassword":
                    state.oldPasswordDirty = true;
                    break;
                case "newPassword":
                    state.newPasswordDirty = true;
                    break;
                default:
                    break;
            }
        },
        changeLanguage(state, action) {
            const newLang = action.payload;
            state.lang = newLang;

            state.oldPasswordError = passwordMessagesError[newLang];
            state.newPasswordError = passwordMessagesError[newLang];
        },
        validIsTrue(state) {
            state.validation = true;
        },
        validIsFalse(state) {
            state.validation = false;
        },
        isClear(state, action) {
            const newLang = action.payload;
            state.lang = newLang;

            state.oldPassword = ""
            state.oldPasswordDirty = false
            state.oldPasswordError = passwordMessagesError[newLang];
            state.newPassword = ""
            state.newPasswordDirty = false
            state.newPasswordError = passwordMessagesError[newLang];
            state.validation = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProfile.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            state.account = action.payload
            state.error = null
        }),
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        }),
        builder.addCase(fetchUpdate.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchUpdate.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            state.account = action.payload
            state.error = null
        }),
        builder.addCase(fetchUpdate.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        })
    }
})

export const { handleChangeOldPassword, handleChangeNewPassword, blurHandler, changeLanguage, validIsTrue, validIsFalse, isClear } = profileSlice.actions

export default profileSlice.reducer