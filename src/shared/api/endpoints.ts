export const AuthEndpoints = {
   LOGIN: '/v1/auth/login',
   LOGOUT: '/v1/auth/logout',
   REGISTER: '/v1/auth/registration',
   CONFIRMATION: '/v1/auth/confirmation',
   RESEND_CONFIRMATION: '/v1/auth/resend-confirmation',
   REFRESH_TOKEN: '/v1/auth/refresh-token',
   FORGOT_PASSWORD: '/v1/auth/forgot-password',
   EMAIL_AVAILABLE: '/v1/auth/email-available',
   RESET_PASSWORD: '/v1/auth/reset-password',
};

export const RecipesEndpoints = {
   RECIPES: '/v1/recipes',
   RECIPES_LIKE: '/v1/recipes/like/',
   RECIPES_DISLIKE: '/v1/recipes/dislike/',
   RECIPES_BOOKMARK: '/v1/recipes/dislike/',
   RECIPES_REMOVE_BOOKMARK: '/v1/recipes/remove-bookmark/',
};
export const UsersEndpoints = {
   USERS: '/v1/users',
   USERS_FOLLOW: '/v1/users/follow/',
   USERS_UNFOLLOW: '/v1/users/follow/',
   USERS_SEARCH: '/v1/users/search',
};
