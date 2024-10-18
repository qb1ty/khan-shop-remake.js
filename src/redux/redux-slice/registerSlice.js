import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../store";

export const fetchSignUp = createAsyncThunk(
    "slice/fetchSignUp",
    async function({ username, email, password, avatar, birthday }, {rejectWithValue}) {
        try {
            const formData = new FormData()
            formData.append('username', username)
            formData.append('email', email)
            formData.append('profile_date_of_birth', birthday)
            formData.append('password', password)
            formData.append('profile_image', avatar)

            const response = await axios.post(url + `/api/account/sign-up/`, formData, {
                'Content-Type': 'multipart/form-data',
            })
            const result = await response.data

            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchLogIn = createAsyncThunk(
    "slice/fetchLogIn",
    async function({username, password}, {rejectWithValue}) {
        try {
            const data = {
                username: username,
                password: password
            }

            const response = await axios.post(url + `/api/account/sign-in/`, data)
            const result = await response.data

            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchUpdate = createAsyncThunk(
    "slice/fetchUpdate",
    async function({ username, email, avatar }, {rejectWithValue}) {
        try {
            const formData = new FormData()

            if (username) {
                formData.append("username", username);
            }
            
            if (email) {
                formData.append("email", email);
            }
            
            if (avatar) {
                formData.append("profile_image", avatar);
            }

            const response = await axios.patch(url + `/api/account/update/profile/`, formData, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
                }
            })
            const res = await response.data

            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const lng = JSON.parse(localStorage.getItem("lang")) || "en";
const usernameMessagesError = {
    en: "Username field is required",
    ru: "Поле имени пользователя обязательно",
    kk: "Пайдаланушы аты өрісі қажет"
};

const emailMessagesError = {
    en: "Email field is required",
    ru: "Поле для почты обязательно",
    kk: "Электрондық пошта өрісі қажет"
};

const birthdayMessagesError = {
    en: "Birthday field is required",
    ru: "Поле дня рождения обязательно",
    kk: "Туылған күн өрісі қажет"
};

const passwordMessagesError = {
    en: "Password field is required",
    ru: "Поле пароля обязательно",
    kk: "Құпия сөз өрісі қажет"
};

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState: {
        avatar: null,
        username: "",
        usernameError: usernameMessagesError[lng] || usernameMessagesError.en,
        usernameDirty: false,
        email: "",
        emailError: emailMessagesError[lng] || emailMessagesError.en,
        emailDirty: false,
        birthday: null,
        birthdayError: birthdayMessagesError[lng] || birthdayMessagesError.en,
        birthdayDirty: false,
        password: "",
        passwordError: passwordMessagesError[lng] || passwordMessagesError.en,
        passwordDirty: false,
        validation: false,
        lang: lng,
        errorMessage: "",
        error: null,
        status: null
    },
    reducers: {
        handleAvatarChange(state, action) {
            state.avatar = action.payload.event.target.files[0]
        },
        handleUsernameChange(state, action) {
            state.username = action.payload.event.target.value;
            const value = action.payload.event.target.value;

            if (value.trim().length < 3 || value.trim().length > 20) {
                if (state.lang === "en") state.usernameError = "Username must be between 3 and 20 characters";
                if (state.lang === "ru") state.usernameError = "Имя пользователя должно быть от 3 до 20 символов";
                if (state.lang === "kk") state.usernameError = "Пайдаланушы аты 3 пен 20 таңбадан тұруы керек";
            } else if (!value) {
                state.usernameError = usernameMessagesError[state.lang];
            } else {
                state.usernameError = "";
            }
        },
        handleEmailChange(state, action) {
            state.email = action.payload.event.target.value;
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const value = action.payload.event.target.value;

            if (!re.test(String(value).toLowerCase())) {
                if (state.lang === "en") state.emailError = "Incorrect email";
                if (state.lang === "ru") state.emailError = "Некорректная почта";
                if (state.lang === "kk") state.emailError = "Қате пошта";
            } else if (!value) {
                state.emailError = emailMessagesError[state.lang];
            } else {
                state.emailError = "";
            }
        },
        handleBirthdayChange(state, action) {
            state.birthday = action.payload.date

            if (!state.birthday) {
                state.birthdayError = birthdayMessagesError[state.lang];
                state.birthdayDirty = true
            } else if (state.birthday.length > 0 ) {
                state.birthdayError = ""
            }
        },
        handlePasswordChange(state, action) {
            state.password = action.payload.event.target.value;
            const value = action.payload.event.target.value;

            if (value.trim().length < 8 || value.trim().length > 20) {
                if (state.lang === "en") state.passwordError = "Password must be between 8 and 20 characters";
                if (state.lang === "ru") state.passwordError = "Пароль должно быть от 8 до 20 символов";
                if (state.lang === "kk") state.passwordError = "Құпия сөз 8 пен 20 таңбадан тұруы керек";
            } else if (!value) {
                state.passwordError = passwordMessagesError[state.lang];
            } else {
                state.passwordError = "";
            }
        },
        blurHandler(state, action) {
            action.payload.event.preventDefault();
            const name = action.payload.event.target.name;

            switch (name) {
                case "username":
                    state.usernameDirty = true;
                    break;
                case "email":
                    state.emailDirty = true;
                    break;
                case "password":
                    state.passwordDirty = true;
                    break;
                default:
                    break;
            }
        },
        validIsTrue(state) {
            state.validation = true;
        },
        validIsFalse(state) {
            state.validation = false;
        },
        changeLanguage(state, action) {
            const newLang = action.payload;
            state.lang = newLang;

            state.usernameError = usernameMessagesError[newLang];
            state.emailError = emailMessagesError[newLang];
            state.passwordError = passwordMessagesError[newLang];
        },
        appendErrorMessage(state, action) {
            state.errorMessage = action.payload
        },
        isClear(state, action) {
            const newLang = action.payload;
            state.lang = newLang;

            state.avatar = null
            state.username = ""
            state.usernameDirty = false
            state.usernameError = usernameMessagesError[newLang];
            state.email = ""
            state.emailDirty = false
            state.emailError = emailMessagesError[newLang];
            state.birthday = null
            state.birthdayDirty = false
            state.birthdayError = birthdayMessagesError[newLang]
            state.password = ""
            state.passwordDirty = false
            state.passwordError = passwordMessagesError[newLang];
            state.validation = false
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchSignUp.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchSignUp.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            state.error = null
        }),
        builder.addCase(fetchSignUp.rejected, (state, action) => {
            state.status = action.error
            state.error = action.payload
        }),
        builder.addCase(fetchLogIn.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchLogIn.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            state.error = null

            localStorage.setItem("refresh", JSON.stringify(action.payload.refresh))
            localStorage.setItem("access", JSON.stringify(action.payload.access))
        }),
        builder.addCase(fetchLogIn.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        })
    }
});

export const {
    handleAvatarChange,
    handleUsernameChange,
    handleEmailChange,
    handleBirthdayChange,
    handlePasswordChange,
    blurHandler,
    validIsTrue,
    validIsFalse,
    changeLanguage,
    appendErrorMessage,
    isClear
} = registerSlice.actions;

export default registerSlice.reducer;
