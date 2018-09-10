import * as i18n from "i18next";
import * as LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

i18n
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: "en",
        debug: process.env.NODE_ENV !== "production",
        resources: {
            en: {
                "noTodosFound": {
                    "noneFoundTitle": "No Todos Found",
                    "noneFoundDescription": "No todos were found. Try changing your toggle settings above or adding a new todo."
                },
                "filterToggle": {
                    "all": "All",
                    "incomplete": "Incomplete",
                    "completed": "Completed"
                },
                "addTodos": {
                    "enterANewTodo": "Enter a new todo"
                },
                "todo": {
                    "created": "Created"
                },
                "navbar": {
                    "home": "Home",
                    "about": "About"
                }
            },
            de: {
                "todo": {
                    "created": "Geschaffen"
                }
            },
            el: {
                "noTodosFound": {
                    "noneFoundTitle": "Δεν βρέθηκε Todos",
                }
            }
        },
        interpolation: {
            escapeValue: false,
        },

        react: {
            wait: false,
            bindI18n: "languageChanged loaded",
            bindStore: "added removed",
            nsMode: "default",
        }
    });

export default i18n;