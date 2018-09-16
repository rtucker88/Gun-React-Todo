import * as i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
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
                    "noneFoundTitle": "Δεν βρέθηκε εκκρεμούσα εργασία",
                    "noneFoundDescription": "Δεν βρέθηκε εκκρεμούσα εργασία. Αλλάξετε φίλτρο ή προσθέσετε καινούργια εκκρεμούσα εργασία."
                },
                "filterToggle": {
                    "all": "Όλα",
                    "incomplete": "Εκκρεμής",
                    "completed": "Ολοκληρωμένα"
                },
                "addTodos": {
                    "enterANewTodo": "Προσθέσετε καινούργια εκκρεμούσα εργασία."
                },
                "todo": {
                    "created": "Δημιουργήθηκε"
                },
                "navbar": {
                    "home": "Home",
                    "about": "Πληροφορίες"
                }
            },
            uk: {
                "noTodosFound": {
                    "noneFoundTitle": "Не знайдено що робити",
                    "noneFoundDescription": "Не знайдено що робити. Спробуйте змінити налаштування зверху, або додайте замітки що зробити."
                },
                "filterToggle": {
                    "all": "Всі",
                    "incomplete": "Незавершені",
                    "completed": "Завершені"
                },
                "addTodos": {
                    "enterANewTodo": "Створіть новий запис"
                },
                "todo": {
                    "created": "Створено"
                },
                "navBar": {
                    "home": "Додому",
                    "about": "Про програму"
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
