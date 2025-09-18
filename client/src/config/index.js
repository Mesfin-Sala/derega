export const signUpFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};

export const languageOptions = [
  { id: "english", label: "English" },
  { id: "amharic", label: "Amharic" },
  { id: "afan-oromo", label: "AfanOromo" },
  { id: "tigrinya", label: "Tigrinya" },
  { id: "somali", label: "Somali" },
];


export const courseLevelOptions = [
  { id: "grade-1", label: "Grade 1" },
  { id: "grade-2", label: "Grade 2" },
  { id: "grade-3", label: "Grade 3" },
  { id: "grade-4", label: "Grade 4" },
  { id: "grade-5", label: "Grade 5" },
  { id: "grade-6", label: "Grade 6" },
  { id: "grade-7", label: "Grade 7" },
  { id: "grade-8", label: "Grade 8" },
  { id: "grade-9", label: "Grade 9" },
  { id: "grade-10", label: "Grade 10" },
  { id: "grade-11", label: "Grade 11" },
  { id: "grade-12", label: "Grade 12" },
];


export const courseCategories = [
  {
    id: "mathematics",
    label: "Mathematics",
    icon: "➕",
    description: "Learn numbers and equations",
  },
  {
    id: "english",
    label: "English",
    icon: "📖",
    description: "Master the art of language",
  },
  {
    id: "physics",
    label: "Physics",
    icon: "⚛️",
    description: "Explore the laws of nature",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    icon: "🧪",
    description: "Dive into the world of substances",
  },
  {
    id: "biology",
    label: "Biology",
    icon: "🔬",
    description: "Study living organisms",
  },
  {
    id: "geography",
    label: "Geography",
    icon: "🗺️",
    description: "Understand the Earth's landscapes",
  },
  {
    id: "history",
    label: "History",
    icon: "📜",
    description: "Learn about past events",
  },
  {
    id: "economics",
    label: "Economics",
    icon: "💰",
    description: "Explore how economies function",
  },
  {
    id: "civics",
    label: "Civics",
    icon: "🏛️",
    description: "Understand civic responsibilities",
  },
  {
    id: "ict",
    label: "ICT",
    icon: "💻",
    description: "Learn about information and communication technology",
  },
  {
    id: "other",
    label: "Other",
    icon: "📚",
    description: "Miscellaneous subjects",
  },
];



export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",
    componentType: "input",
    type: "number",
    placeholder: "Enter course pricing",
  },
  {
    name: "objectives",
    label: "Objectives",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course objectives",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "Welcome message for students",
  },
];

export const courseLandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};
