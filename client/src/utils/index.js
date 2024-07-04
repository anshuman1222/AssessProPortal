export const formatDate = (date) => {
    // Get the month, day, and year
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
};

export function getInitials(fullName) {
    const names = fullName.split(" ");

    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

    const initialsStr = initials.join("");

    return initialsStr;
}


export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : { loading: false, isAuthenticated: false, user: null, mesaage: null, error: null , token:null};
    return user;
};

export const addAdminToLocalStorage = (user) => {
    localStorage.setItem('admin', JSON.stringify(user));
};

export const removeAdminFromLocalStorage = () => {
    localStorage.removeItem('admin');
};

export const getAdminFromLocalStorage = () => {
    const result = localStorage.getItem('admin');
    const user = result ? JSON.parse(result) : { loading: false, isAuthenticated: false, user: null, mesaage: null, error: null , token:null };
    return user;
};