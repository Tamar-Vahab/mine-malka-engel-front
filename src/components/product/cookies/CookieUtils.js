

// מייצא את הפונקציה setCookie
export const setCookie = (name, value, days) => {
    // יצירת משתנה expires שהוא ריק כברירת מחדל
    let expires = "";
    // אם days (מספר הימים) ניתן
    if (days) {
        // יצירת אובייקט Date חדש
        const date = new Date();
        // הגדרת הזמן לפקיעת ה-Cookie על ידי הוספת מספר הימים במילישניות
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        // המרה של התאריך למחרוזת בפורמט UTC
        expires = "; expires=" + date.toUTCString();
    }
    // יצירת ה-Cookie על ידי הגדרת document.cookie לפורמט name=value; expires=DATE; path=/
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
  
// מייצא את הפונקציה getCookie
export const getCookie = (name) => {
    debugger
    // יצירת מחרוזת חיפוש nameEQ שתכיל את שם ה-Cookie ואחריו סימן שוויון
    const nameEQ = name + "=";
    // חלוקת כל ה-Cookies למערך ca על ידי שימוש בנקודה-פסיק (;) כמפריד
    const ca = document.cookie.split(';');
    // מעבר על כל ה-Cookies במערך ca
    for (let i = 0; i < ca.length; i++) {
        // הסרת רווחים מיותרים מההתחלה של ה-Cookie הנוכחי
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        // בדיקה אם ה-Cookie הנוכחי מתחיל עם nameEQ
        if (c.indexOf(nameEQ) === 0) {
            // אם כן, החזרת הערך של ה-Cookie על ידי חיתוך המחרוזת לאחר nameEQ
            return c.substring(nameEQ.length, c.length);
        }
    }
    // אם לא מצאנו את ה-Cookie, החזרת null
    return null;
};

// מייצא את הפונקציה eraseCookie
export const eraseCookie = (name) => {
    debugger
    // מחיקת ה-Cookie על ידי קביעת ה-Cookie לפקיעה מידית עם Max-Age שלילי
    document.cookie = name + '=; Max-Age=-99999999;';
};