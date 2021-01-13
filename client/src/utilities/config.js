export const HOME_TAB = 1;
export const PROBLEM_TAB = 2;
export const SNIPPET_TAB = 3;
export const PROBLEM_WRITING_TAB = 4;

export const languageDatabase = {
    "text/x-java" : "Java",
    "text/x-c++src": "C++",
    "text/x-python": "Python"
};

export const fileExtension = {
    "text/x-java": "java",
    "text/x-c++src": "cpp",
    "text/x-python": "py"
};

export const parseInput = (input) => {
    return input.split('\n');
}