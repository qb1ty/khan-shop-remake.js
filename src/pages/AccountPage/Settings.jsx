import { Switch } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/redux-slice/themeSlice';
import { useTranslation } from 'react-i18next';

import ChangeForm from "./ChangeForm";

const Settings = () => {
    const { t } = useTranslation()
    const theme = useSelector((store) => store.theme.darkMode)
    const dispatch = useDispatch()
    const onChange = (checked) => {
        dispatch(toggleTheme(checked))
        localStorage.setItem("theme", JSON.stringify(checked))
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2 mb-2">
                <span className="text-lg font-open-sans tracking-wider dark:text-[#e0e0e0]">{theme ? t('theme_off') : t('theme_on')}</span>
                <div>
                    <Switch defaultChecked value={theme} onChange={onChange} />
                </div>
            </div>
            <ChangeForm />
        </div>
    )
}

export default Settings