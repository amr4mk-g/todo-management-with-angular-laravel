const apiUrl = "http://127.0.0.1:8000/api";

export const constants = {
    CURRENT_TOKEN: "token"
};

export const apiEndpoints = {
    AuthEndpoint: {
        login: `${apiUrl}/login`,
        logout: `${apiUrl}/logout`,
        currUser: `${apiUrl}/user`,
        signup: `${apiUrl}/signup`,
    },

    TodoEndpoint: {
        getAllTodo: `${apiUrl}/user/todos`,
        addTodo: `${apiUrl}/todo`,
        updateTodo: `${apiUrl}/todoEd`,
        deleteTodo: `${apiUrl}/todoDel`,
        sendMail: `${apiUrl}/email`
    }
};